"use client";

import { motion } from "framer-motion";
import { GraduationCap, Star } from "lucide-react";
import SectionDivider from "@/components/ui/SectionDivider";
import { education } from "@/data/portfolio";

export default function Education() {
  return (
    <section id="education" className="py-16 md:py-24 px-4 max-w-4xl mx-auto">
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
        <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[rgba(13,214,200,0.5)] via-[rgba(13,214,200,0.15)] to-transparent" />

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
              <div className="absolute left-[6px] sm:left-[14px] top-3 w-3 h-3 rounded-full border-2 border-teal bg-ocean shadow-[0_0_8px_rgba(13,214,200,0.5)]" />

              {/* Card */}
              <div className="bg-[rgba(13,214,200,0.03)] border border-[rgba(13,214,200,0.1)] rounded-lg p-4 sm:p-5 hover:border-[rgba(13,214,200,0.28)] transition-colors">

                {/* Row 1 — school + date */}
                <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={15} className="text-teal/60 shrink-0" />
                    <h3 className="font-semibold text-snow text-base leading-snug">{edu.school}</h3>
                  </div>
                  <span className="text-xs text-snow font-medium border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 rounded shrink-0">
                    {edu.period}
                  </span>
                </div>

                {/* Degree */}
                <p className="text-teal/80 text-sm font-medium mb-3 sm:pl-5">{edu.degree}</p>

                {/* GPA + Honor row */}
                <div className="flex flex-wrap gap-2 sm:pl-5 mb-3">
                  <span className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[rgba(13,214,200,0.08)] border border-[rgba(13,214,200,0.2)] text-teal font-semibold">
                    GPA {edu.gpa}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-[rgba(255,215,0,0.07)] border border-[rgba(255,215,0,0.2)] text-yellow-300/80">
                    <Star size={10} className="fill-yellow-400/60 text-yellow-400/60" />
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
