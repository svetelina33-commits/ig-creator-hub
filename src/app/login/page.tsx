import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import LoginForm from "./LoginForm";
import { GoogleGlyph } from "@/components/GoogleGlyph";

export default async function LoginPage() {
  const session = await getSession();
  if (session.creatorId) redirect("/dashboard");

  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-md py-16 sm:py-24 relative">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Members · Entrance
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none text-ink">
            Sign <span className="font-serif-italic text-violet">in</span>.
          </h1>
          <div className="mt-10 glass rounded-2xl p-6 sm:p-8 space-y-5">
            <a
              href="/api/auth/google/start?scope=basic"
              className="btn-ghost w-full justify-center px-5 py-3 rounded-full text-[13px] gap-3"
            >
              <GoogleGlyph />
              Continue with Google
            </a>
            <div className="flex items-center gap-3 text-[10px] small-caps tracking-[0.3em] text-ink-faint">
              <span className="flex-1 border-t border-white/10" />
              <span>or</span>
              <span className="flex-1 border-t border-white/10" />
            </div>
            <LoginForm />
          </div>
          <div className="mt-8 flex items-center justify-between text-[11px] small-caps tracking-[0.2em] text-ink-muted">
            <Link href="/forgot-password" className="hover:text-ink">
              Forgot password →
            </Link>
            <Link href="/" className="hover:text-ink">
              New here? Apply →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

