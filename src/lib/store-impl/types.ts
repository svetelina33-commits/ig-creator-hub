export type CreatorProfile = {
  slug: string;
  displayName: string;
  bio: string;
  city: string;
  niches: string[];
  portfolioLinks: { label: string; url: string }[];
  accent: "forest" | "vermillion" | "ochre" | "ink";
  isPublic: boolean;
  updatedAt: string;
};

export type CreatorRecord = {
  id: string;
  email: string;
  passwordHash: string | null;
  createdAt: string;
  profile?: CreatorProfile;
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
  google?: {
    email: string;
    name?: string;
    scopes: string[];
    encryptedRefreshToken: string | null;
    encryptedAccessToken: string | null;
    tokenExpiresAt: string | null;
    connectedAt: string;
    delegates?: GoogleDelegate[];
  };
  payout?: PayoutMethod;
};

export type PayoutMethod = {
  kind: "paypal" | "stripe" | "bank";
  label: string;
  connectedAt: string;
  detailsPublic: Record<string, string>;
};

export type GoogleDelegate = {
  email: string;
  invitedAt: string;
};

export type CampaignStatus = "draft" | "open" | "closed" | "requested";
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
  requestedByCreatorId?: string | null;
  requestedAt?: string | null;
  requestNote?: string | null;
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
  paidAt: string | null;
  paidAmountCents: number | null;
};

export type MessageRole = "editor" | "creator";
export type MessageRecord = {
  id: string;
  applicationId: string;
  role: MessageRole;
  authorEmail: string;
  body: string;
  createdAt: string;
};

export type SupportTicketStatus = "open" | "replied" | "resolved";

export type SupportAttachment = {
  url: string;
  pathname: string;
  name: string;
  contentType: string;
  size: number;
};

export type SupportTicketRecord = {
  id: string;
  creatorId: string;
  creatorEmail: string;
  subject: string;
  body: string;
  status: SupportTicketStatus;
  adminReply: string | null;
  attachments: SupportAttachment[];
  createdAt: string;
  repliedAt: string | null;
  resolvedAt: string | null;
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
  findCreatorByProfileSlug(slug: string): Promise<CreatorRecord | null>;
  listPublicCreators(): Promise<CreatorRecord[]>;
  updateCreatorProfile(creatorId: string, profile: CreatorProfile): Promise<void>;
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
  saveGoogleConnection(
    creatorId: string,
    data: {
      email: string;
      name?: string;
      scopes: string[];
      accessToken?: string | null;
      refreshToken?: string | null;
      expiresInSeconds?: number | null;
    },
  ): Promise<void>;
  updateGoogleAccessToken(
    creatorId: string,
    accessToken: string,
    expiresInSeconds: number,
  ): Promise<void>;
  disconnectGoogle(creatorId: string): Promise<void>;
  addGoogleDelegate(creatorId: string, email: string): Promise<void>;
  removeGoogleDelegate(creatorId: string, email: string): Promise<void>;
  savePayoutMethod(
    creatorId: string,
    data: {
      kind: PayoutMethod["kind"];
      label: string;
      detailsPublic: Record<string, string>;
      detailsPrivate: Record<string, string>;
    },
  ): Promise<void>;
  disconnectPayoutMethod(creatorId: string): Promise<void>;
  createWithdrawalRequest(input: {
    creatorId: string;
    amountCents: number;
    currency: CampaignRecord["currency"];
    payoutMethod: PayoutMethod["kind"];
    payoutLabel: string;
    googleEmail: string;
  }): Promise<{ id: string }>;
  updateInstagramToken(
    creatorId: string,
    accessToken: string,
    expiresInSeconds: number,
  ): Promise<void>;
  disconnectInstagram(creatorId: string): Promise<void>;

  listCampaigns(filter?: { status?: CampaignStatus }): Promise<CampaignRecord[]>;
  createCampaignRequest(input: {
    creatorId: string;
    title: string;
    brand: string;
    tagline: string;
    brief: string;
    payoutCents: number;
    currency: "USD" | "EUR" | "GBP";
    deadline: string | null;
    deliverables: Deliverable[];
    coverTone: "forest" | "vermillion" | "ochre" | "ink";
    requestNote: string | null;
  }): Promise<CampaignRecord>;
  findCampaignById(id: string): Promise<CampaignRecord | null>;
  findCampaignsByIds(ids: string[]): Promise<CampaignRecord[]>;
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

  listMessagesForApplication(applicationId: string): Promise<MessageRecord[]>;
  createMessage(input: {
    applicationId: string;
    role: MessageRole;
    authorEmail: string;
    body: string;
  }): Promise<MessageRecord>;

  createSupportTicket(input: {
    creatorId: string;
    creatorEmail: string;
    subject: string;
    body: string;
    attachments?: SupportAttachment[];
  }): Promise<SupportTicketRecord>;
  listSupportTicketsForCreator(creatorId: string): Promise<SupportTicketRecord[]>;
  listSupportTickets(filter?: {
    status?: SupportTicketStatus;
  }): Promise<SupportTicketRecord[]>;
  findSupportTicketById(id: string): Promise<SupportTicketRecord | null>;
  replyToSupportTicket(id: string, reply: string): Promise<void>;
  setSupportTicketStatus(id: string, status: SupportTicketStatus): Promise<void>;
}
