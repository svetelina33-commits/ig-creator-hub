import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { env } from "./env";

export type SessionData = {
  creatorId?: string;
  email?: string;
  oauthState?: string;
  oauthVerifier?: string;
  googleOauthState?: string;
  googleFlowKind?: "connect" | "auth";
  googleReturnTo?: string;
};

function sessionOptions(): SessionOptions {
  return {
    password: env().SESSION_SECRET,
    cookieName: "ig_creator_hub_session",
    cookieOptions: {
      httpOnly: true,
      sameSite: "lax",
      secure: env().APP_BASE_URL.startsWith("https://"),
      path: "/",
    },
  };
}

export async function getSession() {
  const jar = await cookies();
  return getIronSession<SessionData>(jar, sessionOptions());
}
