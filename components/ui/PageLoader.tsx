"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [progress, setProgress]   = useState(0);
  const [leaving, setLeaving]     = useState(false);
  const [gone, setGone]           = useState(false);

  useEffect(() => {
    let raf: number;
    const start  = performance.now();
    // Total fake-progress duration in ms — content usually ready before this
    const TOTAL  = 1800;
    // Minimum time the loader stays visible (feels intentional, not a flash)
    const MIN_MS = 1200;

    const tick = (now: number) => {
      const elapsed = now - start;
      // Ease-out curve: fast start, slows near 95 to wait for fonts
      const raw = Math.min(elapsed / TOTAL, 1);
      const eased = 1 - Math.pow(1 - raw, 2.5); // ease-out power
      setProgress(Math.round(eased * 95)); // hold at 95 until fonts ready
      if (raw < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Jump to 100 when fonts + DOM are ready AND minimum time has passed
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const minWait    = new Promise<void>((r) => setTimeout(r, MIN_MS));

    Promise.all([fontsReady, minWait]).then(() => {
      setProgress(100);
      // Small pause at 100% so the user sees it complete
      setTimeout(() => {
        setLeaving(true);
        // Remove from DOM after CSS transition finishes
        setTimeout(() => setGone(true), 700);
      }, 280);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        background: "linear-gradient(160deg, #020A14 0%, #040D16 60%, #051525 100%)",
        transition: leaving ? "opacity 0.6s ease, transform 0.7s cubic-bezier(0.76,0,0.24,1)" : "none",
        opacity:    leaving ? 0 : 1,
        transform:  leaving ? "translateY(-6%)" : "translateY(0)",
        pointerEvents: leaving ? "none" : "all",
      }}
    >
      {/* Background grid — matches hero */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,1) 1px,transparent 1px),linear-gradient(90deg,rgba(13,214,200,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,214,200,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center gap-8">

        {/* Initials */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute -inset-6 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(13,214,200,0.12) 0%, transparent 70%)",
              animation: "loader-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="font-serif text-7xl sm:text-8xl font-semibold select-none"
            style={{
              color: "#0DD6C8",
              textShadow: "0 0 40px rgba(13,214,200,0.45), 0 0 80px rgba(13,214,200,0.18)",
              letterSpacing: "0.12em",
            }}
          >
            B.T.
          </span>
        </div>

        {/* Name */}
        <p
          className="text-xs tracking-[0.35em] uppercase font-medium"
          style={{ color: "rgba(228,246,248,0.45)" }}
        >
          Bijay Thakur
        </p>

        {/* Progress bar */}
        <div className="w-48 sm:w-64 flex flex-col items-center gap-2">
          {/* Track */}
          <div
            className="relative w-full h-px rounded-full overflow-hidden"
            style={{ background: "rgba(13,214,200,0.12)" }}
          >
            {/* Fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, rgba(13,214,200,0.5), #0DD6C8)",
                transition: "width 0.25s ease-out",
                boxShadow: "0 0 8px rgba(13,214,200,0.7)",
              }}
            />
            {/* Glowing dot at head */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `calc(${progress}% - 4px)`,
                background: "#0DD6C8",
                boxShadow: "0 0 8px #0DD6C8, 0 0 16px rgba(13,214,200,0.6)",
                transition: "left 0.25s ease-out",
              }}
            />
          </div>

          {/* Percentage */}
          <span
            className="text-[11px] tabular-nums"
            style={{ color: "rgba(13,214,200,0.55)", letterSpacing: "0.1em" }}
          >
            {progress}%
          </span>
        </div>
      </div>

      <style>{`
        @keyframes loader-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
