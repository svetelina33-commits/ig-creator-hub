import { NextRequest, NextResponse } from "next/server";
import {
  decryptCreatorToken,
  listCreatorsWithExpiringTokens,
  updateInstagramToken,
} from "@/lib/store";
import { refreshLongLivedToken } from "@/lib/instagram";
import { env } from "@/lib/env";

export async function GET(req: NextRequest) {
  // Vercel Cron includes an Authorization: Bearer $CRON_SECRET header when CRON_SECRET is set.
  // We accept either that header, or a same-origin request without a secret configured.
  const secret = env().CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  }

  const candidates = await listCreatorsWithExpiringTokens(14);
  const results: Array<{ creatorId: string; ok: boolean; reason?: string }> = [];

  for (const creator of candidates) {
    if (!creator.instagram) continue;
    try {
      const currentToken = decryptCreatorToken(creator);
      if (!currentToken) {
        results.push({ creatorId: creator.id, ok: false, reason: "no_token" });
        continue;
      }
      const refreshed = await refreshLongLivedToken(currentToken);
      await updateInstagramToken(creator.id, refreshed.access_token, refreshed.expires_in);
      results.push({ creatorId: creator.id, ok: true });
    } catch (err) {
      const reason = err instanceof Error ? err.message : "unknown";
      results.push({ creatorId: creator.id, ok: false, reason });
    }
  }

  return NextResponse.json({
    ranAt: new Date().toISOString(),
    checked: candidates.length,
    refreshed: results.filter((r) => r.ok).length,
    failures: results.filter((r) => !r.ok),
  });
}
