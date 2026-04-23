import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID } from "crypto";
import { encryptToken } from "../crypto";
import type {
  ApplicationRecord,
  CampaignRecord,
  CampaignStatus,
  CreateCampaignInput,
  CreatorProfile,
  CreatorRecord,
  Deliverable,
  MessageRecord,
  StoreBackend,
} from "./types";
import { slugify } from "./seed";

let sqlFn: NeonQueryFunction<false, false> | null = null;

function sql(): NeonQueryFunction<false, false> {
  if (!sqlFn) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    sqlFn = neon(url);
  }
  return sqlFn;
}

// --- row mappers ---

type CreatorRow = {
  id: string;
  email: string;
  password_hash: string | null;
  password_reset_token_hash: string | null;
  password_reset_expires_at: Date | string | null;
  ig_user_id: string | null;
  ig_username: string | null;
  ig_account_type: string | null;
  ig_encrypted_access_token: string | null;
  ig_token_expires_at: Date | string | null;
  ig_connected_at: Date | string | null;
  profile_slug: string | null;
  profile_display_name: string | null;
  profile_bio: string | null;
  profile_city: string | null;
  profile_niches: string[] | null;
  profile_portfolio_links: { label: string; url: string }[] | null;
  profile_accent: CreatorProfile["accent"] | null;
  profile_is_public: boolean | null;
  profile_updated_at: Date | string | null;
  google_email: string | null;
  google_name: string | null;
  google_scopes: string[] | null;
  google_encrypted_refresh_token: string | null;
  google_encrypted_access_token: string | null;
  google_token_expires_at: Date | string | null;
  google_connected_at: Date | string | null;
  google_delegates: { email: string; invitedAt: string }[] | null;
  payout_method: "paypal" | "stripe" | "bank" | null;
  payout_details: { public?: Record<string, string>; private?: string; label?: string } | null;
  payout_connected_at: Date | string | null;
  created_at: Date | string;
};

function toIso(v: Date | string | null): string | null {
  if (!v) return null;
  return v instanceof Date ? v.toISOString() : new Date(v).toISOString();
}

function mapCreator(row: CreatorRow): CreatorRecord {
  const c: CreatorRecord = {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: toIso(row.created_at)!,
  };
  if (row.password_reset_token_hash && row.password_reset_expires_at) {
    c.passwordReset = {
      tokenHash: row.password_reset_token_hash,
      expiresAt: toIso(row.password_reset_expires_at)!,
    };
  }
  if (row.ig_user_id && row.ig_username && row.ig_encrypted_access_token && row.ig_connected_at) {
    c.instagram = {
      igUserId: row.ig_user_id,
      username: row.ig_username,
      accountType: row.ig_account_type ?? undefined,
      encryptedAccessToken: row.ig_encrypted_access_token,
      tokenExpiresAt: toIso(row.ig_token_expires_at),
      connectedAt: toIso(row.ig_connected_at)!,
    };
  }
  if (row.profile_slug && row.profile_display_name && row.profile_updated_at) {
    c.profile = {
      slug: row.profile_slug,
      displayName: row.profile_display_name,
      bio: row.profile_bio ?? "",
      city: row.profile_city ?? "",
      niches: row.profile_niches ?? [],
      portfolioLinks: row.profile_portfolio_links ?? [],
      accent: row.profile_accent ?? "forest",
      isPublic: Boolean(row.profile_is_public),
      updatedAt: toIso(row.profile_updated_at)!,
    };
  }
  if (row.google_email && row.google_connected_at) {
    c.google = {
      email: row.google_email,
      name: row.google_name ?? undefined,
      scopes: row.google_scopes ?? [],
      encryptedRefreshToken: row.google_encrypted_refresh_token,
      encryptedAccessToken: row.google_encrypted_access_token,
      tokenExpiresAt: toIso(row.google_token_expires_at),
      connectedAt: toIso(row.google_connected_at)!,
      delegates: row.google_delegates ?? [],
    };
  }
  if (row.payout_method && row.payout_connected_at && row.payout_details) {
    c.payout = {
      kind: row.payout_method,
      label: row.payout_details.label ?? row.payout_method,
      connectedAt: toIso(row.payout_connected_at)!,
      detailsPublic: row.payout_details.public ?? {},
    };
  }
  return c;
}

