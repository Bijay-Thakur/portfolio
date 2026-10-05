"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <SectionDivider label="Experience" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-10 sm:mb-14"
      >
        Experience
      </motion.h2>

      <div className="relative">
        <div className="absolute left-3 top-0 bottom-0 w-2 rounded-full bg-[#e4e6ea] shadow-[inset_0_2px_4px_rgba(22,22,22,0.12)] sm:left-5" />

        <div className="space-y-8 sm:space-y-10">
          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.role}-${exp.org}`}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: i * 0.07, ease: "easeOut" }}
              className="relative pl-8 sm:pl-14"
            >
              <div className="clay-icon absolute left-[2px] top-2 h-4 w-4 sm:left-[10px]" />

              <div className="clay-card clay-peach p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-snow text-base">{exp.role}</h3>
                    <p className="text-teal/70 text-sm flex items-center gap-1.5 mt-0.5">
                      <Briefcase size={12} /> {exp.org}
                    </p>
                  </div>
                  <span className="clay-chip shrink-0 px-2.5 py-1 text-xs font-bold">
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
                    <span key={tag} className="clay-chip px-2.5 py-1 text-[10px] font-bold">
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
