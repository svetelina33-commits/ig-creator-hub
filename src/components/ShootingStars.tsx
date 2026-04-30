"use client";

import { useEffect, useRef } from "react";

type Meteor = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  life: number;
  ttl: number;
  bright: number;
  size: number;
  drama: boolean;
  igniteAt: number;
};

type StarPoint = {
  x: number;
  y: number;
  r: number;
  baseAlpha: number;
  phase: number;
  speed: number;
};

type BurstParticle = { vx: number; vy: number; r: number; alpha: number };

type Burst = {
  x: number;
  y: number;
  born: number;
  ttl: number;
  particles: BurstParticle[];
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

    const stars: StarPoint[] = [];
    const meteors: Meteor[] = [];
    const bursts: Burst[] = [];

    // ── deep parallax field — barely-twinkling distant points
    const starCount = Math.min(110, Math.floor((width * height) / 16000));
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 0.7 + 0.25,
        baseAlpha: Math.random() * 0.42 + 0.05,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0005 + Math.random() * 0.0014,
      });
    }

    const triggerBurst = (x: number, y: number, scale = 1) => {
      const count = 32 + Math.floor(Math.random() * 18);
      const particles: BurstParticle[] = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (1.5 + Math.random() * 4.2) * scale;
        particles.push({
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: Math.random() * 1.3 + 0.5,
          alpha: 0.7 + Math.random() * 0.3,
        });
      }
      bursts.push({
        x,
        y,
        born: performance.now(),
        ttl: 1200 + Math.random() * 700,
        particles,
      });
    };

    const spawnMeteor = () => {
      const drama = Math.random() < 0.28;
      const goLeft = Math.random() < 0.7;
      const angle = (18 + Math.random() * 32) * (Math.PI / 180);
      const speed = drama ? 12 + Math.random() * 8 : 7 + Math.random() * 6;
      const len = drama ? 220 + Math.random() * 220 : 120 + Math.random() * 180;
      const ttl = drama ? 1400 + Math.random() * 700 : 1000 + Math.random() * 1100;
      const bright = drama ? 0.9 + Math.random() * 0.1 : 0.55 + Math.random() * 0.3;
      const size = drama ? 1.6 + Math.random() * 1.2 : 1 + Math.random() * 0.8;

      const vx = (goLeft ? -1 : 1) * speed * Math.cos(angle);
      const vy = speed * Math.sin(angle);

      let x: number;
      let y: number;
      if (goLeft) {
        if (Math.random() < 0.55) {
          x = Math.random() * width * 1.3;
          y = -100;
        } else {
          x = width + 100;
          y = Math.random() * height * 0.6;
        }
      } else {
        if (Math.random() < 0.55) {
          x = Math.random() * width * 1.3 - width * 0.3;
          y = -100;
        } else {
          x = -100;
          y = Math.random() * height * 0.6;
        }
      }

      meteors.push({
        x,
        y,
        vx,
        vy,
        len,
        life: 0,
        ttl,
        bright,
        size,
        drama,
        igniteAt: drama ? ttl * (0.55 + Math.random() * 0.2) : -1,
      });
    };

    let lastSpawn = 0;
    let nextSpawnDelay = 1400 + Math.random() * 1700;
    let lastFrame = performance.now();
    let raf = 0;

    const frame = (now: number) => {
      const dt = Math.min(50, now - lastFrame);
      lastFrame = now;

      ctx.clearRect(0, 0, width, height);

      // ── parallax field
      for (const s of stars) {
        s.phase += dt * s.speed;
        const a = s.baseAlpha * (0.4 + 0.6 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 156, 255, ${a})`;
        ctx.fill();
      }

      // ── spawn meteors
      if (!reduced) {
        lastSpawn += dt;
        if (lastSpawn > nextSpawnDelay && meteors.length < 5) {
          spawnMeteor();
          lastSpawn = 0;
          nextSpawnDelay = 1300 + Math.random() * 1900;
        }
      }

      // ── meteors (single linear-gradient stroke per meteor: halo + core)
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const step = dt / 16.67;
        m.x += m.vx * step;
        m.y += m.vy * step;
        m.life += dt;

        // drama meteors ignite mid-flight into a burst
        if (m.drama && m.igniteAt > 0 && m.life >= m.igniteAt) {
          triggerBurst(m.x, m.y, 1.25);
          meteors.splice(i, 1);
          continue;
        }

        const p = m.life / m.ttl;
        if (
          p >= 1 ||
          m.y > height + m.len + 60 ||
          m.x < -m.len - 60 ||
          m.x > width + m.len + 60
        ) {
          meteors.splice(i, 1);
          continue;
        }

        let env = 1;
        if (p < 0.1) env = p / 0.1;
        else if (p > 0.78) env = (1 - p) / 0.22;
        const alpha = m.bright * env;

        const speedMag = Math.hypot(m.vx, m.vy);
        const tailX = m.x - (m.vx / speedMag) * m.len;
        const tailY = m.y - (m.vy / speedMag) * m.len;

        // wide soft halo — single stroke
        ctx.strokeStyle = `rgba(125, 90, 255, ${alpha * 0.16})`;
        ctx.lineWidth = m.size * (m.drama ? 9 : 6);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // thin bright core — single linear-gradient stroke
        const core = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        core.addColorStop(0, `rgba(255, 248, 255, ${alpha})`);
        core.addColorStop(0.16, `rgba(200, 175, 255, ${alpha * 0.95})`);
        core.addColorStop(0.55, `rgba(125, 90, 255, ${alpha * 0.35})`);
        core.addColorStop(1, "rgba(125, 90, 255, 0)");
        ctx.strokeStyle = core;
        ctx.lineWidth = m.size * (m.drama ? 1.5 : 1);
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // glowing head
        const headR = m.size * (m.drama ? 7 : 5.5);
        const headGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, headR);
        headGrad.addColorStop(0, `rgba(255, 250, 255, ${alpha})`);
        headGrad.addColorStop(0.32, `rgba(195, 170, 255, ${alpha * 0.55})`);
        headGrad.addColorStop(1, "rgba(125, 90, 255, 0)");
        ctx.fillStyle = headGrad;
        ctx.beginPath();
        ctx.arc(m.x, m.y, headR, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── bursts (flash + radial debris with motion lines)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        const age = now - b.born;
        if (age > b.ttl) {
          bursts.splice(i, 1);
          continue;
        }
        const p = age / b.ttl;
        const env = 1 - p;

        if (p < 0.18) {
          const fp = p / 0.18;
          const flashR = 32 + fp * 140;
          const flashAlpha = (1 - fp) * 0.75;
          const flashGrad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, flashR);
          flashGrad.addColorStop(0, `rgba(255, 250, 255, ${flashAlpha})`);
          flashGrad.addColorStop(0.35, `rgba(195, 170, 255, ${flashAlpha * 0.5})`);
          flashGrad.addColorStop(1, "rgba(125, 90, 255, 0)");
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, flashR, 0, Math.PI * 2);
          ctx.fill();
        }

        const expansion = age * 0.06;
        for (const part of b.particles) {
          const px = b.x + part.vx * expansion * 3;
          const py = b.y + part.vy * expansion * 3 + p * p * 18;
          const a = part.alpha * env * env;
          const r = part.r * (1 - p * 0.4);

          // motion-blur line trailing each particle
          const tx = px - part.vx * 0.22;
          const ty = py - part.vy * 0.22 + p * 1.5;
          ctx.strokeStyle = `rgba(155, 115, 255, ${a * 0.45})`;
          ctx.lineWidth = Math.max(0.5, r * 0.75);
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(px, py);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 200, 255, ${a})`;
          ctx.fill();
        }
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
        opacity: 0.58,
      }}
    />
  );
}
