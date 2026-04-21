import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { handleGoogleCallback } from "@/lib/google";
import { env } from "@/lib/env";

export async function GET(req: NextRequest) {
  const base = env().APP_BASE_URL;
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorDescription =
    url.searchParams.get("error_description") ?? url.searchParams.get("error_reason");

  const session = await getSession();

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?gmail_error=${encodeURIComponent(errorDescription ?? error)}`, base),
    );
  }
  if (!code || !state) {
    return NextResponse.redirect(new URL(`/dashboard?gmail_error=missing_code`, base));
  }
  if (!session.creatorId) {
    return NextResponse.redirect(new URL(`/?gmail_error=not_signed_in`, base));
  }
  if (!session.googleOauthState || session.googleOauthState !== state) {
    return NextResponse.redirect(new URL(`/dashboard?gmail_error=state_mismatch`, base));
  }

  try {
    await handleGoogleCallback(session.creatorId, code);
    session.googleOauthState = undefined;
    await session.save();
    return NextResponse.redirect(new URL(`/dashboard?gmail=connected`, base));
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.redirect(
      new URL(`/dashboard?gmail_error=${encodeURIComponent(message)}`, base),
    );
  }
}
