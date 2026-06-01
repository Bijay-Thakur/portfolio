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
    <section id="contact" className="py-24 px-4 max-w-3xl mx-auto text-center">
      <SectionDivider label="Contact" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
      >
        <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-snow mb-5">
          Let&apos;s Build Something Meaningful
        </h2>
        <p className="text-muted leading-relaxed mb-14 max-w-lg mx-auto">
          Open to internships, AI/ML roles, SWE opportunities, and interesting collaborations.
          Feel free to reach out — I respond to every message.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-14">
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
              className="flex items-center gap-3 bg-[rgba(13,214,200,0.03)] border border-[rgba(13,214,200,0.12)] rounded-lg p-4 hover:border-[rgba(13,214,200,0.38)] hover:bg-[rgba(13,214,200,0.05)] transition-[border-color,background] group"
            >
              <div className="w-9 h-9 rounded-full bg-[rgba(13,214,200,0.08)] border border-[rgba(13,214,200,0.2)] flex items-center justify-center text-teal/70 group-hover:text-teal transition-colors shrink-0">
                {iconMap[link.icon]}
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-snow group-hover:text-teal transition-colors">{link.label}</p>
                <p className="text-xs text-muted/60">{link.desc}</p>
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
          className="inline-flex items-center gap-2 px-8 py-3 bg-teal text-ocean text-sm font-semibold rounded hover:bg-teal-light transition-colors"
        >
          <Mail size={15} /> Send an Email
        </motion.a>
      </motion.div>

      <div className="mt-20 pt-8 border-t border-[rgba(255,255,255,0.06)]">
        <p className="text-xs text-muted/40">
          © {new Date().getFullYear()} Bijay Thakur · Built with Next.js, Tailwind CSS & Framer Motion
        </p>
      </div>
    </section>
  );
}
