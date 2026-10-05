"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
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
  const openSiteMap = useCallback(() => setSiteMapOpen(true), []);
  const closeSiteMap = useCallback(() => setSiteMapOpen(false), []);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden px-4 pt-24 text-snow sm:px-6 lg:px-8 lg:pt-28 2xl:px-12"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="aurora absolute -left-[10%] top-[8%] h-[42vh] w-[42vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.9),transparent_68%)] blur-2xl" />
        <div className="aurora aurora-slow absolute -right-[8%] top-[28%] h-[48vh] w-[48vh] rounded-full bg-[radial-gradient(circle,rgba(180,184,192,0.45),transparent_68%)] blur-2xl" />
        <div className="aurora absolute bottom-[6%] left-[30%] h-[36vh] w-[36vh] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.75),transparent_68%)] blur-2xl" />
      </div>

      {/* Robot and particles occupy the whole hero, not a card. */}
      <div className="absolute inset-0 z-[1]">
        <InteractiveRobotHero onOpenSiteMap={openSiteMap} />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col justify-between gap-5 py-5 sm:gap-7 sm:py-8 lg:min-h-[calc(100svh-6rem)] 2xl:max-w-[1600px]">
        <div className="flex flex-1 flex-col justify-between gap-4 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)_minmax(0,1.35fr)] lg:items-center lg:gap-6 xl:gap-10">
          {/* Left identity block */}
          <div className="clay-card clay-peach clay-flat-lg hero-reveal pointer-events-auto mt-1 max-w-md p-4 text-center sm:mt-3 lg:mt-0 lg:max-w-lg lg:text-left">
            <span className="clay-chip inline-flex items-center gap-2 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-teal sm:text-[10px] sm:tracking-[0.24em]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c5c8ce] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              Open to AI/ML roles
            </span>

            <p className="mt-3 font-serif text-3xl font-semibold uppercase leading-[0.95] tracking-[0.08em] text-snow min-[390px]:text-4xl sm:mt-4 sm:text-5xl lg:text-[clamp(2.6rem,4vw,4.5rem)]">
              Bijay Thakur
            </p>
            <p className="mt-3 max-w-sm text-xs font-bold uppercase leading-5 tracking-[0.13em] text-teal max-lg:mx-auto sm:mt-4 sm:leading-6 sm:tracking-[0.18em] lg:max-w-md lg:tracking-[0.22em]">
              AI/ML Engineer | GenAI Engineer | System Thinker
            </p>
            <div className="clay-inset mx-auto mt-4 h-2 w-28 sm:mt-5 sm:w-32 lg:mx-0" />

          </div>

          {/* Middle deliberately left open for the robot. On phones this reserves the hero's visual center. */}
          <div className="min-h-[28svh] sm:min-h-[32svh] lg:block lg:min-h-0" aria-hidden="true" />

          {/* Right headline + actions */}
          <div className="clay-card clay-lilac clay-flat-lg pointer-events-auto mb-3 max-w-md p-4 text-center sm:mb-5 lg:mb-0 lg:ml-auto lg:max-w-none lg:text-right">
            <h1 className="hero-reveal hero-reveal-delay-1 font-serif text-xl font-semibold uppercase leading-[1.1] tracking-tight text-snow min-[390px]:text-2xl sm:text-[2rem] md:text-4xl lg:text-[clamp(1.9rem,3.1vw,3.25rem)]">
              <span className="type-line type-line-1 max-lg:mx-auto lg:ml-auto">
                <span className="type-ink">Building</span>
              </span>
              <span className="type-line type-line-2 max-lg:mx-auto lg:ml-auto">
                <span className="type-ink bg-[linear-gradient(100deg,#111111_8%,#6a6f76_52%,#161616_92%)] bg-clip-text text-transparent">
                  Intelligent Systems
                </span>
              </span>
            </h1>

            <p className="hero-reveal hero-reveal-delay-2 mt-4 text-xs font-medium leading-relaxed text-muted max-lg:mx-auto sm:mt-5 sm:text-sm lg:ml-auto lg:max-w-md">
              {siteConfig.tagline}
            </p>

            <div className="hero-reveal hero-reveal-delay-2 mt-4 flex flex-wrap justify-center gap-2.5 sm:mt-6 sm:gap-3 lg:justify-end">
              <button
                onClick={scrollToProjects}
                className="clay-btn px-5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal/40 sm:px-6 sm:py-3 sm:text-sm"
              >
                View Projects
              </button>
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="clay-btn-ghost px-5 py-2.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-teal/40 sm:px-6 sm:py-3 sm:text-sm"
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
                className="clay-icon h-10 w-10 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal/40"
              >
                <GithubIcon width={21} height={21} />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="clay-icon h-10 w-10 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal/40"
              >
                <LinkedinIcon width={21} height={21} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email"
                className="clay-icon h-10 w-10 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal/40"
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
            onClick={openSiteMap}
            aria-haspopup="dialog"
            className="clay-btn-ghost group flex items-center gap-2.5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal/50 sm:px-5 sm:py-2.5 sm:text-[11px] sm:tracking-[0.24em]"
          >
            <svg
              viewBox="0 0 20 20"
              className="h-5 w-5 text-teal transition-transform duration-300 group-hover:rotate-45 sm:h-[22px] sm:w-[22px]"
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
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-muted sm:text-[10px]">
            or tap BithBot&apos;s chest screen
          </p>
        </div>
      </div>

      <SiteMapWeb open={siteMapOpen} onClose={closeSiteMap} />
    </section>
  );
}
