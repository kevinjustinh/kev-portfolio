import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatusBar from "@/components/StatusBar";
import About from "@/components/About";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { heroStats, bio, experience } from "@/lib/data/about";
import { caseStudies } from "@/lib/data/caseStudies";
import { projects } from "@/lib/data/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <div style={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
          <Hero stats={heroStats} />
          <StatusBar />
        </div>
        <About bio={bio} experience={experience} />
<CaseStudies studies={caseStudies} />
        <Projects projects={projects} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
