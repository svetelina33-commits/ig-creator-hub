import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const session = await getSession();
  if (session.creatorId) redirect("/dashboard");

  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-md py-16 sm:py-24">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Members · Entrance
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none">
            Sign <span className="font-serif-italic">in</span>
          </h1>
          <div className="mt-10">
            <LoginForm />
          </div>
          <div className="mt-8 flex items-center justify-between text-[11px] small-caps tracking-[0.2em] text-ink-muted">
            <Link href="/forgot-password" className="hover:text-forest">
              Forgot password →
            </Link>
            <Link href="/" className="hover:text-forest">
              New here? Apply →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
