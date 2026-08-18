"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SiteMapWeb from "@/components/ui/SiteMapWeb";
import { siteConfig } from "@/data/portfolio";
import HeroFallback from "./HeroFallback";

const InteractiveRobotHero = dynamic(() => import("./InteractiveRobotHero"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroSection() {
  const [siteMapOpen, setSiteMapOpen] = useState(false);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#020a12] px-4 pt-20 text-white sm:px-6 lg:px-8 lg:pt-24 2xl:px-12"
    >
      {/* cinematic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(13,214,200,0.18),transparent_34%),radial-gradient(circle_at_18%_42%,rgba(69,190,255,0.08),transparent_30%),linear-gradient(180deg,#02070d_0%,#04111d_52%,#020a12_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.8) 1px, transparent 1px)",
          backgroundSize: "clamp(56px, 6vw, 96px) clamp(56px, 6vw, 96px)",
        }}
      />

      {/* slow drifting aurora — adds depth without competing with the robot */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora absolute -left-[14%] top-[6%] h-[44vh] w-[44vh] rounded-full bg-[radial-gradient(circle,rgba(13,214,200,0.20),transparent_66%)] blur-3xl" />
        <div className="aurora aurora-slow absolute -right-[12%] top-[32%] h-[52vh] w-[52vh] rounded-full bg-[radial-gradient(circle,rgba(69,190,255,0.15),transparent_66%)] blur-3xl" />
      </div>

      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020a12] to-transparent" />

      {/* Robot and particles occupy the whole hero, not a card. */}
      <div className="absolute inset-0 z-[1]">
        <InteractiveRobotHero onOpenSiteMap={() => setSiteMapOpen(true)} />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col justify-between gap-5 py-5 sm:gap-7 sm:py-8 lg:min-h-[calc(100svh-6rem)] 2xl:max-w-[1600px]">
        <div className="flex flex-1 flex-col justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,1.35fr)] lg:items-center lg:gap-6 xl:gap-10">
          {/* Left identity block */}
          <div className="hero-reveal pointer-events-auto mt-1 max-w-md rounded-3xl bg-[#020a12]/45 p-4 text-center backdrop-blur-[2px] sm:mt-3 lg:mt-0 lg:max-w-lg lg:bg-transparent lg:p-0 lg:text-left lg:backdrop-blur-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0dd6c8]/30 bg-[#0dd6c8]/[0.07] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#8ff7ee] sm:text-[10px] sm:tracking-[0.24em]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0dd6c8] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#0dd6c8]" />
              </span>
              Open to AI/ML roles
            </span>

            <p className="mt-3 font-serif text-3xl font-semibold uppercase leading-[0.95] tracking-[0.08em] text-white min-[390px]:text-4xl sm:mt-4 sm:text-5xl lg:text-[clamp(2.6rem,4vw,4.5rem)]">
              Bijay Thakur
            </p>
            <p className="mt-3 max-w-sm text-xs font-semibold uppercase leading-5 tracking-[0.13em] text-[#8ff7ee] max-lg:mx-auto sm:mt-4 sm:leading-6 sm:tracking-[0.18em] lg:max-w-md lg:tracking-[0.22em]">
              AI/ML Engineer | GenAI Engineer | System Thinker
            </p>
            <div className="mt-4 h-px w-28 bg-gradient-to-r from-[#0dd6c8] to-transparent max-lg:mx-auto sm:mt-5 sm:w-32" />

          </div>

          {/* Middle deliberately left open for the robot. On phones this reserves the hero's visual center. */}
          <div className="min-h-[28svh] sm:min-h-[32svh] lg:block lg:min-h-0" aria-hidden="true" />

          {/* Right headline + actions */}
          <div className="pointer-events-auto mb-3 max-w-md rounded-3xl bg-[#020a12]/45 p-4 text-center backdrop-blur-[2px] sm:mb-5 lg:mb-0 lg:ml-auto lg:max-w-none lg:bg-transparent lg:p-0 lg:text-right lg:backdrop-blur-0">
            <h1 className="hero-reveal hero-reveal-delay-1 font-serif text-xl font-semibold uppercase leading-[1.1] tracking-tight text-white min-[390px]:text-2xl sm:text-[2rem] md:text-4xl lg:text-[clamp(1.9rem,3.1vw,3.25rem)]">
              <span className="type-line type-line-1 max-lg:mx-auto lg:ml-auto">
                <span className="type-ink">Building</span>
              </span>
              <span className="type-line type-line-2 max-lg:mx-auto lg:ml-auto">
                <span className="type-ink bg-[linear-gradient(100deg,#ffffff_18%,#8ff7ee_52%,#ffffff_82%)] bg-clip-text text-transparent">
                  Intelligent Systems
                </span>
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-delay-2 mt-4 text-xs leading-relaxed text-white/55 max-lg:mx-auto sm:mt-5 sm:text-sm lg:ml-auto lg:max-w-md">
              {siteConfig.tagline}
            </p>

            <div className="hero-reveal hero-reveal-delay-2 mt-4 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3 lg:justify-end">
              <button
                onClick={scrollToProjects}
                className="rounded-full bg-[#0dd6c8] px-5 py-2.5 text-xs font-semibold text-[#020a12] shadow-[0_0_30px_rgba(13,214,200,0.24)] transition hover:-translate-y-0.5 hover:bg-[#8ff7ee] hover:shadow-[0_8px_36px_rgba(13,214,200,0.4)] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/70 sm:px-6 sm:py-3 sm:text-sm"
              >
                View Projects
              </button>
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#0dd6c8]/35 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-[#8ff7ee] transition hover:-translate-y-0.5 hover:border-[#8ff7ee] hover:bg-[#0dd6c8]/10 focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/60 sm:px-6 sm:py-3 sm:text-sm"
              >
                Resume
              </a>
            </div>

            <div className="hero-reveal hero-reveal-delay-3 mt-4 flex items-center justify-center gap-5 sm:mt-6 lg:justify-end">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-white/60 transition hover:scale-110 hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
              >
                <GithubIcon width={21} height={21} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 transition hover:scale-110 hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
              >
                <LinkedinIcon width={21} height={21} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="text-white/60 transition hover:scale-110 hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
              >
                <Mail size={21} />
              </a>
            </div>
          </div>
        </div>

        {/* Always-available way into the site map. The robot's chest opens the
            same overlay, but this works on touch, keyboard and WebGL fallback. */}
        <div className="hero-reveal hero-reveal-delay-4 pointer-events-auto flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => setSiteMapOpen(true)}
            aria-haspopup="dialog"
            className="group flex items-center gap-2.5 rounded-full border border-[rgba(13,214,200,0.35)] bg-[#020a12]/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8ff7ee] backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[#8ff7ee] hover:bg-[rgba(13,214,200,0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8ff7ee]/70 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.24em]"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 text-[#0dd6c8] transition-transform duration-300 group-hover:rotate-45 sm:h-[22px] sm:w-[22px]"
              aria-hidden="true"
            >
              <g stroke="currentColor" strokeWidth="0.7" opacity="0.75">
              <line x1="10" y1="10" x2="17.00" y2="10.00" />
              <line x1="10" y1="10" x2="13.50" y2="15.20" />
              <line x1="10" y1="10" x2="6.50" y2="15.20" />
              <line x1="10" y1="10" x2="3.00" y2="10.00" />
              <line x1="10" y1="10" x2="6.50" y2="4.80" />
              <line x1="10" y1="10" x2="13.50" y2="4.80" />
              <line x1="17.00" y1="10.00" x2="13.50" y2="15.20" />
              <line x1="13.50" y1="15.20" x2="6.50" y2="15.20" />
              <line x1="6.50" y1="15.20" x2="3.00" y2="10.00" />
              <line x1="3.00" y1="10.00" x2="6.50" y2="4.80" />
              <line x1="6.50" y1="4.80" x2="13.50" y2="4.80" />
              <line x1="13.50" y1="4.80" x2="17.00" y2="10.00" />
            </g>
            <circle cx="10" cy="10" r="2.1" fill="currentColor" />
            <circle cx="17.00" cy="10.00" r="1.5" fill="currentColor" />
            <circle cx="13.50" cy="15.20" r="1.5" fill="currentColor" />
            <circle cx="6.50" cy="15.20" r="1.5" fill="currentColor" />
            <circle cx="3.00" cy="10.00" r="1.5" fill="currentColor" />
            <circle cx="6.50" cy="4.80" r="1.5" fill="currentColor" />
            <circle cx="13.50" cy="4.80" r="1.5" fill="currentColor" />
            </svg>
            Open site map
          </button>
          <p className="text-[9px] uppercase tracking-[0.16em] text-white/35 sm:text-[10px]">
            or tap BithBot&apos;s chest screen
          </p>
        </div>
      </div>

      <SiteMapWeb open={siteMapOpen} onClose={() => setSiteMapOpen(false)} />
    </section>
  );
}
