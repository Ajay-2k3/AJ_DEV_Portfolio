import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";

const marqueeItems = [
  "Full Stack Developer",
  "React.js",
  "Node.js",
  "TypeScript",
  "Fresher",
  "Freelance",
  "Open to Work",
  "Chennai, India",
];

const socials = [
  { Icon: Mail, href: "mailto:ajaysettu1@gmail.com", label: "Email Ajay S" },
  { Icon: Github, href: "https://github.com/Ajay-2k3", label: "Ajay S on GitHub" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/ajay-s-4b3383267/", label: "Ajay S on LinkedIn" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-[var(--bg-secondary)]">
      {/* Marquee strip */}
      <div className="overflow-hidden border-b border-border py-5" aria-hidden="true">
        <div className="flex w-max marquee-track gap-12 font-display text-2xl font-bold whitespace-nowrap md:text-3xl">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12 text-muted-foreground">
              <span className={i % 4 === 0 ? "text-gradient-purple" : ""}>{t}</span>
              <span className="text-[var(--accent-purple)]">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main footer bar */}
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        {/* Left: copyright + availability */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <div className="font-mono-accent text-xs text-muted-foreground">
            © {year} Ajay S. All rights reserved.
          </div>
          {/* Availability status */}
          <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/8 px-3 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            <span className="font-mono-accent text-[10px] tracking-wider text-green-400 uppercase">
              Available for Hire
            </span>
          </div>
        </div>

        {/* Right: social icons + back-to-top */}
        <div className="flex items-center gap-5">
          {socials.map((s) => (
            <Magnetic key={s.label} range={35} strength={0.35}>
              <motion.a
                href={s.href}
                data-magnetic
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="text-muted-foreground transition-colors hover:text-[var(--accent-glow)] flex h-8 w-8 items-center justify-center rounded-full"
                aria-label={s.label}
              >
                <s.Icon className="h-4 w-4" />
              </motion.a>
            </Magnetic>
          ))}

          {/* Gradient divider */}
          <div className="h-4 w-px bg-border" aria-hidden="true" />

          {/* Back to top */}
          <Magnetic range={40} strength={0.25}>
            <motion.button
              onClick={scrollTop}
              data-magnetic
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 font-mono-accent text-xs text-foreground transition-all duration-300 hover:border-[var(--accent-purple)] hover:text-[var(--accent-purple)]"
              aria-label="Back to top of page"
            >
              Back to Top
              <motion.span
                animate={{ y: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowUp className="h-3 w-3" />
              </motion.span>
            </motion.button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
