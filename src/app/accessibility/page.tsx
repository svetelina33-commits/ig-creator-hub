import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Accessibility · Nexus Club",
  description:
    "Our standing commitment to WCAG 2.1 AA, what we have not solved yet, and how to write to us when something is in the way.",
};

export default function AccessibilityPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Access
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                A door,{" "}
                <span className="font-serif-italic">held open.</span>
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-30
            </span>
          </div>

          <p className="mb-10 text-[16px] leading-[1.75] text-ink-muted font-serif-book drop-cap">
            A members' club is only a club if its door opens. We design Nexus Club to be
            navigable by keyboard, legible to screen readers, and readable at the type
            sizes a working day asks for. Below is what we hold ourselves to, where we
            currently fall short, and the route to write to us when something blocks
            you. We answer.
          </p>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="The standard">
              <p>
                We hold ourselves to the Web Content Accessibility Guidelines (WCAG) 2.1
                at conformance level AA. The standard is not a ceiling — it is a floor
                we keep checking against, page by page, as the site grows.
              </p>
            </Section>

            <Section n="II" title="What we already do">
              <p>
                Every interactive control reaches by keyboard alone. Focus is visible —
                a violet outline, two pixels, on every focusable element. Motion respects
                the <code className="font-mono-numeric text-forest">prefers-reduced-motion</code>{" "}
                operating-system preference; the ambient orbs, breathing buttons, and
                animated reveals all stop when the system asks them to. Form inputs are
                labelled, form errors are announced, and headings nest in order.
              </p>
              <p>
                Type is set at sixteen pixels minimum, with a body line-height generous
                enough for low-vision reading. Colour contrast against the paper-near-black
                background is checked at design time — body text exceeds 7:1, accent text
                clears 4.5:1.
              </p>
            </Section>

            <Section n="III" title="Where we currently fall short">
              <p>
                Honesty serves a member better than a clean conformance claim. The known
                gaps:
              </p>
              <ul className="mt-3 space-y-2 list-disc list-outside pl-5 text-ink-muted">
                <li>
                  The campaign cover artwork is generated programmatically and does not
                  always carry a meaningful alt description. We are working through the
                  catalogue.
                </li>
                <li>
                  The command palette (⌘K) is mouse-trivial but keyboard-second-class —
                  arrow-key navigation is in, screen-reader live-region announcements
                  are not yet.
                </li>
                <li>
                  Some editorial flourishes — the running heads, the dot-leader rules —
                  rely on visual character. They are marked aria-hidden, which removes
                  the noise from screen readers but means the small visual "rest beats"
                  in a page do not reach assistive technology.
                </li>
              </ul>
              <p className="mt-3">
                We would rather list these in writing than carry a checkmark we have not
                fully earned.
              </p>
            </Section>

            <Section n="IV" title="Writing to us">
              <p>
                If something on the site blocks you, write to{" "}
                <a className="link-ed" href="mailto:access@thenexusclub.org">
                  access@thenexusclub.org
                </a>
                . Describe what you were doing, what device and assistive technology you
                use, and where the block sat. We answer within five business days, and
                fixes — when small — ship the same week.
              </p>
            </Section>

            <Section n="V" title="What this is, and isn't">
              <p>
                This is a standing commitment. It is not a regulatory compliance
                certificate. We do not engage a third-party auditor for stamps; we do
                read the WCAG checklist, test with screen readers, and treat reported
                blocks as bugs of the highest priority.
              </p>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 flex items-center justify-between text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/trust" className="hover:text-ink">
              ← Trust
            </Link>
            <Link href="/help" className="hover:text-ink">
              Help center →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="flex items-baseline gap-4 mb-3">
        <span className="font-mono-numeric text-[11px] text-ink-faint">§{n}</span>
        <h2 className="font-serif-display text-2xl text-ink">{title}</h2>
      </header>
      <div className="pl-8 text-ink-muted space-y-3">{children}</div>
    </section>
  );
}
