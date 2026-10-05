"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { skillGroups } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
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
            className={`clay-card ${["clay-lilac", "clay-mint", "clay-peach", "clay-sky", "clay-rose"][i % 5]} p-4 sm:p-5`}
          >
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-teal">
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span key={skill} className="clay-chip cursor-default px-2.5 py-1 text-xs font-bold">
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
