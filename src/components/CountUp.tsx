"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (n: number) => string;
};

export function CountUp({
  value,
  duration = 1400,
  className = "",
  formatter = (n) => n.toLocaleString("en-SG"),
}: Props) {
  const [current, setCurrent] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || value === 0) {
      setCurrent(value);
      return;
    }

    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutExpo for a settled, premium feel
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setCurrent(Math.round(from + (value - from) * eased));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, duration]);

  return <span className={`nc-count ${className}`}>{formatter(current)}</span>;
}
