// ProjectCard — renders a single project card
// variant="featured": full-width, accent color block left + content right
// variant="standard": tag pill, name, description, stack, footer

import type { Project } from "@/lib/data/projects";

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "standard";
  isLastOdd?: boolean;
  onClick?: () => void;
}

export default function ProjectCard({
  project,
  variant = "standard",
  isLastOdd = false,
  onClick,
}: ProjectCardProps) {
  if (variant === "featured") {
    return (
      <article
        aria-label={`Project: ${project.name}`}
        className="card"
        onClick={onClick}
        style={{
          cursor: onClick ? "pointer" : "default",
          overflow: "hidden",
        }}
      >
        {/* Desktop: 2-col — accent block left, content right */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: "2fr 3fr" }}
        >
          <div
            style={{
              backgroundColor: project.accentColor ?? "var(--color-muted)",
              minHeight: "240px",
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
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {project.tag}
            </span>
          </div>
          <div
            style={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              className="text-label"
              style={{
                color: "var(--color-ink)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "2px",
                padding: "0.2rem 0.5rem",
                display: "inline-block",
                alignSelf: "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              Featured
            </span>
            <h3
              className="font-display font-normal"
              style={{
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--color-muted)",
                flex: 1,
              }}
            >
              {project.description}
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginTop: "1rem",
              }}
            >
              {project.stack}
            </p>
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.5px solid var(--color-border)",
                marginTop: "1rem",
                paddingTop: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  color: "var(--color-muted)",
                }}
              >
                {project.tag.split(" · ")[0]}
              </span>
              <span className="arrow" style={{ color: "var(--color-muted)" }}>
                →
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: stacked — accent block on top, content below */}
        <div className="flex flex-col md:hidden">
          <div
            style={{
              backgroundColor: project.accentColor ?? "var(--color-muted)",
              height: "120px",
              display: "flex",
              alignItems: "flex-end",
              padding: "1rem 1.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {project.tag}
            </span>
          </div>
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column" }}>
            <span
              className="text-label"
              style={{
                color: "var(--color-ink)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "2px",
                padding: "0.2rem 0.5rem",
                display: "inline-block",
                alignSelf: "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              Featured
            </span>
            <h3
              className="font-display font-normal"
              style={{
                fontSize: "clamp(1.4rem, 6vw, 1.8rem)",
                lineHeight: 1.1,
                color: "var(--color-ink)",
                marginBottom: "0.75rem",
              }}
            >
              {project.name}
            </h3>
            <p
              style={{
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.7,
                color: "var(--color-muted)",
              }}
            >
              {project.description}
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                color: "var(--color-muted)",
                marginTop: "1rem",
              }}
            >
              {project.stack}
            </p>
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.5px solid var(--color-border)",
                marginTop: "1rem",
                paddingTop: "0.75rem",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "var(--color-muted)" }}>
                {project.tag.split(" · ")[0]}
              </span>
              <span className="arrow" style={{ color: "var(--color-muted)" }}>→</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard card
  return (
    <article
      aria-label={`Project: ${project.name}`}
      className="card flex flex-col p-8"
      onClick={onClick}
      style={{
        backgroundColor: "var(--color-surface)",
        cursor: onClick ? "pointer" : "default",
        ...(isLastOdd ? { gridColumn: "1 / -1" } : {}),
      }}
    >
      <div>
        <span
          className="text-label"
          style={{
            color: "var(--color-muted)",
            border: "0.5px solid var(--color-border)",
            borderRadius: "2px",
            padding: "0.2rem 0.5rem",
            display: "inline-block",
          }}
        >
          {project.tag}
        </span>
      </div>
      <h3
        className="font-display font-normal"
        style={{
          fontSize: "1.25rem",
          lineHeight: 1.15,
          color: "var(--color-ink)",
          margin: "0.4rem 0 0.4rem",
        }}
      >
        {project.name}
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
        {project.description}
      </p>
      <p
        style={{
          fontSize: "0.65rem",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: "var(--color-muted)",
          marginTop: "0.6rem",
        }}
      >
        {project.stack}
      </p>
      <div
        className="flex items-center justify-end"
        style={{
          borderTop: "0.5px solid var(--color-border)",
          marginTop: "1rem",
          paddingTop: "0.75rem",
        }}
      >
        <span className="arrow" style={{ color: "var(--color-muted)" }}>
          →
        </span>
      </div>
    </article>
  );
}
