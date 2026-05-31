"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionDivider from "@/components/ui/SectionDivider";
import { siteConfig } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto">
      <SectionDivider label="About" />

      <div className="grid lg:grid-cols-2 gap-8 items-center">

        {/* ── Profile image + wave rings ───────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          {/* Wrapper — all rings share this centre */}
          <div className="relative flex items-center justify-center" style={{ width: 280, height: 280 }}>

            {/* Wave ring 1 — innermost, fastest */}
            <div
              className="ripple-ring absolute inset-0 rounded-full border border-[rgba(13,214,200,0.35)]"
              style={{ zIndex: 0 }}
            />
            {/* Wave ring 2 */}
            <div
              className="ripple-ring ripple-ring-2 absolute inset-0 rounded-full border border-[rgba(13,214,200,0.25)]"
              style={{ zIndex: 0 }}
            />
            {/* Wave ring 3 — outermost, slowest */}
            <div
              className="ripple-ring ripple-ring-3 absolute inset-0 rounded-full border border-[rgba(13,214,200,0.15)]"
              style={{ zIndex: 0 }}
            />

            {/* Static outer glow ring */}
            <div
              className="absolute inset-0 rounded-full border border-[rgba(13,214,200,0.12)] pointer-events-none"
              style={{ zIndex: 1 }}
            />

            {/* ── Circular image ── */}
            <div
              className="relative rounded-full overflow-hidden border-2 border-[rgba(13,214,200,0.5)] shadow-[0_0_48px_rgba(13,214,200,0.15)]"
              style={{ width: 220, height: 220, zIndex: 2 }}
            >
              <Image
                src="/images/profileImage.png"
                alt="Bijay Thakur"
                fill
                sizes="220px"
                className="object-cover object-top"
                priority
              />
            </div>

            {/* Subtle teal glow behind image */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(13,214,200,0.08) 0%, transparent 65%)",
                zIndex: 1,
              }}
            />
          </div>
        </motion.div>

        {/* ── Text ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <h2 className="font-serif text-4xl font-semibold text-snow mb-6">About Me</h2>
          <p className="text-muted leading-relaxed mb-8 text-[15px]">{siteConfig.about}</p>

          <div className="flex flex-wrap gap-2">
            {siteConfig.focusTags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                className="text-xs font-medium px-3 py-1 rounded-full border border-[rgba(13,214,200,0.25)] text-teal/80 bg-[rgba(13,214,200,0.05)]"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
