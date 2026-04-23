"use client";

import { useEffect } from "react";

/**
 * Global delegation: for every `.nc-card` on a hover-capable device,
 * track cursor position and set CSS vars so the card renders a radial
 * spotlight and a tiny perspective tilt toward the cursor.
 */
export function CardInteractive() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const TILT_MAX = 5; // degrees
    let active: HTMLElement | null = null;

    function onMove(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const card = target?.closest<HTMLElement>(".nc-card");
      if (!card) {
        if (active) reset(active);
        active = null;
        return;
      }
      if (card !== active) {
        if (active) reset(active);
        active = card;
      }
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${relX * 100}%`);
      card.style.setProperty("--my", `${relY * 100}%`);
      card.style.setProperty("--ry", `${(relX - 0.5) * 2 * TILT_MAX}deg`);
      card.style.setProperty("--rx", `${-(relY - 0.5) * 2 * TILT_MAX}deg`);
    }

    function reset(el: HTMLElement) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (active) reset(active);
    };
  }, []);

  return null;
}
