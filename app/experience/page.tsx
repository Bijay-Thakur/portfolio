"use client";

import { motion } from "framer-motion";
import { GraduationCap, Hammer, Zap, Users, BookOpen } from "lucide-react";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import ExperienceCard from "@/components/experience/ExperienceCard";
import FooterCTA from "@/components/layout/FooterCTA";
import { experiences, education, workStyles } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const workIconMap: Record<string, React.ReactNode> = {
  Hammer: <Hammer size={18} className="text-blue-600" />,
  Zap: <Zap size={18} className="text-violet-600" />,
  Users: <Users size={18} className="text-indigo-600" />,
  BookOpen: <BookOpen size={18} className="text-blue-500" />,
};

export default function ExperiencePage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <SectionBadge className="mb-4">Experience</SectionBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5 max-w-2xl">
            Learning by building,{" "}
            <GradientText>collaborating, and shipping.</GradientText>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-xl">
            Internships, tutoring, and hands-on building shaped the way I solve problems.
          </p>
        </motion.div>
      </section>

      {/* Experience cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid sm:grid-cols-2 gap-5">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ExperienceCard experience={exp} index={i} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-8">
          <SectionBadge className="mb-3">Approach</SectionBadge>
          <h2 className="text-2xl font-bold text-slate-900">How I work</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {workStyles.map((style, i) => (
            <motion.div
              key={style.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
            >
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center mb-4">
                {workIconMap[style.icon]}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{style.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{style.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="mb-6">
          <SectionBadge className="mb-3">Education</SectionBadge>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 flex flex-col sm:flex-row gap-6 items-start"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-lg">{education.school}</h3>
            <p className="text-blue-600 font-medium mt-0.5">{education.degree}</p>
            <p className="text-slate-400 text-sm mt-1">{education.expected}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {education.focus.map((f) => (
                <span
                  key={f}
                  className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-600"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <FooterCTA />
    </div>
  );
}
