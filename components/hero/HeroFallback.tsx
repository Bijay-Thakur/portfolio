"use client";

export default function HeroFallback() {
  return (
    <div className="relative flex h-full min-h-screen items-center justify-center overflow-visible bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,182,240,0.45),transparent_55%)]" />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="clay-card clay-lilac flex h-28 w-28 items-center justify-center rounded-[2rem]">
          <span className="font-serif text-4xl font-semibold text-teal">AI</span>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal">
            Intelligent Systems
          </p>
          <p className="mt-2 text-sm font-medium text-muted">WebGL fallback mode</p>
        </div>
      </div>
    </div>
  );
}
