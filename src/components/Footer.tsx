import { Fragment } from "react";
import Link from "next/link";
import { NexusSeal } from "@/components/NexusSeal";
import { EmailLink } from "@/components/EmailLink";
import { META_APPROVAL } from "@/lib/verification";

/* Standing inboxes — role label first, address second.
   Order is the visual order in the footer's "In writing" block. */
const INBOXES = [
  { role: "Members", email: "support@thenexusclub.org" },
  { role: "Brands", email: "brands@thenexusclub.org" },
  { role: "Press", email: "press@thenexusclub.org" },
  { role: "Disclosure", email: "security@thenexusclub.org" },
  { role: "Escalation", email: "disputes@thenexusclub.org" },
] as const;

/* Standing-document shelf — every policy on one rail.
   Pulled out of the JSX so the separator render loop can iterate. */
const SHELF = [
  { href: "/house-rules", label: "House rules" },
  { href: "/community-guidelines", label: "Community guidelines" },
  { href: "/code-of-conduct", label: "Code of conduct" },
  { href: "/standards", label: "Editorial standards" },
  { href: "/disputes", label: "Disputes" },
  { href: "/security", label: "Security" },
  { href: "/subprocessors", label: "Subprocessors" },
  { href: "/dpa", label: "DPA" },
  { href: "/terms-brands", label: "Brand terms" },
  { href: "/copyright", label: "Copyright" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const;

/**
 * Editorial footer — five bands.
 *
 *   ① Centerpiece — seal, tagline, Meta Authorized Partner stamp.
 *   ② Primary nav pill — the public surface of the site.
 *   ③ Policies sub-row — every standing document on one shelf.
 *   ④ Contact strip — Singapore registered entity + standing inboxes.
 *   ⑤ Bottom rule — Founded MMXXVI · VOL. I · security.txt · sitemap.
 */
export function Footer() {
  return (
    <footer className="mt-32 px-6 sm:px-10 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="nc-flourish mb-12" aria-hidden />

        {/* ── ① Centerpiece seal ────────────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <NexusSeal size="lg" />
          <div className="space-y-2">
            <p className="font-serif-italic text-2xl text-ink">
              Nexus{" "}
              <span className="font-serif-display small-caps text-[13px] tracking-[0.3em] text-ink-muted align-middle ml-1">
                Club
              </span>
            </p>
            <p className="small-caps text-[10px] tracking-[0.35em] text-ink-muted">
              A private network for creators with a voice
            </p>
          </div>

          {/* Authorized partner stamp — links to the Letter of Authorization */}
          <Link
            href="/verification"
            className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-full group transition-colors"
            style={{
              background:
                "linear-gradient(90deg, rgba(231,206,148,0.04), rgba(231,206,148,0.08), rgba(231,206,148,0.04))",
              boxShadow: "inset 0 0 0 1px rgba(231,206,148,0.22)",
            }}
          >
            <span
              aria-hidden
              className="block w-1.5 h-1.5 rounded-full bg-gold"
              style={{ boxShadow: "0 0 8px rgba(231,206,148,0.55)" }}
            />
            <span className="small-caps text-[10px] tracking-[0.32em] text-gold/85 group-hover:text-gold transition-colors">
              Authorized · Instagram Graph API Partner
              <span className="text-gold/40 mx-1.5">·</span>
              <span className="font-mono-numeric tracking-[0.18em]">
                № {META_APPROVAL.partnerRef}
              </span>
            </span>
          </Link>
        </div>

        {/* ── ② Primary nav pill ────────────────────────────────── */}
        <div className="glass rounded-3xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-ink-muted">
          <span className="font-mono-numeric text-[12px] tracking-[0.18em] text-ink-faint">
            Founded MMXXVI · Singapore · VOL. I
          </span>
          <div className="flex items-center gap-5 sm:gap-7 font-mono-numeric flex-wrap text-[12px] tracking-[0.14em]">
            <a href="/about" className="hover:text-ink transition-colors">
              ABOUT
            </a>
            <a href="/how-it-works" className="hover:text-ink transition-colors">
              HOW IT WORKS
            </a>
            <a href="/curation" className="hover:text-ink transition-colors">
              CURATION
            </a>
            <a href="/dispatches" className="hover:text-ink transition-colors">
              DISPATCHES
            </a>
            <a href="/trust" className="hover:text-ink transition-colors text-gold/85">
              TRUST
            </a>
            <a href="/help" className="hover:text-ink transition-colors">
              HELP
            </a>
          </div>
        </div>

        {/* ── ③ Policies sub-row — every standing document on one shelf.
                Vertical hairline separator between entries so the row reads
                as a discrete list, not a run-on sentence. ────────────── */}
        <div className="mt-6 px-1 sm:px-3">
          <div className="small-caps text-[10px] tracking-[0.32em] text-ink-faint mb-3">
            On the shelf —
          </div>
          <nav
            aria-label="Policies and standing documents"
            className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2 font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint uppercase"
          >
            {SHELF.map((item, i) => (
              <Fragment key={item.href}>
                {i > 0 && <span aria-hidden className="nc-sep-v" />}
                <FootLink href={item.href}>{item.label}</FootLink>
              </Fragment>
            ))}
          </nav>
        </div>

        {/* ── ④ Contact strip — entity (Singapore registered) + inboxes ─── */}
        <div className="mt-10 hairline-top pt-10 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12">
          {/* Of record — Singapore registered office.
              The address below is the registered office on record with the
              Accounting and Corporate Regulatory Authority (ACRA).
              TODO: swap the UEN placeholder for the real ACRA-issued number. */}
          <div className="md:col-span-7 md:pr-10 md:hairline-fade-right">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                Of record
              </span>
              <span aria-hidden className="text-ink-ghost">·</span>
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-mono-numeric text-[9.5px] tracking-[0.22em] uppercase"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(231,206,148,0.05), rgba(231,206,148,0.09), rgba(231,206,148,0.05))",
                  boxShadow: "inset 0 0 0 1px rgba(231,206,148,0.22)",
                  color: "rgba(231,206,148,0.85)",
                }}
              >
                <span
                  aria-hidden
                  className="block w-1 h-1 rounded-full bg-gold"
                  style={{ boxShadow: "0 0 6px rgba(231,206,148,0.55)" }}
                />
                Singapore
              </span>
            </div>
            <p className="font-serif-italic text-[19px] text-ink-soft leading-snug tracking-[-0.005em]">
              The Nexus Club Agency Pte. Ltd.
            </p>
            <address className="mt-3 not-italic font-serif-book text-[12.5px] text-ink-faint leading-[1.7]">
              {/* TODO — replace UEN with the real ACRA-issued number */}
              <span>Incorporated 28 January 2026</span>
              <span aria-hidden className="text-ink-ghost mx-2">·</span>
              <span className="font-mono-numeric text-[11px] tracking-[0.06em] text-ink-soft/80">
                UEN 202612345A
              </span>
              <br />
              <span>138 Robinson Road, #20-04 · Singapore 068906</span>
            </address>
            <p className="mt-4 small-caps text-[10px] tracking-[0.28em] text-ink-faint">
              Registered under the Singapore Companies Act, 1967
            </p>
          </div>

          {/* In writing — standing inboxes.
              Right-anchored on desktop within the col-span-5 grid cell so the
              tight key-value block sits flush with the footer's right edge.
              On narrow screens the role/email pairs stack into a directory
              listing rather than overflowing horizontally. */}
          <div className="md:col-span-5 md:flex md:justify-end">
            <div>
              <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-4">
                In writing
              </div>
              <ul className="space-y-2.5">
                {INBOXES.map(({ role, email }) => (
                  <li
                    key={email}
                    className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span className="small-caps text-[9.5px] tracking-[0.28em] text-ink-faint sm:min-w-[5.75rem] mb-0.5 sm:mb-0">
                      {role}
                    </span>
                    <EmailLink
                      email={email}
                      className="font-mono-numeric text-[11px] tracking-[0.04em] text-ink-soft hover:text-ink transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── ⑤ Bottom rule ──────────────────────────────────────── */}
        <div className="mt-10 pt-5 hairline-fade-top flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="text-[11.5px] text-ink-faint font-serif-book leading-relaxed">
            <span className="font-mono-numeric tracking-[0.14em] text-ink-soft/85">
              28·I·MMXXVI
            </span>
            <span aria-hidden className="text-ink-ghost mx-2">·</span>
            Founded in Singapore
            <span aria-hidden className="text-ink-ghost mx-2">·</span>
            © {new Date().getFullYear()} The Nexus Club Agency Pte. Ltd.
          </span>
          <span className="font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint uppercase">
            {/* security.txt and sitemap.xml are static files in /public,
                so use plain anchors — Next's Link tries client-side
                navigation and silently fails on non-React resources. */}
            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              security.txt
            </a>
            <span aria-hidden className="text-ink-ghost mx-2">·</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink transition-colors"
            >
              sitemap
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-ink transition-colors whitespace-nowrap"
    >
      {children}
    </Link>
  );
}

