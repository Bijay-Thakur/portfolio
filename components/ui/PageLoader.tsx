"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 900;
    const minVisibleMs = 450;

    const tick = (now: number) => {
      const raw = Math.min((now - start) / total, 1);
      const eased = 1 - Math.pow(1 - raw, 2.4);
      setProgress(Math.min(95, Math.round(eased * 95)));

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);

    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
    const minWait = new Promise<void>((resolve) => setTimeout(resolve, minVisibleMs));

    Promise.all([fontsReady, minWait]).then(() => {
      setProgress(100);
      setTimeout(() => {
        setLeaving(true);
        setTimeout(() => setGone(true), 520);
      }, 160);
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
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateY(-4%)" : "translateY(0)",
        transition: leaving
          ? "opacity 0.45s ease, transform 0.52s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        pointerEvents: "none",
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,1) 1px,transparent 1px),linear-gradient(90deg,rgba(13,214,200,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(13,214,200,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative">
          <div
            className="absolute -inset-6 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(13,214,200,0.12) 0%, transparent 70%)",
              animation: "loader-pulse 2s ease-in-out infinite",
            }}
          />
          <span
            className="select-none font-serif text-7xl font-semibold sm:text-8xl"
            style={{
              color: "#0DD6C8",
              letterSpacing: "0.12em",
              textShadow:
                "0 0 40px rgba(13,214,200,0.45), 0 0 80px rgba(13,214,200,0.18)",
            }}
          >
            B.T.
          </span>
        </div>

        <p
          className="text-xs font-medium uppercase tracking-[0.35em]"
          style={{ color: "rgba(228,246,248,0.45)" }}
        >
          Bijay Thakur
        </p>

        <div className="flex w-48 flex-col items-center gap-2 sm:w-64">
          <div
            className="relative h-px w-full overflow-hidden rounded-full"
            style={{ background: "rgba(13,214,200,0.12)" }}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, rgba(13,214,200,0.5), #0DD6C8)",
                boxShadow: "0 0 8px rgba(13,214,200,0.7)",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
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
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
