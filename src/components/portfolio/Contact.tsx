import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Github, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

function Field({ id, label, type = "text", textarea }: { id: string; label: string; type?: string; textarea?: boolean }) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;
  const cls = `peer w-full resize-none border-0 border-b border-border bg-transparent py-3 text-base text-foreground outline-none transition-colors focus:border-[var(--accent-purple)]`;
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left font-mono-accent text-xs tracking-wider uppercase transition-all duration-300 ${
          active ? "-top-1 scale-90 text-[var(--accent-purple)]" : "top-3 text-muted-foreground"
        }`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea id={id} rows={4} value={val} onChange={(e) => setVal(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className={cls} />
      ) : (
        <input id={id} type={type} value={val} onChange={(e) => setVal(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className={cls} />
      )}
    </div>
  );
}

const socials = [
  { icon: Mail, href: "mailto:ajaysettu1@gmail.com", label: "ajaysettu1@gmail.com" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ajay-s-4b3383267/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/Ajay-2k3", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 md:py-[120px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Contact</SectionLabel>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display mb-6 text-5xl leading-[0.95] font-bold tracking-tight md:text-8xl"
        >
          Let's Build <br />
          <span className="text-gradient-purple">Something Great.</span>
        </motion.h2>
        <p className="mb-16 max-w-2xl text-base text-muted-foreground md:text-lg">
          I'm actively looking for full-stack engineering roles (hybrid / remote). Whether it's a startup or a product team — if you're building something real, let's talk.
        </p>

        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          <form onSubmit={submit} className="space-y-10">
            <Field id="name" label="Your Name" />
            <Field id="email" label="Your Email" type="email" />
            <Field id="message" label="Message" textarea />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full overflow-hidden rounded-full bg-[var(--accent-purple)] py-4 font-medium text-white glow-purple"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.span key="ok" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" /> Message Sent
                  </motion.span>
                ) : (
                  <motion.span key="send" initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} className="flex items-center justify-center gap-2">
                    Send Message <Send className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>

          <div>
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-foreground/90">
                <Mail className="h-4 w-4 text-[var(--accent-purple)]" />
                <a href="mailto:ajaysettu1@gmail.com" className="hover:text-[var(--accent-glow)]">ajaysettu1@gmail.com</a>
              </div>
              <div className="flex items-center gap-3 text-foreground/90">
                <Phone className="h-4 w-4 text-[var(--accent-purple)]" />
                +91-908765432
              </div>
              <div className="flex items-center gap-3 text-foreground/90">
                <MapPin className="h-4 w-4 text-[var(--accent-purple)]" />
                Chennai, Tamil Nadu, India
              </div>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-[var(--accent-purple)]/50"
                >
                  <s.icon className="h-4 w-4 text-[var(--accent-cyan)] transition-colors group-hover:text-[var(--accent-glow)]" />
                  <span className="font-mono-accent text-xs">{s.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
