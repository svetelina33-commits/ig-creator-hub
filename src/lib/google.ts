import { env, googleRedirectUri, requireGoogleCredentials } from "./env";
import {
  findCreatorById,
  saveGoogleConnection,
  updateGoogleAccessToken,
} from "./store";
import { decryptToken } from "./crypto";

const AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const USERINFO_URL = "https://openidconnect.googleapis.com/v1/userinfo";
const GMAIL_SEND_URL = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";

export function buildGoogleAuthorizeUrl(state: string): string {
  const { clientId } = requireGoogleCredentials();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: googleRedirectUri(),
    response_type: "code",
    scope: env().GOOGLE_SCOPES,
    access_type: "offline", // returns a refresh_token
    prompt: "consent", // force consent so we always get a refresh_token
    include_granted_scopes: "true",
    state,
  });
  return `${AUTH_URL}?${params.toString()}`;
}

export type GoogleTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: "Bearer";
  id_token?: string;
};

export async function exchangeGoogleCode(code: string): Promise<GoogleTokenResponse> {
  const { clientId, clientSecret } = requireGoogleCredentials();
  const body = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: googleRedirectUri(),
    grant_type: "authorization_code",
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`Google token exchange failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as GoogleTokenResponse;
}

export async function refreshGoogleAccessToken(refreshToken: string): Promise<GoogleTokenResponse> {
  const { clientId, clientSecret } = requireGoogleCredentials();
  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`Google token refresh failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as GoogleTokenResponse;
}

export type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
};

export async function fetchGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
  const res = await fetch(USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    throw new Error(`Google userinfo failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as GoogleUserInfo;
}

export async function handleGoogleCallback(
  creatorId: string,
  code: string,
): Promise<{ email: string; name?: string }> {
  const tokens = await exchangeGoogleCode(code);
  if (!tokens.refresh_token) {
    throw new Error(
      "Google did not return a refresh_token. Revoke access at https://myaccount.google.com/permissions and reconnect.",
    );
  }
  const profile = await fetchGoogleUserInfo(tokens.access_token);
  const scopes = tokens.scope.split(" ").filter(Boolean);
  await saveGoogleConnection(creatorId, {
    email: profile.email,
    name: profile.name,
    scopes,
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresInSeconds: tokens.expires_in,
  });
  return { email: profile.email, name: profile.name };
}

/**
 * Ensure the creator has a fresh access token, refreshing if needed.
 * Returns the decrypted access token and the creator record.
 */
export async function ensureFreshGoogleToken(creatorId: string): Promise<string> {
  const creator = await findCreatorById(creatorId);
  if (!creator?.google) throw new Error("Creator has not connected Gmail");

  const expiresAt = new Date(creator.google.tokenExpiresAt).getTime();
  if (expiresAt > Date.now() + 60_000) {
    return decryptToken(creator.google.encryptedAccessToken);
  }
  const refreshToken = decryptToken(creator.google.encryptedRefreshToken);
  const refreshed = await refreshGoogleAccessToken(refreshToken);
  await updateGoogleAccessToken(creatorId, refreshed.access_token, refreshed.expires_in);
  return refreshed.access_token;
}

/**
 * Send an email from the creator's Gmail account. Requires `gmail.send` scope.
 */
export async function sendViaCreatorGmail(
  creatorId: string,
  input: { to: string; subject: string; html: string; text: string },
): Promise<{ id: string; threadId: string }> {
  const accessToken = await ensureFreshGoogleToken(creatorId);
  const creator = await findCreatorById(creatorId);
  if (!creator?.google) throw new Error("Creator has not connected Gmail");

  const rfc822 = buildRfc822({
    from: creator.google.name
      ? `${creator.google.name} <${creator.google.email}>`
      : creator.google.email,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
  const raw = toBase64Url(rfc822);

  const res = await fetch(GMAIL_SEND_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) {
    throw new Error(`Gmail send failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as { id: string; threadId: string };
}

function buildRfc822(args: {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}): string {
  const boundary = `nc_${Math.random().toString(36).slice(2)}`;
  const subject = encodeHeader(args.subject);
  return [
    `From: ${args.from}`,
    `To: ${args.to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    args.text,
    "",
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 7bit",
    "",
    args.html,
    "",
    `--${boundary}--`,
  ].join("\r\n");
}

// RFC 2047 encoded-word so non-ASCII subjects don't break.
function encodeHeader(s: string): string {
  const ascii = /^[\x20-\x7E]*$/.test(s);
  if (ascii) return s;
  const b64 = Buffer.from(s, "utf8").toString("base64");
  return `=?UTF-8?B?${b64}?=`;
}

function toBase64Url(input: string): string {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
