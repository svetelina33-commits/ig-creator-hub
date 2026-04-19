import { decryptToken } from "./crypto";
import { fileStore } from "./store-impl/file";
import type { CreatorRecord, StoreBackend } from "./store-impl/types";

// Re-export all public types so existing imports keep working.
export type {
  CreatorRecord,
  CampaignStatus,
  Deliverable,
  CampaignRecord,
  ApplicationStatus,
  ApplicationRecord,
  CreateCampaignInput,
  StoreBackend,
} from "./store-impl/types";

// ---------- Backend selector ----------

let backendPromise: Promise<StoreBackend> | null = null;

function getBackend(): Promise<StoreBackend> {
  if (backendPromise) return backendPromise;
  if (process.env.DATABASE_URL) {
    backendPromise = import("./store-impl/pg").then((m) => m.pgStore);
  } else {
    backendPromise = Promise.resolve(fileStore);
  }
  return backendPromise;
}

// ---------- Public API ----------

export async function findCreatorByEmail(email: string) {
  return (await getBackend()).findCreatorByEmail(email);
}
export async function findCreatorById(id: string) {
  return (await getBackend()).findCreatorById(id);
}
export async function createCreator(email: string, passwordHash: string | null = null) {
  return (await getBackend()).createCreator(email, passwordHash);
}
export async function setCreatorPasswordHash(creatorId: string, passwordHash: string) {
  return (await getBackend()).setCreatorPasswordHash(creatorId, passwordHash);
}
export async function setPasswordResetToken(
  creatorId: string,
  tokenHash: string,
  ttlSeconds: number,
) {
  return (await getBackend()).setPasswordResetToken(creatorId, tokenHash, ttlSeconds);
}
export async function findCreatorByResetToken(tokenHash: string) {
  return (await getBackend()).findCreatorByResetToken(tokenHash);
}
export async function listCreators() {
  return (await getBackend()).listCreators();
}
export async function listCreatorsWithExpiringTokens(withinDays = 7) {
  return (await getBackend()).listCreatorsWithExpiringTokens(withinDays);
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
) {
  return (await getBackend()).saveInstagramConnection(creatorId, data);
}
export async function updateInstagramToken(
  creatorId: string,
  accessToken: string,
  expiresInSeconds: number,
) {
  return (await getBackend()).updateInstagramToken(creatorId, accessToken, expiresInSeconds);
}
export async function disconnectInstagram(creatorId: string) {
  return (await getBackend()).disconnectInstagram(creatorId);
}

export async function listCampaigns(filter?: { status?: "draft" | "open" | "closed" }) {
  return (await getBackend()).listCampaigns(filter);
}
export async function findCampaignById(id: string) {
  return (await getBackend()).findCampaignById(id);
}
export async function findCampaignBySlug(slug: string) {
  return (await getBackend()).findCampaignBySlug(slug);
}
export async function createCampaign(
  input: import("./store-impl/types").CreateCampaignInput,
) {
  return (await getBackend()).createCampaign(input);
}
export async function updateCampaignStatus(id: string, status: "draft" | "open" | "closed") {
  return (await getBackend()).updateCampaignStatus(id, status);
}

export async function listApplicationsForCampaign(campaignId: string) {
  return (await getBackend()).listApplicationsForCampaign(campaignId);
}
export async function listApplicationsForCreator(creatorId: string) {
  return (await getBackend()).listApplicationsForCreator(creatorId);
}
export async function findApplication(creatorId: string, campaignId: string) {
  return (await getBackend()).findApplication(creatorId, campaignId);
}
export async function findApplicationById(id: string) {
  return (await getBackend()).findApplicationById(id);
}
export async function createApplication(input: {
  creatorId: string;
  campaignId: string;
  note: string;
}) {
  return (await getBackend()).createApplication(input);
}
export async function decideApplication(
  id: string,
  decision: "approved" | "rejected",
) {
  return (await getBackend()).decideApplication(id, decision);
}

// ---------- Helpers ----------

export function decryptCreatorToken(creator: CreatorRecord): string | null {
  if (!creator.instagram) return null;
  return decryptToken(creator.instagram.encryptedAccessToken);
}

export function formatMoney(
  cents: number,
  currency: "USD" | "EUR" | "GBP",
): string {
  const symbols = { USD: "$", EUR: "€", GBP: "£" } as const;
  const whole = Math.floor(cents / 100);
  return `${symbols[currency]}${whole.toLocaleString("en-US")}`;
}
