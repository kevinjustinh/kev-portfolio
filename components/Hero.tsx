"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { heroStats } from "@/lib/data/about";

export interface HeroProps {
  stats: typeof heroStats;
}

export default function Hero({ stats }: HeroProps) {
  const bridgeGroupRef = useRef<SVGGElement>(null);

  // Draw Golden Gate Bridge SVG background
  useEffect(() => {
    const g = bridgeGroupRef.current;
    if (!g) return;

    const NS = "http://www.w3.org/2000/svg";
    const C = "#E8631A";

    const DECK_Y = 540, WATER_Y = 600, T_TOP_Y = 90, T_BASE_Y = 640;
    const TL = { o1: 377, o2: 393, i1: 415, i2: 431 };
    const TR = { o1: 1009, o2: 1025, i1: 1047, i2: 1063 };
    const LT_X = (TL.o1 + TL.i2) / 2;
    const RT_X = (TR.o1 + TR.i2) / 2;
    const MID_X = (LT_X + RT_X) / 2;
    const SAG_Y = 335;
    const CABLE_CP = 2 * SAG_Y - T_TOP_Y;

    function mk<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>): SVGElementTagNameMap[K] {
      const e = document.createElementNS(NS, tag) as SVGElementTagNameMap[K];
      for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, String(v));
      g!.appendChild(e);
      return e;
    }

    const ln = (x1: number, y1: number, x2: number, y2: number, sw = 1.5) =>
      mk("line", { x1, y1, x2, y2, stroke: C, "stroke-width": sw });
    const pt = (d: string, sw = 1.5) =>
      mk("path", { d, stroke: C, "stroke-width": sw, fill: "none" });

    function drawTower(t: typeof TL) {
      ln(t.o1, T_TOP_Y, t.o1, T_BASE_Y, 2);
      ln(t.o2, T_TOP_Y, t.o2, T_BASE_Y, 2);
      ln(t.i1, T_TOP_Y, t.i1, T_BASE_Y, 2);
      ln(t.i2, T_TOP_Y, t.i2, T_BASE_Y, 2);
      ln(t.o1 - 6, T_TOP_Y,      t.i2 + 6, T_TOP_Y,      3);
      ln(t.o1 - 4, T_TOP_Y + 14, t.i2 + 4, T_TOP_Y + 14, 1.5);
      ln(t.o1 - 2, T_TOP_Y + 26, t.i2 + 2, T_TOP_Y + 26, 1);
      for (let y = T_TOP_Y + 50; y < DECK_Y; y += 52) {
        ln(t.o1, y, t.o2, y, 1);
        ln(t.o2, y, t.i1, y, 1);
        ln(t.i1, y, t.i2, y, 1);
      }
      for (let y = T_TOP_Y + 50; y < DECK_Y; y += 104) {
        const y2 = Math.min(y + 104, DECK_Y);
        ln(t.o1, y, t.o2, y2, 0.8); ln(t.o2, y, t.o1, y2, 0.8);
        ln(t.i1, y, t.i2, y2, 0.8); ln(t.i2, y, t.i1, y2, 0.8);
      }
      ln(t.o1 - 10, DECK_Y - 10, t.i2 + 10, DECK_Y - 10, 2.5);
      ln(t.o1 - 10, DECK_Y + 10, t.i2 + 10, DECK_Y + 10, 1.5);
      ln(t.o1 + 4, DECK_Y + 10, t.o1 + 4, T_BASE_Y, 2);
      ln(t.i2 - 4, DECK_Y + 10, t.i2 - 4, T_BASE_Y, 2);
    }

    drawTower(TL);
    drawTower(TR);

    ln(0, DECK_Y, 1440, DECK_Y, 2.5);
    ln(0, DECK_Y + 12, 1440, DECK_Y + 12, 1);
    for (let x = 0; x < 1440; x += 30) {
      ln(x,    DECK_Y + 12, x + 15, DECK_Y + 28, 0.45);
      ln(x+15, DECK_Y + 12, x + 30, DECK_Y + 28, 0.45);
    }
    ln(0, DECK_Y + 28, 1440, DECK_Y + 28, 0.6);

    [-7, 7].forEach(off => {
      const x0 = LT_X + off, x1 = RT_X + off, mx = MID_X + off;
      pt(`M ${x0},${T_TOP_Y} Q ${mx},${CABLE_CP} ${x1},${T_TOP_Y}`, 2.5);
      pt(`M ${x0},${T_TOP_Y} C ${x0-55},${T_TOP_Y+35} 110,215 0,248`, 2);
      pt(`M ${x1},${T_TOP_Y} C ${x1+55},${T_TOP_Y+35} 1330,215 1440,248`, 2);
      const STEPS = 24;
      for (let i = 1; i < STEPS; i++) {
        const t = i / STEPS;
        const hx = (1-t)*(1-t)*x0 + 2*(1-t)*t*mx + t*t*x1;
        const hy = (1-t)*(1-t)*T_TOP_Y + 2*(1-t)*t*CABLE_CP + t*t*T_TOP_Y;
        const inL = hx > TL.o1 - 8 && hx < TL.i2 + 8;
        const inR = hx > TR.o1 - 8 && hx < TR.i2 + 8;
        if (!inL && !inR) ln(hx, hy, hx, DECK_Y, 0.7);
      }
      for (let x = 45; x < x0 - 30; x += 38) {
        const cabY = 248 + (T_TOP_Y - 248) * (x / x0);
        ln(x, cabY, x, DECK_Y, 0.5);
      }
      for (let x = x1 + 30; x < 1395; x += 38) {
        const cabY = T_TOP_Y + (248 - T_TOP_Y) * ((x - x1) / (1440 - x1));
        ln(x, cabY, x, DECK_Y, 0.5);
      }
    });

    ln(0, WATER_Y,      1440, WATER_Y,      1);
    ln(0, WATER_Y + 10, 1440, WATER_Y + 10, 0.5);

    return () => { while (g.firstChild) g.removeChild(g.firstChild); };
  }, []);

  // Page-load stagger: eyebrow → title → body → actions → stats
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(".hero-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(".hero-body",    { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo(".hero-actions", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .fromTo(".hero-stats",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{ backgroundColor: "var(--color-bg)", position: "relative", overflow: "hidden", flex: 1 }}
    >
      {/* Golden Gate Bridge background */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "108%",
          height: "auto",
          pointerEvents: "none",
          opacity: 0.05,
        }}
        viewBox="0 0 1440 640"
        preserveAspectRatio="xMidYMax meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g ref={bridgeGroupRef} />
      </svg>
      <div
        className="container-site"
        style={{ paddingTop: "4.5rem", paddingBottom: 0 }}
      >
        {/* Eyebrow */}
        <p
          className="hero-eyebrow text-label"
          style={{
            color: "var(--color-accent)",
            marginBottom: "2rem",
          }}
        >
          Program Ops · Community · Builder
        </p>

        {/* H1 — spans full container width, no column constraint */}
        <h1
          className="hero-title"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            fontWeight: 400,
            color: "var(--color-ink)",
            marginBottom: "3rem",
          }}
        >
          I build programs and communities people{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            actually
          </em>{" "}
          care about.
        </h1>

        {/* Below headline: two-column — body+CTAs left, stats card right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "55% 45%",
            gap: "4rem",
            alignItems: "end",
            paddingBottom: "5rem",
          }}
        >
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <p
              className="hero-body"
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "var(--color-muted)",
                maxWidth: "420px",
              }}
            >
              A decade building communities and programs at Google, Springboard,
              and from scratch.
            </p>

            <div
              className="hero-actions"
              style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            >
              <a
                href="#case-studies"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#fff",
                  backgroundColor: "var(--color-accent)",
                  padding: "0.85rem 1.75rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "opacity 150ms ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View my work
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body), system-ui, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: "rgba(122,117,112,0.4)",
                  transition: "color 150ms ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                onMouseOut={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                Download resume
              </a>
            </div>
          </div>

          {/* Right column — stats card */}
          <div className="hero-stats">
            <div
              style={{
                backgroundColor: "var(--color-surface)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "4px",
                padding: "2rem",
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    paddingRight: i < stats.length - 1 ? "1.25rem" : 0,
                    marginRight: i < stats.length - 1 ? "1.25rem" : 0,
                    borderRight:
                      i < stats.length - 1
                        ? "0.5px solid var(--color-border)"
                        : "none",
                  }}
                >
                  {/* Metric value */}
                  <div
                    style={{
                      fontFamily: "var(--font-display), Georgia, serif",
                      fontSize:
                        stat.value === "0→100" ? "1.2rem" : "1.6rem",
                      lineHeight: 1,
                      letterSpacing: stat.value === "0→100" ? "-0.01em" : "normal",
                      color: "var(--color-ink)",
                      marginBottom: "0.5rem",
                      paddingTop: stat.value === "0→100" ? "0.2rem" : 0,
                    }}
                  >
                    {stat.value}
                    {stat.suffix && (
                      <sup
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--color-muted)",
                          fontStyle: "normal",
                        }}
                      >
                        {stat.suffix}
                      </sup>
                    )}
                  </div>
                  {/* Metric label */}
                  <div
                    style={{
                      fontFamily: "var(--font-body), system-ui, sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 300,
                      lineHeight: 1.55,
                      color: "var(--color-muted)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
