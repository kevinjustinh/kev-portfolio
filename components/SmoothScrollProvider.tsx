"use client";

// SmoothScrollProvider — Client Component, mounts once at the root layout.
//
// Responsibilities:
//   1. Register GSAP ScrollTrigger (once, globally)
//   2. Initialize Lenis smooth scroll
//   3. Sync Lenis raf with GSAP ticker so ScrollTrigger reads scroll position correctly
//   4. Clean up on unmount

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis, destroyLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = initLenis();

    // Tell ScrollTrigger to update on every Lenis scroll event
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP ticker (time is in seconds, Lenis expects ms)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from trying to compensate for lag — Lenis handles this
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      destroyLenis();
    };
  }, []);

  return <>{children}</>;
}
