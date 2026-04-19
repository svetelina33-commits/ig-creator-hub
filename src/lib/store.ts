import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { encryptToken, decryptToken } from "./crypto";

// File-based store for local dev. Swap for Postgres/Neon in production.
const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "creators.json");

export type CreatorRecord = {
  id: string;
  email: string;
  createdAt: string;
  instagram?: {
    igUserId: string;
    username: string;
    accountType?: string;
    encryptedAccessToken: string;
    tokenExpiresAt: string | null;
    connectedAt: string;
  };
};

type DB = { creators: CreatorRecord[] };

async function readDb(): Promise<DB> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    return JSON.parse(raw) as DB;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return { creators: [] };
    throw err;
  }
}

async function writeDb(db: DB): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export async function findCreatorByEmail(email: string): Promise<CreatorRecord | null> {
  const db = await readDb();
  return db.creators.find((c) => c.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function findCreatorById(id: string): Promise<CreatorRecord | null> {
  const db = await readDb();
  return db.creators.find((c) => c.id === id) ?? null;
}

export async function createCreator(email: string): Promise<CreatorRecord> {
  const existing = await findCreatorByEmail(email);
  if (existing) return existing;
  const record: CreatorRecord = {
    id: randomUUID(),
    email,
    createdAt: new Date().toISOString(),
  };
  const db = await readDb();
  db.creators.push(record);
  await writeDb(db);
  return record;
}

export async function saveInstagramConnection(
  creatorId: string,
  data: {
    igUserId: string;
    username: string;
    accountType?: string;
    accessToken: string;
    expiresInSeconds: number | null;
  },
): Promise<void> {
  const db = await readDb();
  const idx = db.creators.findIndex((c) => c.id === creatorId);
  if (idx === -1) throw new Error("Creator not found");
  db.creators[idx].instagram = {
    igUserId: data.igUserId,
    username: data.username,
    accountType: data.accountType,
    encryptedAccessToken: encryptToken(data.accessToken),
    tokenExpiresAt: data.expiresInSeconds
      ? new Date(Date.now() + data.expiresInSeconds * 1000).toISOString()
      : null,
    connectedAt: new Date().toISOString(),
  };
  await writeDb(db);
}

export async function disconnectInstagram(creatorId: string): Promise<void> {
  const db = await readDb();
  const idx = db.creators.findIndex((c) => c.id === creatorId);
  if (idx === -1) return;
  delete db.creators[idx].instagram;
  await writeDb(db);
}

export function decryptCreatorToken(creator: CreatorRecord): string | null {
  if (!creator.instagram) return null;
  return decryptToken(creator.instagram.encryptedAccessToken);
}
