"use client";

import dynamic from "next/dynamic";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/portfolio";
import HeroFallback from "./HeroFallback";

const InteractiveRobotHero = dynamic(() => import("./InteractiveRobotHero"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#020a12] px-4 pt-20 text-white sm:px-6 lg:pt-28"
    >
      {/* cinematic background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_18%,rgba(13,214,200,0.18),transparent_34%),radial-gradient(circle_at_18%_42%,rgba(69,190,255,0.08),transparent_30%),linear-gradient(180deg,#02070d_0%,#04111d_52%,#020a12_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.8) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#020a12] to-transparent" />

      {/* Robot and particles occupy the whole hero, not a card. */}
      <div className="absolute inset-0 z-[1]">
        <InteractiveRobotHero />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col justify-between gap-4 py-6 sm:gap-8 sm:py-10 lg:grid lg:min-h-[calc(100vh-6rem)] lg:grid-cols-[0.82fr_1fr_0.9fr] lg:items-center lg:gap-6">
        {/* Left identity block */}
        <div className="hero-reveal pointer-events-auto mt-2 max-w-md rounded-3xl bg-[#020a12]/45 p-4 text-center backdrop-blur-[2px] sm:mt-4 lg:mt-0 lg:bg-transparent lg:p-0 lg:text-left lg:backdrop-blur-0">
          <p className="font-serif text-3xl font-semibold uppercase leading-none tracking-[0.08em] text-white min-[390px]:text-4xl sm:text-5xl lg:text-6xl">
            Bijay Thakur
          </p>
          <p className="mt-4 max-w-sm text-xs font-semibold uppercase leading-5 tracking-[0.13em] text-[#8ff7ee] max-lg:mx-auto sm:mt-5 sm:leading-6 sm:tracking-[0.18em] lg:tracking-[0.22em]">
            AI/ML Engineer | GenAI Engineer | System Thinker
          </p>
          <div className="mt-5 h-px w-28 bg-gradient-to-r from-[#0dd6c8] to-transparent max-lg:mx-auto sm:mt-6 sm:w-32" />
        </div>

        {/* Middle deliberately left open for the robot. On phones this reserves the hero's visual center. */}
        <div className="min-h-[34svh] sm:min-h-[38svh] lg:block lg:min-h-0" aria-hidden="true" />

        {/* Right headline + actions */}
        <div className="pointer-events-auto mb-5 max-w-md rounded-3xl bg-[#020a12]/45 p-4 text-center backdrop-blur-[2px] sm:mb-8 lg:mb-0 lg:ml-auto lg:bg-transparent lg:p-0 lg:text-center lg:backdrop-blur-0">
          <h1 className="hero-reveal hero-reveal-delay-1 font-serif text-lg font-semibold uppercase leading-[1.12] tracking-tight text-white min-[390px]:text-xl sm:text-3xl lg:text-4xl">
            <span className="typewriter-text">Building Intelligent System</span>
          </h1>

          <div className="hero-reveal hero-reveal-delay-2 mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-8 sm:gap-3">
            <button
              onClick={scrollToProjects}
              className="rounded-full bg-[#0dd6c8] px-5 py-2.5 text-xs font-semibold text-[#020a12] shadow-[0_0_30px_rgba(13,214,200,0.24)] transition hover:bg-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/70 sm:px-6 sm:py-3 sm:text-sm"
            >
              View Projects
            </button>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#0dd6c8]/35 bg-white/[0.03] px-5 py-2.5 text-xs font-semibold text-[#8ff7ee] transition hover:border-[#8ff7ee] hover:bg-[#0dd6c8]/10 focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/60 sm:px-6 sm:py-3 sm:text-sm"
            >
              Resume
            </a>
          </div>

          <div className="hero-reveal hero-reveal-delay-3 mt-5 flex items-center justify-center gap-5 sm:mt-8">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-white/60 transition hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
            >
              <GithubIcon width={21} height={21} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white/60 transition hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
            >
              <LinkedinIcon width={21} height={21} />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email"
              className="text-white/60 transition hover:text-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/50"
            >
              <Mail size={21} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
