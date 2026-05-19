import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddings = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl border border-slate-100 shadow-sm",
        paddings[padding],
        hover &&
          "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
