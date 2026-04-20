import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import ForgotForm from "./ForgotForm";

export default function ForgotPasswordPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-md py-16 sm:py-24 relative">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Forgotten · Password
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none text-ink">
            No <span className="font-serif-italic text-violet">bother</span>.
          </h1>
          <p className="mt-4 text-[15px] text-ink-muted">
            Tell us the email you used and we'll send a reset link — good for 60 minutes.
          </p>
          <div className="mt-10">
            <ForgotForm />
          </div>
          <div className="mt-8 text-[11px] small-caps tracking-[0.2em] text-ink-muted">
            <Link href="/login" className="hover:text-ink">
              ← Back to sign in
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
