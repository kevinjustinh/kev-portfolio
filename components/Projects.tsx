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

type FilterTab = "all" | "ios" | "web" | "ops";

const TABS: { label: string; value: FilterTab }[] = [
  { label: "All", value: "all" },
  { label: "iOS Apps", value: "ios" },
  { label: "Web", value: "web" },
  { label: "Programs & Ops", value: "ops" },
];

export default function Projects({ projects }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [overlayProject, setOverlayProject] = useState<Project | null>(null);

  const featured = projects.find((p) => p.featured);
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
      className="py-16 md:py-20 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="container-site">
        <p className="text-label text-accent mb-6">Selected work</p>
        <h2
          id="projects-heading"
          className="text-section-title text-ink mb-10 md:mb-12"
        >
          <em className="italic">Apps</em>{" "}&amp; Projects
        </h2>

        {/* Featured card — always visible, not filtered */}
        {featured && (
          <div ref={featuredRef} style={{ marginBottom: "1.25rem" }}>
            <ProjectCard
              project={featured}
              variant="featured"
              onClick={() => setOverlayProject(featured)}
            />
          </div>
        )}

        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Project filter"
          className="flex"
          style={{
            borderBottom: "0.5px solid var(--color-border)",
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
                    ? "var(--color-ink)"
                    : "var(--color-muted)",
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
                    backgroundColor: "var(--color-ink)",
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
