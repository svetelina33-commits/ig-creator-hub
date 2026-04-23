import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSession } from "@/lib/session";
import { GOOGLE_BASIC_SCOPES, buildGoogleAuthorizeUrl } from "@/lib/google";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const scopeMode = url.searchParams.get("scope"); // "basic" | null
  const returnTo = url.searchParams.get("return_to");

  const session = await getSession();
  const state = randomBytes(16).toString("hex");
  session.googleOauthState = state;
  session.googleFlowKind = session.creatorId ? "connect" : "auth";
  session.googleReturnTo =
    returnTo && returnTo.startsWith("/") ? returnTo : undefined;
  await session.save();

  const basic = scopeMode === "basic";
  return NextResponse.redirect(
    buildGoogleAuthorizeUrl(state, {
      scopeOverride: basic ? GOOGLE_BASIC_SCOPES : undefined,
      lightweight: basic,
    }),
  );
}
