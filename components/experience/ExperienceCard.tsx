import { CheckCircle, Calendar } from "lucide-react";
import { type Experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  experience: Experience;
  index?: number;
  className?: string;
}

export default function ExperienceCard({
  experience,
  index = 0,
  className,
}: ExperienceCardProps) {
  return (
    <div
      className={cn(
        "bg-[rgba(255,255,255,0.03)] border border-[rgba(201,168,76,0.1)] rounded-lg p-5",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-parchment leading-snug">{experience.role}</h3>
          <p className="text-gold/70 text-sm font-medium mt-0.5">{experience.org}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-muted text-xs">
            <Calendar size={12} />
            {experience.dates}
          </div>
        </div>
      </div>
      <ul className="space-y-1.5 mt-4">
        {experience.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted">
            <CheckCircle size={13} className="text-gold/50 flex-shrink-0 mt-0.5" />
            {bullet}
          </li>
        ))}
      </ul>
    </div>
  );
}
