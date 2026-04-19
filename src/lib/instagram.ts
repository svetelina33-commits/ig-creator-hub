import { redirectUri, requireInstagramCredentials, env } from "./env";

// Endpoints for "Instagram API with Instagram Login" (direct Instagram OAuth).
const AUTHORIZE_URL = "https://www.instagram.com/oauth/authorize";
const SHORT_TOKEN_URL = "https://api.instagram.com/oauth/access_token";
const LONG_TOKEN_URL = "https://graph.instagram.com/access_token";
const GRAPH_BASE = "https://graph.instagram.com";

export function buildAuthorizeUrl(state: string): string {
  const { appId } = requireInstagramCredentials();
  const params = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri(),
    response_type: "code",
    scope: env().IG_SCOPES,
    state,
  });
  return `${AUTHORIZE_URL}?${params.toString()}`;
}

export type ShortTokenResponse = {
  access_token: string;
  user_id: string | number;
  permissions?: string[];
};

export async function exchangeCodeForShortToken(code: string): Promise<ShortTokenResponse> {
  const { appId, appSecret } = requireInstagramCredentials();
  const body = new URLSearchParams({
    client_id: appId,
    client_secret: appSecret,
    grant_type: "authorization_code",
    redirect_uri: redirectUri(),
    code,
  });
  const res = await fetch(SHORT_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) {
    throw new Error(`IG short token exchange failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as ShortTokenResponse;
}

export type LongTokenResponse = {
  access_token: string;
  token_type: "bearer";
  expires_in: number; // seconds, typically ~5,184,000 (60 days)
};

export async function exchangeForLongLivedToken(shortToken: string): Promise<LongTokenResponse> {
  const { appSecret } = requireInstagramCredentials();
  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: appSecret,
    access_token: shortToken,
  });
  const res = await fetch(`${LONG_TOKEN_URL}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`IG long token exchange failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as LongTokenResponse;
}

export async function refreshLongLivedToken(currentToken: string): Promise<LongTokenResponse> {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: currentToken,
  });
  const res = await fetch(`${GRAPH_BASE}/refresh_access_token?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`IG token refresh failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as LongTokenResponse;
}

export type IGProfile = {
  id: string;
  username: string;
  account_type?: string;
  name?: string;
};

export async function fetchMe(accessToken: string): Promise<IGProfile> {
  const params = new URLSearchParams({
    fields: "id,username,account_type,name",
    access_token: accessToken,
  });
  const res = await fetch(`${GRAPH_BASE}/me?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`IG profile fetch failed: ${res.status} ${await res.text()}`);
  }
  return (await res.json()) as IGProfile;
}
