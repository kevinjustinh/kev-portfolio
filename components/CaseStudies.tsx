"use client";

// CaseStudies — V1 Featured + 2×2 Grid
// Featured full-width card (Google.org) + 2×2 border-gap grid below
// Staggered scroll reveal on cards

import { useRef } from "react";
import { useReveal, useRevealCards } from "@/hooks/useReveal";
import type { CaseStudy } from "@/lib/data/caseStudies";
import { publishedArticles } from "@/lib/data/caseStudies";
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
      id="case-studies"
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
          Programs I&apos;ve worked on and{" "}
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
          style={{ gap: "1.25rem", marginBottom: "1.25rem" }}
        >
          {grid.map((study) => (
            <CaseStudyCard key={study.slug} study={study} variant="standard" />
          ))}
        </div>

        {/* Published work band */}
        <div
          style={{
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
            Published work
          </p>
          <div>
            {publishedArticles.map((article, i) => (
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
                    style={{ color: "var(--color-muted)", whiteSpace: "nowrap", flexShrink: 0 }}
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
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexShrink: 0 }}>
                  <span className="text-label text-muted">{article.date}</span>
                  <span
                    className="pub-article-arrow"
                    style={{ fontSize: "0.8rem", color: "var(--color-muted)", transition: "color 150ms ease, transform 150ms ease", display: "inline-block" }}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <style>{`
          .pub-article-row:hover .pub-article-title { color: var(--color-accent); }
          .pub-article-row:hover .pub-article-arrow { color: var(--color-accent); transform: translate(2px, -2px); }
        `}</style>
      </div>
    </section>
  );
}
