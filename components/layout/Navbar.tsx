"use client";

import { useState, useEffect } from "react";
import { FileText, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig, navLinks } from "@/data/portfolio";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
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
          ? "bg-ocean/95 backdrop-blur-md border-b border-[rgba(13,214,200,0.1)] shadow-[0_1px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="font-serif text-xl font-semibold text-teal tracking-widest hover:text-teal-light transition-colors"
        >
          {siteConfig.initials}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-sm text-snow/85 hover:text-teal transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop icons */}
        <div className="hidden md:flex items-center gap-3">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
            className="text-muted hover:text-teal transition-colors">
            <GithubIcon width={17} height={17} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="text-muted hover:text-teal transition-colors">
            <LinkedinIcon width={17} height={17} />
          </a>
          <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" aria-label="Resume"
            className="flex items-center gap-1.5 text-xs font-medium border border-[rgba(13,214,200,0.35)] text-teal px-3 py-1.5 rounded hover:bg-[rgba(13,214,200,0.08)] hover:border-teal transition-all">
            <FileText size={13} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-snow/80 hover:text-teal transition-colors"
          onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-ocean-2/98 backdrop-blur-md border-b border-[rgba(13,214,200,0.1)] px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleNav(e, link.href)}
              className="text-base text-snow/80 hover:text-teal transition-colors py-1">
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-muted hover:text-teal transition-colors"><GithubIcon width={18} height={18} /></a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-muted hover:text-teal transition-colors"><LinkedinIcon width={18} height={18} /></a>
            <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer"
              className="text-xs font-medium border border-[rgba(13,214,200,0.35)] text-teal px-3 py-1.5 rounded">
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
