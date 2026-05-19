import { CheckCircle, TrendingUp, Calendar } from "lucide-react";
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
        "bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-5",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 leading-snug">{experience.role}</h3>
          <p className="text-blue-600 text-sm font-medium mt-0.5">{experience.company}</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-400 text-xs">
            <Calendar size={12} />
            {experience.date}
          </div>
        </div>
      </div>

      {/* What I did */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
          What I did
        </p>
        <ul className="space-y-1.5">
          {experience.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Impact */}
      <div className="bg-slate-50 rounded-xl p-3.5">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp size={13} className="text-violet-500" />
          <p className="text-xs font-semibold text-violet-600 uppercase tracking-wide">Impact</p>
        </div>
        <ul className="space-y-1">
          {experience.impact.map((item, i) => (
            <li key={i} className="text-sm text-slate-600 font-medium">
              · {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
