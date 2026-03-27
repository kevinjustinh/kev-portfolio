// CaseStudyCard — renders a single case study card
// variant="featured": full-width 2-col layout with metrics grid
// variant="standard": tag, index, title, description, metrics row, footer

import type { CaseStudy } from "@/lib/data/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  variant?: "featured" | "standard";
}

function renderTitle(title: string, titleItalic?: string) {
  if (!titleItalic) return <>{title}</>;
  const idx = title.indexOf(titleItalic);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <em className="italic">{titleItalic}</em>
      {title.slice(idx + titleItalic.length)}
    </>
  );
}

export default function CaseStudyCard({
  study,
  variant = "standard",
}: CaseStudyCardProps) {
  if (variant === "featured") {
    return (
      <article
        aria-label={`Case study: ${study.title}`}
        className="card"
      >
        <div
          className="grid grid-cols-1 gap-8 p-8 md:gap-12"
          style={{ gridTemplateColumns: "1fr" }}
        >
          {/* Mobile: stacked. Desktop: 2-col */}
          <div className="hidden md:grid md:gap-12" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {/* Left — badge, index, tag, title, description, footer */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-label"
                  style={{
                    color: "var(--color-ink)",
                    border: "0.5px solid var(--color-border)",
                    borderRadius: "2px",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  Featured
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-label"
                  style={{ color: "var(--color-muted)" }}
                >
                  {study.index}
                </span>
                <span
                  className="text-label"
                  style={{
                    color: "var(--color-muted)",
                    border: "0.5px solid var(--color-border)",
                    borderRadius: "2px",
                    padding: "0.2rem 0.5rem",
                  }}
                >
                  {study.tag}
                </span>
              </div>
              <h3
                className="font-display font-normal"
                style={{
                  fontSize: "clamp(1.4rem, 2.2vw, 1.85rem)",
                  lineHeight: 1.15,
                  color: "var(--color-ink)",
                  marginBottom: "0.75rem",
                }}
              >
                {renderTitle(study.title, study.titleItalic)}
              </h3>
              <p
                style={{
                  fontSize: "0.88rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "var(--color-muted)",
                }}
              >
                {study.description}
              </p>
              <div
                className="flex items-center pt-3"
                style={{ borderTop: "0.5px solid var(--color-border)", marginTop: "1.5rem" }}
              >
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 400,
                    color: "var(--color-muted)",
                  }}
                >
                  {study.company} · {study.year}
                </span>
              </div>
            </div>

            {/* Right — metrics 2×2 grid */}
            <div
              className="grid gap-x-8 gap-y-6"
              style={{
                gridTemplateColumns: "1fr 1fr",
                alignContent: "start",
              }}
            >
              {study.metrics.map((metric, i) => (
                <div key={i}>
                  <div
                    className="font-display font-normal"
                    style={{
                      fontSize: "2rem",
                      lineHeight: 1,
                      color: "var(--color-ink)",
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className="text-label"
                    style={{
                      color: "var(--color-muted)",
                      letterSpacing: "0.06em",
                      marginTop: "0.3rem",
                      maxWidth: "100px",
                      lineHeight: 1.4,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile fallback — single column */}
          <div className="flex flex-col md:hidden">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-label"
                style={{
                  color: "var(--color-ink)",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: "2px",
                  padding: "0.2rem 0.5rem",
                }}
              >
                Featured
              </span>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-label" style={{ color: "var(--color-muted)" }}>
                {study.index}
              </span>
              <span
                className="text-label"
                style={{
                  color: "var(--color-muted)",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: "2px",
                  padding: "0.2rem 0.5rem",
                }}
              >
                {study.tag}
              </span>
            </div>
            <h3
              className="font-display font-normal"
              style={{
                fontSize: "clamp(1.3rem, 5vw, 1.6rem)",
                lineHeight: 1.15,
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {renderTitle(study.title, study.titleItalic)}
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--color-muted)",
                marginBottom: "1.25rem",
              }}
            >
              {study.description}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-4">
              {study.metrics.map((metric, i) => (
                <div key={i}>
                  <div
                    className="font-display font-normal"
                    style={{ fontSize: "1.4rem", lineHeight: 1, color: "var(--color-ink)" }}
                  >
                    {metric.value}
                  </div>
                  <div
                    className="text-label"
                    style={{ color: "var(--color-muted)", letterSpacing: "0.06em", marginTop: "0.25rem" }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
            <div
              className="flex items-center pt-3"
              style={{ borderTop: "0.5px solid var(--color-border)" }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--color-muted)" }}>
                {study.company} · {study.year}
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard card
  return (
    <article
      aria-label={`Case study: ${study.title}`}
      className="card flex flex-col p-8"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex items-center gap-3 mb-1">
        <span className="text-label" style={{ color: "var(--color-muted)" }}>
          {study.index}
        </span>
        <span
          className="text-label"
          style={{
            color: "var(--color-muted)",
            border: "0.5px solid var(--color-border)",
            borderRadius: "2px",
            padding: "0.2rem 0.5rem",
          }}
        >
          {study.tag}
        </span>
      </div>
      <h3
        className="font-display font-normal"
        style={{
          fontSize: "1.15rem",
          lineHeight: 1.2,
          color: "var(--color-ink)",
          margin: "0.5rem 0 0.6rem",
        }}
      >
        {renderTitle(study.title, study.titleItalic)}
      </h3>
      <p
        className="flex-1"
        style={{
          fontSize: "0.82rem",
          fontWeight: 300,
          lineHeight: 1.65,
          color: "var(--color-muted)",
        }}
      >
        {study.description}
      </p>
      <div className="flex flex-wrap gap-x-8 gap-y-3 my-4">
        {study.metrics.map((metric, i) => (
          <div key={i}>
            <div
              className="font-display font-normal"
              style={{ fontSize: "1.4rem", lineHeight: 1, color: "var(--color-ink)" }}
            >
              {metric.value}
            </div>
            <div
              className="text-label"
              style={{
                color: "var(--color-muted)",
                letterSpacing: "0.06em",
                marginTop: "0.25rem",
                maxWidth: "110px",
                lineHeight: 1.4,
              }}
            >
              {metric.label}
            </div>
          </div>
        ))}
      </div>
      <div
        className="flex items-center pt-3 mt-auto"
        style={{ borderTop: "0.5px solid var(--color-border)" }}
      >
        <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--color-muted)" }}>
          {study.company} · {study.year}
        </span>
      </div>
    </article>
  );
}
