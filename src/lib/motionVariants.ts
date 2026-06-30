import type { Variants } from "framer-motion";

// ─── Shared easing ────────────────────────────────────────────────────────────
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  in: [0.7, 0, 0.84, 0] as const,
  inOut: [0.87, 0, 0.13, 1] as const,
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
  springGentle: { type: "spring" as const, stiffness: 180, damping: 22 },
};

// ─── Fade up (default entry) ──────────────────────────────────────────────────
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

// ─── Fade in ──────────────────────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.6, ease: ease.out },
  },
};

// ─── Scale in ─────────────────────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: ease.out },
  },
};

// ─── Slide from left ──────────────────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

// ─── Slide from right ─────────────────────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: ease.out },
  },
};

// ─── Stagger container ────────────────────────────────────────────────────────
export function staggerContainer(stagger = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  };
}

// ─── Card tilt transform helper ───────────────────────────────────────────────
export function getTiltTransform(
  e: React.MouseEvent<HTMLElement>,
  el: HTMLElement,
  intensity = 10
) {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const rotateX = ((y - cy) / cy) * -intensity;
  const rotateY = ((x - cx) / cx) * intensity;
  return { rotateX, rotateY };
}

// ─── Viewport config shortcuts ────────────────────────────────────────────────
export const viewport = {
  once: true,
  margin: "-80px",
} as const;

export const viewportLarge = {
  once: true,
  margin: "-120px",
} as const;
