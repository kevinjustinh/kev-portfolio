"use client";

import { useEffect, useRef } from "react";
import { availability, type AvailabilityDetail } from "@/lib/data/about";

export default function StatusBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          el,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 95%" },
          }
        );
      });
    });
  }, []);

  return (
    <>
      {/* Component-scoped styles — hoisted to <head> by React 19 */}
      <style>{`
        .sb-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
        }
        .sb-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          border-bottom: 0.5px solid rgba(15,15,15,0.14);
        }
        .sb-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .sb-detail {
          padding: 0.85rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          border-right: 0.5px solid rgba(15,15,15,0.14);
          border-bottom: 0.5px solid rgba(15,15,15,0.14);
        }
        .sb-detail:nth-child(even) { border-right: none; }
        .sb-detail:nth-last-child(-n+2) { border-bottom: none; }

        @media (min-width: 768px) {
          .sb-inner { flex-direction: row; align-items: stretch; }
          .sb-main {
            padding: 1rem 2.5rem;
            border-bottom: none;
            border-right: 0.5px solid rgba(15,15,15,0.14);
            flex-shrink: 0;
          }
          .sb-details { display: flex; flex: 1; }
          .sb-detail {
            padding: 1rem 2rem;
            border-bottom: none;
            border-right: 0.5px solid rgba(15,15,15,0.14);
            flex-shrink: 0;
          }
          .sb-detail:last-child { border-right: none; }
          .sb-detail:nth-child(even) { border-right: 0.5px solid rgba(15,15,15,0.14); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sb-dot::after { animation: none; }
        }
      `}</style>

      <div
        ref={barRef}
        style={{
          background: "var(--color-bg)",
          borderTop: "0.5px solid rgba(15,15,15,0.14)",
          borderBottom: "0.5px solid rgba(15,15,15,0.14)",
        }}
        aria-label="Availability status"
      >
        <div className="sb-inner">
          {/* Left: open signal + pulsing dot */}
          <div className="sb-main">
            <div className="status-dot sb-dot" aria-hidden="true" />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "var(--color-ink)",
                whiteSpace: "nowrap",
              }}
            >
              {availability.status}
            </span>
          </div>

          {/* Right: detail columns */}
          <div className="sb-details">
            {availability.details.map((detail: AvailabilityDetail) => (
              <div key={detail.label} className="sb-detail">
                <span
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                  }}
                >
                  {detail.label}
                </span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 400,
                    color: "var(--color-ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
