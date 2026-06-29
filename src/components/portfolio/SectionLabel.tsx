import { motion } from "framer-motion";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-6 font-mono-accent text-xs tracking-[0.3em] text-muted-foreground uppercase"
    >
      / {children}
    </motion.div>
  );
}
