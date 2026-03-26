"use client";

// Projects — V1: Featured Stoke card + filter tabs + 2-col grid
// Featured card always visible. Filter applies to grid only.
// Stagger re-runs on filter change.

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReveal } from "@/hooks/useReveal";
import type { Project } from "@/lib/data/projects";
import ProjectCard from "./ProjectCard";
import ProjectOverlay from "./ProjectOverlay";

gsap.registerPlugin(ScrollTrigger);

export interface ProjectsProps {
  projects: Project[];
}

type FilterTab = "all" | "ios" | "web";

const TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "iOS Apps", value: "ios" },
  { label: "Web", value: "web" },
];

export default function Projects({ projects }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [overlayProject, setOverlayProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);
  const gridProjects = projects.filter((p) => !p.featured);

  const filtered =
    activeTab === "all"
      ? gridProjects
      : gridProjects.filter((p) => p.category === activeTab);

  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const hasEnteredView = useRef(false);

  // Featured card: reveal on scroll entry
  useReveal(featuredRef as React.RefObject<HTMLElement>);

  // Grid: scroll-triggered on first view, immediate on filter change
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>(".card")
      );
      if (!cards.length) return;

      if (!hasEnteredView.current) {
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
              onEnter: () => {
                hasEnteredView.current = true;
              },
            },
          }
        );
      } else {
        // Filter change — animate immediately, grid is already in view
        gsap.fromTo(cards, { opacity: 0, y: 16 }, {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.06,
        });
      }
    });

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="py-16 md:py-20"
      style={{ background: "#1A1916", position: "relative", overflow: "hidden" }}
    >
      {/* Dot grid background */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-grid)" />
      </svg>

      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        <p className="text-label text-accent mb-6">Side projects</p>
        <h2
          id="projects-heading"
          className="text-section-title"
          style={{ color: "#F5F2ED", marginBottom: "0.75rem" }}
        >
          <em className="italic">Vibe Coded</em>{" "}Apps &amp; Projects
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            fontWeight: 300,
            color: "#8A8580",
            marginBottom: "2.5rem",
          }}
        >
          Personal builds and weekend experiments
        </p>

        {/* Featured cards — always visible, not filtered */}
        {featuredProjects.length > 0 && (
          <div ref={featuredRef} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.25rem" }}>
            {featuredProjects.map((p) => (
              <ProjectCard
                key={p.name}
                project={p}
                variant="featured"
                onClick={() => setOverlayProject(p)}
              />
            ))}
          </div>
        )}

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Project filter"
          className="flex"
          style={{
            borderBottom: "0.5px solid rgba(245,242,237,0.08)",
            marginTop: "3rem",
            marginBottom: "3rem",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.value}
              role="tab"
              aria-selected={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.65rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color:
                  activeTab === tab.value
                    ? "#F5F2ED"
                    : "#8A8580",
                background: "none",
                border: "none",
                padding: "0.6rem 1.25rem 0.65rem",
                paddingLeft: tab.value === "all" ? 0 : undefined,
                cursor: "pointer",
                position: "relative",
                transition: "color 150ms ease",
              }}
            >
              {tab.label}
              {activeTab === tab.value && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: "-0.5px",
                    left: tab.value === "all" ? 0 : undefined,
                    right: 0,
                    height: "1.5px",
                    backgroundColor: "var(--color-accent)",
                    display: "block",
                  }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 2-col grid */}
        {filtered.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "1.25rem" }}
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                isLastOdd={
                  filtered.length % 2 !== 0 && index === filtered.length - 1
                }
                onClick={() => setOverlayProject(project)}
              />
            ))}
          </div>
        ) : (
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 300,
              color: "var(--color-muted)",
              padding: "3rem 0",
            }}
          >
            No projects in this category yet.
          </p>
        )}
      </div>

      <ProjectOverlay
        project={overlayProject}
        onClose={() => setOverlayProject(null)}
      />
    </section>
  );
}
