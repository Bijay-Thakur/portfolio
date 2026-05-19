"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig } from "@/data/portfolio";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Bijay Thakur - Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              BT
            </div>
            <span className="font-semibold text-slate-900 text-sm hidden sm:block">
              Bijay Thakur
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop action links */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <GithubIcon style={{ width: 17, height: 17 }} />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <LinkedinIcon style={{ width: 17, height: 17 }} />
            </a>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              className="ml-1 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
            >
              <FileText size={14} />
              Resume
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <GithubIcon style={{ width: 16, height: 16 }} /> GitHub
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <LinkedinIcon style={{ width: 16, height: 16 }} /> LinkedIn
                </a>
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-medium"
                >
                  <FileText size={14} /> Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
