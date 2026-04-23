"use client";

import { useEffect } from "react";

/**
 * Attaches a spring-pull effect to every element marked with `data-magnetic`.
 * Only active on devices with hover (i.e. desktop pointers). Touch devices no-op.
 */
export function MagneticAttach() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const STRENGTH = 0.22;
    const elements = new Set<HTMLElement>();

    function onMove(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-magnetic]");
      if (!el) return;
      elements.add(el);
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * STRENGTH}px, ${y * STRENGTH}px, 0)`;
    }

    function reset(el: HTMLElement) {
      el.style.transform = "";
    }

    function onLeaveAny(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-magnetic]");
      if (el) {
        reset(el);
        elements.delete(el);
      }
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeaveAny, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onLeaveAny);
      elements.forEach(reset);
      elements.clear();
    };
  }, []);

  return null;
}
