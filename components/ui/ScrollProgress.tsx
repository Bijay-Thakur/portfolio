"use client";

import { useEffect, useState } from "react";

/** Thin reading-progress rail pinned above the navbar. */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-3 top-1 z-[60] h-1.5 overflow-hidden rounded-full bg-[#e4e6ea] shadow-[inset_2px_2px_4px_rgba(22,22,22,0.12),inset_-1px_-1px_3px_rgba(255,255,255,0.9)] sm:inset-x-4"
      aria-hidden="true"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#ffffff] via-[#9aa0a8] to-[#161616] shadow-[2px_0_6px_rgba(22,22,22,0.25)] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
