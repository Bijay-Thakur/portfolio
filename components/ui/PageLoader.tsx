"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
  const pathname = usePathname();
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

  if (gone || pathname === "/" || pathname === "/v2") return null;

  return (
    <div
      aria-hidden="true"
      className="clay-canvas fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateY(-4%)" : "translateY(0)",
        transition: leaving
          ? "opacity 0.45s ease, transform 0.52s cubic-bezier(0.76,0,0.24,1)"
          : "none",
        pointerEvents: "none",
      }}
    >
      <div className="relative flex flex-col items-center gap-8">
        <div className="clay-card clay-lilac flex h-36 w-36 items-center justify-center rounded-full sm:h-40 sm:w-40">
          <span className="select-none font-serif text-5xl font-semibold text-teal sm:text-6xl">
            B.T.
          </span>
        </div>

        <p className="text-xs font-bold uppercase tracking-[0.35em] text-muted">
          Bijay Thakur
        </p>

        <div className="flex w-48 flex-col items-center gap-2 sm:w-64">
          <div className="clay-inset relative h-3 w-full overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #ffffff, #9aa0a8, #161616)",
                boxShadow: "3px 0 8px rgba(111,92,232,0.28)",
                transition: "width 0.2s ease-out",
              }}
            />
          </div>
          <span className="text-[11px] font-bold tabular-nums tracking-[0.1em] text-teal">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
}
