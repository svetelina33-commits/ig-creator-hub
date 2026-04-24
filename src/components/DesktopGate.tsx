"use client";

import { useEffect, useState } from "react";
import { NexusSeal } from "@/components/NexusSeal";

const DISMISS_KEY = "nc:desktop-gate-dismissed";

type Browser = "ios-safari" | "ios-chrome" | "android-chrome" | "other";

function detectBrowser(ua: string): Browser {
  if (/iPad|iPhone|iPod/.test(ua)) {
    if (/CriOS/.test(ua)) return "ios-chrome";
    return "ios-safari";
  }
  if (/Android/.test(ua)) return "android-chrome";
  return "other";
}

function isMobileUA(ua: string): boolean {
  if (!ua) return false;
  if (/iPad/.test(ua) && !/Mobile/.test(ua)) return false;
  return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
}

export default function DesktopGate() {
  const [show, setShow] = useState(false);
  const [browser, setBrowser] = useState<Browser>("other");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissedAt = window.localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const ts = Number(dismissedAt);
      if (!Number.isNaN(ts) && Date.now() - ts < 24 * 60 * 60 * 1000) {
        return;
      }
    }
    const ua = window.navigator.userAgent || "";
    if (isMobileUA(ua)) {
      setBrowser(detectBrowser(ua));
      setShow(true);
    }
  }, []);

  function dismiss() {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Open on a desktop"
      className="nc-desktop-gate"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(4, 4, 8, 0.96)",
        backdropFilter: "blur(20px) saturate(1.2)",
        WebkitBackdropFilter: "blur(20px) saturate(1.2)",
        overflowY: "auto",
        padding: "1.5rem 1.25rem 2rem",
      }}
    >
      <div className="nc-gate-card mx-auto max-w-md flex flex-col min-h-[calc(100dvh-3.5rem)]">
        {/* Top: brand mark + kicker */}
        <header className="flex items-center justify-between gap-3 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <NexusSeal size="sm" showText={false} />
            <span className="flex items-baseline gap-2">
              <span className="font-serif-italic text-xl leading-none text-ink">Nexus</span>
              <span className="font-serif-display small-caps text-[11px] leading-none text-ink-muted">
                Club
              </span>
            </span>
          </div>
          <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
            VOL. I · DESK
          </span>
        </header>

        {/* Hero */}
        <div className="pt-9 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="small-caps text-[10px] tracking-[0.28em] text-amber">
              ● desktop only
            </span>
            <span className="small-caps text-[10px] tracking-[0.28em] text-ink-faint">
              · for now
            </span>
          </div>
          <h1 className="font-serif-display text-[2.4rem] leading-[1.02] text-ink">
            <span className="font-serif-italic text-ink-soft">Best read</span> on a
            wider screen<span className="text-violet">.</span>
          </h1>
          <p className="mt-5 text-[14.5px] leading-[1.65] text-ink-muted">
            Nexus Club is built for the desk — campaign briefs, contract sign-offs, and
            the publishing concierge live more comfortably with the room a desktop screen
            gives them. Mobile works, but the experience is best at full width.
          </p>
        </div>

        {/* Editorial separator */}
        <div aria-hidden className="flex items-center gap-3 my-3">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="font-serif-italic text-ink-faint text-[14px] leading-none translate-y-[-1px]">
            ·
          </span>
          <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* Browser instruction */}
        <section className="py-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
              Open the desktop view
            </span>
            <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
              {browserLabel(browser)}
            </span>
          </div>

          <BrowserSteps browser={browser} />
        </section>

        {/* Why this matters note */}
        <aside className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 mt-2 mb-6">
          <div className="small-caps text-[10px] tracking-[0.28em] text-ink-faint mb-1.5">
            Note
          </div>
          <p className="text-[12.5px] leading-[1.6] text-ink-muted">
            <span className="font-serif-italic text-ink-soft">Already on desktop?</span>{" "}
            Your browser may be reporting a mobile user agent. Tap below — we&apos;ll
            trust you and remember.
          </p>
        </aside>

        {/* Actions */}
        <div className="mt-auto pt-4 flex flex-col gap-3">
          <button
            type="button"
            onClick={dismiss}
            className="btn-primary w-full justify-center px-6 py-4 rounded-full text-[13px]"
          >
            I&apos;m on desktop
            <span aria-hidden>→</span>
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="text-center small-caps text-[10px] tracking-[0.25em] text-ink-faint hover:text-ink-muted transition-colors py-3"
          >
            Continue on mobile anyway
          </button>
        </div>
      </div>
    </div>
  );
}

function browserLabel(b: Browser): string {
  switch (b) {
    case "ios-safari":
      return "iOS · SAFARI";
    case "ios-chrome":
      return "iOS · CHROME";
    case "android-chrome":
      return "ANDROID · CHROME";
    default:
      return "MOBILE";
  }
}

function BrowserSteps({ browser }: { browser: Browser }) {
  const steps = INSTRUCTIONS[browser];
  return (
    <ol className="rounded-xl border border-white/10 bg-white/[0.015] divide-y divide-white/5 overflow-hidden">
      {steps.map((s, i) => (
        <li key={i} className="px-4 py-3.5 flex items-baseline gap-3">
          <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint shrink-0 w-6">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[13.5px] leading-[1.55] text-ink-muted">
            {s.before}
            {s.glyph && (
              <span
                className="inline-flex items-center justify-center mx-1 px-2 py-[3px] rounded-md bg-white/[0.07] border border-white/10 font-mono-numeric text-[12px] text-ink"
                aria-hidden
              >
                {s.glyph}
              </span>
            )}
            {s.after && <span>{s.after}</span>}
            {s.target && (
              <span className="text-ink font-medium"> {s.target}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}

type Step = {
  before: string;
  glyph?: string;
  after?: string;
  target?: string;
};

const INSTRUCTIONS: Record<Browser, Step[]> = {
  "ios-safari": [
    { before: "tap", glyph: "aA", after: " in the address bar" },
    { before: "tap", target: "Request Desktop Website" },
    { before: "the page reloads in desktop view — done." },
  ],
  "ios-chrome": [
    { before: "tap", glyph: "⋯", after: " in the bottom right" },
    { before: "tap", target: "Request Desktop Site" },
    { before: "the page reloads in desktop view — done." },
  ],
  "android-chrome": [
    { before: "tap", glyph: "⋮", after: " in the top right" },
    { before: "check", target: "Desktop site" },
    { before: "the page reloads in desktop view — done." },
  ],
  other: [
    { before: "look for", target: "Request Desktop Site" },
    { before: "in your browser's menu — usually behind", glyph: "⋯", after: " or", target: "⋮" },
    { before: "the page reloads in desktop view — done." },
  ],
};
