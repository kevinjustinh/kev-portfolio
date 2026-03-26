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
          style={{ gridTemplateColumns: "2fr 3fr", background: "#222220" }}
        >
          <div
            style={{
              backgroundColor: project.accentColor ?? "var(--color-muted)",
              minHeight: "240px",
              display: "flex",
              alignItems: "flex-end",
              padding: "1.5rem",
              position: "relative",
              overflow: "hidden",
              ...(project.screenshots?.[0] ? {
                backgroundImage: `url(${project.screenshots[0]})`,
                backgroundSize: "75%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              } : {}),
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
                color: "#8A8580",
                border: "0.5px solid rgba(245,242,237,0.08)",
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
                color: "#F5F2ED",
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
                color: "#C8C4BE",
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
                color: "#8A8580",
                marginTop: "1rem",
              }}
            >
              {project.stack}
            </p>
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.5px solid rgba(245,242,237,0.08)",
                marginTop: "1rem",
                paddingTop: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  color: "#8A8580",
                }}
              >
                {project.tag.split(" · ")[0]}
              </span>
              <span className="arrow" style={{ color: "#8A8580" }}>
                →
              </span>
            </div>
          </div>
        </div>

        {/* Mobile: stacked — accent block on top, content below */}
        <div className="flex flex-col md:hidden" style={{ background: "#222220" }}>
          <div
            style={{
              backgroundColor: project.accentColor ?? "var(--color-muted)",
              height: "120px",
              display: "flex",
              alignItems: "flex-end",
              position: "relative",
              overflow: "hidden",
              ...(project.screenshots?.[0] ? {
                backgroundImage: `url(${project.screenshots[0]})`,
                backgroundSize: "75%",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              } : {}),
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
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", background: "#222220" }}>
            <span
              className="text-label"
              style={{
                color: "#8A8580",
                border: "0.5px solid rgba(245,242,237,0.08)",
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
                color: "#F5F2ED",
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
                color: "#C8C4BE",
              }}
            >
              {project.description}
            </p>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 400,
                letterSpacing: "0.08em",
                color: "#8A8580",
                marginTop: "1rem",
              }}
            >
              {project.stack}
            </p>
            <div
              className="flex items-center justify-between"
              style={{
                borderTop: "0.5px solid rgba(245,242,237,0.08)",
                marginTop: "1rem",
                paddingTop: "0.75rem",
              }}
            >
              <span style={{ fontSize: "0.7rem", fontWeight: 400, color: "#8A8580" }}>
                {project.tag.split(" · ")[0]}
              </span>
              <span className="arrow" style={{ color: "#8A8580" }}>→</span>
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
      className="card flex flex-col"
      onClick={onClick}
      style={{
        backgroundColor: "#222220",
        cursor: onClick ? "pointer" : "default",
        overflow: "hidden",
        ...(project.accentColor ? { borderTop: `2.5px solid ${project.accentColor}` } : {}),
        ...(isLastOdd ? { gridColumn: "1 / -1" } : {}),
      }}
    >
      {/* Image / screenshot area */}
      <div
        style={{
          aspectRatio: isLastOdd ? "16/5" : "3/2",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          backgroundColor: project.accentColor ?? "#1A1916",
        }}
      >
        {project.screenshots?.[0] ? (
          <img
            src={project.screenshots[0]}
            alt={`${project.name} screenshot`}
            style={{ width: "75%", height: "75%", objectFit: "contain", margin: "auto", display: "block", position: "absolute", inset: 0 }}
          />
        ) : (
          project.accentColor && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: project.accentColor,
                opacity: 0.15,
              }}
            />
          )
        )}
      </div>

      {/* Content */}
      <div
        className="flex flex-col flex-1"
        style={{ padding: "1.25rem 1.5rem 1.5rem" }}
      >
        <span
          className="text-label"
          style={{
            color: "#8A8580",
            background: "rgba(245,242,237,0.07)",
            borderRadius: "2px",
            padding: "0.2rem 0.5rem",
            display: "inline-block",
            alignSelf: "flex-start",
            marginBottom: "0.4rem",
          }}
        >
          {project.tag}
        </span>
        <h3
          className="font-display font-normal"
          style={{
            fontSize: "1.25rem",
            lineHeight: 1.15,
            color: "#F5F2ED",
            margin: "0.25rem 0 0.4rem",
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
            color: "#C8C4BE",
          }}
        >
          {project.description}
        </p>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "#8A8580",
            marginTop: "0.6rem",
          }}
        >
          {project.stack}
        </p>
        <div
          className="flex items-center justify-end"
          style={{
            borderTop: "0.5px solid rgba(245,242,237,0.08)",
            marginTop: "1rem",
            paddingTop: "0.75rem",
          }}
        >
          <span className="arrow" style={{ color: "#8A8580" }}>→</span>
        </div>
      </div>
    </article>
  );
}
