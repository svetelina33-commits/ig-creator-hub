import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  exchangeCodeForShortToken,
  exchangeForLongLivedToken,
  fetchMe,
} from "@/lib/instagram";
import { saveInstagramConnection } from "@/lib/store";
import { env } from "@/lib/env";

export async function GET(req: NextRequest) {
  const base = env().APP_BASE_URL;
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");
  const errorReason = url.searchParams.get("error_reason") ?? url.searchParams.get("error_description");

  const session = await getSession();

  if (error) {
    return NextResponse.redirect(
      new URL(`/dashboard?ig_error=${encodeURIComponent(errorReason ?? error)}`, base),
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(new URL(`/dashboard?ig_error=missing_code`, base));
  }
  if (!session.creatorId) {
    return NextResponse.redirect(new URL(`/?ig_error=not_signed_in`, base));
  }
  if (!session.oauthState || session.oauthState !== state) {
    return NextResponse.redirect(new URL(`/dashboard?ig_error=state_mismatch`, base));
  }

  try {
    const shortToken = await exchangeCodeForShortToken(code);
    const longToken = await exchangeForLongLivedToken(shortToken.access_token);
    const profile = await fetchMe(longToken.access_token);

    await saveInstagramConnection(session.creatorId, {
      igUserId: profile.id,
      username: profile.username,
      accountType: profile.account_type,
      accessToken: longToken.access_token,
      expiresInSeconds: longToken.expires_in,
    });

    session.oauthState = undefined;
    await session.save();

    return NextResponse.redirect(new URL(`/dashboard?ig=connected`, base));
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return NextResponse.redirect(
      new URL(`/dashboard?ig_error=${encodeURIComponent(message)}`, base),
    );
  }
}
