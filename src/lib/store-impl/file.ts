import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { encryptToken } from "../crypto";
import type {
  ApplicationRecord,
  CampaignRecord,
  CampaignStatus,
  CreateCampaignInput,
  CreatorProfile,
  CreatorRecord,
  MessageRecord,
  StoreBackend,
} from "./types";
import { SEED_CAMPAIGNS, slugify } from "./seed";

const DATA_DIR = path.join(process.cwd(), ".data");
const DB_FILE = path.join(DATA_DIR, "nexus.json");

type DB = {
  creators: CreatorRecord[];
  campaigns: CampaignRecord[];
  applications: ApplicationRecord[];
  messages: MessageRecord[];
};

async function readDb(): Promise<DB> {
  try {
    const raw = await fs.readFile(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<DB>;
    return {
      creators: parsed.creators ?? [],
      campaigns: parsed.campaigns ?? SEED_CAMPAIGNS,
      applications: parsed.applications ?? [],
      messages: parsed.messages ?? [],
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return { creators: [], campaigns: SEED_CAMPAIGNS, applications: [], messages: [] };
    }
    throw err;
  }
}

async function writeDb(db: DB): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export const fileStore: StoreBackend = {
  async findCreatorByEmail(email) {
    const db = await readDb();
    return db.creators.find((c) => c.email.toLowerCase() === email.toLowerCase()) ?? null;
  },
  async findCreatorById(id) {
    const db = await readDb();
    return db.creators.find((c) => c.id === id) ?? null;
  },
  async findCreatorByProfileSlug(slug) {
    const db = await readDb();
    return (
      db.creators.find((c) => c.profile?.slug === slug && c.profile?.isPublic) ?? null
    );
  },
  async listPublicCreators() {
    const db = await readDb();
    return db.creators
      .filter((c) => c.profile?.isPublic)
      .sort(
        (a, b) =>
          new Date(b.profile!.updatedAt).getTime() -
          new Date(a.profile!.updatedAt).getTime(),
      );
  },
  async updateCreatorProfile(creatorId, profile: CreatorProfile) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) throw new Error("Creator not found");
    db.creators[idx].profile = profile;
    await writeDb(db);
  },
  async createCreator(email, passwordHash) {
    const db = await readDb();
    const existing = db.creators.find(
      (c) => c.email.toLowerCase() === email.toLowerCase(),
    );
    if (existing) return existing;
    const record: CreatorRecord = {
      id: randomUUID(),
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    db.creators.push(record);
    await writeDb(db);
    return record;
  },
  async setCreatorPasswordHash(creatorId, passwordHash) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) throw new Error("Creator not found");
    db.creators[idx].passwordHash = passwordHash;
    delete db.creators[idx].passwordReset;
    await writeDb(db);
  },
  async setPasswordResetToken(creatorId, tokenHash, ttlSeconds) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) throw new Error("Creator not found");
    db.creators[idx].passwordReset = {
      tokenHash,
      expiresAt: new Date(Date.now() + ttlSeconds * 1000).toISOString(),
    };
    await writeDb(db);
  },
  async findCreatorByResetToken(tokenHash) {
    const db = await readDb();
    const now = Date.now();
    return (
      db.creators.find(
        (c) =>
          c.passwordReset?.tokenHash === tokenHash &&
          new Date(c.passwordReset.expiresAt).getTime() > now,
      ) ?? null
    );
  },
  async listCreators() {
    const db = await readDb();
    return [...db.creators].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  },
  async listCreatorsWithExpiringTokens(withinDays) {
    const db = await readDb();
    const cutoff = Date.now() + withinDays * 86400 * 1000;
    return db.creators.filter(
      (c) =>
        c.instagram?.tokenExpiresAt &&
        new Date(c.instagram.tokenExpiresAt).getTime() <= cutoff,
    );
  },
  async saveInstagramConnection(creatorId, data) {
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
  },
  async updateInstagramToken(creatorId, accessToken, expiresInSeconds) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1 || !db.creators[idx].instagram) return;
    db.creators[idx].instagram!.encryptedAccessToken = encryptToken(accessToken);
    db.creators[idx].instagram!.tokenExpiresAt = new Date(
      Date.now() + expiresInSeconds * 1000,
    ).toISOString();
    await writeDb(db);
  },
  async disconnectInstagram(creatorId) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) return;
    delete db.creators[idx].instagram;
    await writeDb(db);
  },
  async saveGoogleConnection(creatorId, data) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) throw new Error("Creator not found");
    db.creators[idx].google = {
      email: data.email,
      name: data.name,
      scopes: data.scopes,
      encryptedRefreshToken: data.refreshToken ? encryptToken(data.refreshToken) : null,
      encryptedAccessToken: data.accessToken ? encryptToken(data.accessToken) : null,
      tokenExpiresAt:
        data.expiresInSeconds != null
          ? new Date(Date.now() + data.expiresInSeconds * 1000).toISOString()
          : null,
      connectedAt: new Date().toISOString(),
    };
    await writeDb(db);
  },
  async updateGoogleAccessToken(creatorId, accessToken, expiresInSeconds) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1 || !db.creators[idx].google) return;
    db.creators[idx].google!.encryptedAccessToken = encryptToken(accessToken);
    db.creators[idx].google!.tokenExpiresAt = new Date(
      Date.now() + expiresInSeconds * 1000,
    ).toISOString();
    await writeDb(db);
  },
  async disconnectGoogle(creatorId) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) return;
    delete db.creators[idx].google;
    await writeDb(db);
  },
  async addGoogleDelegate(creatorId, email) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1 || !db.creators[idx].google) throw new Error("Gmail not connected");
    const normalized = email.trim().toLowerCase();
    const existing = db.creators[idx].google!.delegates ?? [];
    if (existing.some((d) => d.email === normalized)) {
      await writeDb(db);
      return;
    }
    db.creators[idx].google!.delegates = [
      ...existing,
      { email: normalized, invitedAt: new Date().toISOString() },
    ];
    await writeDb(db);
  },
  async removeGoogleDelegate(creatorId, email) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1 || !db.creators[idx].google) return;
    const normalized = email.trim().toLowerCase();
    db.creators[idx].google!.delegates = (db.creators[idx].google!.delegates ?? []).filter(
      (d) => d.email !== normalized,
    );
    await writeDb(db);
  },
  async savePayoutMethod(creatorId, data) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) throw new Error("Creator not found");
    db.creators[idx].payout = {
      kind: data.kind,
      label: data.label,
      detailsPublic: data.detailsPublic,
      connectedAt: new Date().toISOString(),
    };
    await writeDb(db);
  },
  async disconnectPayoutMethod(creatorId) {
    const db = await readDb();
    const idx = db.creators.findIndex((c) => c.id === creatorId);
    if (idx === -1) return;
    delete db.creators[idx].payout;
    await writeDb(db);
  },
  async createWithdrawalRequest(_input) {
    // The file store has no withdrawal_requests table; only the Postgres backend persists requests.
    return { id: `wdr_${randomUUID().slice(0, 8)}` };
  },
  async listCampaigns(filter) {
    const db = await readDb();
    const all = [...db.campaigns].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (!filter?.status) return all;
    return all.filter((c) => c.status === filter.status);
  },
  async findCampaignById(id) {
    const db = await readDb();
    return db.campaigns.find((c) => c.id === id) ?? null;
  },
  async findCampaignsByIds(ids) {
    if (ids.length === 0) return [];
    const db = await readDb();
    const set = new Set(ids);
    return db.campaigns.filter((c) => set.has(c.id));
  },
  async findCampaignBySlug(slug) {
    const db = await readDb();
    return db.campaigns.find((c) => c.slug === slug) ?? null;
  },
  async createCampaign(input: CreateCampaignInput) {
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
  },
  async createCampaignRequest(input) {
    const db = await readDb();
    const baseSlug = slugify(`${input.brand}-${input.title}`);
    let slug = baseSlug;
    let suffix = 2;
    while (db.campaigns.some((c) => c.slug === slug)) {
      slug = `${baseSlug}-${suffix++}`;
    }
    const now = new Date().toISOString();
    const record: CampaignRecord = {
      id: `cmp_${randomUUID().slice(0, 8)}`,
      slug,
      title: input.title,
      brand: input.brand,
      tagline: input.tagline,
      brief: input.brief,
      payoutCents: input.payoutCents,
      currency: input.currency,
      deadline: input.deadline,
      deliverables: input.deliverables,
      status: "requested",
      coverTone: input.coverTone,
      createdAt: now,
      requestedByCreatorId: input.creatorId,
      requestedAt: now,
      requestNote: input.requestNote,
    };
    db.campaigns.push(record);
    await writeDb(db);
    return record;
  },
  async updateCampaignStatus(id, status: CampaignStatus) {
    const db = await readDb();
    const idx = db.campaigns.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Campaign not found");
    db.campaigns[idx].status = status;
    await writeDb(db);
  },
  async listApplicationsForCampaign(campaignId) {
    const db = await readDb();
    return db.applications
      .filter((a) => a.campaignId === campaignId)
      .sort(
        (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
      );
  },
  async listApplicationsForCreator(creatorId) {
    const db = await readDb();
    return db.applications
      .filter((a) => a.creatorId === creatorId)
      .sort(
        (a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
      );
  },
  async findApplication(creatorId, campaignId) {
    const db = await readDb();
    return (
      db.applications.find(
        (a) => a.creatorId === creatorId && a.campaignId === campaignId,
      ) ?? null
    );
  },
  async findApplicationById(id) {
    const db = await readDb();
    return db.applications.find((a) => a.id === id) ?? null;
  },
  async createApplication(input) {
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
      paidAt: null,
      paidAmountCents: null,
    };
    db.applications.push(record);
    await writeDb(db);
    return record;
  },
  async decideApplication(id, decision) {
    const db = await readDb();
    const idx = db.applications.findIndex((a) => a.id === id);
    if (idx === -1) throw new Error("Application not found");
    db.applications[idx].status = decision;
    db.applications[idx].decidedAt = new Date().toISOString();
    await writeDb(db);
  },
  async listMessagesForApplication(applicationId) {
    const db = await readDb();
    return db.messages
      .filter((m) => m.applicationId === applicationId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },
  async createMessage(input) {
    const db = await readDb();
    const record: MessageRecord = {
      id: `msg_${randomUUID().slice(0, 8)}`,
      applicationId: input.applicationId,
      role: input.role,
      authorEmail: input.authorEmail,
      body: input.body,
      createdAt: new Date().toISOString(),
    };
    db.messages.push(record);
    await writeDb(db);
    return record;
  },
};
