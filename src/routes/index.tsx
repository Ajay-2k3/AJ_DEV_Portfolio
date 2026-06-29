import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Cursor } from "@/components/portfolio/Cursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ajay S — Full Stack Software Engineer" },
      { name: "description", content: "Ajay S — Full Stack Software Engineer based in Chennai. React, Node.js, TypeScript. Building scalable production systems." },
      { property: "og:title", content: "Ajay S — Full Stack Software Engineer" },
      { property: "og:description", content: "Full Stack Engineer building real-time IoT dashboards and AI-powered platforms with clean code and zero compromise." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative bg-background text-foreground">
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
