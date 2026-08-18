type Props = { label?: string };

export default function SectionDivider({ label }: Props) {
  return (
    <div className="mb-10 flex items-center gap-3 sm:mb-14 sm:gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[rgba(13,214,200,0.28)] to-[rgba(13,214,200,0.45)]" />

      <div className="flex items-center gap-2.5 rounded-full border border-[rgba(13,214,200,0.2)] bg-[rgba(13,214,200,0.05)] px-3 py-1.5 sm:gap-3 sm:px-4">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="node-halo absolute inline-flex h-full w-full rounded-full bg-[#0dd6c8] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0dd6c8] shadow-[0_0_8px_rgba(13,214,200,0.9)]" />
        </span>
        {label && (
          <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.16em] text-teal/80 sm:text-xs sm:tracking-[0.22em]">
            {label}
          </span>
        )}
      </div>

      <div className="h-px flex-1 bg-gradient-to-r from-[rgba(13,214,200,0.45)] via-[rgba(13,214,200,0.28)] to-transparent" />
    </div>
  );
}
