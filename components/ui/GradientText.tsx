import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

export default function GradientText({
  children,
  className,
  as: Tag = "span",
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </Tag>
  );
}
