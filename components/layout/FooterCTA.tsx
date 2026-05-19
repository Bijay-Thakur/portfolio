import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { siteConfig } from "@/data/portfolio";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";

export default function FooterCTA() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-sm font-semibold text-indigo-500 uppercase tracking-widest mb-3">
            Let&apos;s connect
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            Open to opportunities &amp; <GradientText>great conversations</GradientText>
          </h2>
          <p className="text-slate-500 text-sm">
            {siteConfig.email}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href={`mailto:${siteConfig.email}`} variant="primary" size="md">
            <Mail size={15} /> Let&apos;s Connect
          </Button>
          <Button href={siteConfig.linkedin} external variant="secondary" size="md">
            <LinkedinIcon style={{ width: 15, height: 15 }} /> LinkedIn
          </Button>
          <Button href={siteConfig.github} external variant="secondary" size="md">
            <GithubIcon style={{ width: 15, height: 15 }} /> GitHub
          </Button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-10">
          © {new Date().getFullYear()} Bijay Thakur · Built with Next.js & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