type CampaignRow = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  tagline: string;
  brief: string;
  payout_cents: number;
  currency: "USD" | "EUR" | "GBP";
  deadline: Date | string | null;
  deliverables: Deliverable[];
  status: CampaignStatus;
  cover_tone: CampaignRecord["coverTone"];
  created_at: Date | string;
  requested_by_creator_id: string | null;
  requested_at: Date | string | null;
  request_note: string | null;
};

function mapCampaign(row: CampaignRow): CampaignRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    tagline: row.tagline,
    brief: row.brief,
    payoutCents: row.payout_cents,
    currency: row.currency,
    deadline: row.deadline ? toIso(row.deadline)!.slice(0, 10) : null,
    deliverables: row.deliverables,
    status: row.status,
    coverTone: row.cover_tone,
    createdAt: toIso(row.created_at)!,
    requestedByCreatorId: row.requested_by_creator_id,
    requestedAt: toIso(row.requested_at),
    requestNote: row.request_note,
  };
}

type ApplicationRow = {
  id: string;
  creator_id: string;
  campaign_id: string;
  status: "pending" | "approved" | "rejected";
  note: string;
  applied_at: Date | string;
  decided_at: Date | string | null;
  paid_at: Date | string | null;
  paid_amount_cents: number | null;
};

function mapApplication(row: ApplicationRow): ApplicationRecord {
  return {
    id: row.id,
    creatorId: row.creator_id,
    campaignId: row.campaign_id,
    status: row.status,
    note: row.note,
    appliedAt: toIso(row.applied_at)!,
    decidedAt: toIso(row.decided_at),
    paidAt: toIso(row.paid_at),
    paidAmountCents: row.paid_amount_cents,
  };
}

