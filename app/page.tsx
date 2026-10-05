import Navbar from "@/components/layout/Navbar";
import SectionBubbles from "@/components/ui/SectionBubbles";
import HeroSection from "@/components/hero/HeroSection";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Leadership from "@/components/sections/Leadership";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div className="relative z-0">
          <SectionBubbles />
          <About />
          <Projects />
          <Experience />
          <Education />
          <Leadership />
          <Skills />
          <Contact />
        </div>
      </main>
    </>
  );
}
