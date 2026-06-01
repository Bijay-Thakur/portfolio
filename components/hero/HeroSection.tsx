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
      className="relative min-h-screen overflow-hidden bg-[#020a12] px-4 pt-24 text-white sm:px-6 lg:pt-28"
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

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-8 py-10 lg:grid-cols-[0.82fr_1fr_0.9fr] lg:gap-6">
        {/* Left identity block */}
        <div className="hero-reveal max-w-md text-center lg:text-left">
          <p className="font-serif text-4xl font-semibold uppercase leading-none tracking-[0.08em] text-white sm:text-5xl lg:text-6xl">
            Bijay Thakur
          </p>
          <p className="mt-5 max-w-sm text-[12px] font-semibold uppercase leading-6 tracking-[0.22em] text-[#8ff7ee] max-lg:mx-auto">
            AI/ML Engineer | GenAI Engineer | System Thinker
          </p>
          <div className="mt-6 h-px w-32 bg-gradient-to-r from-[#0dd6c8] to-transparent max-lg:mx-auto" />
        </div>

        {/* Middle deliberately left open for the robot */}
        <div className="hidden lg:block" aria-hidden="true" />

        {/* Right headline + actions */}
        <div className="max-w-md text-center lg:ml-auto lg:text-left">
          <h1 className="hero-reveal hero-reveal-delay-1 font-serif text-2xl font-semibold uppercase leading-[1.1] tracking-tight text-white sm:text-3xl lg:text-4xl">
            <span className="typewriter-text">Building Intelligent System</span>
          </h1>

          <div className="hero-reveal hero-reveal-delay-2 mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <button
              onClick={scrollToProjects}
              className="rounded-full bg-[#0dd6c8] px-6 py-3 text-sm font-semibold text-[#020a12] shadow-[0_0_30px_rgba(13,214,200,0.24)] transition hover:bg-[#8ff7ee] focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/70"
            >
              View Projects
            </button>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[#0dd6c8]/35 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-[#8ff7ee] transition hover:border-[#8ff7ee] hover:bg-[#0dd6c8]/10 focus:outline-none focus:ring-2 focus:ring-[#8ff7ee]/60"
            >
              Resume
            </a>
          </div>

          <div className="hero-reveal hero-reveal-delay-3 mt-8 flex items-center justify-center gap-5 lg:justify-start">
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
