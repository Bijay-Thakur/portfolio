"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, ArrowDown, GraduationCap, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/portfolio";

const ParticleBackground = dynamic(
  () => import("@/components/ui/ParticleBackground"),
  { ssr: false }
);

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function Hero() {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Deep ocean gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02080F] via-[#040D16] to-[#040D16]" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Radial teal glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(13,214,200,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Particles */}
      <ParticleBackground />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#040D16] to-transparent"
        style={{ zIndex: 2 }}
      />

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative max-w-4xl mx-auto" style={{ zIndex: 10 }}>

        {/* Top role chip — replaces the old "CS @ Queens" label */}
        <motion.div {...fadeUp(0)} className="mb-7">
          <span className="inline-flex items-center gap-2 border border-[rgba(13,214,200,0.28)] text-teal/80 text-xs tracking-[0.2em] uppercase px-4 py-1.5 rounded-full bg-[rgba(13,214,200,0.05)]">
            AI Engineer&nbsp;&nbsp;·&nbsp;&nbsp;GenAI Systems Builder&nbsp;&nbsp;·&nbsp;&nbsp;Systems Thinker
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.15)}
          className="font-serif text-5xl sm:text-7xl font-semibold text-snow leading-tight mb-5 tracking-tight"
        >
          {siteConfig.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          {...fadeUp(0.28)}
          className="text-muted text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-11"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.38)}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="px-6 py-2.5 bg-teal text-ocean text-sm font-semibold rounded hover:bg-teal-light transition-colors"
          >
            View Projects
          </button>
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 border border-[rgba(13,214,200,0.4)] text-teal text-sm font-medium rounded hover:bg-[rgba(13,214,200,0.08)] hover:border-teal transition-all"
          >
            Download Resume
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          {...fadeUp(0.46)}
          className="flex items-center justify-center gap-5 mb-10"
        >
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="text-muted hover:text-teal transition-colors">
            <GithubIcon width={20} height={20} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="text-muted hover:text-teal transition-colors">
            <LinkedinIcon width={20} height={20} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email"
            className="text-muted hover:text-teal transition-colors">
            <Mail size={20} />
          </a>
        </motion.div>

        {/* ── Bottom meta bar: Education + Location ─────── */}
        <motion.div
          {...fadeUp(0.54)}
          className="flex items-center justify-center gap-4 text-xs text-muted/70"
        >
          {/* Education */}
          <span className="flex items-center gap-1.5" style={{ color: "white" }}>
            <GraduationCap size={14} className="text-teal/60" style={{ color: "white" }} />
            Queens College
          </span>

          {/* Separator */}
          <span className="w-px h-4 bg-[rgba(13,214,200,0.25)] shrink-0" />

          {/* Location */}
          <span className="flex items-center gap-1.5" style={{ color: "white" }}>
            <MapPin size={13} className="text-teal/60" style={{ color: "white" }} />
            Queens, New York
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
      >
        <button
          onClick={() => scrollTo("#about")}
          aria-label="Scroll down"
          className="flex flex-col items-center gap-1.5 text-muted/40 hover:text-teal/60 transition-colors"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" />
        </button>
      </motion.div>
    </section>
  );
}
