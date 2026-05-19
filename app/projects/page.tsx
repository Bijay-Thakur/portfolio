"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Bot, BarChart2, Database, CheckCircle } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/projects/ProjectCard";
import FooterCTA from "@/components/layout/FooterCTA";
import { featuredProject, headlineProjects, supportingProjects } from "@/data/projects";
import { siteConfig } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const loveBuilding = [
  { icon: <Bot size={16} />, label: "Multi-agent systems" },
  { icon: <Layers size={16} />, label: "RAG & retrieval" },
  { icon: <BarChart2 size={16} />, label: "Applied ML pipelines" },
  { icon: <Database size={16} />, label: "Full-stack AI products" },
];

const remainingHeadline = headlineProjects.slice(1);

export default function ProjectsPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionBadge className="mb-4">Best work</SectionBadge>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
                Projects that show how I{" "}
                <GradientText>think, build, and solve.</GradientText>
              </h1>
              <p className="text-slate-500 text-lg leading-relaxed">
                Selected AI/ML and software projects — built beyond demos, with retrieval
                systems, multi-LLM workflows, agent orchestration, applied ML, and honest
                evaluation.
              </p>
            </motion.div>
          </div>

          {/* What I love building card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
          >
            <p className="text-sm font-semibold text-slate-900 mb-4">What I love building</p>
            <div className="grid grid-cols-2 gap-3">
              {loveBuilding.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50"
                >
                  <span className="text-blue-600">{item.icon}</span>
                  <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured project — RAG SEC 10-K */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-6">
          <SectionBadge>Flagship project</SectionBadge>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-3xl p-8 sm:p-10 text-white"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white/90 text-xs font-semibold mb-4">
                {featuredProject.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{featuredProject.shortTitle}</h2>
              <p className="text-white/80 leading-relaxed mb-6">{featuredProject.summary}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tech.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/20 text-white font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {featuredProject.repoUrl && (
                <Button
                  href={featuredProject.repoUrl}
                  external
                  variant="secondary"
                  size="md"
                  className="bg-white text-blue-700 hover:bg-blue-50 border-0"
                >
                  <GithubIcon style={{ width: 14, height: 14 }} /> View on GitHub{" "}
                  <ArrowUpRight size={13} />
                </Button>
              )}
            </div>

            {/* Metrics */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">
                <CheckCircle size={13} /> Verified metrics
              </div>
              <div className="grid grid-cols-2 gap-3">
                {featuredProject.metrics?.slice(0, 4).map((m) => (
                  <div
                    key={m}
                    className="bg-white/15 rounded-xl p-3 backdrop-blur-sm"
                  >
                    <p className="text-xs text-white/90 font-medium leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-xl p-4 mt-1">
                <p className="text-xs text-white/60 uppercase tracking-wide font-semibold mb-1">
                  Impact
                </p>
                <p className="text-sm text-white/90">{featuredProject.impactLine}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Headline Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div className="mb-6">
          <SectionBadge className="mb-3">Headline projects</SectionBadge>
          <h2 className="text-xl font-bold text-slate-900">Core portfolio work</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {remainingHeadline.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProjectCard project={project} showMetrics className="h-full" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Supporting Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-6">
          <SectionBadge className="mb-3">More builds</SectionBadge>
          <h2 className="text-xl font-bold text-slate-900">Other projects</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {supportingProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* GitHub CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Want to see more?</h3>
          <p className="text-slate-500 text-sm mb-6">
            All my projects, experiments, and open source work live on GitHub.
          </p>
          <Button href={siteConfig.github} external variant="primary" size="lg">
            <GithubIcon style={{ width: 16, height: 16 }} /> View GitHub
          </Button>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
