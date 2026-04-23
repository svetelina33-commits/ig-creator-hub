import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy · Nexus Club",
};

export default function PrivacyPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Privacy
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                <span className="font-serif-italic">Privacy</span>, plainly.
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-20
            </span>
          </div>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="What we collect">
              <p>
                When you join Nexus Club we collect your <em>email address</em> and a
                hashed password. If you connect an Instagram account, we also store your
                Instagram user ID, username, account type, and an encrypted long-lived
                access token issued by Meta. Application notes you write are stored with
                the campaign you applied to.
              </p>
            </Section>

            <Section n="II" title="What we do not collect">
              <p>
                We do not see or store your Instagram password. We do not scrape your
                Instagram content outside of what Meta's official APIs return with your
                consent. We do not sell your data to third parties.
              </p>
            </Section>

            <Section n="III" title="How Instagram access works">
              <p>
                Connection uses Meta's official OAuth flow. When you click "Connect
                Instagram" you are sent to Instagram's consent screen, which lists the
                exact permissions requested. On approval Meta returns a short-lived
                access token, which we exchange for a long-lived token (~60 days) and
                encrypt at rest with AES-256-GCM.
              </p>
              <p>
                You can revoke access at any time in Instagram → Settings → Apps and
                websites, or by clicking "Disconnect" in your dashboard.
              </p>
            </Section>

            <Section n="IV" title="How Gmail access works">
              <p>
                When you choose to connect Gmail, Nexus Club requests the single scope
                {" "}<code className="font-mono-numeric text-forest">gmail.send</code>{" "}
                via Google's OAuth flow. This lets us send email from your address for approved
                campaigns <em>only</em>. We cannot read your inbox, drafts, or sent folder.
              </p>
              <p>
                Refresh tokens are encrypted at rest with AES-256-GCM. Revoke access at{" "}
                <a className="link-ed" href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer">
                  myaccount.google.com/permissions
                </a>{" "}
                — no sign-in with us required.
              </p>
            </Section>

            <Section n="V" title="Email">
              <p>
                We send transactional email — welcomes, application updates, password
                resets — through our email provider. We do not run a marketing list.
              </p>
            </Section>

            <Section n="VI" title="Your rights">
              <p>
                Write to{" "}
                <a href="mailto:yashpanchalsx@gmail.com" className="link-ed">
                  yashpanchalsx@gmail.com
                </a>{" "}
                to request a copy, correction, or deletion of your data. We respond
                within thirty days.
              </p>
            </Section>

            <Section n="VII" title="Cookies">
              <p>
                We use a single session cookie to keep you signed in. It is
                HTTP-only and signed. No third-party analytics or advertising cookies.
              </p>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/terms" className="hover:text-ink">
              Read the terms →
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
