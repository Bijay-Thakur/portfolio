"use client";

export default function HeroFallback() {
  return (
    <div className="relative flex h-full min-h-screen items-center justify-center overflow-visible bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(13,214,200,0.16),transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.7) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative flex flex-col items-center gap-4 text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-[#0dd6c8]/35 bg-[#07141f]/85 shadow-[0_0_70px_rgba(13,214,200,0.2)]">
          <span className="font-serif text-4xl font-semibold text-[#8ff7ee]">AI</span>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#8ff7ee]/75">
            Intelligent Systems
          </p>
          <p className="mt-2 text-sm text-white/55">WebGL fallback mode</p>
        </div>
      </div>
    </div>
  );
}
