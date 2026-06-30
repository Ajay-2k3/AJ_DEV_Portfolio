import { useState, useEffect, createContext } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
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
import { PageLoader } from "@/components/portfolio/PageLoader";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { useLenis, getLenis } from "@/hooks/useLenis";

export const LoaderContext = createContext({ loaded: false });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ajay S — Full Stack Software Engineer" },
      { name: "description", content: "Ajay S — Full Stack Software Engineer based in Chennai. React, Node.js, TypeScript. Building scalable production systems." },
    ],
  }),
  component: Index,
});

function PortfolioApp() {
  useLenis();
  return (
    <div className="relative bg-background text-foreground">
      <ScrollProgress />
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
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          },
        }}
      />
    </div>
  );
}

function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Lock scroll during loader
    if (!loaded) {
      document.body.style.overflow = "hidden";
      const lenis = getLenis();
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      const lenis = getLenis();
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <LoaderContext.Provider value={{ loaded }}>
      {loaded && <Cursor />}
      <PageLoader onComplete={() => setLoaded(true)} />
      <div
        className="transition-all duration-1200 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "scale(1)" : "scale(0.985)",
          filter: loaded ? "blur(0px)" : "blur(10px)",
          visibility: loaded ? "visible" : "hidden",
        }}
      >
        <PortfolioApp />
      </div>
    </LoaderContext.Provider>
  );
}
