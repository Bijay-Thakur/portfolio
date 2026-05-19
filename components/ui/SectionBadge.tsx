import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        "bg-indigo-50 text-indigo-600 border border-indigo-100",
        className
      )}
    >
      {children}
    </span>
  );
}
