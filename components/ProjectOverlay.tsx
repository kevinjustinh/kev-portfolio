"use client";

// ProjectOverlay — V1 Editorial Split
// 58% image side (main shot + thumbnail strip) | 42% metadata
// Triggered from ProjectCard click. Closes on ESC, backdrop click, or close button.

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import type { Project } from "@/lib/data/projects";

interface ProjectOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectOverlay({
  project,
  onClose,
}: ProjectOverlayProps) {
  const [activeShot, setActiveShot] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const totalShotsRef = useRef(0);

  const prevShot = useCallback(() => setActiveShot((n) => (n - 1 + totalShotsRef.current) % totalShotsRef.current), []);
  const nextShot = useCallback(() => setActiveShot((n) => (n + 1) % totalShotsRef.current), []);

  // Reset active shot when project changes
  useEffect(() => {
    setActiveShot(0);
    closingRef.current = false;
    totalShotsRef.current = project?.screenshots?.length ?? 1;
  }, [project]);

  // Lock body scroll when open
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  // Focus close button on open
  useEffect(() => {
    if (project && closeRef.current) {
      closeRef.current.focus();
    }
  }, [project]);

  // Animated close — fade out, then call onClose
  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      onClose();
      return;
    }

    import("gsap").then(({ default: gsap }) => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      if (!panel || !backdrop) { onClose(); return; }

      gsap.to(panel, { opacity: 0, y: 12, duration: 0.2, ease: "power2.in" });
      gsap.to(backdrop, {
        opacity: 0,
        duration: 0.25,
        ease: "power1.in",
        delay: 0.05,
        onComplete: onClose,
      });
    });
  }, [onClose]);

  // ESC to close, arrow keys to navigate
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") nextShot();
      if (e.key === "ArrowLeft") prevShot();
    },
    [handleClose, nextShot, prevShot]
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, handleKeyDown]);

  // Animate panel in
  useEffect(() => {
    if (!project || !panelRef.current) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    import("gsap").then(({ default: gsap }) => {
      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      if (!panel || !backdrop) return;

      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "power1.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.05 }
      );
    });
  }, [project]);

  if (!project) return null;

  const shots = project.screenshots ?? [];
  const hasShots = shots.length > 0;
  const totalShots = hasShots ? shots.length : 1;


  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} project details`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(17,17,16,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      {/* Panel */}
      <div
        ref={panelRef}
        style={{
          background: "var(--color-surface)",
          borderRadius: "4px",
          overflow: "hidden",
          width: "100%",
          maxWidth: "1060px",
          maxHeight: "90vh",
          display: "grid",
          gridTemplateColumns: "1fr",
          position: "relative",
        }}
        className="overlay-panel"
      >
        {/* Close button */}
        <button
          ref={closeRef}
          aria-label="Close project details"
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15,15,15,0.04)",
            border: "0.5px solid rgba(15,15,15,0.2)",
            borderRadius: "2px",
            cursor: "pointer",
            fontSize: "1.1rem",
            color: "var(--color-muted)",
            lineHeight: 1,
            transition: "color 150ms, border-color 150ms, background 150ms",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-ink)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "rgba(15,15,15,0.25)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-muted)";
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              "var(--color-border)";
          }}
        >
          ×
        </button>

        {/* ── Desktop: 2-col split ── */}
        <div className="overlay-desktop-grid">
          {/* Left: image side */}
          <div
            style={{
              background: project.accentColor ?? "#111",
              display: "flex",
              flexDirection: "column",
              minHeight: "480px",
            }}
          >
            {/* Main shot */}
            <div style={{ flex: 1, position: "relative", padding: project.screenshotPadding?.[activeShot] ?? "6%" }}>
              {hasShots ? (
                <Image
                  src={shots[activeShot]}
                  alt={`${project.name} screenshot ${activeShot + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "420px",
                    background: project.accentColor ?? "var(--color-muted)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Screenshots coming soon
                  </span>
                </div>
              )}

              {/* Prev / Next arrows — only when >1 shot */}
              {totalShots > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.25rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    zIndex: 2,
                  }}
                >
                  <button
                    aria-label="Previous screenshot"
                    onClick={prevShot}
                    style={navArrowStyle}
                  >
                    ←
                  </button>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    {activeShot + 1} / {totalShots}
                  </span>
                  <button
                    aria-label="Next screenshot"
                    onClick={nextShot}
                    style={navArrowStyle}
                  >
                    →
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail strip — only when screenshots exist */}
            {hasShots && shots.length > 1 && (
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  padding: "10px",
                  background: "rgba(0,0,0,0.45)",
                  flexShrink: 0,
                }}
              >
                {shots.map((src, i) => (
                  <button
                    key={i}
                    aria-label={`View screenshot ${i + 1}`}
                    aria-pressed={i === activeShot}
                    onClick={() => setActiveShot(i)}
                    style={{
                      flex: 1,
                      height: "52px",
                      padding: 0,
                      border: `1.5px solid ${i === activeShot ? "#fff" : "transparent"}`,
                      borderRadius: "2px",
                      overflow: "hidden",
                      opacity: i === activeShot ? 1 : 0.45,
                      transition: "opacity 150ms, border-color 150ms",
                      cursor: "pointer",
                      position: "relative",
                      background: "transparent",
                    }}
                  >
                    <Image
                      src={src}
                      alt={`${project.name} thumbnail ${i + 1}`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: metadata */}
          <div
            style={{
              padding: "2.25rem 2rem 2.5rem",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              overflowY: "auto",
            }}
          >
            {/* Tag */}
            <span
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "2px",
                padding: "0.2rem 0.5rem",
                marginBottom: "1.25rem",
              }}
            >
              {project.tag}
            </span>

            {/* Title */}
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--color-ink)",
                marginBottom: "1rem",
              }}
            >
              {project.name}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.75,
                color: "var(--color-muted)",
                marginBottom: "2rem",
                flex: 1,
              }}
            >
              {project.description}
            </p>

            {/* Stack */}
            <div
              style={{
                borderTop: "0.5px solid var(--color-border)",
                paddingTop: "1.5rem",
              }}
            >
              <p style={metaLabelStyle}>Stack</p>
              <p style={metaValueStyle}>{project.stack}</p>
            </div>

            {/* Links */}
            {(project.url || project.github) && (
              <div
                style={{
                  borderTop: "0.5px solid var(--color-border)",
                  paddingTop: "1.5rem",
                  marginTop: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkBtnStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "rgba(15,15,15,0.25)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-accent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        "var(--color-border)";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--color-ink)";
                    }}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkBtnPrimaryStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.opacity =
                        "0.88";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.opacity =
                        "1";
                    }}
                  >
                    View live ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile: stacked layout ── */}
        <div className="overlay-mobile-stack">
          {/* Image block */}
          <div
            style={{
              background: project.accentColor ?? "#111",
              minHeight: "220px",
              position: "relative",
              padding: project.screenshotPadding?.[activeShot] ?? undefined,
            }}
          >
            {hasShots ? (
              <Image
                src={shots[activeShot]}
                alt={`${project.name} screenshot ${activeShot + 1}`}
                fill
                style={{ objectFit: "contain" }}
                sizes="100vw"
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "220px",
                  background: project.accentColor ?? "var(--color-muted)",
                }}
              />
            )}
            {totalShots > 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0.75rem",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: "6px",
                }}
              >
                {shots.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`View screenshot ${i + 1}`}
                    onClick={() => setActiveShot(i)}
                    style={{
                      width: "24px",
                      height: "3px",
                      borderRadius: "2px",
                      border: "none",
                      cursor: "pointer",
                      background:
                        i === activeShot
                          ? "#fff"
                          : "rgba(255,255,255,0.3)",
                      padding: 0,
                      transition: "background 150ms",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Meta */}
          <div style={{ padding: "1.5rem", overflowY: "auto" }}>
            <span
              style={{
                display: "inline-block",
                fontSize: "0.55rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-muted)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "2px",
                padding: "0.2rem 0.5rem",
                marginBottom: "1rem",
              }}
            >
              {project.tag}
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: "1.8rem",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {project.name}
            </h2>

            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--color-muted)",
                marginBottom: "1.5rem",
              }}
            >
              {project.description}
            </p>

            <div
              style={{
                borderTop: "0.5px solid var(--color-border)",
                paddingTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <p style={metaLabelStyle}>Stack</p>
              <p style={metaValueStyle}>{project.stack}</p>
            </div>

            {(project.url || project.github) && (
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  borderTop: "0.5px solid var(--color-border)",
                  paddingTop: "1rem",
                }}
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkBtnStyle}
                  >
                    GitHub ↗
                  </a>
                )}
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkBtnPrimaryStyle}
                  >
                    View live ↗
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .overlay-panel {
          grid-template-columns: 1fr;
        }
        .overlay-desktop-grid {
          display: none;
        }
        .overlay-mobile-stack {
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .overlay-panel {
            grid-template-columns: 1fr !important;
          }
          .overlay-desktop-grid {
            display: grid;
            grid-template-columns: 58% 42%;
          }
          .overlay-mobile-stack {
            display: none;
          }
        }
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}

// ── Shared style objects ──────────────────────────────────────

const navArrowStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "var(--color-surface)",
  border: "0.5px solid var(--color-border)",
  borderRadius: "2px",
  cursor: "pointer",
  fontSize: "0.9rem",
  color: "var(--color-muted)",
  transition: "color 150ms, border-color 150ms",
};

const metaLabelStyle: React.CSSProperties = {
  fontSize: "0.55rem",
  fontWeight: 500,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--color-muted)",
  marginBottom: "0.35rem",
};

const metaValueStyle: React.CSSProperties = {
  fontSize: "0.82rem",
  fontWeight: 300,
  color: "var(--color-ink)",
};

const linkBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  fontSize: "0.65rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--color-ink)",
  textDecoration: "none",
  border: "0.5px solid var(--color-border)",
  borderRadius: "2px",
  padding: "0.45rem 0.9rem",
  transition: "border-color 150ms, color 150ms",
};

const linkBtnPrimaryStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.3rem",
  fontSize: "0.65rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#fff",
  textDecoration: "none",
  background: "var(--color-accent)",
  border: "0.5px solid var(--color-accent)",
  borderRadius: "2px",
  padding: "0.45rem 0.9rem",
  transition: "opacity 150ms",
};
