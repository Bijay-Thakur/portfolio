"use client";

import { motion } from "framer-motion";
import { Lightbulb, Target, TrendingUp, Award } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import FooterCTA from "@/components/layout/FooterCTA";
import { storySteps, whatShapedMe, milestones, siteConfig } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const shapedIcons: Record<string, React.ReactNode> = {
  Curiosity: <Lightbulb size={16} className="text-amber-500" />,
  Discipline: <Target size={16} className="text-blue-500" />,
  "Systems Thinking": <TrendingUp size={16} className="text-violet-500" />,
  Impact: <Award size={16} className="text-green-500" />,
};

function GrowthVisual() {
  const labels = ["Curious mind", "Building & experimenting", "Creating impact"];
  const colors = ["bg-blue-500", "bg-violet-500", "bg-indigo-600"];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-6">Growth path</p>
      <div className="flex flex-col gap-0">
        {labels.map((label, i) => (
          <div key={label} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${colors[i]} flex-shrink-0 mt-1`} />
              {i < labels.length - 1 && (
                <div className="w-px h-10 bg-slate-200 mt-1" />
              )}
            </div>
            <div className={i < labels.length - 1 ? "pb-10" : ""}>
              <p className="font-medium text-slate-800 text-sm">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionBadge className="mb-4">About me</SectionBadge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
              From curiosity to{" "}
              <GradientText>intelligent systems.</GradientText>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              I&apos;m a Computer Science student at Queens College. My journey started with curiosity
              and tutoring peers, and evolved into a passion for AI/ML engineering and product-minded
              building. I love turning ideas into reliable systems that create real-world impact.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GrowthVisual />
          </motion.div>
        </div>
      </section>

      {/* Journey in 3 steps */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="text-center mb-10">
          <SectionBadge className="mb-3">My journey</SectionBadge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            My journey, in three steps
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {storySteps.map((step, i) => (
            <motion.div
              key={step.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative bg-white rounded-2xl border border-slate-100 shadow-sm p-6 overflow-hidden"
            >
              <span className="text-6xl font-black text-slate-50 absolute top-2 right-4 select-none leading-none">
                {step.step}
              </span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-4">
                <span className="text-white text-xs font-bold">{step.step}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 relative z-10">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed relative z-10">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What shaped me */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-8">
          <SectionBadge className="mb-3">Values</SectionBadge>
          <h2 className="text-2xl font-bold text-slate-900">What shaped me</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {whatShapedMe.map((value, i) => (
            <motion.div
              key={value}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-3"
            >
              {shapedIcons[value]}
              <span className="text-sm font-semibold text-slate-800">{value}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Where I'm heading */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-3xl p-8 sm:p-10 text-white"
        >
          <SectionBadge className="bg-white/20 text-white border-white/20 mb-4">
            What&apos;s next
          </SectionBadge>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Where I&apos;m heading next</h2>
          <p className="text-white/85 leading-relaxed max-w-2xl text-lg">
            I&apos;m focused on becoming a strong AI/ML engineer who can design, build, and ship reliable,
            scalable, and production-grade systems. I&apos;m especially excited about NLP, intelligent agents,
            and applied ML that solve real problems. I&apos;m looking for opportunities to contribute, learn
            from great teams, and create meaningful impact.
          </p>
        </motion.div>
      </section>

      {/* Milestones */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-6">
          <SectionBadge className="mb-3">Milestones</SectionBadge>
        </div>
        <div className="flex flex-wrap gap-3">
          {milestones.map((m, i) => (
            <motion.div
              key={m}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-2.5"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600" />
              <span className="text-sm font-medium text-slate-700">{m}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-sm text-slate-500">{siteConfig.location} · {siteConfig.email}</p>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
