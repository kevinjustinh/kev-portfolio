"use client";

// CaseStudies — V1 Featured + 2×2 Grid
// Featured full-width card (Google.org) + 2×2 border-gap grid below
// Staggered scroll reveal on cards

import { useRef } from "react";
import { useReveal, useRevealCards } from "@/hooks/useReveal";
import type { CaseStudy } from "@/lib/data/caseStudies";
import CaseStudyCard from "./CaseStudyCard";

export interface CaseStudiesProps {
  studies: CaseStudy[];
}

export default function CaseStudies({ studies }: CaseStudiesProps) {
  const featured = studies.find((s) => s.featured);
  const grid = studies.filter((s) => !s.featured);

  const featuredRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useReveal(featuredRef);
  useRevealCards(gridRef, ".card");

  return (
    <section
      id="work"
      aria-labelledby="case-studies-heading"
      className="py-16 md:py-20 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="container-site">
        {/* Section header */}
        <p className="text-label text-accent mb-6">Case studies</p>
        <h2
          id="case-studies-heading"
          className="text-section-title text-ink mb-10 md:mb-12"
        >
          Programs I&apos;ve built and{" "}
          <em className="italic">what they did.</em>
        </h2>

        {/* Featured card */}
        {featured && (
          <div ref={featuredRef} style={{ marginBottom: "1.25rem" }}>
            <CaseStudyCard study={featured} variant="featured" />
          </div>
        )}

        {/* 2×2 grid — floating cards with gap */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: "1.25rem" }}
        >
          {grid.map((study) => (
            <CaseStudyCard key={study.slug} study={study} variant="standard" />
          ))}
        </div>
      </div>
    </section>
  );
}
