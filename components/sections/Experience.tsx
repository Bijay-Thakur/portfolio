"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 max-w-4xl mx-auto">
      <SectionDivider label="Experience" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-serif text-4xl font-semibold text-snow mb-14"
      >
        Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(13,214,200,0.5)] via-[rgba(13,214,200,0.12)] to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.role}-${exp.org}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="relative pl-14"
            >
              <div className="absolute left-[14px] top-2 w-3 h-3 rounded-full border-2 border-teal bg-ocean shadow-[0_0_8px_rgba(13,214,200,0.5)]" />

              <div className="bg-[rgba(13,214,200,0.03)] border border-[rgba(13,214,200,0.1)] rounded-lg p-5 hover:border-[rgba(13,214,200,0.28)] transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-snow text-base">{exp.role}</h3>
                    <p className="text-teal/70 text-sm flex items-center gap-1.5 mt-0.5">
                      <Briefcase size={12} /> {exp.org}
                    </p>
                  </div>
                  <span className="text-xs text-snow border border-[rgba(255,255,255,0.15)] px-2.5 py-1 rounded shrink-0">
                    {exp.dates}
                  </span>
                </div>

                <ul className="space-y-1.5 mb-4">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="text-sm text-muted leading-relaxed flex gap-2">
                      <span className="text-teal/40 mt-1 shrink-0">›</span> {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag}
                      className="text-[10px] px-2 py-0.5 rounded bg-[rgba(13,214,200,0.07)] text-snow border border-[rgba(13,214,200,0.18)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
