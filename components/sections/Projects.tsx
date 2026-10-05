"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SectionDivider from "@/components/ui/SectionDivider";
import {
  contributionProjects,
  featuredProjects,
  otherProjects,
  productionProjects,
  type Project,
} from "@/data/portfolio";

const clayTints = ["clay-lilac", "clay-mint", "clay-peach", "clay-sky", "clay-rose"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`clay-card ${clayTints[index % clayTints.length]} group relative flex h-full min-w-0 flex-col p-5 sm:p-6`}
    >
      <div className="relative mb-2 flex items-start justify-between gap-3">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-teal/70">
          {project.category}
        </p>
        <span className="clay-icon h-7 w-7 shrink-0 text-[11px] font-bold text-teal">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="relative font-serif text-lg sm:text-xl font-semibold text-snow mb-3 group-hover:text-teal-light transition-colors">
        {project.title}
      </h3>

      <p className="relative text-muted text-sm leading-relaxed mb-4 flex-1">{project.summary}</p>

      <div className="clay-inset relative mb-4 px-3 py-2 text-xs font-medium leading-relaxed text-snow/80">
        {project.highlight}
      </div>

      <div className="relative flex flex-wrap gap-1.5 mb-5">
        {project.tech.map((t) => (
          <span key={t} className="clay-chip px-2.5 py-1 text-[10px] font-bold">
            {t}
          </span>
        ))}
        {project.badge && (
          <span className="clay-btn px-2.5 py-1 text-[10px] font-bold">
            {project.badge}
          </span>
        )}
        {project.isPrototype && (
          <span className="clay-chip px-2.5 py-1 text-[10px] font-bold text-teal">
            Prototype
          </span>
        )}
      </div>

      <div className="relative flex gap-2 mt-auto">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer"
            className="clay-btn-ghost flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold">
            <GithubIcon width={12} height={12} /> GitHub
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
            className="clay-btn flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold">
            <ExternalLink size={12} /> {project.linkLabel ?? "Demo"}
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
      <SectionDivider label="In Production" />

      <motion.div {...sectionAnim} className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-3">In Production</h2>
        <p className="text-muted text-sm max-w-xl">
          Shipped products with live deployments — SEC Insight AI and the Bronxville Natural Market storefront.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 mb-20 md:mb-24">
        {productionProjects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>

      <SectionDivider label="Featured Projects" />

      <motion.div {...sectionAnim} className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-3">Featured Projects</h2>
        <p className="text-muted text-sm max-w-xl">
          Headline projects spanning agentic competitive intelligence, multi-LLM
          orchestration, multi-agent systems, applied ML, and GenAI media workflows.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 mb-20 md:mb-24">
        {featuredProjects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
      </div>

      <SectionDivider label="Frontend Contributions" />

      <motion.div {...sectionAnim} className="mb-10">
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-3">Frontend Contributions</h2>
        <p className="text-muted text-sm max-w-xl">
          Live sites where I did substantial frontend work as part of a larger build.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5 mb-20 md:mb-24">
        {contributionProjects.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
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
