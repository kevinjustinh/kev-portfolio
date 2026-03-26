"use client";

// About — V2 Stacked Statement
// Full-width headline at large scale, then bio + availability left / experience list right

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { experience as ExperienceType } from "@/lib/data/about";

export interface AboutProps {
  bio: string;
  experience: typeof ExperienceType;
}

export default function About({ bio, experience }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="py-16 md:py-20 border-t"
      style={{ borderColor: "var(--color-border)", position: "relative", overflow: "hidden" }}
    >
      {/* Background photo */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/about/Photo 3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.25,
          pointerEvents: "none",
        }}
      />
      {/* Cream wash to keep text readable */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--color-bg)",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      />
      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <p className="text-label text-muted mb-8">About</p>

        {/* Full-width stacked headline */}
        <h2
          id="about-heading"
          className="font-display font-normal text-ink mb-10 md:mb-12"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Ops brain.{" "}
          <em className="italic" style={{ color: "var(--color-accent)" }}>
            Builder
          </em>{" "}
          instincts.
        </h2>

        {/* Two-column: bio left (~42%), experience right (~58%) */}
        <div className="flex flex-col gap-10 md:grid md:gap-16" style={{ gridTemplateColumns: "42% 1fr" }}>
          {/* Left — bio + availability */}
          <div>
            <p className="text-ink" style={{ fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.75 }}>
              {bio}
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-2" style={{ marginTop: "1.5rem" }}>
              <span
                className="inline-block rounded-full"
                style={{
                  width: "6px",
                  height: "6px",
                  backgroundColor: "#22c55e",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <span className="text-label text-muted">
                Open to opportunities
              </span>
            </div>
          </div>

          {/* Right — experience list */}
          <div>
            {experience.map((role, i) => (
              <div
                key={i}
                className="grid py-4"
                style={{
                  gridTemplateColumns: "1fr auto",
                  borderTop: i === 0 ? "0.5px solid var(--color-border)" : undefined,
                  borderBottom: "0.5px solid var(--color-border)",
                }}
              >
                <div>
                  <p
                    className="text-ink"
                    style={{ fontSize: "0.82rem", fontWeight: 400, lineHeight: 1.4 }}
                  >
                    {role.company}
                  </p>
                  <p
                    className="text-muted"
                    style={{ fontSize: "0.75rem", fontWeight: 300, lineHeight: 1.5, marginTop: "2px" }}
                  >
                    {role.role}
                  </p>
                </div>
                <p
                  className="text-muted self-center"
                  style={{ fontSize: "0.75rem", fontWeight: 300, letterSpacing: "normal" }}
                >
                  {role.years}
                </p>
              </div>
            ))}
          </div>
        </div>
        </div>
      {/* Photo credit — outside container, pinned to section bottom-right */}
      <p
        style={{
          position: "absolute",
          bottom: "0.4rem",
          right: "0.75rem",
          fontSize: "0.6rem",
          color: "var(--color-muted)",
          opacity: 0.5,
          letterSpacing: "0.04em",
          zIndex: 1,
        }}
      >
        Photo by{" "}
        <a
          href="https://unsplash.com/@cedricletsch?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Cedric Letsch
        </a>{" "}
        on{" "}
        <a
          href="https://unsplash.com/photos/road-pavement-photograph-glaaKI-5NEU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "underline" }}
        >
          Unsplash
        </a>
      </p>
    </section>
  );
}
