"use client";

// CaseStudiesExpansion — scroll-driven image expansion into docked sticky header
//
// Phase 1 (pre-dock): image starts at ~57% vw centered. Split heading sits
//   adjacent to the image edges and slides off-screen as it expands.
//   Wheel events are intercepted; Lenis is stopped. A lerp RAF loop drives a
//   progress value (0→1) that controls image width, heading position & opacity.
//
// Phase 2 (dock): when progress hits 1 the image FLIP-animates to a sticky
//   200px header at top:0. Lenis resumes. Full section heading + cards rise in.

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Image from "next/image";
import { getLenis } from "@/lib/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CaseStudy } from "@/lib/data/caseStudies";
import { publishedArticles } from "@/lib/data/caseStudies";
import CaseStudyCard from "./CaseStudyCard";

gsap.registerPlugin(ScrollTrigger);

const HEADER_H = 200;         // px — docked image header height
const LERP_FACTOR = 0.1;      // smoothing — lower = smoother/slower
const SCROLL_SENSITIVITY = 0.003;
const HEAD_GAP = 20;          // px gap between image edge and heading

export interface CaseStudiesExpansionProps {
  studies: CaseStudy[];
}

// ─── geometry ────────────────────────────────────────────────────────────────

function getStartWidth(vw: number) {
  return Math.min(700, vw * 0.57);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ─── component ───────────────────────────────────────────────────────────────

export default function CaseStudiesExpansion({
  studies,
}: CaseStudiesExpansionProps) {
  const featured = studies.find((s) => s.featured);
  const grid = studies.filter((s) => !s.featured);

  // DOM refs
  const stageRef    = useRef<HTMLDivElement>(null);
  const imgWrapRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLImageElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const headLeftRef = useRef<HTMLDivElement>(null);
  const headRightRef= useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  // animation state
  const progressRef  = useRef(0);
  const targetRef    = useRef(0);
  const phaseDoneRef = useRef(false);

  const [docked,   setDocked]   = useState(false);
  const [expanded, setExpanded] = useState(false);

  const visibleArticles = expanded
    ? publishedArticles
    : publishedArticles.slice(0, 3);

  // ── apply progress to DOM ──────────────────────────────────────────────────
  const applyProgress = useCallback((p: number) => {
    const iw  = imgWrapRef.current;
    const hl  = headLeftRef.current;
    const hr  = headRightRef.current;
    const ey  = eyebrowRef.current;
    const hint = hintRef.current;
    if (!iw || !hl || !hr) return;

    const vw = window.innerWidth;
    const startW = getStartWidth(vw);
    const endW   = vw * 0.97;
    const cx     = vw / 2;

    // Image width & border-radius
    const w = startW + (endW - startW) * p;
    const r = Math.max(2, 12 - p * 10);
    iw.style.width        = w + "px";
    iw.style.borderRadius = r + "px";

    // Heading positions track the image edges
    const halfW    = w / 2;
    const imgLeft  = cx - halfW;
    const imgRight = cx + halfW;

    hl.style.right  = (vw - imgLeft + HEAD_GAP) + "px";
    hl.style.left   = "auto";
    hr.style.left   = (imgRight + HEAD_GAP) + "px";
    hr.style.right  = "auto";

    // Headings slide off-screen as image expands, fade out quickly
    const slideVW      = p * 52;
    const textOpacity  = Math.max(0, 1 - p * 3.2);
    hl.style.transform = `translateY(-50%) translateX(-${slideVW}vw)`;
    hl.style.opacity   = String(textOpacity);
    hr.style.transform = `translateY(-50%) translateX(${slideVW}vw)`;
    hr.style.opacity   = String(textOpacity);

    // Eyebrow & hint fade
    if (ey)   ey.style.opacity   = String(Math.max(0, 1 - p * 3));
    if (hint) hint.style.opacity = String(Math.max(0, 1 - p * 4));
  }, []);

  // ── RAF lerp loop ──────────────────────────────────────────────────────────
  const rafRef = useRef<number>(0);

  const startLoop = useCallback(() => {
    const tick = () => {
      if (phaseDoneRef.current) return;

      const p    = progressRef.current;
      const t    = targetRef.current;
      const next = lerp(p, t, LERP_FACTOR);

      progressRef.current = Math.abs(next - t) < 0.0002 ? t : next;
      applyProgress(progressRef.current);

      if (progressRef.current >= 0.98) {
        progressRef.current = 1;
        applyProgress(1);
        dock();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, [applyProgress]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── dock FLIP ─────────────────────────────────────────────────────────────
  const dock = useCallback(() => {
    if (phaseDoneRef.current) return;
    phaseDoneRef.current = true;

    const stage = stageRef.current;
    const iw    = imgWrapRef.current;
    const img   = imgRef.current;
    if (!stage || !iw || !img) return;

    // 1. Capture current rendered rect
    const stageRect = stage.getBoundingClientRect();
    const iwRect    = iw.getBoundingClientRect();

    const capturedTop  = iwRect.top  - stageRect.top;
    const capturedLeft = iwRect.left - stageRect.left;

    // 2. Freeze: remove transform-centering, pin to pixel coords
    iw.style.transition = "none";
    iw.style.transform  = "none";
    iw.style.top        = capturedTop  + "px";
    iw.style.left       = capturedLeft + "px";
    iw.style.width      = iwRect.width  + "px";
    iw.style.height     = iwRect.height + "px";

    // 3. Switch image to cover crop (docked view)
    img.style.height         = "100%";
    img.style.objectFit      = "cover";
    img.style.objectPosition = "center 32%";

    // Force reflow so transition starts from captured position
    void iw.offsetHeight;

    // 4. Animate to docked header position
    const ease = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    iw.style.transition = [
      `top 0.55s ${ease}`,
      `left 0.55s ${ease}`,
      `width 0.55s ${ease}`,
      `height 0.55s ${ease}`,
      `border-radius 0.4s ease`,
    ].join(", ");

    iw.style.top          = "0";
    iw.style.left         = "0";
    iw.style.width        = "100%";
    iw.style.height       = HEADER_H + "px";
    iw.style.borderRadius = "0";
    iw.style.zIndex       = "10";

    // 5. After dock: make sticky, resume Lenis, reveal cards
    setTimeout(() => {
      iw.style.position = "sticky";
      iw.style.top      = "0";

      getLenis()?.start();

      const cards = cardsRef.current;
      if (cards) {
        cards.style.visibility  = "visible";

        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (!prefersReduced) {
          gsap.fromTo(
            cards.querySelectorAll(".exp-card"),
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.09 }
          );
        } else {
          cards.querySelectorAll<HTMLElement>(".exp-card").forEach((el) => {
            el.style.opacity = "1";
          });
        }
      }

      setDocked(true);
      window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
    }, 550);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── wheel handler ──────────────────────────────────────────────────────────
  const onWheel = useCallback(
    (e: WheelEvent) => {
      if (phaseDoneRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY * SCROLL_SENSITIVITY;
      targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
      startLoop();
    },
    [startLoop]
  );

  // ── ScrollTrigger: intercept when stage reaches viewport top ──────────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Set initial geometry
    applyProgress(0);

    const trigger = ScrollTrigger.create({
      trigger: stage,
      start: "top top",
      onEnter: () => {
        if (phaseDoneRef.current) return;
        getLenis()?.stop();
        window.addEventListener("wheel", onWheel, { passive: false, capture: true });
      },
      onLeaveBack: () => {
        if (phaseDoneRef.current) return;
        getLenis()?.start();
        window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
        cancelAnimationFrame(rafRef.current);
        targetRef.current   = 0;
        progressRef.current = 0;
        applyProgress(0);
      },
    });

    return () => {
      trigger.kill();
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("wheel", onWheel, { capture: true } as EventListenerOptions);
      getLenis()?.start();
    };
  }, [onWheel, applyProgress]);

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <section
      id="case-studies"
      aria-labelledby="case-studies-heading"
      className="border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* ── STAGE: the expansion zone ── */}
      <div
        ref={stageRef}
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: docked ? "auto" : "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--color-bg)",
        }}
      >
        {/* Eyebrow label — centered above the image */}
        <p
          ref={eyebrowRef}
          style={{
            position: "absolute",
            top: "calc(50% - 160px)",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "var(--font-body)",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          Case studies
        </p>

        {/* Split heading — LEFT: right-aligned, tracks image left edge */}
        <div
          ref={headLeftRef}
          style={{
            position: "absolute",
            top: "50%",
            right: 0, // overridden by applyProgress
            transform: "translateY(-50%)",
            textAlign: "right",
            maxWidth: "230px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 1.8vw, 1.75rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "var(--color-ink)",
            pointerEvents: "none",
          }}
        >
          Programs I&apos;ve<br />worked on
        </div>

        {/* Split heading — RIGHT: left-aligned, tracks image right edge */}
        <div
          ref={headRightRef}
          style={{
            position: "absolute",
            top: "50%",
            left: 0, // overridden by applyProgress
            transform: "translateY(-50%)",
            textAlign: "left",
            maxWidth: "230px",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.2rem, 1.8vw, 1.75rem)",
            fontWeight: 400,
            lineHeight: 1.2,
            color: "var(--color-ink)",
            pointerEvents: "none",
          }}
        >
          and{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
            what<br />they did.
          </em>
        </div>

        {/* Image wrapper — absolutely positioned, centered, width driven by progress */}
        <div
          ref={imgWrapRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            borderRadius: "12px",
            willChange: "width, height, top, left",
          }}
        >
          <Image
            ref={imgRef}
            src="/images/portfolio_hero_2.png"
            alt="SF Bay Area developer community map illustration"
            width={2400}
            height={900}
            priority
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Scroll nudge */}
        {!docked && (
          <div
            ref={hintRef}
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.58rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
              }}
            >
              Scroll to expand
            </span>
            <span style={{ color: "var(--color-muted)", fontSize: "0.8rem", animation: "expandHintBounce 1.6s ease-in-out infinite" }}>↓</span>
          </div>
        )}
      </div>

      {/* ── CARDS: revealed after dock ── */}
      <div
        ref={cardsRef}
        style={{
          visibility: "hidden",
          background: "var(--color-bg)",
        }}
      >
        <div className="container-site" style={{ paddingTop: "2.5rem", paddingBottom: "5rem" }}>

          {/* Section heading — matches the preview s-h2 */}
          <div className="exp-card" style={{ opacity: 0, marginBottom: "2rem" }}>
            <p
              id="case-studies-heading"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                marginBottom: "0.9rem",
              }}
            >
              Case studies
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.55rem, 2.4vw, 2.2rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--color-ink)",
              }}
            >
              Programs I&apos;ve worked on and{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
                what they did.
              </em>
            </h2>
          </div>

          {/* Featured card */}
          {featured && (
            <div className="exp-card" style={{ marginBottom: "1.25rem", opacity: 0 }}>
              <CaseStudyCard study={featured} variant="featured" />
            </div>
          )}

          {/* 2×2 grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "1.25rem", marginBottom: "1.25rem" }}
          >
            {grid.map((study) => (
              <div key={study.slug} className="exp-card" style={{ opacity: 0 }}>
                <CaseStudyCard study={study} variant="standard" />
              </div>
            ))}
          </div>

          {/* Published work band */}
          <div
            className="exp-card"
            style={{
              opacity: 0,
              background: "var(--color-surface)",
              border: "0.5px solid var(--color-border-vis)",
              borderRadius: "4px",
              padding: "1.75rem 2rem",
            }}
          >
            <p
              className="text-label text-muted"
              style={{ marginBottom: "1.25rem" }}
            >
              <em
                className="font-display font-normal not-italic"
                style={{
                  fontStyle: "italic",
                  fontSize: "0.85rem",
                  letterSpacing: "0",
                  textTransform: "none",
                  color: "var(--color-ink)",
                }}
              >
                Published
              </em>{" "}
              work
            </p>
            <div>
              {visibleArticles.map((article, i) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pub-article-row"
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "2rem",
                    padding: i === 0 ? "0 0 0.85rem" : "0.85rem 0",
                    borderTop: i === 0 ? "none" : "0.5px solid var(--color-border-vis)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.25rem", flex: 1, minWidth: 0 }}>
                    <span
                      className="text-label"
                      style={{ color: "var(--color-muted)", whiteSpace: "nowrap", flexShrink: 0, minWidth: "200px" }}
                    >
                      {article.publication}
                    </span>
                    <span
                      className="pub-article-title font-display"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        color: "var(--color-ink)",
                        lineHeight: 1.3,
                        transition: "color 150ms ease",
                      }}
                    >
                      {article.title}
                    </span>
                  </div>
                  <span
                    className="pub-article-arrow"
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-muted)",
                      transition: "color 150ms ease, transform 150ms ease",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
            {publishedArticles.length > 3 && (
              <button
                onClick={() => setExpanded((v) => !v)}
                style={{
                  marginTop: "1rem",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.65rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "color 150ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {expanded ? "Show less ↑" : `Show all ${publishedArticles.length} articles ↓`}
              </button>
            )}
          </div>
        </div>

        <style>{`
          .pub-article-row:hover .pub-article-title { color: var(--color-accent); }
          .pub-article-row:hover .pub-article-arrow { color: var(--color-accent); transform: translate(2px, -2px); }
          @keyframes expandHintBounce {
            0%, 100% { transform: translateY(0); }
            50%       { transform: translateY(5px); }
          }
        `}</style>
      </div>
    </section>
  );
}
