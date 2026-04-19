import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getSession } from "@/lib/session";
import { buildAuthorizeUrl } from "@/lib/instagram";

export async function GET() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.redirect(new URL("/", process.env.APP_BASE_URL ?? "http://localhost:3000"));
  }
  const state = randomBytes(16).toString("hex");
  session.oauthState = state;
  await session.save();
  return NextResponse.redirect(buildAuthorizeUrl(state));
}
