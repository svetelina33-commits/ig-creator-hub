import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, CenteredRule } from "@/components/Ornaments";

export const metadata = {
  title: "Security · Nexus Club",
  description:
    "How to report a security issue, what is in and out of scope, and the standing posture that protects member and brand data.",
};

const POSTURE: { k: string; t: string; b: string }[] = [
  {
    k: "01",
    t: "Encryption at rest.",
    b: "Long-lived OAuth tokens — Meta and Google — are encrypted with AES-256-GCM before they touch the database. Nothing else writes the plaintext.",
  },
  {
    k: "02",
    t: "Encryption in transit.",
    b: "Every edge of every page is served over TLS 1.3. HSTS is on the apex with a two-year max-age. We do not accept un-encrypted connections.",
  },
  {
    k: "03",
    t: "Sessions are HTTP-only.",
    b: "The only cookie we set is the session cookie — signed, HTTP-only, secure, same-site. No analytics cookies, no advertising cookies, no third-party trackers.",
  },
  {
    k: "04",
    t: "Passwords are not stored as text.",
    b: "Member passwords are hashed with a memory-hard function (Argon2id) before storage. We cannot read your password, recover your password, or send your password back to you. Reset is the only path.",
  },
  {
    k: "05",
    t: "Authentication is OAuth on the platform side.",
    b: "Connection to Instagram and Gmail uses Meta's and Google's official OAuth flows. We never see, store, or transmit your platform credentials.",
  },
  {
    k: "06",
    t: "Backups are encrypted.",
    b: "Daily database snapshots are encrypted at rest by the underlying storage provider; access to the snapshots is audit-logged and limited to the desk's maintenance role.",
  },
];

const IN_SCOPE: string[] = [
  "thenexusclub.org and any subdomain we operate",
  "The application served from the URLs above",
  "API endpoints under /api/",
  "OAuth callbacks under /api/auth/",
  "How we store, transmit, or process member or brand data",
];

const OUT_OF_SCOPE: { t: string; b: string }[] = [
  {
    t: "Member Instagram accounts",
    b: "We do not operate Instagram. Issues with Meta's platform, with a member's account, or with the consent screen belong with Meta.",
  },
  {
    t: "Third-party OAuth providers",
    b: "Issues with Google or Meta OAuth flows belong with the respective provider. Issues in how we receive the token after OAuth are in scope.",
  },
  {
    t: "Denial-of-service",
    b: "Volumetric or rate-based attacks on the platform are not in scope and are forwarded to our infrastructure provider's abuse channel.",
  },
  {
    t: "Social engineering of staff or members",
    b: "Phishing, pretext calls, and impersonation testing of any human are out of scope and against the disclosure policy.",
  },
  {
    t: "Physical or network access",
    b: "Tailgating, badge cloning, or physical-perimeter testing of any office or data centre.",
  },
  {
    t: "Reports requiring a privileged account",
    b: "Findings reachable only with an admin account or a stolen session are out of scope; please report only what reproduces from a fresh, unauthenticated environment.",
  },
];

const ASKS: string[] = [
  "Do not access, modify, or delete data that is not your own.",
  "Do not run automated scanners that disrupt service for other members.",
  "Do not publish details of an unfixed finding.",
  "Give the desk a fair window to read, reproduce, and resolve before disclosure — typically thirty days; we will say if a longer hold is needed.",
  "If a finding requires demonstration on real data, stop at the smallest reproducible proof and write to us; do not enumerate further.",
];

