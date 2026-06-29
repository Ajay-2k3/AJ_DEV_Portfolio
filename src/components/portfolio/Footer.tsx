import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";

const marqueeItems = [
  "Full Stack Engineer",
  "React.js",
  "Node.js",
  "TypeScript",
  "Open to Work",
  "Chennai, India",
  "Building at Scale",
];

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-[var(--bg-secondary)]">
      <div className="overflow-hidden border-b border-border py-6">
        <div className="flex w-max marquee-track gap-12 font-display text-2xl font-bold whitespace-nowrap md:text-3xl">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12 text-muted-foreground">
              <span className={i % 3 === 0 ? "text-gradient-purple" : ""}>{t}</span>
              <span className="text-[var(--accent-purple)]">·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <div className="font-mono-accent text-xs text-muted-foreground">
          © 2025 Ajay S. All rights reserved.
        </div>
        <div className="flex items-center gap-5">
          <a href="mailto:ajaysettu1@gmail.com" className="text-muted-foreground hover:text-foreground"><Mail className="h-4 w-4" /></a>
          <a href="https://github.com/Ajay-2k3" className="text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /></a>
          <a href="https://www.linkedin.com/in/ajay-s-4b3383267/" className="text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono-accent text-xs text-foreground transition-colors hover:border-[var(--accent-purple)]"
          >
            Back to Top <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
