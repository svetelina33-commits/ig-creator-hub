import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import ResetForm from "./ResetForm";

type Params = Promise<{ token: string }>;

export default async function ResetPasswordPage({ params }: { params: Params }) {
  const { token } = await params;
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-md py-16 sm:py-24 relative">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Reset · Password
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none text-ink">
            A <span className="font-serif-italic text-violet">new</span> key.
          </h1>
          <div className="mt-10">
            <ResetForm token={token} />
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