export default function SecurityPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* ───── Masthead ───── */}
        <section className="mx-auto max-w-6xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· SECURITY ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              The standing
              <br />
              <span className="font-serif-italic text-violet">posture.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-9 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
              The credible signal of an integration is what it does not touch. Below is
              what the platform does to keep member and brand data where it should be,
              what falls in and out of scope for security research, and how to write
              to us when something looks wrong. The desk reads every report, in
              writing, and answers in writing.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              Rev. 2026-04-30 · Companion to the Letter of Authorization
            </p>
          </Reveal>
        </section>

        {/* ───── Disclosure card ───── */}
        <section className="mx-auto max-w-6xl pb-12">
          <Reveal>
            <div
              className="nc-card rounded-3xl p-7 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8"
              style={{
                background:
                  "linear-gradient(180deg, rgba(28,22,40,0.65) 0%, rgba(14,12,20,0.85) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(125,90,255,0.18), 0 30px 60px -30px rgba(125,90,255,0.4)",
              }}
            >
              <div className="md:col-span-7">
                <div className="small-caps text-[10px] tracking-[0.3em] text-violet/85 mb-3">
                  Responsible disclosure
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl text-ink leading-tight">
                  Write to{" "}
                  <a
                    className="font-serif-italic text-violet underline underline-offset-4 decoration-violet/40 hover:decoration-violet transition-colors"
                    href="mailto:security@thenexusclub.org"
                  >
                    security@thenexusclub.org
                  </a>
                  .
                </h2>
                <p className="mt-5 text-[15.5px] leading-[1.7] text-ink-muted font-serif-book max-w-2xl">
                  Send a clear write-up: what you found, where you found it, the
                  smallest steps that reproduce it, and the impact you observed. PGP
                  is welcomed; the public key is published below. We acknowledge
                  receipt within one business day and reply with a substantive read
                  within five.
                </p>
              </div>
              <div className="md:col-span-5 space-y-3 text-[12.5px]">
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    Inbox
                  </div>
                  <div className="mt-1 font-mono-numeric text-ink-soft">
                    security@thenexusclub.org
                  </div>
                </div>
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    PGP key
                  </div>
                  <div className="mt-1 font-mono-numeric text-ink-soft">
                    Available on request — fingerprint published in dispatches
                  </div>
                </div>
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    First reply
                  </div>
                  <div className="mt-1 font-mono-numeric text-ink-soft">
                    Within 5 business days
                  </div>
                </div>
                <div
                  className="rounded-xl px-5 py-4"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    Resolution target
                  </div>
                  <div className="mt-1 font-mono-numeric text-ink-soft">
                    30 days from confirmation
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── Posture ───── */}
        <section className="mx-auto max-w-6xl pb-20 pt-16">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § I · Posture
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  Six things that{" "}
                  <span className="font-serif-italic">are already true.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {POSTURE.map((p, i) => (
              <Reveal key={p.k} delay={i * 50}>
                <li
                  className="nc-card rounded-2xl p-6 h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.55) 0%, rgba(12,11,16,0.7) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-violet/75">
                      § I·{p.k}
                    </span>
                    <span className="small-caps text-[9.5px] tracking-[0.32em] text-forest">
                      ✓ Live
                    </span>
                  </div>
                  <h3 className="font-serif-display text-xl text-ink leading-tight">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-muted font-serif-book">
                    {p.b}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── Scope ───── */}
        <section className="mx-auto max-w-6xl pb-20 pt-16">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § II · Scope
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  In scope, and{" "}
                  <span className="font-serif-italic">deliberately not.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Reveal delay={80}>
              <div>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full"
                    style={{
                      background: "var(--forest)",
                      boxShadow: "0 0 10px var(--forest-glow)",
                    }}
                  />
                  <span className="small-caps text-[10px] tracking-[0.32em] text-forest">
                    In scope —
                  </span>
                </div>
                <ul className="space-y-3 text-[15.5px] leading-[1.7] text-ink-soft font-serif-book">
                  {IN_SCOPE.map((item) => (
                    <li
                      key={item}
                      className="grid grid-cols-[auto_1fr] gap-3 items-baseline hairline-top pt-3"
                    >
                      <span className="font-mono-numeric text-[10px] text-forest/70">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full"
                    style={{
                      background: "var(--vermillion)",
                      boxShadow: "0 0 10px rgba(255,94,103,0.45)",
                    }}
                  />
                  <span className="small-caps text-[10px] tracking-[0.32em] text-vermillion/90">
                    Out of scope —
                  </span>
                </div>
                <ul className="space-y-5">
                  {OUT_OF_SCOPE.map((o) => (
                    <li key={o.t} className="hairline-top pt-3">
                      <div className="font-serif-display text-[17px] text-ink leading-snug">
                        {o.t}.
                      </div>
                      <p className="mt-1.5 text-[14px] leading-[1.65] text-ink-muted font-serif-book">
                        {o.b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── Asks ───── */}
        <section className="mx-auto max-w-5xl pb-24 pt-16">
          <Reveal>
            <header className="mb-8">
              <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                § III · Asks
              </div>
              <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                What we ask of{" "}
                <span className="font-serif-italic">researchers.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                Security research is welcome and appreciated. The asks below are
                standing — they are the conditions under which a finding is read,
                acknowledged, and resolved without escalation.
              </p>
            </header>
          </Reveal>
          <ol className="space-y-4">
            {ASKS.map((a, i) => (
              <Reveal key={i} delay={i * 50}>
                <li
                  className="nc-card rounded-2xl px-6 py-5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.45) 0%, rgba(12,11,16,0.65) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
                    <span className="font-mono-numeric text-[11px] tracking-[0.18em] text-gold/65">
                      § III·{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15.5px] leading-[1.7] text-ink-soft font-serif-book">
                      {a}
                    </span>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={400}>
            <div className="mt-12 rounded-2xl px-6 py-5 hairline-top pt-6">
              <p className="text-[14.5px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
                Reports filed in good faith — even those that turn out to be informational
                or out-of-scope — receive a written reading and a thank-you on the file.
                We don't operate a paid bug-bounty programme today; we acknowledge
                researchers in dispatches, with their permission, when a finding ships
                a fix.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ───── Coda ───── */}
        <section className="mx-auto max-w-3xl pb-24 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              — companion documents —
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/verification"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12.5px]"
              >
                Letter of Authorization
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/privacy"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Privacy policy
              </Link>
              <Link
                href="/subprocessors"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Subprocessors
              </Link>
              <Link
                href="/.well-known/security.txt"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                security.txt
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
