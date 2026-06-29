import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass-nav py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="font-display text-2xl font-bold">
          <span className="text-gradient-purple">A</span>
          <span className="text-foreground">.S</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-mono-accent text-xs tracking-wider text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[var(--accent-purple)] transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[var(--accent-purple)] px-5 py-2 text-xs font-medium tracking-wider uppercase transition-colors hover:text-white"
        >
          <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--accent-purple)] transition-transform duration-500 group-hover:translate-y-0" />
          Hire Me
        </a>
      </div>
    </motion.nav>
  );
}
