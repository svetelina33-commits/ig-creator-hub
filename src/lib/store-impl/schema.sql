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
ALTER TABLE creators ADD COLUMN IF NOT EXISTS google_delegates JSONB;

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

-- Seed campaigns — Nexus Club roster (niche creator-page campaigns).
-- Idempotent: re-running only inserts missing rows.
INSERT INTO campaigns (id, slug, title, brand, tagline, brief, payout_cents, currency, deadline, deliverables, status, cover_tone, created_at)
VALUES
  ('cmp_niche_01', 'meridian-labs-locked-in', 'Locked In', 'Meridian Labs', 'Early mornings. Compound wins. The rest follows.',
   'For creators running a high-agency, self-improvement page (Gen Z men, 16–28). Two Reels: one morning-routine montage, one book-and-barbell voiceover framed around ''high agency'' as a personality trait. We license for 60 days across Meridian''s channels. Chris Williamson / Bryan Johnson / David Goggins energy welcomed.',
   120000, 'USD', '2026-06-08', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ink', '2026-04-22T09:00:00Z'),
  ('cmp_niche_02', 'lune-co-peace-protected', 'Peace, Protected', 'Lune & Co', 'Slow mornings, kept sacred.',
   'Soft-girl / feminine-energy lifestyle pages. One aesthetic b-roll Reel (matcha, pilates, journaling, linen) and one carousel post with ''delusional affirmations'' or romanticize-the-mundane copy. Pinterest-core, clean-girl, quiet luxury. Audience: 18–30F.',
   75000, 'USD', '2026-05-28', '[{"kind":"reel","count":1},{"kind":"post","count":1}]'::jsonb, 'open', 'vermillion', '2026-04-22T10:15:00Z'),
  ('cmp_niche_03', 'cadence-ai-ten-times', 'Ten Times Before Noon', 'Cadence AI', 'Ship more, think cleaner — with the stack.',
   'AI power-user pages — knowledge workers, 22–40. Two Reels: one ''tool of the week'' walkthrough and one ''things AI shipped for me this week'' storytime. Claude / GPT-5 / Sora / agent workflow references fair game. We provide talking points and a discount code.',
   150000, 'USD', '2026-06-02', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ink', '2026-04-22T11:00:00Z'),
  ('cmp_niche_04', 'dial-up-club-then-vs-now', 'Then vs. Now', 'Dial-Up Club', 'We grew up online. Now we grew up.',
   'Late-millennial / geriatric-Gen-Z nostalgia pages (28–38). One Reel: Limewire / MSN / early-2000s internet screenshots vs. present-day adulthood. One carousel post: ''remember who you are'' framing. Purchasing-power demographic — treat it with warmth, not cringe.',
   85000, 'USD', '2026-06-12', '[{"kind":"reel","count":1},{"kind":"post","count":1}]'::jsonb, 'open', 'ochre', '2026-04-22T12:30:00Z'),
  ('cmp_niche_05', 'barbell-standard-iron-discipline', 'Iron Discipline', 'Barbell Standard', 'Heavy weights. Clean plates. No cope.',
   'Serious-lifter fitness pages (16–30M). Two Reels: one physique-edit / gym-session montage, one training-split infographic walkthrough. Sam Sulek / protein-maxxing / carnivore-adjacent culture welcomed, within our brand guidelines. Supplement code + 60-day license.',
   90000, 'USD', '2026-06-05', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'vermillion', '2026-04-22T14:00:00Z'),
  ('cmp_niche_06', 'ticker-co-chart-monday', 'Chart Monday', 'Ticker & Co', 'Markets, moves, and the occasional flex.',
   'Finance / markets commentary pages (22–35M). One Reel: a ''chart of the week'' walkthrough tied to a live market story. Two Stories: earnings-season reactions or prediction-market hot takes. NVIDIA / AI-bubble / private-credit takes encouraged. High-net-worth audience — deliver substance, not just flex.',
   140000, 'USD', '2026-06-01', '[{"kind":"reel","count":1},{"kind":"story","count":2}]'::jsonb, 'open', 'forest', '2026-04-22T15:00:00Z'),
  ('cmp_niche_07', 'signal-desk-sixty-seconds', 'Sixty Seconds Abroad', 'Signal Desk', 'The world, in plain language.',
   'Geopolitics / global-affairs explainer pages (20–40). Two Reels: one map-based ''what''s happening in [country]'' explainer and one historical-parallel carousel-style reel. Neutral tone. No hot takes on live conflicts — educate, don''t incite.',
   95000, 'USD', '2026-06-10', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ochre', '2026-04-22T16:00:00Z'),
  ('cmp_niche_08', 'noir-femme-unbothered', 'Unbothered', 'Noir Femme', 'High standards, quiet presence.',
   'Dark-feminine / ''that girl'' pages (20–35F). One Reel: a ''signs you''re unbothered'' or ''high-value woman'' framing, luxury-lifestyle-adjacent. One carousel post: psychology or dating-dynamics screenshots. Audience buys coaching / courses.',
   90000, 'USD', '2026-05-30', '[{"kind":"reel","count":1},{"kind":"post","count":1}]'::jsonb, 'open', 'ink', '2026-04-23T09:00:00Z'),
  ('cmp_niche_09', 'zeitgeist-archive-commentary', 'The Commentary', 'Zeitgeist Archive', 'Reading the room. Screenshotting the times.',
   'Cultural-commentary / meme-curation pages. Two Reels curating internet-culture screenshots with a ''man in the arena'' framing — reflective, not reactionary. We vet all copy before publish; keep it cultural, not political. High-engagement audience.',
   70000, 'USD', '2026-06-14', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ink', '2026-04-23T10:00:00Z'),
  ('cmp_niche_10', 'shipyard-build-in-public', 'Build in Public', 'Shipyard', 'Revenue. Reps. Receipts.',
   'Startup-founder / indie-hacker pages (22–40). Two Reels: one ''tools I use to ship faster'' walkthrough and one revenue-milestone screenshot reel. Vibe-coding / YC / Anthropic-OpenAI discourse all fair. Direct SaaS-buyer audience — substantive content wins.',
   130000, 'USD', '2026-06-06', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'forest', '2026-04-23T11:00:00Z'),
  ('cmp_niche_11', 'atelier-luxe-quiet-luxury', 'Quiet Luxury', 'Atelier Luxe', 'What you''re actually working for.',
   'Aspirational-wealth / luxury-lifestyle pages (18–35). One Reel: supercar, watch, or mansion walkthrough — Saltburn-aesthetic, not bling. One carousel post: ''a day in Monaco'' style edit. Monetize via affiliate codes; audience converts on aspiration.',
   160000, 'USD', '2026-06-20', '[{"kind":"reel","count":1},{"kind":"post","count":1}]'::jsonb, 'open', 'ochre', '2026-04-23T12:00:00Z'),
  ('cmp_niche_12', 'feed-daily-already-happened', 'Today, Already Happened', 'Feed Daily', 'You scroll. We curate. Drama, explained.',
   'Chronically-online pop-culture pages (16–30F). One Reel: a drama-timeline or celebrity-breakup recap. One Story: hot takes with tweet compilations. Euphoria / Coachella / TikToker drama fair game. High engagement, fast turnaround.',
   70000, 'USD', '2026-05-28', '[{"kind":"reel","count":1},{"kind":"story","count":1}]'::jsonb, 'open', 'vermillion', '2026-04-23T13:00:00Z'),
  ('cmp_niche_13', 'shadow-club-quiet-ones', 'The Quiet Ones', 'Shadow Club', 'Discipline without an audience.',
   'Sigma / lone-wolf masculine-philosophy pages (14–25M). Two Reels: movie-edit compilations (Bateman / Shelby / Drive aesthetic) paired with stoicism quotes. ''Delete Instagram, read books'' framing. Young audience — emphasize books and discipline over product push.',
   65000, 'USD', '2026-06-10', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ink', '2026-04-23T14:00:00Z'),
  ('cmp_niche_14', 'high-vibration-regulated', 'Nervous System, Regulated', 'High Vibration', 'Root cause. Slow medicine. Real healing.',
   'Conscious / spiritual-wellness pages (20–40F). One Reel: ''signs the universe is guiding you'' or somatic-healing framing. One carousel post: journaling prompts or cycle-syncing infographic. Manifestation / nervous-system / root-cause-health content. Course-buying audience.',
   90000, 'USD', '2026-06-04', '[{"kind":"reel","count":1},{"kind":"post","count":1}]'::jsonb, 'open', 'vermillion', '2026-04-23T15:00:00Z'),
  ('cmp_niche_15', 'hand-ink-analog-revival', 'Analog Revival', 'Hand & Ink', 'Made by people. On purpose.',
   'Anti-AI / human-craft counter-trend pages (25–40). Two Reels: one artisan-process / film-photography / handmade-resurgence piece, one ''spot the AI'' or ''before vs after AI ruined it'' commentary. Educated, higher-income audience — less competition.',
   110000, 'USD', '2026-06-16', '[{"kind":"reel","count":2}]'::jsonb, 'open', 'ochre', '2026-04-23T16:00:00Z')
ON CONFLICT (id) DO NOTHING;
