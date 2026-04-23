import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { handleGoogleCallback, handleGoogleSignInOrSignup } from "@/lib/google";
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
  const kind = session.googleFlowKind ?? (session.creatorId ? "connect" : "auth");
  const returnTo = session.googleReturnTo ?? null;

  const errorTarget = returnTo ?? (kind === "auth" ? "/" : "/dashboard");
  const successTarget = returnTo ?? (kind === "auth" ? "/dashboard" : "/dashboard");

  if (error) {
    return redirect(errorTarget, base, { gmail_error: errorDescription ?? error });
  }
  if (!code || !state) {
    return redirect(errorTarget, base, { gmail_error: "missing_code" });
  }
  if (!session.googleOauthState || session.googleOauthState !== state) {
    return redirect(errorTarget, base, { gmail_error: "state_mismatch" });
  }

  try {
    if (kind === "auth") {
      const { creatorId, email, created } = await handleGoogleSignInOrSignup(code);
      session.creatorId = creatorId;
      session.email = email;
      session.googleOauthState = undefined;
      session.googleFlowKind = undefined;
      session.googleReturnTo = undefined;
      await session.save();
      return redirect(successTarget, base, {
        gmail: "connected",
        ...(created ? { welcome: "1" } : {}),
      });
    }

    if (!session.creatorId) {
      return redirect("/", base, { gmail_error: "not_signed_in" });
    }
    await handleGoogleCallback(session.creatorId, code);
    session.googleOauthState = undefined;
    session.googleFlowKind = undefined;
    session.googleReturnTo = undefined;
    await session.save();
    return redirect(successTarget, base, { gmail: "connected" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    return redirect(errorTarget, base, { gmail_error: message });
  }
}

function redirect(target: string, base: string, query: Record<string, string>) {
  const url = new URL(target, base);
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v);
  return NextResponse.redirect(url);
}
