#!/usr/bin/env node
// One-shot: wipe all campaigns (and related applications) that are NOT
// in the Nexus Club niche roster, then re-run the seed INSERT. Idempotent.
//
// Usage: node scripts/reset-campaigns.mjs

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  const env = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
} catch {}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing. Abort.");
  process.exit(1);
}

const sql = neon(url);

const KEEP_IDS = [
  "cmp_niche_01",
  "cmp_niche_02",
  "cmp_niche_03",
  "cmp_niche_04",
  "cmp_niche_05",
  "cmp_niche_06",
  "cmp_niche_07",
  "cmp_niche_08",
  "cmp_niche_09",
  "cmp_niche_10",
  "cmp_niche_11",
  "cmp_niche_12",
  "cmp_niche_13",
  "cmp_niche_14",
  "cmp_niche_15",
];

const [beforeCamps] = await sql`SELECT COUNT(*)::int AS n FROM campaigns`;
const [beforeApps] = await sql`SELECT COUNT(*)::int AS n FROM applications`;

// Delete related rows first to avoid FK violations.
const placeholders = KEEP_IDS.map((_, i) => `$${i + 1}`).join(", ");
await sql.query(
  `DELETE FROM applications WHERE campaign_id NOT IN (${placeholders})`,
  KEEP_IDS,
);
await sql.query(
  `DELETE FROM campaigns WHERE id NOT IN (${placeholders})`,
  KEEP_IDS,
);

// Re-run schema.sql's campaign INSERT so the 15 rows exist.
const schemaPath = join(__dirname, "..", "src", "lib", "store-impl", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");
const cleaned = schema
  .split("\n")
  .filter((l) => !l.trim().startsWith("--"))
  .join("\n");
const statements = cleaned
  .split(/;(?=\s*(?:CREATE|INSERT|DROP|ALTER|$))/)
  .map((s) => s.trim())
  .filter(Boolean);

for (const stmt of statements) {
  if (!stmt.toUpperCase().includes("INSERT INTO CAMPAIGNS")) continue;
  await sql.query(stmt);
}

const [afterCamps] = await sql`SELECT COUNT(*)::int AS n FROM campaigns`;
const [afterApps] = await sql`SELECT COUNT(*)::int AS n FROM applications`;

console.log(`campaigns:   ${beforeCamps.n} → ${afterCamps.n}`);
console.log(`applications: ${beforeApps.n} → ${afterApps.n}`);
