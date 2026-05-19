"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, BookOpen, Star } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import Button from "@/components/ui/Button";
import HeroVisual from "@/components/home/HeroVisual";
import ProjectCard from "@/components/projects/ProjectCard";
import FooterCTA from "@/components/layout/FooterCTA";
import { siteConfig, credibilityChips, storySteps } from "@/data/portfolio";
import { homepageProjects } from "@/data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap size={18} className="text-blue-600" />,
  BookOpen: <BookOpen size={18} className="text-violet-600" />,
  Star: <Star size={18} className="text-indigo-600" />,
};

const credibilityCards = [
  {
    icon: "Zap",
    title: "What I'm building",
    text: "RAG systems, GenAI workflows, and applied ML pipelines with real evaluation.",
  },
  {
    icon: "BookOpen",
    title: "Where I'm growing",
    text: "Retrieval, orchestration, evals, systems thinking, and production-ready AI engineering.",
  },
  {
    icon: "Star",
    title: "What I care about",
    text: "Measured results, honest tradeoffs, clean engineering, and real impact.",
  },
];

export default function HomePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-20 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <SectionBadge className="mb-5">
                <Sparkles size={11} /> {siteConfig.role}
              </SectionBadge>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5"
            >
              Building AI systems that are{" "}
              <GradientText>measured, grounded, and useful.</GradientText>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-slate-500 text-lg leading-relaxed mb-7"
            >
              {siteConfig.subtitle}
            </motion.p>

            {/* Chips */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mb-8"
            >
              {credibilityChips.map((chip) => (
                <span
                  key={chip}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-3"
            >
              <Button href="/projects" variant="primary" size="lg">
                View Projects <ArrowRight size={15} />
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      {/* Credibility cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-3 gap-4">
          {credibilityCards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mb-4">
                {iconMap[card.icon]}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-2">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Selected Projects */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <SectionBadge className="mb-3">Selected work</SectionBadge>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Projects I&apos;m proud of
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            See all projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {homepageProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ProjectCard project={project} showMetrics />
            </motion.div>
          ))}
        </div>
        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600"
          >
            See all projects <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Story teaser */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <SectionBadge className="mb-3">My story</SectionBadge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My journey, in three steps
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {storySteps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6"
            >
              <span className="text-5xl font-black text-slate-50 absolute top-4 right-5 select-none">
                {step.step}
              </span>
              <h3 className="font-semibold text-slate-900 mb-2 relative z-10">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed relative z-10">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
