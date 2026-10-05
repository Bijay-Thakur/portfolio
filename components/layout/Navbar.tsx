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
    <header className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4">
      <div className={`clay-nav mx-auto flex h-14 max-w-7xl items-center justify-between px-4 transition-all duration-300 sm:px-5 2xl:max-w-[1600px] ${scrolled ? "shadow-[0_18px_36px_rgba(22,22,22,0.14)]" : ""}`}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="clay-icon h-10 w-10 font-serif text-sm font-semibold tracking-widest text-teal transition-transform hover:-translate-y-0.5"
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
                className={`group relative text-sm font-bold tracking-wide transition-colors ${
                  isActive ? "text-teal" : "text-snow/80 hover:text-teal"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-1.5 rounded-full bg-teal/80 transition-all duration-300 ${
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
            className="clay-icon h-9 w-9 transition-transform hover:-translate-y-0.5">
            <GithubIcon width={16} height={16} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="clay-icon h-9 w-9 transition-transform hover:-translate-y-0.5">
            <LinkedinIcon width={16} height={16} />
          </a>
          <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume"
            className="clay-btn flex items-center gap-1.5 px-4 py-2 text-xs font-bold">
            <FileText size={13} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="clay-icon h-10 w-10 lg:hidden"
          onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="clay-card mx-auto mt-3 flex max-h-[70svh] max-w-7xl flex-col gap-3 overflow-y-auto px-4 py-5 lg:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-base font-bold transition-colors ${
                activeHref === link.href ? "clay-inset text-teal" : "text-snow/80 hover:text-teal"
              }`}>
              <span className={`h-2.5 w-2.5 rounded-full ${
                activeHref === link.href ? "bg-teal" : "bg-snow/20"
              }`} />
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-3 pt-3">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="clay-icon h-10 w-10"><GithubIcon width={18} height={18} /></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="clay-icon h-10 w-10"><LinkedinIcon width={18} height={18} /></a>
            <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer"
              className="clay-btn px-4 py-2 text-xs font-bold">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
