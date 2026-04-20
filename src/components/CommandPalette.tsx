"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { CampaignRecord } from "@/lib/store";

type Props = {
  isAdmin: boolean;
  signedIn: boolean;
  campaigns: Pick<CampaignRecord, "id" | "title" | "brand" | "status" | "payoutCents" | "currency">[];
};

export function CommandPalette({ isAdmin, signedIn, campaigns }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onCustom() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("nc:open-command", onCustom);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("nc:open-command", onCustom);
    };
  }, []);

  function go(path: string) {
    setOpen(false);
    router.push(path);
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Nexus Club command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
    >
      <div
        className="fixed inset-0 bg-ink/35 backdrop-blur-sm nc-fade"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl bg-paper-raised border border-hairline-strong shadow-[0_20px_60px_-20px_rgba(20,19,15,0.4)] nc-scale-in">
        <div className="px-4 pt-4 pb-2 flex items-center gap-3 border-b border-hairline">
          <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">NEXUS · CMD-K</span>
          <Command.Input
            placeholder="Go anywhere, search campaigns…"
            className="flex-1 bg-transparent outline-none text-lg font-serif-display text-ink placeholder:text-ink-faint py-2"
          />
          <kbd className="font-mono-numeric text-[10px] text-ink-faint border border-hairline px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <Command.List className="max-h-[50vh] overflow-y-auto py-2">
          <Command.Empty className="px-4 py-8 text-center text-ink-faint font-serif-italic text-sm">
            No results. Try another word.
          </Command.Empty>

          <Command.Group heading="Go to">
            <Item onSelect={() => go("/")}>
              <Mono>↵</Mono> Home
            </Item>
            <Item onSelect={() => go("/campaigns")}>
              <Mono>↵</Mono> Campaigns
            </Item>
            <Item onSelect={() => go("/creators")}>
              <Mono>↵</Mono> Members
            </Item>
            <Item onSelect={() => go("/how-it-works")}>
              <Mono>↵</Mono> How it works
            </Item>
            <Item onSelect={() => go("/about")}>
              <Mono>↵</Mono> About
            </Item>
            <Item onSelect={() => go("/dispatches")}>
              <Mono>↵</Mono> Dispatches
            </Item>
            {signedIn ? (
              <>
                <Item onSelect={() => go("/dashboard")}>
                  <Mono>↵</Mono> Your dashboard
                </Item>
                <Item onSelect={() => go("/settings")}>
                  <Mono>↵</Mono> Settings
                </Item>
              </>
            ) : (
              <>
                <Item onSelect={() => go("/login")}>
                  <Mono>↵</Mono> Sign in
                </Item>
                <Item onSelect={() => go("/#apply")}>
                  <Mono>↵</Mono> Apply for membership
                </Item>
              </>
            )}
            {isAdmin && (
              <>
                <Item onSelect={() => go("/admin")}>
                  <Mono>↵</Mono> Atelier (admin)
                </Item>
                <Item onSelect={() => go("/admin/campaigns/new")}>
                  <Mono>+</Mono> Draft a new campaign
                </Item>
                <Item onSelect={() => go("/admin/creators")}>
                  <Mono>↵</Mono> Members roster
                </Item>
              </>
            )}
          </Command.Group>

          {campaigns.length > 0 && (
            <Command.Group heading="Campaigns">
              {campaigns.map((c) => (
                <Item
                  key={c.id}
                  value={`${c.brand} ${c.title}`}
                  onSelect={() =>
                    go(isAdmin ? `/admin/campaigns/${c.id}` : `/campaigns/${c.id}`)
                  }
                >
                  <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted mr-3">
                    {c.brand}
                  </span>
                  <span className="font-serif-book text-ink">{c.title}</span>
                  <span className="ml-auto font-mono-numeric text-[11px] text-ink-faint">
                    {c.status}
                  </span>
                </Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function Item({
  children,
  onSelect,
  value,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  value?: string;
}) {
  return (
    <Command.Item
      value={value}
      onSelect={onSelect}
      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-[14px] data-[selected='true']:bg-paper-sunken"
    >
      {children}
    </Command.Item>
  );
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-numeric text-[10px] text-ink-faint border border-hairline px-1.5 py-0.5 mr-2">
      {children}
    </span>
  );
}