export const pgStore: StoreBackend = {
  async findCreatorByEmail(email) {
    const rows = (await sql()`
      SELECT * FROM creators WHERE LOWER(email) = LOWER(${email}) LIMIT 1
    `) as CreatorRow[];
    return rows[0] ? mapCreator(rows[0]) : null;
  },
  async findCreatorById(id) {
    const rows = (await sql()`SELECT * FROM creators WHERE id = ${id}`) as CreatorRow[];
    return rows[0] ? mapCreator(rows[0]) : null;
  },
  async findCreatorByProfileSlug(slug) {
    const rows = (await sql()`
      SELECT * FROM creators WHERE profile_slug = ${slug} AND profile_is_public = TRUE LIMIT 1
    `) as CreatorRow[];
    return rows[0] ? mapCreator(rows[0]) : null;
  },
  async listPublicCreators() {
    const rows = (await sql()`
      SELECT * FROM creators
      WHERE profile_is_public = TRUE
      ORDER BY profile_updated_at DESC NULLS LAST
    `) as CreatorRow[];
    return rows.map(mapCreator);
  },
  async updateCreatorProfile(creatorId, profile: CreatorProfile) {
    await sql()`
      UPDATE creators SET
        profile_slug = ${profile.slug},
        profile_display_name = ${profile.displayName},
        profile_bio = ${profile.bio},
        profile_city = ${profile.city},
        profile_niches = ${JSON.stringify(profile.niches)}::jsonb,
        profile_portfolio_links = ${JSON.stringify(profile.portfolioLinks)}::jsonb,
        profile_accent = ${profile.accent},
        profile_is_public = ${profile.isPublic},
        profile_updated_at = now()
      WHERE id = ${creatorId}
    `;
  },
  async createCreator(email, passwordHash) {
    const rows = (await sql()`
      INSERT INTO creators (email, password_hash)
      VALUES (${email}, ${passwordHash})
      ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
      RETURNING *
    `) as CreatorRow[];
    return mapCreator(rows[0]);
  },
  async setCreatorPasswordHash(creatorId, passwordHash) {
    await sql()`
      UPDATE creators
      SET password_hash = ${passwordHash},
          password_reset_token_hash = NULL,
          password_reset_expires_at = NULL
      WHERE id = ${creatorId}
    `;
  },
  async setPasswordResetToken(creatorId, tokenHash, ttlSeconds) {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    await sql()`
      UPDATE creators
      SET password_reset_token_hash = ${tokenHash},
          password_reset_expires_at = ${expiresAt}
      WHERE id = ${creatorId}
    `;
  },
  async findCreatorByResetToken(tokenHash) {
    const rows = (await sql()`
      SELECT * FROM creators
      WHERE password_reset_token_hash = ${tokenHash}
        AND password_reset_expires_at > now()
      LIMIT 1
    `) as CreatorRow[];
    return rows[0] ? mapCreator(rows[0]) : null;
  },
  async listCreators() {
    const rows = (await sql()`
      SELECT * FROM creators ORDER BY created_at DESC
    `) as CreatorRow[];
    return rows.map(mapCreator);
  },
  async listCreatorsWithExpiringTokens(withinDays) {
    const rows = (await sql()`
      SELECT * FROM creators
      WHERE ig_token_expires_at IS NOT NULL
        AND ig_token_expires_at <= now() + (${withinDays}::int || ' days')::interval
    `) as CreatorRow[];
    return rows.map(mapCreator);
  },
  async saveInstagramConnection(creatorId, data) {
    const encrypted = encryptToken(data.accessToken);
    const expiresAt = data.expiresInSeconds
      ? new Date(Date.now() + data.expiresInSeconds * 1000).toISOString()
      : null;
    await sql()`
      UPDATE creators SET
        ig_user_id = ${data.igUserId},
        ig_username = ${data.username},
        ig_account_type = ${data.accountType ?? null},
        ig_encrypted_access_token = ${encrypted},
        ig_token_expires_at = ${expiresAt},
        ig_connected_at = now()
      WHERE id = ${creatorId}
    `;
  },
  async updateInstagramToken(creatorId, accessToken, expiresInSeconds) {
    const encrypted = encryptToken(accessToken);
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
    await sql()`
      UPDATE creators SET
        ig_encrypted_access_token = ${encrypted},
        ig_token_expires_at = ${expiresAt}
      WHERE id = ${creatorId}
    `;
  },
  async disconnectInstagram(creatorId) {
    await sql()`
      UPDATE creators SET
        ig_user_id = NULL,
        ig_username = NULL,
        ig_account_type = NULL,
        ig_encrypted_access_token = NULL,
        ig_token_expires_at = NULL,
        ig_connected_at = NULL
      WHERE id = ${creatorId}
    `;
  },
  async saveGoogleConnection(creatorId, data) {
    const refreshEnc = data.refreshToken ? encryptToken(data.refreshToken) : null;
    const accessEnc = data.accessToken ? encryptToken(data.accessToken) : null;
    const expiresAt =
      data.expiresInSeconds != null
        ? new Date(Date.now() + data.expiresInSeconds * 1000).toISOString()
        : null;
    await sql()`
      UPDATE creators SET
        google_email = ${data.email},
        google_name = ${data.name ?? null},
        google_scopes = ${JSON.stringify(data.scopes)}::jsonb,
        google_encrypted_refresh_token = ${refreshEnc},
        google_encrypted_access_token = ${accessEnc},
        google_token_expires_at = ${expiresAt},
        google_connected_at = now()
      WHERE id = ${creatorId}
    `;
  },
  async updateGoogleAccessToken(creatorId, accessToken, expiresInSeconds) {
    const accessEnc = encryptToken(accessToken);
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000).toISOString();
    await sql()`
      UPDATE creators SET
        google_encrypted_access_token = ${accessEnc},
        google_token_expires_at = ${expiresAt}
      WHERE id = ${creatorId}
    `;
  },
  async disconnectGoogle(creatorId) {
    await sql()`
      UPDATE creators SET
        google_email = NULL,
        google_name = NULL,
        google_scopes = NULL,
        google_encrypted_refresh_token = NULL,
        google_encrypted_access_token = NULL,
        google_token_expires_at = NULL,
        google_connected_at = NULL,
        google_delegates = NULL
      WHERE id = ${creatorId}
    `;
  },
  async addGoogleDelegate(creatorId, email) {
    const normalized = email.trim().toLowerCase();
    const rows = (await sql()`
      SELECT google_delegates FROM creators WHERE id = ${creatorId} LIMIT 1
    `) as { google_delegates: { email: string; invitedAt: string }[] | null }[];
    if (rows.length === 0) throw new Error("Creator not found");
    const existing = rows[0].google_delegates ?? [];
    if (existing.some((d) => d.email === normalized)) return;
    const next = [...existing, { email: normalized, invitedAt: new Date().toISOString() }];
    await sql()`
      UPDATE creators
      SET google_delegates = ${JSON.stringify(next)}::jsonb
      WHERE id = ${creatorId}
    `;
  },
  async removeGoogleDelegate(creatorId, email) {
    const normalized = email.trim().toLowerCase();
    const rows = (await sql()`
      SELECT google_delegates FROM creators WHERE id = ${creatorId} LIMIT 1
    `) as { google_delegates: { email: string; invitedAt: string }[] | null }[];
    if (rows.length === 0) return;
    const next = (rows[0].google_delegates ?? []).filter((d) => d.email !== normalized);
    await sql()`
      UPDATE creators
      SET google_delegates = ${JSON.stringify(next)}::jsonb
      WHERE id = ${creatorId}
    `;
  },
  async savePayoutMethod(creatorId, data) {
    const privateEncrypted = Object.keys(data.detailsPrivate).length > 0
      ? encryptToken(JSON.stringify(data.detailsPrivate))
      : null;
    const payload = {
      label: data.label,
      public: data.detailsPublic,
      private: privateEncrypted,
    };
    await sql()`
      UPDATE creators SET
        payout_method = ${data.kind},
        payout_details = ${JSON.stringify(payload)}::jsonb,
        payout_connected_at = now()
      WHERE id = ${creatorId}
    `;
  },
  async disconnectPayoutMethod(creatorId) {
    await sql()`
      UPDATE creators SET
        payout_method = NULL,
        payout_details = NULL,
        payout_connected_at = NULL
      WHERE id = ${creatorId}
    `;
  },
  async createWithdrawalRequest(input) {
    const id = `wdr_${randomUUID().slice(0, 8)}`;
    await sql()`
      INSERT INTO withdrawal_requests
        (id, creator_id, amount_cents, currency, payout_method, payout_label, google_email)
      VALUES
        (${id}, ${input.creatorId}, ${input.amountCents}, ${input.currency},
         ${input.payoutMethod}, ${input.payoutLabel}, ${input.googleEmail})
    `;
    return { id };
  },
  async listCampaigns(filter) {
    const rows = (filter?.status
      ? await sql()`SELECT * FROM campaigns WHERE status = ${filter.status} ORDER BY created_at DESC`
      : await sql()`SELECT * FROM campaigns ORDER BY created_at DESC`) as CampaignRow[];
    return rows.map(mapCampaign);
  },
  async findCampaignById(id) {
    const rows = (await sql()`SELECT * FROM campaigns WHERE id = ${id}`) as CampaignRow[];
    return rows[0] ? mapCampaign(rows[0]) : null;
  },
  async findCampaignsByIds(ids) {
    if (ids.length === 0) return [];
    const rows = (await sql()`
      SELECT * FROM campaigns WHERE id = ANY(${ids}::text[])
    `) as CampaignRow[];
    return rows.map(mapCampaign);
  },
  async findCampaignBySlug(slug) {
    const rows = (await sql()`SELECT * FROM campaigns WHERE slug = ${slug}`) as CampaignRow[];
    return rows[0] ? mapCampaign(rows[0]) : null;
  },
  async createCampaign(input: CreateCampaignInput) {
    const baseSlug = slugify(`${input.brand}-${input.title}`);
    let slug = baseSlug;
    let suffix = 2;
    // Resolve slug collisions.
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const exists = (await sql()`SELECT 1 FROM campaigns WHERE slug = ${slug} LIMIT 1`) as unknown[];
      if (exists.length === 0) break;
      slug = `${baseSlug}-${suffix++}`;
    }
    const id = `cmp_${randomUUID().slice(0, 8)}`;
    const rows = (await sql()`
      INSERT INTO campaigns (
        id, slug, title, brand, tagline, brief, payout_cents, currency,
        deadline, deliverables, status, cover_tone
      ) VALUES (
        ${id}, ${slug}, ${input.title}, ${input.brand}, ${input.tagline}, ${input.brief},
        ${input.payoutCents}, ${input.currency}, ${input.deadline},
        ${JSON.stringify(input.deliverables)}::jsonb, ${input.status}, ${input.coverTone}
      )
      RETURNING *
    `) as CampaignRow[];
    return mapCampaign(rows[0]);
  },
  async createCampaignRequest(input) {
    const baseSlug = slugify(`${input.brand}-${input.title}`);
    let slug = baseSlug;
    let suffix = 2;
    while (true) {
      const exists = (await sql()`SELECT 1 FROM campaigns WHERE slug = ${slug} LIMIT 1`) as unknown[];
      if (exists.length === 0) break;
      slug = `${baseSlug}-${suffix++}`;
    }
    const id = `cmp_${randomUUID().slice(0, 8)}`;
    const rows = (await sql()`
      INSERT INTO campaigns (
        id, slug, title, brand, tagline, brief, payout_cents, currency,
        deadline, deliverables, status, cover_tone,
        requested_by_creator_id, requested_at, request_note
      ) VALUES (
        ${id}, ${slug}, ${input.title}, ${input.brand}, ${input.tagline}, ${input.brief},
        ${input.payoutCents}, ${input.currency}, ${input.deadline},
        ${JSON.stringify(input.deliverables)}::jsonb, 'requested', ${input.coverTone},
        ${input.creatorId}, now(), ${input.requestNote}
      )
      RETURNING *
    `) as CampaignRow[];
    return mapCampaign(rows[0]);
  },
  async updateCampaignStatus(id, status: CampaignStatus) {
    await sql()`UPDATE campaigns SET status = ${status} WHERE id = ${id}`;
  },
  async listApplicationsForCampaign(campaignId) {
    const rows = (await sql()`
      SELECT * FROM applications WHERE campaign_id = ${campaignId} ORDER BY applied_at DESC
    `) as ApplicationRow[];
    return rows.map(mapApplication);
  },
  async listApplicationsForCreator(creatorId) {
    const rows = (await sql()`
      SELECT * FROM applications WHERE creator_id = ${creatorId} ORDER BY applied_at DESC
    `) as ApplicationRow[];
    return rows.map(mapApplication);
  },
  async findApplication(creatorId, campaignId) {
    const rows = (await sql()`
      SELECT * FROM applications WHERE creator_id = ${creatorId} AND campaign_id = ${campaignId} LIMIT 1
    `) as ApplicationRow[];
    return rows[0] ? mapApplication(rows[0]) : null;
  },
  async findApplicationById(id) {
    const rows = (await sql()`SELECT * FROM applications WHERE id = ${id}`) as ApplicationRow[];
    return rows[0] ? mapApplication(rows[0]) : null;
  },
  async createApplication(input) {
    const id = `app_${randomUUID().slice(0, 8)}`;
    const rows = (await sql()`
      INSERT INTO applications (id, creator_id, campaign_id, note)
      VALUES (${id}, ${input.creatorId}, ${input.campaignId}, ${input.note})
      ON CONFLICT (creator_id, campaign_id) DO UPDATE SET note = applications.note
      RETURNING *
    `) as ApplicationRow[];
    return mapApplication(rows[0]);
  },
  async decideApplication(id, decision) {
    await sql()`
      UPDATE applications
      SET status = ${decision}, decided_at = now()
      WHERE id = ${id}
    `;
  },
  async listMessagesForApplication(applicationId) {
    const rows = (await sql()`
      SELECT id, application_id, role, author_email, body, created_at
      FROM messages
      WHERE application_id = ${applicationId}
      ORDER BY created_at ASC
    `) as {
      id: string;
      application_id: string;
      role: "editor" | "creator";
      author_email: string;
      body: string;
      created_at: Date | string;
    }[];
    return rows.map((r) => ({
      id: r.id,
      applicationId: r.application_id,
      role: r.role,
      authorEmail: r.author_email,
      body: r.body,
      createdAt: toIso(r.created_at)!,
    }));
  },
  async createMessage(input) {
    const id = `msg_${randomUUID().slice(0, 8)}`;
    const rows = (await sql()`
      INSERT INTO messages (id, application_id, role, author_email, body)
      VALUES (${id}, ${input.applicationId}, ${input.role}, ${input.authorEmail}, ${input.body})
      RETURNING id, application_id, role, author_email, body, created_at
    `) as {
      id: string;
      application_id: string;
      role: "editor" | "creator";
      author_email: string;
      body: string;
      created_at: Date | string;
    }[];
    const r = rows[0];
    return {
      id: r.id,
      applicationId: r.application_id,
      role: r.role,
      authorEmail: r.author_email,
      body: r.body,
      createdAt: toIso(r.created_at)!,
    } as MessageRecord;
  },
};
