export type CreatorRecord = {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: string;
  passwordReset?: {
    tokenHash: string;
    expiresAt: string;
  };
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

export interface StoreBackend {
  findCreatorByEmail(email: string): Promise<CreatorRecord | null>;
  findCreatorById(id: string): Promise<CreatorRecord | null>;
  createCreator(email: string, passwordHash: string | null): Promise<CreatorRecord>;
  setCreatorPasswordHash(creatorId: string, passwordHash: string): Promise<void>;
  setPasswordResetToken(
    creatorId: string,
    tokenHash: string,
    ttlSeconds: number,
  ): Promise<void>;
  findCreatorByResetToken(tokenHash: string): Promise<CreatorRecord | null>;
  listCreators(): Promise<CreatorRecord[]>;
  listCreatorsWithExpiringTokens(withinDays: number): Promise<CreatorRecord[]>;
  saveInstagramConnection(
    creatorId: string,
    data: {
      igUserId: string;
      username: string;
      accountType?: string;
      accessToken: string;
      expiresInSeconds: number | null;
    },
  ): Promise<void>;
  updateInstagramToken(
    creatorId: string,
    accessToken: string,
    expiresInSeconds: number,
  ): Promise<void>;
  disconnectInstagram(creatorId: string): Promise<void>;

  listCampaigns(filter?: { status?: CampaignStatus }): Promise<CampaignRecord[]>;
  findCampaignById(id: string): Promise<CampaignRecord | null>;
  findCampaignBySlug(slug: string): Promise<CampaignRecord | null>;
  createCampaign(input: CreateCampaignInput): Promise<CampaignRecord>;
  updateCampaignStatus(id: string, status: CampaignStatus): Promise<void>;

  listApplicationsForCampaign(campaignId: string): Promise<ApplicationRecord[]>;
  listApplicationsForCreator(creatorId: string): Promise<ApplicationRecord[]>;
  findApplication(creatorId: string, campaignId: string): Promise<ApplicationRecord | null>;
  findApplicationById(id: string): Promise<ApplicationRecord | null>;
  createApplication(input: {
    creatorId: string;
    campaignId: string;
    note: string;
  }): Promise<ApplicationRecord>;
  decideApplication(
    id: string,
    decision: Exclude<ApplicationStatus, "pending">,
  ): Promise<void>;
}
