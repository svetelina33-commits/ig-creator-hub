-- Nexus Club Postgres schema. Run once against your Neon database.
-- Usage: psql "$DATABASE_URL" -f schema.sql

CREATE TABLE IF NOT EXISTS creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT,
  password_reset_token_hash TEXT,
  password_reset_expires_at TIMESTAMPTZ,
  ig_user_id TEXT,
  ig_username TEXT,
  ig_account_type TEXT,
  ig_encrypted_access_token TEXT,
  ig_token_expires_at TIMESTAMPTZ,
  ig_connected_at TIMESTAMPTZ,
  profile_slug TEXT UNIQUE,
  profile_display_name TEXT,
  profile_bio TEXT,
  profile_city TEXT,
  profile_niches JSONB,
  profile_portfolio_links JSONB,
  profile_accent TEXT,
  profile_is_public BOOLEAN DEFAULT FALSE,
  profile_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add profile columns to existing creators table if upgrading from an older schema.
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_slug TEXT UNIQUE;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_display_name TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_bio TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_city TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_niches JSONB;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_portfolio_links JSONB;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_accent TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_is_public BOOLEAN DEFAULT FALSE;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS profile_updated_at TIMESTAMPTZ;

-- Gmail/Google connection.
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_email TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_name TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_scopes JSONB;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_encrypted_refresh_token TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_encrypted_access_token TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_token_expires_at TIMESTAMPTZ;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_connected_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS creators_email_lower_idx ON creators (LOWER(email));
CREATE INDEX IF NOT EXISTS creators_reset_token_idx
  ON creators (password_reset_token_hash) WHERE password_reset_token_hash IS NOT NULL;
CREATE INDEX IF NOT EXISTS creators_token_exp_idx
  ON creators (ig_token_expires_at) WHERE ig_token_expires_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  tagline TEXT NOT NULL,
  brief TEXT NOT NULL,
  payout_cents INTEGER NOT NULL,
  currency TEXT NOT NULL,
  deadline DATE,
  deliverables JSONB NOT NULL,
  status TEXT NOT NULL,
  cover_tone TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS campaigns_status_idx ON campaigns (status);
CREATE INDEX IF NOT EXISTS campaigns_created_at_idx ON campaigns (created_at DESC);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  creator_id UUID NOT NULL REFERENCES creators(id) ON DELETE CASCADE,
  campaign_id TEXT NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  note TEXT NOT NULL,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  decided_at TIMESTAMPTZ,
  UNIQUE (creator_id, campaign_id)
);

CREATE INDEX IF NOT EXISTS applications_campaign_idx ON applications (campaign_id, applied_at DESC);
CREATE INDEX IF NOT EXISTS applications_creator_idx ON applications (creator_id, applied_at DESC);

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  author_email TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_application_idx ON messages (application_id, created_at ASC);

-- Seed campaigns (ignored if they already exist).
INSERT INTO campaigns (id, slug, title, brand, tagline, brief, payout_cents, currency, deadline, deliverables, status, cover_tone, created_at)
VALUES
  ('cmp_seed_01', 'maison-ophir-fw26', 'Autumn Dossier', 'Maison Ophir', 'A quiet luxury edit for the cold months.',
   'We''re looking for three creators with a distinct, editorial point-of-view to feature the Maison Ophir FW26 capsule. One carousel post and one Reel, shot in natural light. Styling freedom within our moodboard.',
   180000, 'USD', '2026-05-20', '[{"kind":"post","count":1},{"kind":"reel","count":1}]'::jsonb, 'open', 'forest', '2026-04-12T09:00:00Z'),
  ('cmp_seed_02', 'helia-vol-02', 'Volume 02', 'Helia', 'Slow mornings. Warm rituals. A product story.',
   'A single 60–90 second Reel narrating your morning ritual with our new ceramic pour-over. We license the footage for 90 days across Helia''s channels.',
   85000, 'USD', '2026-05-02', '[{"kind":"reel","count":1}]'::jsonb, 'open', 'ochre', '2026-04-14T10:30:00Z'),
  ('cmp_seed_03', 'folio-press-launch', 'Folio Press — launch week', 'Folio Press', 'An independent bookshop, now online.',
   'Help us open the doors. One Story set (minimum 6 frames) on launch day and one carousel post within the first week. Genuine voice required — we review portfolios.',
   60000, 'USD', '2026-05-30', '[{"kind":"story","count":6},{"kind":"post","count":1}]'::jsonb, 'open', 'vermillion', '2026-04-18T08:15:00Z')
ON CONFLICT (id) DO NOTHING;
