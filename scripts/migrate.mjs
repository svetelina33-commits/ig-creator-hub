#!/usr/bin/env node
// Apply src/lib/store-impl/schema.sql against $DATABASE_URL.
// Usage: node scripts/migrate.mjs
// Requires DATABASE_URL in environment (loaded from .env.local automatically).

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local if present (minimal parser, no deps).
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
} catch {
  // no .env.local, fine
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Aborting.");
  process.exit(1);
}

const sql = neon(url);
const schemaPath = join(__dirname, "..", "src", "lib", "store-impl", "schema.sql");
const schema = readFileSync(schemaPath, "utf8");

// Strip line comments, split on statement boundaries.
const cleaned = schema
  .split("\n")
  .filter((l) => !l.trim().startsWith("--"))
  .join("\n");
const statements = cleaned
  .split(/;(?=\s*(?:CREATE|INSERT|DROP|ALTER|$))/)
  .map((s) => s.trim())
  .filter(Boolean);

let ok = 0;
let failed = 0;
for (const stmt of statements) {
  try {
    await sql.query(stmt);
    ok++;
  } catch (err) {
    failed++;
    console.error("fail:", stmt.slice(0, 80).replace(/\s+/g, " "));
    console.error("  →", err.message);
  }
}

const [creators] = await sql`SELECT COUNT(*)::int AS n FROM creators`;
const [campaigns] = await sql`SELECT COUNT(*)::int AS n FROM campaigns`;
const [applications] = await sql`SELECT COUNT(*)::int AS n FROM applications`;

console.log(`\nmigrations: ${ok} ok, ${failed} failed`);
console.log(
  `tables:     creators=${creators.n}  campaigns=${campaigns.n}  applications=${applications.n}`,
);
process.exit(failed > 0 ? 1 : 0);
