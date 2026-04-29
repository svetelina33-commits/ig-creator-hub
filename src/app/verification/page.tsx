import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import { MetaCredential } from "@/components/MetaCredential";
import { NexusSeal } from "@/components/NexusSeal";
import { MetaSeal } from "@/components/MetaSeal";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { META_APPROVAL } from "@/lib/verification";

export const metadata = {
  title: "Letter of Authorization · The Nexus Club Agency",
  description:
    "The Nexus Club Agency is on the Authorized Partners Register of Meta's Instagram Graph API program. This document records the scope, issuance, and terms of that authorization.",
};

export default async function VerificationPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative">
        {/* ════════════════════ MASTHEAD ════════════════════ */}
        <section className="mx-auto max-w-7xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="AUTHORIZED PARTNERS REGISTER"
              center="· · ·"
              right={`LETTER № ${META_APPROVAL.partnerRef}`}
            />
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <h1 className="font-serif-display text-[clamp(2.8rem,7.4vw,6.4rem)] leading-[0.92] tracking-tight text-ink">
                  Letter of
                  <br />
                  <span className="font-serif-italic text-gold/95">authorization.</span>
                </h1>
              </Reveal>
              <Reveal delay={280}>
                <p className="mt-8 max-w-2xl text-[16px] leading-[1.7] text-ink-muted font-serif-book">
                  This letter records that{" "}
                  <span className="font-serif-italic text-ink">
                    {META_APPROVAL.holderName}
                  </span>{" "}
                  is on Meta&apos;s {META_APPROVAL.programName} for the{" "}
                  {META_APPROVAL.apiName} program. Authorization was issued under{" "}
                  {META_APPROVAL.programLong} on {META_APPROVAL.approvedOnDisplay}, against the
                  reference number recorded below.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
                  Published in long form — a checkmark badge would tell you nothing.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-5 flex justify-center lg:justify-end">
              <MetaSeal size="xl" />
            </Reveal>
          </div>
        </section>

        {/* ════════════════════ THE CREDENTIAL ════════════════════ */}
        <section className="mx-auto max-w-7xl pb-20">
          <Reveal>
            <MetaCredential variant="full" />
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-8 max-w-3xl text-[13px] leading-[1.65] text-ink-faint font-serif-book">
              The credential above is generated from the same source of truth that drives the
              live integration. If a value here is inconsistent with the audit log delivered
              after a campaign, treat the audit log as authoritative and write to the editor —
              corrections are published in this same place, with date.
            </p>
          </Reveal>
        </section>

        {/* ════════════════════ §I · GRANT ════════════════════ */}
        <Section
          number="I"
          kicker="Grant of authorization"
          title={
            <>
              What this authorization{" "}
              <span className="font-serif-italic text-gold/95">grants.</span>
            </>
          }
        >
          <p className="text-[16px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            Three permissions, scoped to Instagram Business and Creator accounts. Each is named
            below in the exact form Meta documents internally — readers can audit our claim
            against{" "}
            <a
              href={META_APPROVAL.metaPermissionsRef}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/90 underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
            >
              Meta&apos;s permissions reference
            </a>{" "}
            in seconds.
          </p>
          <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {META_APPROVAL.scopes.map((s, i) => (
              <li
                key={s.handle}
                className="nc-card relative overflow-hidden rounded-2xl"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,18,14,0.85) 0%, rgba(12,11,9,0.92) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(231,206,148,0.1), 0 0 0 1px rgba(231,206,148,0.12)",
                }}
              >
                <div
                  className="px-6 py-3 flex items-baseline justify-between"
                  style={{ borderBottom: "1px solid rgba(231,206,148,0.18)" }}
                >
                  <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-gold/65">
                    §I·{(i + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-mono-numeric text-[9.5px] tracking-[0.32em] text-gold/85 uppercase">
                    Granted
                  </span>
                </div>
                <div className="p-6">
                  <div className="font-serif-display text-2xl text-ink leading-tight">
                    {s.title}
                  </div>
                  <code className="mt-3 block font-mono-numeric text-[11.5px] text-gold/85 leading-[1.5] break-all">
                    {s.handle}
                  </code>
                  <p className="mt-4 text-[13.5px] leading-[1.65] text-ink-muted font-serif-book">
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ════════════════════ §II · OPERATIONAL SCOPE ════════════════════ */}
        <Section
          number="II"
          kicker="Operational scope"
          title={
            <>
              How the authorization{" "}
              <span className="font-serif-italic text-gold/95">operates.</span>
            </>
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <p className="text-[16px] leading-[1.75] text-ink-muted font-serif-book">
                The authorization is dormant until the holder counter-signs a campaign
                contract. At that point, Meta&apos;s consent screen presents the named
                permissions to the holder — Meta&apos;s own surface, Meta&apos;s own wording —
                and the holder decides whether to grant access.
              </p>
              <p className="mt-5 text-[16px] leading-[1.75] text-ink-muted font-serif-book">
                The credential is bound to the campaign window stated in the contract.
                On final delivery, the access token is allowed to expire and is not refreshed.
                Inter-campaign retention is not in scope.
              </p>
              <p className="mt-5 text-[15.5px] leading-[1.7] text-ink-soft font-serif-italic">
                The credential exists to publish on a schedule the holder approved — nothing
                broader, nothing longer.
              </p>
            </div>
            <ol className="lg:col-span-5 space-y-5">
              <FlowStep
                n="01"
                title="Counter-signature"
                body="The campaign contract names the access window in writing — start, end, scoped to one campaign — and is signed by the holder."
              />
              <FlowStep
                n="02"
                title="Meta consent"
                body="One tap on Instagram's own consent screen. The holder's password is never seen by the partner."
              />
              <FlowStep
                n="03"
                title="Editorial publishing"
                body="Posts run from the brief the holder approved; every action is written to a timestamped action log."
              />
              <FlowStep
                n="04"
                title="Window expiration"
                body="On final delivery, the access token is allowed to expire. The credential is not renewed across campaigns."
              />
            </ol>
          </div>
        </Section>

        {/* ════════════════════ §III · EXCLUSIONS ════════════════════ */}
        <Section
          number="III"
          kicker="Limits of authorization"
          title={
            <>
              What this authorization{" "}
              <span className="font-serif-italic text-vermillion/90">excludes.</span>
            </>
          }
        >
          <p className="text-[16px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            The most credible signal of an integration is what it does not touch. Each line
            below names a permission that was deliberately not requested under this
            authorization, and a behaviour that is not present in the partner&apos;s
            application.
          </p>
          <ul
            className="mt-10 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(231,206,148,0.08)",
              boxShadow: "0 0 0 1px rgba(231,206,148,0.16)",
            }}
          >
            {META_APPROVAL.doesNot.map((line, i) => (
              <li
                key={line}
                className="px-5 sm:px-7 py-5 grid grid-cols-[auto_auto_1fr] items-baseline gap-4 sm:gap-6"
                style={{
                  background: "rgba(14,12,10,0.85)",
                  borderBottom:
                    i === META_APPROVAL.doesNot.length - 1
                      ? "none"
                      : "1px solid rgba(231,206,148,0.12)",
                }}
              >
                <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint w-8">
                  §III·{(i + 1).toString().padStart(2, "0")}
                </span>
                <span className="small-caps text-[10px] tracking-[0.32em] text-vermillion/90 shrink-0">
                  ◇ Excluded
                </span>
                <span className="text-[14.5px] sm:text-[15px] leading-[1.55] text-ink-soft font-serif-book">
                  {line}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ════════════════════ §IV · REVOCATION ════════════════════ */}
        <Section
          number="IV"
          kicker="Revocation by holder"
          title={
            <>
              How a holder{" "}
              <span className="font-serif-italic text-gold/95">revokes</span> the credential.
            </>
          }
        >
          <p className="text-[16px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            Two paths are documented below. Either is final and immediate. Path B does not
            require the partner — Meta&apos;s own settings sever the credential without
            partner involvement, which is the right architecture for trust.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <RevokeCard
              path="A"
              title="From the Nexus Club dashboard"
              steps={[
                <>
                  Sign in →{" "}
                  <Link
                    href="/dashboard"
                    className="text-gold/90 underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
                  >
                    Dashboard
                  </Link>
                </>,
                <>Open the publishing concierge card</>,
                <>
                  Tap{" "}
                  <em className="font-serif-italic text-ink">Remove handle</em>
                </>,
              ]}
            />
            <RevokeCard
              path="B"
              title="Direct from Instagram"
              steps={[
                <>
                  Instagram app →{" "}
                  <em className="font-serif-italic text-ink">Settings &amp; privacy</em>
                </>,
                <>
                  <em className="font-serif-italic text-ink">Apps and websites</em>
                </>,
                <>
                  Find{" "}
                  <em className="font-serif-italic text-ink">
                    {META_APPROVAL.holderName}
                  </em>{" "}
                  → <em className="font-serif-italic text-ink">Remove</em>
                </>,
              ]}
            />
          </div>
        </Section>

        {/* ════════════════════ §V · AUDIT TRAIL ════════════════════ */}
        <Section
          number="V"
          kicker="Audit trail"
          title={
            <>
              The paper{" "}
              <span className="font-serif-italic text-gold/95">trail.</span>
            </>
          }
          last
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
              <p>
                Every value on this letter is internally consistent with the audit log
                delivered after each campaign and with Meta&apos;s public permissions
                reference. Discrepancies — anywhere, ever — should be sent to the editor;
                corrections are published in this same place with their date of issue.
              </p>
              <p>
                The Nexus Club editorial desk:{" "}
                <a
                  href="mailto:support@thenexusclub.org"
                  className="text-gold/90 underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  support@thenexusclub.org
                </a>
                .
              </p>
            </div>
            <div className="lg:col-span-5">
              <div
                className="nc-card relative rounded-2xl overflow-hidden p-7"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(28,22,14,0.85) 0%, rgba(14,12,10,0.92) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(231,206,148,0.18), 0 0 0 1px rgba(231,206,148,0.18)",
                }}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <NexusSeal size="sm" />
                  <span className="font-serif-italic text-[18px] text-gold/60">×</span>
                  <MetaSeal size="sm" />
                </div>
                <div className="font-serif-display text-2xl text-ink leading-tight">
                  Issuer × Holder
                </div>
                <p className="mt-3 text-[13px] leading-[1.6] text-ink-muted font-serif-book">
                  Two seals on every letter: the holder&apos;s, and Meta&apos;s
                  authorization. Both must be present — neither is sufficient on its own.
                </p>
                <dl className="mt-6 space-y-3 text-[12px]">
                  <Pair label="Reference" value={META_APPROVAL.partnerRef} mono />
                  <Pair label="Issued" value={META_APPROVAL.approvedOnRoman} mono />
                  <Pair label="Holder" value={META_APPROVAL.holderName} />
                  <Pair label="Issuer" value={META_APPROVAL.issuer.name} />
                  <Pair label="Standing" value="On register" tone="gold" />
                </dl>
              </div>
            </div>
          </div>
        </Section>

        {/* ════════════════════ Closing ════════════════════ */}
        <section className="mx-auto max-w-4xl py-24 text-center">
          <Reveal>
            <h2 className="font-serif-display text-5xl sm:text-6xl text-ink leading-[0.95]">
              Connect when
              <br />
              <span className="font-serif-italic text-gold/95">your contract opens.</span>
            </h2>
            <p className="mt-6 max-w-xl mx-auto text-[15px] leading-[1.7] text-ink-muted font-serif-book">
              Until then, no configuration is required. The letter above is the document the
              agency wants every member to read before Meta&apos;s consent screen ever appears.
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

