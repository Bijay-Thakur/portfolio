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
    <section id="about" className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <SectionDivider label="About" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.48, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-[rgba(13,214,200,0.16)] bg-[linear-gradient(135deg,rgba(13,214,200,0.08),rgba(255,215,120,0.035)_38%,rgba(255,255,255,0.025))] p-[1px] shadow-[0_24px_90px_rgba(0,0,0,0.28)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(13,214,200,0.14),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(255,215,120,0.08),transparent_26%)]" />

        <div className="relative grid gap-7 rounded-3xl bg-[#03101b]/88 p-5 backdrop-blur-md sm:p-7 lg:grid-cols-[0.9fr_1.35fr] lg:gap-8 lg:p-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/[0.06] bg-black/18 p-5 text-center">
            <div className="relative flex h-52 w-52 items-center justify-center sm:h-60 sm:w-60">
              <div className="ripple-ring absolute inset-0 rounded-full border border-[rgba(13,214,200,0.35)]" />
              <div className="ripple-ring ripple-ring-2 absolute inset-0 rounded-full border border-[rgba(13,214,200,0.24)]" />
              <div className="ripple-ring ripple-ring-3 absolute inset-0 rounded-full border border-[rgba(255,215,120,0.14)]" />
              <div className="pointer-events-none absolute inset-3 rounded-full border border-[rgba(13,214,200,0.18)] bg-[radial-gradient(circle,rgba(13,214,200,0.1),transparent_62%)]" />

              <div className="relative z-10 h-40 w-40 overflow-hidden rounded-full border-2 border-[rgba(13,214,200,0.55)] bg-[#061521] shadow-[0_0_46px_rgba(13,214,200,0.18)] sm:h-48 sm:w-48">
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
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(13,214,200,0.22)] bg-[rgba(13,214,200,0.06)] px-3 py-1 text-[11px] font-medium text-snow"
                >
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
                  className="rounded-2xl border border-[rgba(13,214,200,0.12)] bg-white/[0.025] p-4 transition duration-300 hover:border-[rgba(13,214,200,0.34)] hover:bg-[rgba(13,214,200,0.055)] hover:shadow-[0_12px_40px_rgba(13,214,200,0.07)]"
                >
                  <h3 className="text-sm font-semibold text-snow">{card.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted/75">{card.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/[0.06] pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-snow/70">
                Currently focused on
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentFocus.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1 text-xs text-snow/85"
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
