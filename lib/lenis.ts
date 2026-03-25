// Lenis smooth scroll — initialized once per session
// The RAF loop is intentionally absent here; GSAP ticker drives it in SmoothScrollProvider
// (using gsap.ticker.add instead of requestAnimationFrame avoids double-driving)

import Lenis from "@studio-freight/lenis";

let lenis: Lenis | null = null;

export function initLenis(): Lenis {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function destroyLenis(): void {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
}
