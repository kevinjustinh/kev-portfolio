"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import type { heroStats } from "@/lib/data/about";

export interface HeroProps {
  stats: typeof heroStats;
}

const VIDEO_SRC = "/video/v3-loop-90.mp4";
const CROSSFADE = 1.0; // seconds of overlap between the two videos

export default function Hero({ stats }: HeroProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const activeRef = useRef<"a" | "b">("a");
  const crossfadingRef = useRef(false);

  // Detect desktop — video is only rendered (and downloaded) on md+ screens
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Seamless two-video crossfade loop — avoids the hard seek that loop causes
  // Must depend on isDesktop: videos aren't in the DOM until isDesktop is true,
  // so refs are null on the initial mount run.
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    const getActive  = () => activeRef.current === "a" ? a : b;
    const getStandby = () => activeRef.current === "a" ? b : a;

    const handleTimeUpdate = (e: Event) => {
      const active = getActive();
      if (e.target !== active || !active.duration || crossfadingRef.current) return;

      const remaining = active.duration - active.currentTime;
      if (remaining > CROSSFADE) return;

      crossfadingRef.current = true;
      const standby = getStandby();
      standby.currentTime = 0;
      standby.play().catch(() => {});

      gsap.to(active,  { opacity: 0,   duration: CROSSFADE, ease: "none" });
      gsap.to(standby, { opacity: 0.1, duration: CROSSFADE, ease: "none",
        onComplete: () => {
          active.pause();
          active.currentTime = 0;
          activeRef.current   = activeRef.current === "a" ? "b" : "a";
          crossfadingRef.current = false;
        },
      });
    };

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isDesktop]);

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
      style={{ backgroundColor: "#111110", position: "relative", overflow: "hidden", flex: 1 }}
    >
      {/* Mobile: static still image */}
      <img
        src="/images/hero-still.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="md:hidden"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />

      {/* Desktop only: video is not rendered in the DOM on mobile — prevents download */}
      {isDesktop && (["a", "b"] as const).map((id) => (
        <video
          key={id}
          ref={id === "a" ? videoARef : videoBRef}
          autoPlay={id === "a"}
          muted
          playsInline
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
            opacity: id === "a" ? 0.1 : 0,
            pointerEvents: "none",
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ))}

      <div
        className="container-site"
        style={{
          paddingTop: "4.5rem",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        {/* Eyebrow */}
        <p
          className="hero-eyebrow text-label"
          style={{
            color: "var(--color-accent)",
            marginBottom: "2rem",
            position: "relative",
          }}
        >
          Program Ops · Community · Builder
        </p>

        {/* H1 — vertically centered in the space between eyebrow and bottom content */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <h1
            className="hero-title"
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2.8rem, 5.5vw, 4.8rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 400,
              color: "#fff",
            }}
          >
            I build programs and communities people{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-accent)" }}>
              actually
            </em>{" "}
            care about.
          </h1>
        </div>

        {/* Below headline: two-column — body+CTAs left, stats card right */}
        <div
          className="grid grid-cols-1 gap-8 md:grid-cols-[55%_45%] md:gap-16"
          style={{
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
                color: "rgba(255,255,255,0.65)",
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
                  color: "var(--color-ink)",
                  backgroundColor: "#fff",
                  padding: "0.85rem 1.75rem",
                  borderRadius: "2px",
                  textDecoration: "none",
                  transition: "opacity 150ms ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Download resume
              </a>
            </div>
          </div>

          {/* Right column — stats card */}
          <div className="hero-stats">
            <div
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "0.5px solid rgba(255,255,255,0.14)",
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
                        ? "0.5px solid rgba(255,255,255,0.12)"
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
                      color: "#fff",
                      marginBottom: "0.5rem",
                      paddingTop: stat.value === "0→100" ? "0.2rem" : 0,
                    }}
                  >
                    {stat.value}
                    {stat.suffix && (
                      <sup
                        style={{
                          fontSize: "0.8rem",
                          color: "#fff",
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
                      color: "#fff",
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
