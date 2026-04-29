import Link from "next/link";
import { NexusSeal } from "@/components/NexusSeal";
import { META_APPROVAL } from "@/lib/verification";

/**
 * Editorial footer.
 *
 * Three bands:
 *   ① Centerpiece — seal, tagline, Meta Authorized Partner stamp.
 *   ② Primary nav pill — the public surface of the site (About, Trust, etc).
 *   ③ Policies sub-row — every standing document on one shelf (House rules,
 *      Community guidelines, Code of conduct, Standards, Disputes, etc.)
 *   ④ Contact strip — entity placeholder, inboxes, social icons.
 *   ⑤ Bottom rule — EST. MMXXVI · VOL. I.
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
            EST. MMXXVI · VOL. I
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

        {/* ── ③ Policies sub-row — every standing document on one shelf ─── */}
        <div className="mt-6 px-1 sm:px-3">
          <div className="small-caps text-[10px] tracking-[0.32em] text-ink-faint mb-3">
            On the shelf —
          </div>
          <nav
            aria-label="Policies and standing documents"
            className="flex flex-wrap gap-x-5 sm:gap-x-7 gap-y-2 font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint uppercase"
          >
            <FootLink href="/house-rules">House rules</FootLink>
            <FootLink href="/community-guidelines">Community guidelines</FootLink>
            <FootLink href="/code-of-conduct">Code of conduct</FootLink>
            <FootLink href="/standards">Editorial standards</FootLink>
            <FootLink href="/disputes">Disputes</FootLink>
            <FootLink href="/security">Security</FootLink>
            <FootLink href="/subprocessors">Subprocessors</FootLink>
            <FootLink href="/dpa">DPA</FootLink>
            <FootLink href="/terms-brands">Brand terms</FootLink>
            <FootLink href="/copyright">Copyright</FootLink>
            <FootLink href="/accessibility">Accessibility</FootLink>
            <FootLink href="/terms">Terms</FootLink>
            <FootLink href="/privacy">Privacy</FootLink>
          </nav>
        </div>

        {/* ── ④ Contact strip — entity, inboxes, social ─────────── */}
        <div className="mt-10 hairline-top pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left — legal entity placeholder.
              FILL: replace bracketed values with the registered entity, address,
              and country of incorporation. */}
          <div className="md:col-span-5">
            <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
              Of record
            </div>
            <p className="font-serif-italic text-[15px] text-ink-soft leading-snug">
              The Nexus Club Agency
            </p>
            <p className="mt-1 font-mono-numeric text-[10.5px] tracking-[0.14em] text-ink-faint leading-[1.6]">
              {/* TODO: replace with registered entity name + address */}
              [ Registered entity ] · [ Address line ]
              <br />
              [ City, region · country ]
            </p>
          </div>

          {/* Middle — inboxes */}
          <div className="md:col-span-4">
            <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
              In writing
            </div>
            <ul className="space-y-1.5 font-mono-numeric text-[11px] tracking-[0.04em] text-ink-soft">
              <li>
                <a href="mailto:support@thenexusclub.org" className="hover:text-ink">
                  support@thenexusclub.org
                </a>
                <span className="text-ink-faint"> · members</span>
              </li>
              <li>
                <a href="mailto:brands@thenexusclub.org" className="hover:text-ink">
                  brands@thenexusclub.org
                </a>
                <span className="text-ink-faint"> · brands</span>
              </li>
              <li>
                <a href="mailto:press@thenexusclub.org" className="hover:text-ink">
                  press@thenexusclub.org
                </a>
                <span className="text-ink-faint"> · press</span>
              </li>
              <li>
                <a href="mailto:security@thenexusclub.org" className="hover:text-ink">
                  security@thenexusclub.org
                </a>
                <span className="text-ink-faint"> · disclosure</span>
              </li>
              <li>
                <a href="mailto:disputes@thenexusclub.org" className="hover:text-ink">
                  disputes@thenexusclub.org
                </a>
                <span className="text-ink-faint"> · escalation</span>
              </li>
            </ul>
          </div>

          {/* Right — verified social.
              FILL: swap the placeholder hrefs to your actual handles. */}
          <div className="md:col-span-3">
            <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
              In public
            </div>
            <div className="flex items-center gap-3">
              {/* TODO: replace # with actual Instagram URL */}
              <SocialIcon
                href="https://www.instagram.com/thenexusclub.org"
                label="Nexus Club on Instagram"
              >
                <InstagramGlyph />
              </SocialIcon>
              {/* TODO: replace # with actual LinkedIn URL */}
              <SocialIcon
                href="https://www.linkedin.com/company/the-nexus-club"
                label="Nexus Club on LinkedIn"
              >
                <LinkedInGlyph />
              </SocialIcon>
              {/* TODO: replace # with actual X / Threads URL */}
              <SocialIcon
                href="https://x.com/thenexusclub"
                label="Nexus Club on X"
              >
                <XGlyph />
              </SocialIcon>
            </div>
            <p className="mt-4 font-mono-numeric text-[10px] tracking-[0.16em] text-ink-faint leading-[1.6]">
              Members do not share other members' details on social media or any other
              public domain — see <Link href="/house-rules" className="hover:text-ink">house rules</Link>.
            </p>
          </div>
        </div>

        {/* ── ⑤ Bottom rule ──────────────────────────────────────── */}
        <div className="mt-10 pt-5 hairline-top flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-mono-numeric text-[10.5px] tracking-[0.18em] text-ink-faint">
            EST. MMXXVI · VOL. I · {new Date().getFullYear()} The Nexus Club Agency.
          </span>
          <span className="font-mono-numeric text-[10.5px] tracking-[0.18em] text-ink-faint">
            <Link href="/.well-known/security.txt" className="hover:text-ink">
              security.txt
            </Link>
            <span className="text-ink-ghost mx-2">·</span>
            <Link href="/sitemap.xml" className="hover:text-ink">
              sitemap
            </Link>
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

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full glass glass-hover inline-flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
    >
      {children}
    </a>
  );
}

/* ─── small SVG glyphs ─────────────────────────────────────────── */

function InstagramGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="7.5" y1="10" x2="7.5" y2="17" />
      <circle cx="7.5" cy="6.8" r="0.8" fill="currentColor" />
      <path d="M11.5 17v-7M11.5 12.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5V17" />
    </svg>
  );
}

function XGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width="13"
      height="13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}
