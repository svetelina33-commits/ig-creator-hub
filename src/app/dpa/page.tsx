import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Data Processing Addendum · Nexus Club",
  description:
    "GDPR Article 28 processor terms covering the brand-agency relationship: scope, instructions, security, subprocessors, transfers, breach notification, and audit.",
};

export default function DpaPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · DPA
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                Data{" "}
                <span className="font-serif-italic">processing</span> addendum.
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-30
            </span>
          </div>

          <p className="mb-10 text-[16px] leading-[1.75] text-ink-muted font-serif-book">
            This addendum supplements the{" "}
            <Link href="/terms-brands" className="link-ed">
              brand-side terms
            </Link>{" "}
            and applies to any processing of personal data the agency carries out on
            the brand's behalf in connection with a campaign. It is written to satisfy
            Article 28 of the EU General Data Protection Regulation and the parallel
            obligations of the UK GDPR; it is also offered, on a like-for-like basis,
            for processing subject to the California Consumer Privacy Act and the
            Digital Personal Data Protection Act, 2023 (India). Where a more
            prescriptive regime applies, the more prescriptive regime governs.
          </p>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="Definitions">
              <p>
                <em>Controller</em>, <em>Processor</em>, <em>Data Subject</em>,{" "}
                <em>Personal Data</em>, <em>Processing</em>, <em>Subprocessor</em>, and{" "}
                <em>Personal Data Breach</em> have the meanings given to them by the
                applicable data-protection regime. <em>Brand</em> is the Controller;{" "}
                <em>Agency</em> (the Nexus Club Agency) is the Processor. <em>Member</em>{" "}
                refers to a Nexus Club creator engaged on a campaign.
              </p>
            </Section>

            <Section n="II" title="Subject matter and duration">
              <p>
                The agency processes personal data only as necessary to perform the
                campaign described in the brief and to meet its obligations under
                these terms. Processing begins on signature of the first brief and
                ends on the later of: completion of the last live campaign, return or
                deletion of brand-furnished personal data, and any retention required
                by law.
              </p>
            </Section>

            <Section n="III" title="Nature and purpose of processing">
              <p>
                The agency processes personal data to commission, run, deliver, and
                report on campaigns: receiving brief content, communicating with
                members assigned to the brand, scheduling and publishing, recording
                action logs, and producing campaign reporting. The agency does not
                process the brand's personal data for any purpose outside the
                campaign without separate written consent.
              </p>
            </Section>

            <Section n="IV" title="Type of personal data">
              <p>
                Typically: brand-side approver names and contact details; member
                names, handles, and contact details (created and held by the agency
                under the membership relationship, not under this DPA); audience
                names where a campaign explicitly addresses them. Special-category
                data is not processed under this DPA without an addendum dated and
                signed by both parties.
              </p>
            </Section>

            <Section n="V" title="Categories of data subjects">
              <p>
                Brand-side personnel; members assigned to the campaign; brand
                customers, where they are identifiable in campaign assets; recipients
                of communications the campaign sends.
              </p>
            </Section>

            <Section n="VI" title="Brand instructions">
              <p>
                The agency processes personal data only on documented instructions
                from the brand, including those given through the brief and those
                given in writing during the campaign. The agency informs the brand
                without undue delay if an instruction would, in its view, infringe
                applicable data-protection law; the brand may, in turn, instruct the
                agency to cease the disputed processing while the question is resolved.
              </p>
            </Section>

            <Section n="VII" title="Confidentiality of personnel">
              <p>
                The agency ensures that any person authorised to process personal data
                under this DPA is bound by confidentiality obligations of equivalent
                effect to this addendum. This includes the editorial desk, members on
                assignment, and any subprocessor's personnel.
              </p>
            </Section>

            <Section n="VIII" title="Security measures">
              <p>
                The agency maintains the technical and organisational measures
                described in our{" "}
                <Link href="/security" className="link-ed">
                  security posture
                </Link>{" "}
                — including encryption in transit and at rest, hardened authentication,
                hashed passwords, audit logging, and a written disclosure process —
                and updates them as the threat environment requires.
              </p>
            </Section>

            <Section n="IX" title="Subprocessors">
              <p>
                The brand grants general written authorisation to engage subprocessors
                listed at{" "}
                <Link href="/subprocessors" className="link-ed">
                  /subprocessors
                </Link>
                . Material additions are dated on that page and, where the brand has
                requested it in writing, notified by email at the email of record.
                The agency remains responsible for the acts and omissions of its
                subprocessors as if they were its own.
              </p>
            </Section>

            <Section n="X" title="International transfers">
              <p>
                Where personal data is transferred from the European Economic Area or
                the United Kingdom to a country not subject to an adequacy decision,
                the transfer is made under the European Commission's Standard
                Contractual Clauses (Module 2 or Module 3 as appropriate) and, where
                applicable, the UK International Data Transfer Addendum. The clauses
                are incorporated into this DPA by reference and are countersigned on
                request.
              </p>
            </Section>

            <Section n="XI" title="Data subject rights">
              <p>
                The agency assists the brand, by appropriate technical and
                organisational measures, in fulfilling the brand's obligation to
                respond to requests from data subjects exercising rights of access,
                rectification, erasure, restriction, portability, and objection. The
                agency forwards any such request received directly to the brand
                without responding on the brand's behalf, unless the brand instructs
                otherwise.
              </p>
            </Section>

            <Section n="XII" title="Personal data breach">
              <p>
                The agency notifies the brand of a Personal Data Breach affecting
                brand-controlled personal data without undue delay, and in any event
                within seventy-two hours of becoming aware of it. The notice
                includes: the nature of the breach, categories and approximate volume
                of data and data subjects, the likely consequences, and the measures
                taken or proposed to address it. The agency cooperates with the
                brand on regulator notification and data-subject communications where
                applicable.
              </p>
            </Section>

            <Section n="XIII" title="Audit">
              <p>
                The brand may, on reasonable notice and at its own cost, audit the
                agency's compliance with this DPA, no more than once per twelve-month
                period unless an audit is triggered by a notified breach or a
                regulator's request. Audits respect the agency's legitimate
                confidentiality, security, and operational constraints; on-site
                audits proceed on dates agreed in advance.
              </p>
            </Section>

            <Section n="XIV" title="Return or deletion">
              <p>
                On the brand's written request, made within thirty days of campaign
                completion or termination, the agency returns or deletes
                brand-controlled personal data. Where the agency is required by law
                to retain data, the agency informs the brand of the legal requirement,
                the categories retained, and the retention period.
              </p>
            </Section>

            <Section n="XV" title="Liability and contact">
              <p>
                Liability under this DPA is governed by the liability clause of the
                brand-side terms, save where a more specific allocation is required
                by applicable law. Notices, audit requests, and breach communications:{" "}
                <a className="link-ed" href="mailto:dpa@thenexusclub.org">
                  dpa@thenexusclub.org
                </a>
                .
              </p>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 flex items-center justify-between text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/terms-brands" className="hover:text-ink">
              ← Brand terms
            </Link>
            <Link href="/subprocessors" className="hover:text-ink">
              Subprocessors →
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
