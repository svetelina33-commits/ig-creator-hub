import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById, listPublicCreators } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

export const metadata = { title: "Members · Nexus Club" };

export default async function CreatorsIndexPage() {
  const session = await getSession();
  const me = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();
  const members = await listPublicCreators();

  return (
    <>
      <Masthead email={me?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10">
        <section className="mx-auto max-w-6xl pt-14 sm:pt-20 pb-12">
          <Reveal>
            <RunningHead
              left="MEMBERS INDEX"
              center="· VOL. I ·"
              right={`${String(members.length).padStart(2, "0")} PUBLIC`}
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              The <span className="font-serif-italic">roster</span>.
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl pb-24 hairline-top">
          {members.length === 0 ? (
            <p className="pt-10 text-ink-muted italic font-serif-book">
              No public members yet. Members can publish their profile from{" "}
              <Link href="/settings" className="text-forest underline underline-offset-4">
                settings
              </Link>
              .
            </p>
          ) : (
            <ul className="divide-y divide-hairline">
              {members.map((m, i) => (
                <Reveal key={m.id} delay={i * 60} as="li">
                  <Link
                    href={`/creators/${m.profile!.slug}`}
                    className="grid grid-cols-12 gap-6 py-8 group hover:bg-paper-raised/60 transition-colors -mx-4 px-4"
                  >
                    <div className="col-span-12 md:col-span-1 font-mono-numeric text-[11px] text-ink-faint pt-2">
                      №{String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                        {m.profile!.city || "—"}
                      </div>
                      <div className="mt-1 font-serif-display text-3xl text-ink group-hover:text-forest transition-colors leading-tight">
                        {m.profile!.displayName}
                      </div>
                      {m.profile!.bio && (
                        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted font-serif-book line-clamp-2">
                          {m.profile!.bio}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 md:col-span-3 pt-2">
                      <div className="flex flex-wrap gap-1">
                        {m.profile!.niches.slice(0, 3).map((n) => (
                          <span
                            key={n}
                            className="small-caps text-[10px] tracking-[0.2em] text-ink-muted border border-hairline px-2 py-1"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2 text-right pt-2 font-mono-numeric text-[11px] text-ink-faint">
                      @{m.profile!.slug} →
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
