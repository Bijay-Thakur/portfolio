"use client";

import { motion } from "framer-motion";
import { Mail, FileText, MapPin, Clock, Briefcase } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import SectionBadge from "@/components/ui/SectionBadge";
import GradientText from "@/components/ui/GradientText";
import ContactForm from "@/components/contact/ContactForm";
import FooterCTA from "@/components/layout/FooterCTA";
import { siteConfig, lookingFor } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const directContacts = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: <LinkedinIcon style={{ width: 18, height: 18 }} />,
    label: "LinkedIn",
    value: "bijay-thakur",
    href: siteConfig.linkedin,
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: <GithubIcon style={{ width: 18, height: 18 }} />,
    label: "GitHub",
    value: "Bijay-Thakur",
    href: siteConfig.github,
    color: "bg-slate-100 text-slate-700",
  },
  {
    icon: <FileText size={18} />,
    label: "Resume",
    value: "Download PDF",
    href: siteConfig.resume,
    color: "bg-violet-50 text-violet-600",
  },
];

const quickInfo = [
  { icon: <MapPin size={14} />, text: "New York, USA" },
  { icon: <Briefcase size={14} />, text: "Open to opportunities" },
  { icon: <Clock size={14} />, text: "Usually responds quickly" },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <SectionBadge className="mb-4">Let&apos;s connect</SectionBadge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-5">
            Let&apos;s build something{" "}
            <GradientText>meaningful.</GradientText>
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            I&apos;m open to internships, AI/ML opportunities, software engineering roles, and thoughtful collaborations.
          </p>
        </motion.div>
      </section>

      {/* Main layout */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm />
          </motion.div>

          {/* Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Personal note */}
            <div className="bg-gradient-to-br from-blue-600 to-violet-700 rounded-2xl p-6 text-white">
              <p className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-3">A note from me</p>
              <p className="text-white/90 leading-relaxed text-sm">
                I love turning complex problems into simple, impactful solutions. I&apos;m passionate about
                learning, collaborating, and building intelligent systems that create real-world value.
                Whether it&apos;s contributing to your team, tackling a tough challenge, or exploring a new
                idea together — I&apos;d love to connect.
              </p>
            </div>

            {/* Direct contact */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <p className="text-sm font-semibold text-slate-900 mb-4">Direct contact</p>
              <div className="grid grid-cols-2 gap-3">
                {directContacts.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={contact.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${contact.color}`}>
                      {contact.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{contact.label}</p>
                      <p className="text-xs font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
              <div className="flex flex-col gap-2.5">
                {quickInfo.map((info) => (
                  <div key={info.text} className="flex items-center gap-2.5 text-slate-500 text-sm">
                    <span className="text-slate-400">{info.icon}</span>
                    {info.text}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Currently looking for */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <p className="text-sm font-semibold text-slate-900 mb-4">Currently looking for</p>
          <div className="flex flex-wrap gap-3">
            {lookingFor.map((item, i) => (
              <motion.span
                key={item}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-700"
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex-shrink-0" />
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
}
