import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  useEffect(() => {
    if (isTouch) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const beam = beamRef.current;
    if (!dot || !ring || !beam) return;

    // Initially hide the cursor elements off-screen
    gsap.set([dot, ring, beam], { x: -200, y: -200 });

    const xDot = gsap.quickTo(dot, "x", { duration: 0.08, ease: "power3.out" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.08, ease: "power3.out" });
    const xRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power2.out" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power2.out" });
    const xBeam = gsap.quickTo(beam, "x", { duration: 0.65, ease: "power1.out" });
    const yBeam = gsap.quickTo(beam, "y", { duration: 0.65, ease: "power1.out" });

    let isMagnetic = false;
    let activeInteractive: HTMLElement | null = null;
    let cachedRect: DOMRect | null = null;

    const move = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target ? (target.closest("a, button, [data-cursor-hover], input, textarea, select") as HTMLElement) : null;

      xDot(e.clientX);
      yDot(e.clientY);
      xBeam(e.clientX);
      yBeam(e.clientY);

      if (interactive) {
        const isMagElement = interactive.hasAttribute("data-magnetic") || interactive.tagName === "BUTTON" || interactive.tagName === "A";
        
        if (isMagElement && !interactive.closest("input, textarea, select")) {
          isMagnetic = true;
          
          if (interactive !== activeInteractive) {
            activeInteractive = interactive;
            cachedRect = interactive.getBoundingClientRect();
          }

          const rect = cachedRect;
          if (rect) {
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            xRing(centerX);
            yRing(centerY);
            
            const padding = 14;
            const maxDim = Math.max(rect.width, rect.height) + padding;
            
            gsap.to(ring, {
              width: maxDim,
              height: maxDim,
              borderRadius: interactive.tagName === "BUTTON" || interactive.classList.contains("rounded-full") ? "9999px" : "8px",
              borderColor: "rgba(168, 85, 247, 0.55)",
              backgroundColor: "rgba(168, 85, 247, 0.03)",
              mixBlendMode: "normal",
              duration: 0.35,
              ease: "power3.out"
            });
            
            gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
            gsap.to(beam, { scale: 1.3, opacity: 0.7, duration: 0.3 });
            return;
          }
        }
      }

      // Normal cursor behavior
      if (activeInteractive) {
        activeInteractive = null;
        cachedRect = null;
      }
      isMagnetic = false;
      xRing(e.clientX);
      yRing(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hoverTarget = t.closest("a, button, [data-cursor-hover], input, textarea, select");

      if (hoverTarget) {
        if (!isMagnetic) {
          gsap.to(ring, {
            scale: 1.45,
            opacity: 0.5,
            borderColor: "rgba(255, 255, 255, 0.75)",
            duration: 0.3,
            ease: "power2.out"
          });
          gsap.to(dot, { scale: 0.5, duration: 0.2 });
          gsap.to(beam, { scale: 1.25, opacity: 0.6, duration: 0.3 });
        }
      } else {
        gsap.to(ring, {
          scale: 1,
          width: 36,
          height: 36,
          opacity: 1,
          borderRadius: "50%",
          borderColor: "rgba(255, 255, 255, 0.25)",
          backgroundColor: "transparent",
          mixBlendMode: "difference",
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(beam, { scale: 1.0, opacity: 0.45, duration: 0.3 });
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.8, duration: 0.15, ease: "power2.out" });
      gsap.to(dot, { scale: 0.4, duration: 0.15 });
      gsap.to(beam, { scale: 0.85, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: isMagnetic ? 1.0 : 1.15, duration: 0.25, ease: "back.out(1.5)" });
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(beam, { scale: 1.0, duration: 0.25 });
    };

    const handleScroll = () => {
      activeInteractive = null;
      cachedRect = null;
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {/* Trailing spotlight beam */}
      <div
        ref={beamRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999998] hidden h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-[var(--accent-purple)]/6 via-[var(--accent-cyan)]/4 to-[var(--accent-glow)]/6 blur-[40px] md:block opacity-45"
      />
      {/* Trailing physical ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 mix-blend-difference md:block transition-[border-color,background-color] duration-300"
      />
      {/* Central focus dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[999999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference md:block"
      />
    </>
  );
}


