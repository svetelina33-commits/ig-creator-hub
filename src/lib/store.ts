import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { encryptToken, decryptToken } from "./crypto";

// File-based store for local dev. Swap for Postgres/Neon in production.
const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "nexus.json");

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

export type CampaignStatus = "draft" | "open" | "closed";
export type Deliverable = { kind: "post" | "reel" | "story"; count: number };

export type CampaignRecord = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  tagline: string;
  brief: string;
  payoutCents: number;
  currency: "USD" | "EUR" | "GBP";
  deadline: string | null;
  deliverables: Deliverable[];
  status: CampaignStatus;
  coverTone: "forest" | "vermillion" | "ochre" | "ink";
  createdAt: string;
};

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type ApplicationRecord = {
  id: string;
  creatorId: string;
  campaignId: string;
  status: ApplicationStatus;
  note: string;
  appliedAt: string;
  decidedAt: string | null;
};

type DB = {
  creators: CreatorRecord[];
  campaigns: CampaignRecord[];
  applications: ApplicationRecord[];
};

const SEED_CAMPAIGNS: CampaignRecord[] = [
  {
    id: "cmp_seed_01",
    slug: "maison-ophir-fw26",
    title: "Autumn Dossier",
    brand: "Maison Ophir",
    tagline: "A quiet luxury edit for the cold months.",
    brief:
      "We're looking for three creators with a distinct, editorial point-of-view to feature the Maison Ophir FW26 capsule. One carousel post and one Reel, shot in natural light. Styling freedom within our moodboard.",
    payoutCents: 180000,
    currency: "USD",
    deadline: "2026-05-20",
    deliverables: [
      { kind: "post", count: 1 },
      { kind: "reel", count: 1 },
    ],
    status: "open",
    coverTone: "forest",
    createdAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "cmp_seed_02",
    slug: "helia-vol-02",
    title: "Volume 02",
    brand: "Helia",
    tagline: "Slow mornings. Warm rituals. A product story.",
    brief:
      "A single 60–90 second Reel narrating your morning ritual with our new ceramic pour-over. We license the footage for 90 days across Helia's channels.",
    payoutCents: 85000,
    currency: "USD",
    deadline: "2026-05-02",
    deliverables: [{ kind: "reel", count: 1 }],
    status: "open",
    coverTone: "ochre",
    createdAt: "2026-04-14T10:30:00.000Z",
  },
  {
    id: "cmp_seed_03",
    slug: "folio-press-launch",
    title: "Folio Press — launch week",
    brand: "Folio Press",
    tagline: "An independent bookshop, now online.",
    brief:
      "Help us open the doors. One Story set (minimum 6 frames) on launch day and one carousel post within the first week. Genuine voice required — we review portfolios.",
    payoutCents: 60000,
    currency: "USD",
    deadline: "2026-05-30",
    deliverables: [
      { kind: "story", count: 6 },
      { kind: "post", count: 1 },
    ],
    status: "open",
    coverTone: "vermillion",
    createdAt: "2026-04-18T08:15:00.000Z",
  },
];

async function readDb(): Promise<DB> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<DB>;
    return {
      creators: parsed.creators ?? [],
      campaigns: parsed.campaigns ?? SEED_CAMPAIGNS,
      applications: parsed.applications ?? [],
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return { creators: [], campaigns: SEED_CAMPAIGNS, applications: [] };
    }
    throw err;
  }
}

async function writeDb(db: DB): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

// ---------- Creators ----------

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

// ---------- Campaigns ----------

export async function listCampaigns(filter?: { status?: CampaignStatus }): Promise<CampaignRecord[]> {
  const db = await readDb();
  const all = [...db.campaigns].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  if (!filter?.status) return all;
  return all.filter((c) => c.status === filter.status);
}

export async function findCampaignById(id: string): Promise<CampaignRecord | null> {
  const db = await readDb();
  return db.campaigns.find((c) => c.id === id) ?? null;
}

export async function findCampaignBySlug(slug: string): Promise<CampaignRecord | null> {
  const db = await readDb();
  return db.campaigns.find((c) => c.slug === slug) ?? null;
}

export type CreateCampaignInput = {
  title: string;
  brand: string;
  tagline: string;
  brief: string;
  payoutCents: number;
  currency: CampaignRecord["currency"];
  deadline: string | null;
  deliverables: Deliverable[];
  status: CampaignStatus;
  coverTone: CampaignRecord["coverTone"];
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
}

export async function createCampaign(input: CreateCampaignInput): Promise<CampaignRecord> {
  const db = await readDb();
  const baseSlug = slugify(`${input.brand}-${input.title}`);
  let slug = baseSlug;
  let suffix = 2;
  while (db.campaigns.some((c) => c.slug === slug)) {
    slug = `${baseSlug}-${suffix++}`;
  }
  const record: CampaignRecord = {
    id: `cmp_${randomUUID().slice(0, 8)}`,
    slug,
    ...input,
    createdAt: new Date().toISOString(),
  };
  db.campaigns.push(record);
  await writeDb(db);
  return record;
}

export async function updateCampaignStatus(id: string, status: CampaignStatus): Promise<void> {
  const db = await readDb();
  const idx = db.campaigns.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Campaign not found");
  db.campaigns[idx].status = status;
  await writeDb(db);
}

// ---------- Applications ----------

export async function listApplicationsForCampaign(campaignId: string): Promise<ApplicationRecord[]> {
  const db = await readDb();
  return db.applications
    .filter((a) => a.campaignId === campaignId)
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
}

export async function listApplicationsForCreator(creatorId: string): Promise<ApplicationRecord[]> {
  const db = await readDb();
  return db.applications
    .filter((a) => a.creatorId === creatorId)
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());
}

export async function findApplication(
  creatorId: string,
  campaignId: string,
): Promise<ApplicationRecord | null> {
  const db = await readDb();
  return (
    db.applications.find((a) => a.creatorId === creatorId && a.campaignId === campaignId) ?? null
  );
}

export async function createApplication(input: {
  creatorId: string;
  campaignId: string;
  note: string;
}): Promise<ApplicationRecord> {
  const db = await readDb();
  const existing = db.applications.find(
    (a) => a.creatorId === input.creatorId && a.campaignId === input.campaignId,
  );
  if (existing) return existing;
  const record: ApplicationRecord = {
    id: `app_${randomUUID().slice(0, 8)}`,
    creatorId: input.creatorId,
    campaignId: input.campaignId,
    status: "pending",
    note: input.note,
    appliedAt: new Date().toISOString(),
    decidedAt: null,
  };
  db.applications.push(record);
  await writeDb(db);
  return record;
}

export async function decideApplication(
  id: string,
  decision: Extract<ApplicationStatus, "approved" | "rejected">,
): Promise<void> {
  const db = await readDb();
  const idx = db.applications.findIndex((a) => a.id === id);
  if (idx === -1) throw new Error("Application not found");
  db.applications[idx].status = decision;
  db.applications[idx].decidedAt = new Date().toISOString();
  await writeDb(db);
}

// ---------- Formatting helpers ----------

export function formatMoney(cents: number, currency: CampaignRecord["currency"]): string {
  const symbols = { USD: "$", EUR: "€", GBP: "£" } as const;
  const whole = Math.floor(cents / 100);
  return `${symbols[currency]}${whole.toLocaleString("en-US")}`;
}
