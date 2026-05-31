"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  ox: number;   // origin x
  oy: number;   // origin y
  vx: number;
  vy: number;
  r: number;    // radius
  alpha: number;
}

const TEAL_RGB = "13,214,200";

function spawn(w: number, h: number): Particle {
  const x = Math.random() * w;
  const y = Math.random() * h;
  return {
    x, y, ox: x, oy: y,
    vx: 0, vy: 0,
    r: Math.random() * 2 + 1.5,        // 1.5 – 3.5 px
    alpha: Math.random() * 0.3 + 0.1,  // 0.1 – 0.4
  };
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── Tuning knobs ─────────────────────────────────────
       REPEL_R     – how far the mouse pushes particles (px)
       REPEL_F     – max repulsion acceleration per frame
       RETURN_K    – spring stiffness back to origin (0–1)
       DAMPING     – velocity multiplier per frame (0–1)
       ─────────────────────────────────────────────────── */
    const REPEL_R  = 160;
    const REPEL_F  = 1.6;
    const RETURN_K = 0.022;
    const DAMPING  = 0.92;
    const LINK_D   = 90;     // max distance to draw a connecting line

    let W = 0, H = 0;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      // ~1 particle per 7 000 px², capped for performance
      const count = Math.min(Math.round((W * H) / 7000), 120);
      particles = Array.from({ length: count }, () => spawn(W, H));
    };

    const onMove  = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onLeave = ()              => { mouse = { x: -9999, y: -9999 }; };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse repulsion — soft inverse-square falloff
        const dx  = p.x - mouse.x;
        const dy  = p.y - mouse.y;
        const d2  = dx * dx + dy * dy;
        const d   = Math.sqrt(d2);

        if (d < REPEL_R && d > 0.1) {
          // Force tapers from REPEL_F at center → 0 at REPEL_R
          const t = 1 - d / REPEL_R;           // 0 → 1 as mouse gets closer
          const f = REPEL_F * t * t;            // quadratic falloff = very smooth
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        // Spring pull back to origin
        p.vx += (p.ox - p.x) * RETURN_K;
        p.vy += (p.oy - p.y) * RETURN_K;

        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;

        // Integrate
        p.x += p.vx;
        p.y += p.vy;

        // Proximity brightening
        const proximity = d < REPEL_R ? Math.max(0, 1 - d / REPEL_R) : 0;
        const a = Math.min(p.alpha + proximity * 0.45, 0.82);

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL_RGB},${a})`;
        ctx.fill();

        // Connection lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q  = particles[j];
          const ld = Math.hypot(p.x - q.x, p.y - q.y);
          if (ld < LINK_D) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${TEAL_RGB},${(1 - ld / LINK_D) * 0.09})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize",    resize,  { passive: true });
    window.addEventListener("mousemove", onMove,  { passive: true });
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
