"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SectionDivider from "@/components/ui/SectionDivider";
import { featuredProjects, otherProjects, type Project } from "@/data/portfolio";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-[rgba(13,214,200,0.1)] bg-[rgba(13,214,200,0.03)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[rgba(13,214,200,0.4)] hover:shadow-[0_10px_44px_rgba(13,214,200,0.12)] sm:p-6"
    >
      {/* top accent rail — lights up on hover */}
      <span className="accent-sweep pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(13,214,200,0.9),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* corner bloom */}
      <span className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(13,214,200,0.28),transparent_66%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative mb-2 flex items-start justify-between gap-3">
        <p className="text-[10px] tracking-[0.2em] uppercase text-teal/60 font-medium">
          {project.category}
        </p>
        <span className="shrink-0 font-serif text-xs text-teal/25 transition-colors duration-300 group-hover:text-teal/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative font-serif text-lg sm:text-xl font-semibold text-snow mb-3 group-hover:text-teal-light transition-colors">
        {project.title}
      </h3>

      <p className="relative text-muted text-sm leading-relaxed mb-4 flex-1">{project.summary}</p>

      <div className="relative mb-4 px-3 py-2 bg-[rgba(13,214,200,0.05)] border-l-2 border-teal/40 rounded-r text-xs text-snow/70 leading-relaxed transition-colors duration-300 group-hover:border-teal group-hover:bg-[rgba(13,214,200,0.09)]">
        {project.highlight}
      </div>

      <div className="relative flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t}
            className="text-[10px] px-2 py-0.5 rounded bg-[rgba(255,255,255,0.07)] text-snow border border-[rgba(255,255,255,0.1)]">
            {t}
          </span>
        ))}
        {project.isPrototype && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-[rgba(13,214,200,0.08)] text-teal/60 border border-[rgba(13,214,200,0.15)]">
            Prototype
          </span>
        )}
      </div>

      <div className="relative flex gap-2 mt-auto">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-teal border border-[rgba(255,255,255,0.08)] hover:border-[rgba(13,214,200,0.3)] px-3 py-1.5 rounded transition-all">
            <GithubIcon width={12} height={12} /> GitHub
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-muted hover:text-teal border border-[rgba(255,255,255,0.08)] hover:border-[rgba(13,214,200,0.3)] px-3 py-1.5 rounded transition-all">
            <ExternalLink size={12} /> Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

const sectionAnim = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  viewport: { once: true as const, amount: 0.1 as const },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
      <SectionDivider label="Featured Projects" />

      <motion.div {...sectionAnim} className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-3">Featured Projects</h2>
        <p className="text-muted text-sm max-w-xl">
          Headline projects spanning RAG, agentic competitive intelligence, multi-LLM
          orchestration, multi-agent systems, applied ML, and GenAI media workflows.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 mb-20 md:mb-24">
        {featuredProjects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>

      <SectionDivider label="Other Projects" />

      <motion.div {...sectionAnim} className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-3">Other Projects</h2>
        <p className="text-muted text-sm max-w-xl">
          Additional builds — hackathon MVPs, CV experiments, and early learning projects.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {otherProjects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>
    </section>
  );
}
