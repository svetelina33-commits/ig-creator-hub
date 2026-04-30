"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  ttl: number;
  bright: number;
  size: number;
  white: boolean;
};

type Dust = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
  warm: boolean;
};

export function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const stars: Star[] = [];
    const dust: Dust[] = [];

    const dustCount = Math.min(80, Math.max(28, Math.floor((width * height) / 22000)));
    for (let i = 0; i < dustCount; i++) {
      dust.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.35) * 0.04,
        vy: -Math.random() * 0.06 - 0.005,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.32 + 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0008 + Math.random() * 0.0014,
        warm: Math.random() < 0.18,
      });
    }

    const spawnStar = () => {
      const goLeft = Math.random() < 0.72;
      const angleFromHoriz = (12 + Math.random() * 38) * (Math.PI / 180);
      const speed = 7 + Math.random() * 8;
      const len = 110 + Math.random() * 260;
      const ttl = 900 + Math.random() * 1500;
      const bright = 0.55 + Math.random() * 0.45;
      const size = 1 + Math.random() * 1.6;
      const white = Math.random() < 0.45;

      const vx = (goLeft ? -1 : 1) * speed * Math.cos(angleFromHoriz);
      const vy = speed * Math.sin(angleFromHoriz);

      let x: number;
      let y: number;
      if (goLeft) {
        if (Math.random() < 0.55) {
          x = Math.random() * (width * 1.25);
          y = -70;
        } else {
          x = width + 70;
          y = Math.random() * height * 0.65;
        }
      } else {
        if (Math.random() < 0.55) {
          x = Math.random() * (width * 1.25) - width * 0.2;
          y = -70;
        } else {
          x = -70;
          y = Math.random() * height * 0.65;
        }
      }

      stars.push({ x, y, vx, vy, len, life: 0, ttl, bright, size, white });
    };

    let lastSpawn = 0;
    let nextSpawnDelay = 600 + Math.random() * 1500;
    let lastFrame = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(50, now - lastFrame);
      lastFrame = now;

      ctx.clearRect(0, 0, width, height);

      // ── drifting dust (base atmosphere)
      for (const d of dust) {
        d.x += d.vx * dt * 0.06;
        d.y += d.vy * dt * 0.06;
        d.phase += dt * d.speed;
        if (d.y < -10) {
          d.y = height + 10;
          d.x = Math.random() * width;
        }
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        const a = d.baseAlpha * (0.45 + 0.55 * Math.sin(d.phase));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = d.warm
          ? `rgba(225, 200, 255, ${a})`
          : `rgba(170, 140, 255, ${a})`;
        ctx.fill();
      }

      // ── spawn shooting stars
      if (!reduced) {
        lastSpawn += dt;
        if (lastSpawn > nextSpawnDelay && stars.length < 11) {
          spawnStar();
          if (Math.random() < 0.18 && stars.length < 11) spawnStar();
          lastSpawn = 0;
          nextSpawnDelay = 600 + Math.random() * 1700;
        }
      }

      // ── draw shooting stars (head + trail + glow)
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        const step = dt / 16.67;
        s.x += s.vx * step;
        s.y += s.vy * step;
        s.life += dt;

        const p = s.life / s.ttl;
        if (
          p >= 1 ||
          s.y > height + s.len + 50 ||
          s.x < -s.len - 50 ||
          s.x > width + s.len + 50
        ) {
          stars.splice(i, 1);
          continue;
        }

        let env = 1;
        if (p < 0.12) env = p / 0.12;
        else if (p > 0.7) env = (1 - p) / 0.3;
        const alpha = s.bright * env;

        const speedMag = Math.hypot(s.vx, s.vy);
        const tailX = s.x - (s.vx / speedMag) * s.len;
        const tailY = s.y - (s.vy / speedMag) * s.len;

        // outer halo trail (soft, wide)
        const halo = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        halo.addColorStop(0, `rgba(170, 140, 255, ${alpha * 0.32})`);
        halo.addColorStop(0.4, `rgba(125, 90, 255, ${alpha * 0.12})`);
        halo.addColorStop(1, "rgba(125, 90, 255, 0)");
        ctx.strokeStyle = halo;
        ctx.lineWidth = s.size * 5.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // core trail (bright, sharp)
        const core = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        if (s.white) {
          core.addColorStop(0, `rgba(255, 248, 255, ${alpha})`);
          core.addColorStop(0.18, `rgba(200, 175, 255, ${alpha * 0.9})`);
        } else {
          core.addColorStop(0, `rgba(225, 210, 255, ${alpha})`);
          core.addColorStop(0.18, `rgba(150, 115, 255, ${alpha * 0.95})`);
        }
        core.addColorStop(0.55, `rgba(125, 90, 255, ${alpha * 0.4})`);
        core.addColorStop(1, "rgba(125, 90, 255, 0)");
        ctx.strokeStyle = core;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // glowing head
        const headR = s.size * 7.5;
        const headGrad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, headR);
        if (s.white) {
          headGrad.addColorStop(0, `rgba(255, 250, 255, ${alpha})`);
          headGrad.addColorStop(0.32, `rgba(200, 170, 255, ${alpha * 0.55})`);
        } else {
          headGrad.addColorStop(0, `rgba(225, 210, 255, ${alpha})`);
          headGrad.addColorStop(0.32, `rgba(150, 110, 255, ${alpha * 0.6})`);
        }
        headGrad.addColorStop(1, "rgba(125, 90, 255, 0)");
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, headR, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onResize = () => setSize();
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!raf) {
        lastFrame = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.92,
      }}
    />
  );
}
