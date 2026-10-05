"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";

const profileTags = ["RAG Systems", "AI Agents", "Applied ML"];
const focusCards = [
  {
    title: "Research-minded AI",
    text: "RAG, citations, evaluation, and model behavior.",
  },
  {
    title: "Product engineering",
    text: "Full-stack tools that turn AI workflows into usable products.",
  },
  {
    title: "Applied ML",
    text: "Data pipelines, baselines, error analysis, and forecasting.",
  },
];
const currentFocus = [
  "RAG",
  "AI Agents",
  "Applied ML",
  "Evaluation",
  "Full-Stack AI",
  "Product Thinking",
];

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
      <SectionDivider label="About" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="clay-card clay-lilac relative overflow-hidden p-2"
      >
        <div className="relative grid gap-7 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.35fr] lg:gap-8 lg:p-7">
          <div className="clay-inset flex flex-col items-center justify-center p-5 text-center">
            <div className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
              <div className="ripple-ring absolute inset-0 rounded-full border border-[#c5c8ce]" />
              <div className="ripple-ring ripple-ring-2 absolute inset-0 rounded-full border border-[#9aa0a8]" />
              <div className="ripple-ring ripple-ring-3 absolute inset-0 rounded-full border border-[#161616]/30" />
              <div className="pointer-events-none absolute inset-3 rounded-full bg-[radial-gradient(circle,#fff,transparent_68%)]" />

              <div className="clay-card relative z-10 h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48">
                <img
                  src="/images/profileImage.png"
                  alt="Bijay Thakur"
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <h3 className="mt-4 font-serif text-2xl font-semibold text-snow">Bijay Thakur</h3>
            <p className="mt-1 text-sm font-medium text-teal-light/85">
              AI/ML Engineer in the making
            </p>

            <div className="mt-4 space-y-1 text-xs uppercase tracking-[0.16em] text-muted/70">
              <p>Computer Science @ Queens College</p>
              <p>New York, USA</p>
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {profileTags.map((tag) => (
                <span key={tag} className="clay-chip px-3 py-1 text-[11px] font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-3xl font-semibold text-snow sm:text-4xl">
              About Me
            </h2>

            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                I&apos;m a Computer Science student at Queens College, CUNY, building my path
                into AI/ML engineering through hands-on systems: RAG pipelines, multi-agent
                workflows, applied ML projects, and full-stack AI tools.
              </p>
              <p>
                What drives me is not just making AI demos work — it is understanding the
                entire system behind them: data quality, retrieval, evaluation, user
                experience, reliability, and deployment. I&apos;m especially interested in
                building AI products that are grounded, useful, and honest about their
                limitations.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {focusCards.map((card) => (
                <div
                  key={card.title}
                  className="clay-card clay-peach p-4"
                >
                  <h3 className="text-sm font-semibold text-snow">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted/75">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-snow/70">
                Currently focused on
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentFocus.map((tag) => (
                  <span
                    key={tag}
                    className="clay-chip px-3 py-1 text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
