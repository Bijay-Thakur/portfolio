"use client";

import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
      <SectionDivider label="Education" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-10 sm:mb-14"
      >
        Education
      </motion.h2>

      {/* ── Timeline ─────────────────────────────────── */}
      <div className="relative">
        {/* Vertical spine */}
        <div className="absolute left-3 top-0 bottom-0 w-2 rounded-full bg-[#e4e6ea] shadow-[inset_0_2px_4px_rgba(22,22,22,0.12)] sm:left-5" />

        <div className="space-y-8 sm:space-y-10">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.38, delay: i * 0.08, ease: "easeOut" }}
              className="relative pl-8 sm:pl-14"
            >
              {/* Timeline dot */}
              <div className="clay-icon absolute left-[2px] top-3 h-4 w-4 sm:left-[10px]" />

              <div className="clay-card clay-sky p-4 sm:p-5">

                {/* Row 1 — school + date */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={15} className="text-teal/60 shrink-0" />
                    <h3 className="font-semibold text-snow text-base leading-snug">{edu.school}</h3>
                  </div>
                  <span className="clay-chip shrink-0 px-2.5 py-1 text-xs font-bold">
                    {edu.period}
                  </span>
                </div>

                {/* Degree */}
                <p className="text-teal/80 text-sm font-medium mb-3 sm:pl-5">{edu.degree}</p>

                {/* GPA + Honor row */}
                <div className="flex flex-wrap gap-2 sm:pl-5 mb-3">
                  <span className="clay-chip flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-teal">
                    GPA {edu.gpa}
                  </span>
                  <span className="clay-chip flex items-center gap-1 bg-[#f4f5f7] px-2.5 py-1 text-[11px] font-bold text-[#161616]">
                    <Star size={10} className="fill-[#161616] text-[#161616]" />
                    {edu.honor}
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
