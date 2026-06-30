import { useEffect, useRef, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LoaderContext } from "@/routes/index";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "skills", "projects", "experience", "education", "contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { loaded } = useContext(LoaderContext);
  const lastY = useRef(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 80) {
        setVisible(y < lastY.current);
      } else {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={loaded ? { y: visible ? 0 : -90, opacity: visible ? 1 : 0 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "py-5"
        }`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6">
          {/* Logo */}
          <a
            href="#top"
            className="font-display text-2xl font-bold"
            aria-label="Ajay S — back to top"
          >
            <span className="text-gradient-purple">A</span>
            <span className="text-foreground">.S</span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex" role="menubar">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                  role="menuitem"
                  className="group relative font-mono-accent text-xs tracking-wider uppercase transition-colors duration-300"
                  style={{ color: isActive ? "var(--text-primary)" : "var(--text-muted)" }}
                >
                  {l.label}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] transition-all duration-500"
                    style={{ width: isActive ? "100%" : "0%", opacity: isActive ? 1 : 0 }}
                  />
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[var(--accent-purple)] transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              );
            })}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
              className="group relative hidden overflow-hidden rounded-full border border-[var(--accent-purple)] px-5 py-2 text-xs font-medium tracking-wider uppercase transition-colors hover:text-white md:inline-flex items-center gap-2"
            >
              <span className="absolute inset-0 -z-10 translate-y-full bg-[var(--accent-purple)] transition-transform duration-400 group-hover:translate-y-0" />
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              className="flex items-center justify-center md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 overflow-hidden"
            style={{ background: "rgba(5,5,5,0.97)", backdropFilter: "blur(20px)" }}
          >
            {/* Ambient glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[400px] w-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, var(--accent-purple), transparent 70%)" }} />
            </div>

            <nav className="relative flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(l.href); }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl font-bold text-foreground/80 transition-colors hover:text-foreground"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: links.length * 0.07 + 0.1, duration: 0.5 }}
                className="mt-4 rounded-full bg-[var(--accent-purple)] px-8 py-3 font-medium text-white glow-purple"
              >
                Hire Me
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
