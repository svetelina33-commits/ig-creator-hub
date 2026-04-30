import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById, listSupportTicketsForCreator } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { RunningHead } from "@/components/Ornaments";
import SupportForm from "./SupportForm";
import { popularArticles } from "@/lib/help-articles";

export const metadata = {
  title: "Support · Nexus Club",
};

export default async function SupportPage() {
  const session = await getSession();
  if (!session.creatorId) redirect("/login?return_to=/support");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/login?return_to=/support");
  const admin = await isAdmin();

  const tickets = await listSupportTicketsForCreator(creator.id);

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-4xl py-14 sm:py-20 relative">
          <RunningHead
            left="SUPPORT"
            center="· HELP DESK ·"
            right={`${String(tickets.length).padStart(2, "0")} ON FILE`}
          />

          <header className="mt-10 mb-10">
            <p className="small-caps text-[11px] tracking-[0.22em] text-ink-muted mb-4">
              A direct line to the desk
            </p>
            <h1 className="font-serif-display text-5xl sm:text-6xl leading-[0.96] text-ink">
              <span className="font-serif-italic text-ink-soft">How can</span> we help
              <span className="text-violet">?</span>
            </h1>
            <p className="mt-5 text-[15.5px] leading-[1.7] text-ink-muted max-w-2xl">
              Write to the editor directly — campaign questions, payout issues, account
              weirdness, anything that isn&apos;t in the help center. Every message lands on
              the control desk; we reply from{" "}
              <em className="font-serif-italic text-ink-soft">
                support@thenexusclub.org
              </em>{" "}
              within 24–48 hours.
            </p>
          </header>

          {/* Help-first nudge — most questions get faster answers in the articles */}
          <Link
            href="/help"
            className="group block mb-10 rounded-2xl px-6 py-5 transition-colors"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,18,14,0.7) 0%, rgba(12,11,9,0.85) 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(125,90,255,0.08), 0 0 0 1px rgba(125,90,255,0.18)",
            }}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <span className="small-caps text-[10px] tracking-[0.3em] text-violet/75">
                  ◆ Faster · check the help center first
                </span>
                <p className="mt-1.5 font-serif-display text-[18px] sm:text-[20px] text-ink leading-[1.25]">
                  Answers to most questions live at{" "}
                  <span className="font-serif-italic text-violet/95">/help</span>.
                </p>
                <p className="mt-1 text-[12.5px] text-ink-muted">
                  Connecting Instagram, payouts, revoking access, and more — already written.
                </p>
              </div>
              <span
                aria-hidden
                className="small-caps text-[10px] tracking-[0.3em] text-violet/85 group-hover:text-violet transition-colors whitespace-nowrap"
              >
                Open help center →
              </span>
            </div>

            {/* Popular article preview chips */}
            <ul className="mt-4 flex flex-wrap gap-2">
              {popularArticles(4).map((a) => (
                <li
                  key={a.slug}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11.5px] text-ink-muted"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <span aria-hidden className="text-violet/55">●</span>
                  {a.title}
                </li>
              ))}
            </ul>
          </Link>

          <SupportForm />

          {tickets.length > 0 && (
            <section className="mt-14">
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h2 className="font-serif-display text-3xl text-ink">
                  Your <span className="font-serif-italic text-ink-soft">thread history</span>
                </h2>
                <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                  {tickets.length.toString().padStart(2, "0")} total
                </span>
              </div>

              <ul className="glass rounded-2xl divide-y divide-white/10 overflow-hidden">
                {tickets.map((t) => (
                  <li key={t.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="font-serif-display text-xl text-ink">
                          {t.subject}
                        </div>
                        <p className="mt-1 text-[13px] text-ink-muted line-clamp-2 leading-relaxed">
                          {t.body}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <StatusPill status={t.status} />
                        <div className="mt-1 font-mono-numeric text-[10px] text-ink-faint whitespace-nowrap">
                          {new Date(t.createdAt).toLocaleDateString("en-SG", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
                    {t.attachments.length > 0 && (
                      <AttachmentStrip attachments={t.attachments} />
                    )}
                    {t.adminReply && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <div className="small-caps text-[10px] tracking-[0.22em] text-forest mb-1.5">
                          ● Reply from the editor
                        </div>
                        <p className="text-[13.5px] leading-[1.6] text-ink-soft whitespace-pre-line">
                          {t.adminReply}
                        </p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatusPill({ status }: { status: "open" | "replied" | "resolved" }) {
  const map = {
    open: { label: "under review", color: "text-ink-muted" },
    replied: { label: "replied", color: "text-forest" },
    resolved: { label: "resolved", color: "text-ink-faint" },
  } as const;
  const { label, color } = map[status];
  return (
    <span className={`small-caps text-[10px] tracking-[0.22em] ${color}`}>{label}</span>
  );
}

function AttachmentStrip({
  attachments,
}: {
  attachments: { url: string; name: string; contentType: string; size: number }[];
}) {
  return (
    <div className="mt-3 pt-3 border-t border-white/5">
      <div className="small-caps text-[10px] tracking-[0.22em] text-ink-muted mb-2">
        Attached · {attachments.length.toString().padStart(2, "0")}
      </div>
      <div className="flex flex-wrap gap-2">
        {attachments.map((a) => {
          const isImg = a.contentType.startsWith("image/");
          return (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition px-2 py-1.5 max-w-full"
            >
              {isImg ? (
                <img
                  src={a.url}
                  alt=""
                  className="w-9 h-9 rounded object-cover border border-white/10"
                />
              ) : (
                <span className="small-caps text-[9px] tracking-[0.22em] text-ink-faint w-9 h-9 flex items-center justify-center rounded border border-white/10 bg-white/[0.02]">
                  {a.contentType === "application/pdf" ? "PDF" : "TXT"}
                </span>
              )}
              <span className="flex flex-col min-w-0">
                <span className="text-[12.5px] text-ink-soft truncate max-w-[140px] sm:max-w-[180px]">
                  {a.name}
                </span>
                <span className="font-mono-numeric text-[9.5px] text-ink-faint">
                  {formatBytes(a.size)}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
