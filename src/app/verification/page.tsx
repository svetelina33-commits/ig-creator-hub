import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import { MetaSeal } from "@/components/MetaSeal";
import { NexusSeal } from "@/components/NexusSeal";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { META_APPROVAL } from "@/lib/verification";

export const metadata = {
  title: "Certificate of approval · Nexus Club",
  description:
    "An open record of how Nexus Club is integrated with Meta's Instagram Graph API — what was approved, what we can do, what we never see, and how a member revokes access at any moment.",
};

export default async function VerificationPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* ===== MASTHEAD ===== */}
        <section className="mx-auto max-w-6xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="VERIFICATION · DEPOSITED"
              center="· · ·"
              right={`№ ${META_APPROVAL.partnerRef}`}
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <h1 className="font-serif-display text-[clamp(3rem,8vw,6.75rem)] leading-[0.92] text-ink">
                  Certificate
                  <br />
                  <span className="font-serif-italic">of approval.</span>
                </h1>
              </Reveal>
              <Reveal delay={280}>
                <p className="mt-8 max-w-2xl text-[16.5px] leading-[1.7] text-ink-muted font-serif-book">
                  An open record of how Nexus Club is integrated with{" "}
                  <span className="font-serif-italic text-ink-soft">
                    Meta&apos;s Instagram Graph API
                  </span>
                  : what was approved, the scopes granted, what we never see, and how a member
                  closes the window — at any moment, from their own device.
                </p>
              </Reveal>
              <Reveal delay={420}>
                <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
                  We publish this in long form because a checkmark badge tells you nothing.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-4 flex justify-center lg:justify-end">
              <MetaSeal size="lg" />
            </Reveal>
          </div>
        </section>

        {/* ===== SUMMARY LEDGER ===== */}
        <section className="mx-auto max-w-6xl pb-16 hairline-top pt-12">
          <Reveal>
            <div className="small-caps text-[10px] tracking-[0.32em] text-ink-faint mb-6">
              At a glance · summary ledger
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-hairline rounded-2xl overflow-hidden">
            <LedgerCell kicker="Status" value="Approved · in good standing" tone="forest" />
            <LedgerCell kicker="Approved on" value={META_APPROVAL.approvedOnDisplay} />
            <LedgerCell kicker="Login type" value={META_APPROVAL.loginType} />
            <LedgerCell
              kicker="Partner reference"
              value={`№ ${META_APPROVAL.partnerRef}`}
              mono
            />
            <LedgerCell kicker="API" value={META_APPROVAL.apiName} />
            <LedgerCell
              kicker="Issued to"
              value={
                <>
                  Nexus Club{" "}
                  <span className="text-ink-faint font-mono-numeric ml-1">
                    · ig-creator-hub
                  </span>
                </>
              }
            />
          </div>
        </section>

        {/* ===== §I — Granted ===== */}
        <Section
          number="I"
          kicker="Granted"
          title={
            <>
              What was <span className="font-serif-italic">approved.</span>
            </>
          }
        >
          <p className="text-[16.5px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            Three permissions, scoped to Instagram Business and Creator accounts. Nothing more.
            Nothing reaches a personal account, a non-IG product, or a different graph. Each
            permission is named below in the exact form Meta uses internally — so you can audit
            our claim against{" "}
            <a
              href="https://developers.facebook.com/docs/permissions/reference"
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest underline underline-offset-4 decoration-forest/40 hover:decoration-forest"
            >
              Meta&apos;s permission reference
            </a>{" "}
            in seconds.
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {META_APPROVAL.scopes.map((s, i) => (
              <li key={s.handle} className="glass rounded-2xl p-6 relative">
                <div className="flex items-baseline justify-between gap-3 mb-4">
                  <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint">
                    §I·{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="small-caps text-[9.5px] tracking-[0.32em] text-forest">
                    ◆ Granted
                  </span>
                </div>
                <div className="font-serif-display text-2xl text-ink leading-tight">
                  {s.title}
                </div>
                <code className="mt-3 block font-mono-numeric text-[11.5px] text-forest/90 leading-[1.5] break-all">
                  {s.handle}
                </code>
                <p className="mt-4 text-[13.5px] leading-[1.65] text-ink-muted font-serif-book">
                  {s.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ===== §II — In practice ===== */}
        <Section
          number="II"
          kicker="In practice"
          title={
            <>
              What it <span className="font-serif-italic">means</span> when you connect.
            </>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-[16.5px] leading-[1.75] text-ink-muted font-serif-book">
                When you sign your first Nexus campaign contract, the publishing window opens.
                Meta&apos;s consent screen appears once — their screen, their wording, their
                checkbox — and you authorize the scopes named in §I. We receive a long-lived
                token, encrypt it, and use it strictly within the brief you countersigned.
              </p>
              <p className="mt-5 text-[16.5px] leading-[1.75] text-ink-muted font-serif-book">
                When the campaign delivers, the window closes automatically. The token is not
                refreshed; it is allowed to expire. If you want to remove access sooner, see §IV
                — it takes about ten seconds.
              </p>
            </div>
            <ol className="lg:col-span-5 space-y-5">
              <FlowStep
                n="i"
                title="Counter-signature"
                body="The campaign contract names the access window in writing — start, end, scoped to one campaign."
              />
              <FlowStep
                n="ii"
                title="Meta consent"
                body="One tap on Instagram&rsquo;s own consent screen. We never see the password."
              />
              <FlowStep
                n="iii"
                title="Editorial publish"
                body="Posts run from a brief you signed; every action goes into a timestamped log."
              />
              <FlowStep
                n="iv"
                title="Window closes"
                body="On final delivery, the token is allowed to expire. Not retained."
              />
            </ol>
          </div>
        </Section>

        {/* ===== §III — Negative space ===== */}
        <Section
          number="III"
          kicker="Negative space"
          title={
            <>
              What we <span className="font-serif-italic">never</span> see.
            </>
          }
        >
          <p className="text-[16.5px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            The most credible trust signal is what an integration doesn&apos;t touch. Each line
            below is a deliberate negative — a permission we did not request and a behavior our
            app does not contain.
          </p>
          <ul className="mt-10 space-y-px bg-hairline rounded-2xl overflow-hidden">
            {META_APPROVAL.doesNot.map((line, i) => (
              <li
                key={line}
                className="bg-paper-raised/60 px-5 sm:px-7 py-5 grid grid-cols-[auto_auto_1fr] items-baseline gap-4 sm:gap-6"
              >
                <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint w-8">
                  §III·{(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="small-caps text-[10px] tracking-[0.32em] text-vermillion shrink-0">
                  ◇ Never
                </span>
                <span className="text-[14.5px] sm:text-[15px] leading-[1.55] text-ink-soft font-serif-book">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ===== §IV — Revocation ===== */}
        <Section
          number="IV"
          kicker="Revocation"
          title={
            <>
              How to <span className="font-serif-italic">close</span> the window.
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
                Path A · From Nexus Club
              </div>
              <ol className="space-y-4 text-[14.5px] leading-[1.65] text-ink-muted font-serif-book">
                <RevokeLine n="i">
                  Sign in →{" "}
                  <Link href="/dashboard" className="text-forest underline underline-offset-4">
                    Dashboard
                  </Link>
                </RevokeLine>
                <RevokeLine n="ii">Open the publishing concierge card</RevokeLine>
                <RevokeLine n="iii">Tap <em className="font-serif-italic">Remove handle</em></RevokeLine>
              </ol>
            </div>
            <div>
              <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
                Path B · Direct from Instagram
              </div>
              <ol className="space-y-4 text-[14.5px] leading-[1.65] text-ink-muted font-serif-book">
                <RevokeLine n="i">
                  Instagram app → <em className="font-serif-italic">Settings &amp; privacy</em>
                </RevokeLine>
                <RevokeLine n="ii">
                  <em className="font-serif-italic">Apps and websites</em>
                </RevokeLine>
                <RevokeLine n="iii">
                  Find <em className="font-serif-italic">Nexus Club</em> → <em className="font-serif-italic">Remove</em>
                </RevokeLine>
              </ol>
            </div>
          </div>
          <p className="mt-10 text-[13.5px] leading-[1.65] text-ink-muted font-serif-book max-w-2xl">
            Either path is final and immediate. Path B does not require us — Meta&apos;s own
            settings can sever the connection without our involvement, which is the right
            architecture for trust.
          </p>
        </Section>

        {/* ===== §V — Reference ===== */}
        <Section
          number="V"
          kicker="Reference"
          title={
            <>
              The paper <span className="font-serif-italic">trail.</span>
            </>
          }
          last
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
              <p>
                For independent verification, every field on this page is internally consistent
                with the audit log we deliver after each campaign and with Meta&apos;s own
                permissions reference. If you encounter a discrepancy — anywhere, ever — write
                to the editor and we&apos;ll publish a correction in this same place.
              </p>
              <p>
                The Nexus Club editorial desk:{" "}
                <a
                  href="mailto:yashpanchalsx@gmail.com"
                  className="text-forest underline underline-offset-4 decoration-forest/40 hover:decoration-forest"
                >
                  yashpanchalsx@gmail.com
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-5">
                  <NexusSeal size="sm" />
                  <span className="font-serif-italic text-[14px] text-ink-faint">×</span>
                  <MetaSeal size="sm" />
                </div>
                <div className="font-serif-display text-xl text-ink leading-tight">
                  Issuer × Approver
                </div>
                <p className="mt-2 text-[13px] leading-[1.6] text-ink-muted font-serif-book">
                  Two seals on every certificate: ours, and Meta&apos;s App Review approval.
                  Both are present for a reason — neither is sufficient on its own.
                </p>
                <dl className="mt-5 space-y-2.5 text-[12px]">
                  <Pair label="Issued" value={META_APPROVAL.approvedOnRoman} mono />
                  <Pair label="Reference" value={META_APPROVAL.partnerRef} mono />
                  <Pair label="Reviewer" value={META_APPROVAL.reviewer} />
                  <Pair label="Standing" value="In good standing" tone="forest" />
                </dl>
              </div>
            </div>
          </div>
        </Section>

        {/* ===== Closing ===== */}
        <section className="mx-auto max-w-4xl py-24 text-center">
          <Reveal>
            <h2 className="font-serif-display text-5xl sm:text-6xl text-ink leading-[0.95]">
              Connect when
              <br />
              <span className="font-serif-italic">your contract opens.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-[15px] leading-[1.7] text-ink-muted font-serif-book">
              Until then there is nothing for you to configure. The certificate above isn&apos;t
              decoration — it&apos;s the document we want you to read before you ever see Meta&apos;s
              consent screen.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/campaigns"
                className="btn-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-wide"
              >
                Browse open campaigns
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/how-it-works"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px]"
              >
                How it works
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}

/* ---------------- internal pieces ---------------- */

function Section({
  number,
  kicker,
  title,
  children,
  last,
}: {
  number: string;
  kicker: string;
  title: React.ReactNode;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`mx-auto max-w-6xl ${last ? "pb-12" : "pb-20"} pt-16 hairline-top`}
    >
      <Reveal>
        <header className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-3">
            <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              §{number} · {kicker}
            </div>
            <div className="mt-2 font-serif-display text-[5rem] leading-none text-violet">
              {number}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10 md:border-l md:border-hairline">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight max-w-2xl">
              {title}
            </h2>
          </div>
        </header>
      </Reveal>
      <Reveal delay={120}>
        <div className="md:pl-[calc(25%+2.5rem)]">{children}</div>
      </Reveal>
    </section>
  );
}

function LedgerCell({
  kicker,
  value,
  tone,
  mono,
}: {
  kicker: string;
  value: React.ReactNode;
  tone?: "forest";
  mono?: boolean;
}) {
  const valueClass = `${mono ? "font-mono-numeric tracking-[0.04em]" : "font-serif-book"} ${
    tone === "forest" ? "text-forest" : "text-ink"
  }`;
  return (
    <div className="bg-paper-raised/55 px-5 sm:px-6 py-5">
      <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">{kicker}</div>
      <div className={`mt-2 text-[15.5px] leading-[1.4] ${valueClass}`}>{value}</div>
    </div>
  );
}

function FlowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
      <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint w-6 text-right">
        {n}.
      </span>
      <div className="min-w-0">
        <div className="text-ink text-[14px] font-serif-display leading-snug mb-0.5">
          {title}
        </div>
        <div
          className="text-ink-muted text-[13px] leading-[1.6] font-serif-book"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </li>
  );
}

function RevokeLine({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
      <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint">
        {n}.
      </span>
      <span>{children}</span>
    </li>
  );
}

function Pair({
  label,
  value,
  mono,
  tone,
}: {
  label: string;
  value: string;
  mono?: boolean;
  tone?: "forest";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">{label}</dt>
      <dd
        className={`${mono ? "font-mono-numeric" : "font-serif-book"} ${
          tone === "forest" ? "text-forest" : "text-ink-soft"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
