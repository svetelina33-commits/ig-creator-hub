# Creator Hub

One-tap Instagram connect for creators joining brand campaigns.

Uses Meta's official **Instagram API with Instagram Login** flow (OAuth). Fully legal, fully transparent to the creator — they see Instagram's consent screen once and approve. No credential capture, no session scraping.

## What you get out of the box

- Next.js 16 + TypeScript + Tailwind, mobile-responsive
- Email signup → "Connect Instagram" → OAuth redirect → long-lived (60-day) token
- AES-256-GCM at-rest encryption for access tokens
- iron-session cookie-based auth (no password storage yet — add when you need it)
- File-backed store (`.data/creators.json`) for local dev — swap to Postgres/Neon in prod
- Zero paid services required

## Your setup steps (one-time, ~10 minutes)

### 1. Create the Meta app

1. Go to <https://developers.facebook.com/apps> → **Create App**
2. **Use case:** Other → **App type:** Business → Next
3. **App name:** your brand (shown on the Instagram consent screen — make it professional)
4. **App contact email:** your email
5. On the app dashboard, left sidebar → **Add Product** → add **Instagram**
6. Inside Instagram, click **"API setup with Instagram login"** → complete the wizard
7. In the Instagram product settings, find:
   - **Instagram App ID** → copy
   - **Instagram App Secret** → Show, copy
   - **OAuth redirect URI** field → add: `http://localhost:3000/api/auth/instagram/callback`

### 2. Fill in `.env.local`

Open `.env.local` in this project and paste:

```
IG_APP_ID=<paste Instagram App ID>
IG_APP_SECRET=<paste Instagram App Secret>
```

`SESSION_SECRET` and `TOKEN_ENCRYPTION_KEY` are already filled with random values. Regenerate them for production with `openssl rand -hex 32`.

### 3. Run locally

```bash
npm run dev
```

Open <http://localhost:3000>. Sign up with any email → click **Connect your Instagram account** → approve on Instagram's consent screen → you'll be redirected back with a connected account.

> **Important:** The Instagram account you test with must be a **Business or Creator** account. Personal accounts can't use the Content Publishing API. Convert in Instagram app → Settings → Account type and tools → free, 30 seconds.

### 4. Deploy to Vercel (free)

1. Create a GitHub repo for this project (`gh repo create` or via github.com).
2. Push:
   ```bash
   git add -A && git commit -m "initial scaffold"
   git push -u origin main
   ```
3. Go to <https://vercel.com/new> → import the repo → Deploy.
4. In Vercel → Project → **Settings → Environment Variables**, add each line from `.env.local` (generate fresh `SESSION_SECRET` and `TOKEN_ENCRYPTION_KEY` for production).
5. Map your custom domain (`thenexusclub.org`) under Vercel → Project → Settings → Domains, then point your registrar's DNS to the records Vercel provides. Back in Meta app settings, add the production redirect URI:
   `https://thenexusclub.org/api/auth/instagram/callback`
6. Set `APP_BASE_URL` in Vercel env vars to `https://thenexusclub.org`.

### 5. Get approved for Content Publishing

To actually post from creator accounts via API, Meta App Review must approve:
- `instagram_business_content_publish` permission
- **Content Publishing API** use case

Review takes 2–4 weeks. Requirements:
- Privacy policy URL (free: host a `privacy.html` page in this app)
- Terms of service URL (same)
- Demo video showing the exact flow
- Verified business (Meta Business Verification)

Until approved, the app works in **development mode** — you can test with accounts added as roles in the Meta app dashboard (Roles → Instagram Testers).

## Architecture

```
src/
├── app/
│   ├── page.tsx              ← landing + signup
│   ├── dashboard/page.tsx    ← connected account view
│   └── api/
│       ├── signup/route.ts
│       ├── auth/
│       │   ├── logout/route.ts
│       │   └── instagram/
│       │       ├── start/route.ts       ← redirect to IG
│       │       ├── callback/route.ts    ← exchange code, store token
│       │       └── disconnect/route.ts
└── lib/
    ├── env.ts        ← zod-validated env
    ├── session.ts    ← iron-session wrapper
    ├── crypto.ts     ← AES-GCM token encryption
    ├── store.ts      ← creator records (swap for Postgres in prod)
    └── instagram.ts  ← Meta OAuth + Graph API client
```

## Upgrade path

- **Database:** replace `src/lib/store.ts` internals with Postgres (Neon free tier) or Supabase. The public API stays the same.
- **Token refresh:** add a cron that refreshes tokens before they expire (60 days). Vercel Cron is free on Hobby plan.
- **Posting:** add `src/lib/publish.ts` using `POST /{ig-user-id}/media` → `POST /{ig-user-id}/media_publish`.
- **Password auth:** swap the email-only signup for email+password when you're ready.

## Legal footing

- Creators must explicitly approve access via Meta's consent screen — we never see their IG password.
- Access is scoped to permissions they grant and can be revoked anytime from their Instagram settings.
- You own the relationship with the creator; sign a campaign agreement covering posting rights, approval flow, and data handling before using the token to publish.
