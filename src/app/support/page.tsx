import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById, listSupportTicketsForCreator } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { RunningHead } from "@/components/Ornaments";
import SupportForm from "./SupportForm";

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
              weirdness, anything that isn't in the FAQ. Every message lands on the control
              desk; we reply from{" "}
              <em className="font-serif-italic text-ink-soft">
                hello@nexus.club
              </em>{" "}
              within 24–48 hours.
            </p>
          </header>

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
                          {new Date(t.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>
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
