"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 max-w-6xl mx-auto">
      <SectionDivider label="Technical Skills" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-10 sm:mb-14"
      >
        Technical Skills
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.38, delay: i * 0.06, ease: "easeOut" }}
            className="bg-[rgba(13,214,200,0.03)] border border-[rgba(13,214,200,0.1)] rounded-lg p-4 sm:p-5 hover:border-[rgba(13,214,200,0.28)] transition-colors"
          >
            <h3 className="text-teal/80 text-xs tracking-[0.18em] uppercase font-medium mb-4">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill}
                  className="text-xs px-2.5 py-1 rounded bg-[rgba(255,255,255,0.04)] text-snow/80 border border-[rgba(255,255,255,0.07)] hover:border-[rgba(13,214,200,0.3)] hover:text-snow transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
