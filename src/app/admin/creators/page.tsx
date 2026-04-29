import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  listApplicationsForCreator,
  listCreators,
} from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default async function AdminCreatorsPage() {
  const admin = await requireAdmin();
  const creators = await listCreators();
  const withCounts = await Promise.all(
    creators.map(async (c) => ({
      creator: c,
      applicationCount: (await listApplicationsForCreator(c.id)).length,
    })),
  );

  return (
    <>
      <Masthead email={admin.email} isAdmin />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-6xl py-12 sm:py-16 relative">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/admin" className="hover:text-ink">
              ← Atelier
            </Link>
          </div>
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                The roster
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none text-ink">
                <span className="font-serif-italic text-violet">Members</span> on file
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              {String(creators.length).padStart(2, "0")} total
            </span>
          </div>

          {creators.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-ink-muted italic">
              No members yet. The roster will fill.
            </div>
          ) : (
            <div className="glass rounded-2xl overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 gap-4 px-5 pt-4 pb-3 border-b border-white/10 text-[10px] small-caps tracking-[0.25em] text-ink-faint">
                <span className="col-span-5">Member</span>
                <span className="col-span-3">Instagram</span>
                <span className="col-span-2">Joined</span>
                <span className="col-span-2 text-right">Applications</span>
              </div>
              <ul className="divide-y divide-white/10">
                {withCounts.map(({ creator, applicationCount }) => (
                  <li key={creator.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-5 py-5">
                    <div className="col-span-5">
                      <div className="font-serif-display text-xl text-ink">
                        {creator.email}
                      </div>
                    </div>
                    <div className="col-span-3">
                      {creator.instagram ? (
                        <span className="small-caps text-[11px] tracking-[0.25em] text-forest">
                          ● @{creator.instagram.username}
                        </span>
                      ) : (
                        <span className="small-caps text-[11px] tracking-[0.25em] text-ink-faint">
                          ○ not connected
                        </span>
                      )}
                    </div>
                    <div className="col-span-2 font-mono-numeric text-[11px] text-ink-muted pt-1">
                      {new Date(creator.createdAt).toLocaleDateString("en-SG", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      })}
                    </div>
                    <div className="col-span-2 text-right font-mono-numeric text-sm text-ink pt-1">
                      {String(applicationCount).padStart(2, "0")}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
