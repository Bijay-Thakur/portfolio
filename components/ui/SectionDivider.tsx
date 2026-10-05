type Props = { label?: string };

export default function SectionDivider({ label }: Props) {
  return (
    <div className="mb-10 flex items-center gap-3 sm:mb-14 sm:gap-4">
      <div className="h-2 flex-1 rounded-full bg-[#e4e6ea] shadow-[inset_0_3px_6px_rgba(22,22,22,0.1),inset_0_-2px_4px_rgba(255,255,255,0.95)]" />

      <div className="clay-chip flex items-center gap-2.5 px-3 py-1.5 sm:gap-3 sm:px-4">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="node-halo absolute inline-flex h-full w-full rounded-full bg-teal/50" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal shadow-[0_2px_4px_rgba(22,22,22,0.25)]" />
        </span>
        {label && (
          <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.16em] text-teal sm:text-xs sm:tracking-[0.22em]">
            {label}
          </span>
        )}
      </div>

      <div className="h-2 flex-1 rounded-full bg-[#e4e6ea] shadow-[inset_0_3px_6px_rgba(22,22,22,0.1),inset_0_-2px_4px_rgba(255,255,255,0.95)]" />
    </div>
  );
}
