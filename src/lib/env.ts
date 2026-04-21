import { z } from "zod";

const schema = z.object({
  IG_APP_ID: z.string().default(""),
  IG_APP_SECRET: z.string().default(""),
  APP_BASE_URL: z.string().url(),
  SESSION_SECRET: z.string().length(64, "SESSION_SECRET must be 32 bytes hex (64 chars)"),
  TOKEN_ENCRYPTION_KEY: z.string().length(64, "TOKEN_ENCRYPTION_KEY must be 32 bytes hex (64 chars)"),
  IG_SCOPES: z.string().min(1),
  ADMIN_EMAILS: z.string().default("arcrxx@gmail.com"),
  RESEND_API_KEY: z.string().default(""),
  EMAIL_FROM: z.string().default("Nexus Club <onboarding@resend.dev>"),
  DATABASE_URL: z.string().default(""),
  CRON_SECRET: z.string().default(""),
  GOOGLE_CLIENT_ID: z.string().default(""),
  GOOGLE_CLIENT_SECRET: z.string().default(""),
  GOOGLE_SCOPES: z
    .string()
    .default(
      "openid email profile https://www.googleapis.com/auth/gmail.send",
    ),
});

type Env = z.infer<typeof schema>;

let cached: Env | null = null;

export function env(): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid environment:\n${msg}`);
  }
  cached = parsed.data;
  return cached;
}

export function redirectUri(): string {
  return `${env().APP_BASE_URL}/api/auth/instagram/callback`;
}

export function requireInstagramCredentials(): { appId: string; appSecret: string } {
  const e = env();
  if (!e.IG_APP_ID || !e.IG_APP_SECRET) {
    throw new Error(
      "IG_APP_ID and IG_APP_SECRET are not set. Add them to .env.local from your Meta app (developers.facebook.com → your app → Instagram product) and restart the dev server.",
    );
  }
  return { appId: e.IG_APP_ID, appSecret: e.IG_APP_SECRET };
}

export function adminEmails(): string[] {
  return env()
    .ADMIN_EMAILS.split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function googleRedirectUri(): string {
  return `${env().APP_BASE_URL}/api/auth/google/callback`;
}

export function requireGoogleCredentials(): { clientId: string; clientSecret: string } {
  const e = env();
  if (!e.GOOGLE_CLIENT_ID || !e.GOOGLE_CLIENT_SECRET) {
    throw new Error(
      "GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set. Add them from your Google Cloud OAuth client (console.cloud.google.com → APIs & Services → Credentials) and restart the dev server.",
    );
  }
  return { clientId: e.GOOGLE_CLIENT_ID, clientSecret: e.GOOGLE_CLIENT_SECRET };
}
