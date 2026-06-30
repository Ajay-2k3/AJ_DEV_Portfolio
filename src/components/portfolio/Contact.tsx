import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Github, Linkedin, Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SectionLabel } from "./SectionLabel";
import { fadeUp, slideLeft, slideRight, staggerContainer, viewport } from "@/lib/motionVariants";
import { Magnetic } from "@/components/ui/Magnetic";

// Field validation shake animation
const fieldVariants = {
  error: {
    x: [0, -6, 6, -6, 6, -3, 3, 0],
    transition: { duration: 0.45, ease: "easeInOut" }
  },
  normal: { x: 0 }
};

// Animated floating-label field
function Field({
  id,
  label,
  type = "text",
  textarea,
  error,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focus, setFocus] = useState(false);
  const active = focus || value.length > 0;
  const baseCls =
    "peer w-full resize-none border-0 border-b bg-transparent py-3 text-base text-foreground outline-none transition-all duration-300 placeholder-transparent";
  
  const borderCls = error
    ? "border-red-500/60"
    : focus
    ? "border-[var(--accent-purple)]"
    : "border-border";

  return (
    <motion.div 
      variants={fieldVariants}
      animate={error ? "error" : "normal"}
      className="group relative"
    >
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 origin-left font-mono-accent text-xs tracking-wider uppercase transition-all duration-300 ${
          active ? "-top-1.5 scale-90 text-[var(--accent-purple)]" : "top-3 text-muted-foreground"
        } ${error ? "text-red-400" : ""}`}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          required
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${baseCls} ${borderCls}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          required
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${baseCls} ${borderCls}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      
      {/* Animated underline glow */}
      <div
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-cyan)] transition-transform duration-500"
        style={{ transform: focus ? "scaleX(1)" : "scaleX(0)" }}
      />
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 font-mono-accent text-[10px] text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}

const EMAIL = "ajaysettu1@gmail.com";

const socials = [
  { Icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
  { Icon: Linkedin, href: "https://www.linkedin.com/in/ajay-s-4b3383267/", label: "LinkedIn" },
  { Icon: Github, href: "https://github.com/Ajay-2k3", label: "GitHub" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 10) e.message = "Message is too short";
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Shake screen feedback
      toast.error("Please resolve form issues");
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Simulate async submit and mailto redirect
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    setSent(true);
    toast.success("Message compiled! Redirecting to mail client...", { duration: 4000 });
    
    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}?subject=Portfolio Inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`;
    }, 800);

    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
    }, 4000);
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32" aria-label="Contact section">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionLabel>Contact</SectionLabel>
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="font-display mb-6 text-5xl leading-[0.95] font-bold tracking-tight md:text-8xl"
        >
          Let's Build <br />
          <span className="text-gradient-purple">Something Great.</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mb-16 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          I'm a MCA fresher actively seeking full-time Software Engineer positions or freelance engagements. If you have an exciting technical challenge, let's talk.
        </motion.p>

        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* Form wrapper */}
          <motion.form
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            onSubmit={submit}
            className="space-y-10"
            noValidate
            aria-label="Contact form"
          >
            <Field id="name" label="Your Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} error={errors.name} />
            <Field id="email" label="Your Email" type="email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} error={errors.email} />
            <Field id="message" label="Message" textarea value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} error={errors.message} />

            {/* Premium morphing layout button */}
            <div className="flex justify-start items-center min-h-[56px]">
              <motion.button
                layout
                type="submit"
                disabled={submitting || sent}
                whileHover={!submitting && !sent ? { scale: 1.02 } : {}}
                whileTap={!submitting && !sent ? { scale: 0.98 } : {}}
                className={`relative flex items-center justify-center font-semibold text-white glow-purple transition-all duration-500 ease-out bg-[var(--accent-purple)] ${
                  submitting || sent
                    ? "h-14 w-14 rounded-full p-0"
                    : "h-14 w-full rounded-full px-8"
                }`}
                aria-label={sent ? "Message sent" : submitting ? "Sending message" : "Send message"}
              >
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.span key="ok" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-white">
                      <Check className="h-6 w-6" />
                    </motion.span>
                  ) : submitting ? (
                    <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </motion.span>
                  ) : (
                    <motion.span key="send" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} className="flex items-center justify-center gap-2">
                      Send Message <Send className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.form>

          {/* Contact Details */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
          >
            <div className="space-y-6">
              {/* Email with copy button */}
              <div className="flex items-center gap-3 text-foreground/90 border border-border/40 bg-card/30 p-3 rounded-xl">
                <Mail className="h-4.5 w-4.5 shrink-0 text-[var(--accent-purple)]" />
                <a href={`mailto:${EMAIL}`} className="hover:text-[var(--accent-glow)] transition-colors text-sm font-medium">
                  {EMAIL}
                </a>
                <motion.button
                  onClick={copyEmail}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-auto flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono-accent text-[10px] text-muted-foreground transition-colors hover:border-[var(--accent-purple)]/40 hover:text-[var(--accent-purple)]"
                  aria-label="Copy email address"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="h-3 w-3 text-green-400" />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Copy className="h-3 w-3" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {copied ? "Copied!" : "Copy"}
                </motion.button>
              </div>

              <div className="flex items-center gap-3 text-foreground/90 border border-border/40 bg-card/30 p-3 rounded-xl">
                <Phone className="h-4.5 w-4.5 shrink-0 text-[var(--accent-purple)]" />
                <span className="text-sm font-medium">+91-9344170591</span>
              </div>

              <div className="flex items-center gap-3 text-foreground/90 border border-border/40 bg-card/30 p-3 rounded-xl">
                <MapPin className="h-4.5 w-4.5 shrink-0 text-[var(--accent-purple)]" />
                <span className="text-sm font-medium">Chennai, Tamil Nadu, India</span>
              </div>
            </div>

            {/* Social links mapped with magnetic interactions */}
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="mt-10 grid grid-cols-2 gap-3"
            >
              {socials.map((s) => (
                <Magnetic key={s.label} range={35} strength={0.3}>
                  <motion.a
                    href={s.href}
                    variants={fadeUp}
                    data-magnetic
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    target={s.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all duration-300 hover:border-[var(--accent-purple)]/50 hover:shadow-[0_4px_20px_rgba(124,58,237,0.1)] w-full"
                    aria-label={s.label}
                  >
                    <s.Icon className="h-4 w-4 text-[var(--accent-cyan)] transition-colors group-hover:text-[var(--accent-glow)]" />
                    <span className="font-mono-accent text-xs">{s.label}</span>
                  </motion.a>
                </Magnetic>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
