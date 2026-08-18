"use client";

import { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig, navLinks } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Highlight the section currently under the navbar.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/85 backdrop-blur-md border-b border-[#0dd6c8]/15 shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="font-serif text-xl font-semibold text-[#8ff7ee] tracking-widest hover:text-white transition-colors"
        >
          {siteConfig.initials}
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                aria-current={isActive ? "true" : undefined}
                className={`group relative text-sm tracking-wide transition-colors ${
                  isActive ? "text-[#8ff7ee]" : "text-white/85 hover:text-[#8ff7ee]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-[#0dd6c8] to-[#8ff7ee] transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-70"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop icons */}
        <div className="hidden lg:flex items-center gap-3">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="text-white/65 hover:text-[#8ff7ee] transition-colors">
            <GithubIcon width={17} height={17} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="text-white/65 hover:text-[#8ff7ee] transition-colors">
            <LinkedinIcon width={17} height={17} />
          </a>
          <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume"
            className="flex items-center gap-1.5 text-xs font-medium border border-[#0dd6c8]/35 text-[#8ff7ee] px-3 py-1.5 rounded hover:bg-[#0dd6c8]/10 hover:border-[#8ff7ee] transition-all">
            <FileText size={13} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white/80 hover:text-[#8ff7ee] transition-colors"
          onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md border-b border-[#0dd6c8]/15 px-4 py-6 flex max-h-[70svh] flex-col gap-4 overflow-y-auto">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`flex items-center gap-2 text-base transition-colors py-1 ${
                activeHref === link.href ? "text-[#8ff7ee]" : "text-white/85 hover:text-[#8ff7ee]"
              }`}>
              <span className={`h-1.5 w-1.5 rounded-full transition-colors ${
                activeHref === link.href ? "bg-[#0dd6c8]" : "bg-white/20"
              }`} />
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-white/65 hover:text-[#8ff7ee] transition-colors"><GithubIcon width={18} height={18} /></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-white/65 hover:text-[#8ff7ee] transition-colors"><LinkedinIcon width={18} height={18} /></a>
            <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium border border-[#0dd6c8]/35 text-[#8ff7ee] px-3 py-1.5 rounded">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
