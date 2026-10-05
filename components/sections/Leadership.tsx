"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { leadership } from "@/data/portfolio";

export default function Leadership() {
  return (
    <section id="leadership" className="py-16 md:py-24 px-4 sm:px-6 max-w-6xl 2xl:max-w-7xl mx-auto">
      <SectionDivider label="Leadership & Involvement" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="font-serif text-3xl sm:text-4xl font-semibold text-snow mb-10 sm:mb-14"
      >
        Leadership & Involvement
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {leadership.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.38, delay: i * 0.07, ease: "easeOut" }}
            className="clay-card clay-rose min-w-0 p-4 sm:p-5"
          >
            <h3 className="font-semibold text-snow text-base">{item.title}</h3>
            <p className="text-teal/60 text-xs mt-0.5 mb-3">
              {item.org}{item.period && ` · ${item.period}`}
            </p>
            <p className="text-muted text-sm leading-relaxed mb-4">{item.description}</p>
            {item.tags && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                    <span key={tag} className="clay-chip px-2.5 py-1 text-[10px] font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