/* ─────────────────── internal pieces ─────────────────── */

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
      className={`mx-auto max-w-7xl ${last ? "pb-12" : "pb-20"} pt-16 hairline-top`}
    >
      <Reveal>
        <header className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 md:col-span-3">
            <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
              §{number} · {kicker}
            </div>
            <div
              className="mt-2 font-serif-display text-[5rem] leading-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(243,224,178,0.95) 0%, rgba(208,155,79,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {number}
            </div>
          </div>
          <div className="col-span-12 md:col-span-9 md:pl-10 md:border-l md:border-hairline">
            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-[44px] text-ink leading-[1.05] max-w-3xl tracking-tight">
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

function FlowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline">
      <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-gold/70 w-8">
        {n}
      </span>
      <div className="min-w-0">
        <div className="text-ink text-[14px] font-serif-display leading-snug mb-0.5">
          {title}
        </div>
        <div className="text-ink-muted text-[13px] leading-[1.6] font-serif-book">
          {body}
        </div>
      </div>
    </li>
  );
}

function RevokeCard({
  path,
  title,
  steps,
}: {
  path: string;
  title: string;
  steps: React.ReactNode[];
}) {
  return (
    <div
      className="nc-card rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(180deg, rgba(20,18,14,0.7) 0%, rgba(12,11,9,0.85) 100%)",
        boxShadow: "inset 0 1px 0 rgba(231,206,148,0.08), 0 0 0 1px rgba(231,206,148,0.1)",
      }}
    >
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <span className="small-caps text-[10px] tracking-[0.3em] text-gold/75">
          Path {path}
        </span>
        <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
          §IV·{path}
        </span>
      </div>
      <div className="font-serif-display text-xl text-ink leading-tight mb-4">{title}</div>
      <ol className="space-y-3 text-[14px] leading-[1.6] text-ink-muted font-serif-book">
        {steps.map((step, i) => (
          <li key={i} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
            <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-gold/55">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
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
  tone?: "gold";
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">{label}</dt>
      <dd
        className={`${mono ? "font-mono-numeric tracking-[0.04em]" : "font-serif-book"} ${
          tone === "gold" ? "text-gold" : "text-ink-soft"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
