// useReveal — reusable GSAP scroll reveal hook
//
// Standard usage (single element):
//   const ref = useRef<HTMLElement>(null)
//   useReveal(ref)
//   <section ref={ref}>...</section>
//
// The hook checks prefers-reduced-motion before doing anything.
// Elements start invisible (opacity 0, y 24) and reveal as they enter the viewport.

import { useEffect, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [ref]);
}

// useRevealCards — staggered reveal for card grids
//
// Usage:
//   const containerRef = useRef<HTMLElement>(null)
//   useRevealCards(containerRef, ".card")
//   <div ref={containerRef}><div className="card">...</div></div>

export function useRevealCards(
  containerRef: RefObject<HTMLElement | null>,
  cardSelector: string = ".card"
) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll(cardSelector);
      if (!cards.length) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [containerRef, cardSelector]);
}
