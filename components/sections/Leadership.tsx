"use client";

import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { leadership } from "@/data/portfolio";

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 px-4 max-w-6xl mx-auto">
      <SectionDivider label="Leadership & Involvement" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="font-serif text-4xl font-semibold text-snow mb-14"
      >
        Leadership & Involvement
      </motion.h2>

      <div className="grid sm:grid-cols-2 gap-5">
        {leadership.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            className="bg-[rgba(13,214,200,0.03)] border border-[rgba(13,214,200,0.1)] rounded-lg p-5 hover:border-[rgba(13,214,200,0.28)] transition-colors"
          >
            <h3 className="font-semibold text-snow text-base">{item.title}</h3>
            <p className="text-teal/60 text-xs mt-0.5 mb-3">
              {item.org}{item.period && ` · ${item.period}`}
            </p>
            <p className="text-muted text-sm leading-relaxed mb-4">{item.description}</p>
            {item.tags && (
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                    <span key={tag}
                    className="text-[10px] px-2 py-0.5 rounded bg-[rgba(13,214,200,0.07)] text-snow border border-[rgba(13,214,200,0.18)]">
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
