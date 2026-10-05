"use client";

import { motion } from "framer-motion";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SectionDivider from "@/components/ui/SectionDivider";
import { siteConfig } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  Github:   <GithubIcon width={18} height={18} />,
  Linkedin: <LinkedinIcon width={18} height={18} />,
  Mail:     <Mail size={18} />,
  FileText: <FileText size={18} />,
};

const links = [
  { label: "GitHub",   href: siteConfig.github,             icon: "Github",   desc: "Projects & code" },
  { label: "LinkedIn", href: siteConfig.linkedin,           icon: "Linkedin", desc: "Professional profile" },
  { label: "Email",    href: `mailto:${siteConfig.email}`,  icon: "Mail",     desc: siteConfig.email },
  { label: "Resume",   href: siteConfig.resume,             icon: "FileText", desc: "Download PDF" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center">
      <SectionDivider label="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-snow mb-5">
          Let&apos;s Build Something Meaningful
        </h2>
        <p className="text-muted leading-relaxed mb-10 sm:mb-14 max-w-lg mx-auto">
          Open to internships, AI/ML roles, SWE opportunities, and interesting collaborations.
          Feel free to reach out — I respond to every message.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 mb-10 sm:mb-14">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: 0.08 + i * 0.06, ease: "easeOut" }}
              whileHover={{ y: -3, transition: { duration: 0.15 } }}
              className={`clay-card ${["clay-lilac", "clay-peach", "clay-mint", "clay-sky"][i % 4]} group flex min-w-0 items-center gap-3 p-4`}
            >
              <div className="clay-icon h-10 w-10 shrink-0">
                {iconMap[link.icon]}
              </div>
              <div className="min-w-0 text-left">
                <p className="text-sm font-medium text-snow group-hover:text-teal transition-colors">{link.label}</p>
                <p className="break-words text-xs text-muted/60">{link.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.a
          href={`mailto:${siteConfig.email}`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          whileHover={{ scale: 1.03 }}
          className="clay-btn inline-flex items-center gap-2 px-6 py-3 text-sm font-bold sm:px-8"
        >
          <Mail size={15} /> Send an Email
        </motion.a>
      </motion.div>

      <div className="mt-14 pt-8 sm:mt-20">
        <p className="text-xs font-bold text-muted/70">
          © {new Date().getFullYear()} Bijay Thakur · Built with Next.js, Tailwind CSS & Framer Motion
        </p>
      </div>
    </section>
  );
}
