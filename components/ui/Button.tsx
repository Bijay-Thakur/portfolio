import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
}

const variants = {
  primary:
    "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90 shadow-sm",
  secondary:
    "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm",
  ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  outline:
    "border border-blue-200 text-blue-600 hover:bg-blue-50",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-6 py-3 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className,
  disabled,
  type = "button",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
