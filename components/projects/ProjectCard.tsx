import { ArrowUpRight, CheckCircle, FlaskConical } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  Python: "bg-blue-50 text-blue-700",
  "Next.js": "bg-slate-100 text-slate-700",
  React: "bg-sky-50 text-sky-700",
  TypeScript: "bg-blue-50 text-blue-700",
  Flask: "bg-green-50 text-green-700",
  Express: "bg-slate-100 text-slate-700",
  Gemini: "bg-violet-50 text-violet-700",
  OpenAI: "bg-emerald-50 text-emerald-700",
  LangGraph: "bg-purple-50 text-purple-700",
  LlamaIndex: "bg-indigo-50 text-indigo-700",
  ChromaDB: "bg-orange-50 text-orange-700",
  RAGAS: "bg-pink-50 text-pink-700",
  PostgreSQL: "bg-cyan-50 text-cyan-700",
  Pandas: "bg-blue-50 text-blue-700",
  LightGBM: "bg-amber-50 text-amber-700",
  PyTorch: "bg-red-50 text-red-700",
  OpenCV: "bg-green-50 text-green-700",
  Streamlit: "bg-orange-50 text-orange-700",
  Vite: "bg-violet-50 text-violet-700",
  Zod: "bg-indigo-50 text-indigo-700",
  ElevenLabs: "bg-pink-50 text-pink-700",
  BM25: "bg-slate-100 text-slate-600",
};

function TagBadge({ tag }: { tag: string }) {
  const color = tagColors[tag] ?? "bg-slate-100 text-slate-600";
  return (
    <span className={cn("text-xs font-medium px-2 py-0.5 rounded-md", color)}>
      {tag}
    </span>
  );
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  showMetrics?: boolean;
}

export default function ProjectCard({
  project,
  className,
  showMetrics = false,
}: ProjectCardProps) {
  const hasMetrics = project.metrics && project.metrics.length > 0;

  return (
    <div
      className={cn(
        "group bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 overflow-hidden",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="min-h-[56px] py-3 bg-gradient-to-br from-slate-50 to-blue-50 flex flex-wrap items-center gap-x-3 gap-y-2 px-4 sm:px-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-xs font-bold">
              {project.shortTitle.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400">{project.category}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 flex-wrap">
          {hasMetrics && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
              <CheckCircle size={10} /> Verified metrics
            </span>
          )}
          {project.isPrototype && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100">
              <FlaskConical size={10} /> Prototype
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 px-5 pb-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-sm leading-snug">{project.shortTitle}</h3>
          <ArrowUpRight
            size={14}
            className="text-slate-300 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-0.5"
          />
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">{project.summary}</p>

        {/* Metrics (optional) */}
        {showMetrics && hasMetrics && (
          <div className="space-y-1">
            {project.metrics!.slice(0, 3).map((m) => (
              <p key={m} className="text-xs text-slate-600 font-medium">
                · {m}
              </p>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-1">
          {project.tech.slice(0, 4).map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        {/* Impact */}
        <div className="pt-2.5 border-t border-slate-50 flex items-center justify-between gap-2">
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            <span className="text-blue-600 font-semibold">Impact: </span>
            {project.impactLine}
          </p>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repo"
              className="flex-shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <GithubIcon style={{ width: 14, height: 14 }} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
