import { Sparkles } from "lucide-react";

type Props = { label?: string };

export default function SectionDivider({ label }: Props) {
  return (
    <div className="flex items-center gap-4 mb-14">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(13,214,200,0.3)] to-transparent" />
      <div className="flex items-center gap-2 text-teal">
        <Sparkles size={12} />
        {label && (
          <span className="text-xs tracking-[0.2em] uppercase font-medium text-teal/70">
            {label}
          </span>
        )}
        <Sparkles size={12} />
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[rgba(13,214,200,0.3)] to-transparent" />
    </div>
  );
}
