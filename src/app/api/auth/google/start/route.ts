import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSession } from "@/lib/session";
import { buildGoogleAuthorizeUrl } from "@/lib/google";
import { env } from "@/lib/env";

export async function GET() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.redirect(new URL("/", env().APP_BASE_URL));
  }
  const state = randomBytes(16).toString("hex");
  session.googleOauthState = state;
  await session.save();
  return NextResponse.redirect(buildGoogleAuthorizeUrl(state));
}
