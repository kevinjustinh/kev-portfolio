"use client";

// Marquee — continuous scroll ticker
// Duplicates content internally for a seamless loop.
// variant="accent"      → orange bg, white text (below Hero)
// variant="atmospheric" → transparent bg, large muted serif (between sections)

export interface MarqueeProps {
  items: string[];
  speed?: "fast" | "slow";
  variant?: "accent" | "atmospheric";
}

export default function Marquee({
  items,
  speed = "fast",
  variant = "accent",
}: MarqueeProps) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const animClass = speed === "fast" ? "animate-marquee-fast" : "animate-marquee-slow";

  if (variant === "atmospheric") {
    return (
      <div
        aria-hidden="true"
        style={{
          overflow: "hidden",
          padding: "1.5rem 0",
          borderTop: "0.5px solid var(--color-border)",
          borderBottom: "0.5px solid var(--color-border)",
        }}
      >
        <div className={`marquee-track ${animClass}`}>
          {doubled.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontStyle: "italic",
                color: "rgba(122,117,112,0.35)",
                padding: "0 3rem",
                whiteSpace: "nowrap",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  // Default: accent (orange) ticker
  return (
    <div
      aria-hidden="true"
      style={{
        overflow: "hidden",
        backgroundColor: "var(--color-accent)",
        padding: "0.65rem 0",
      }}
    >
      <div className={`marquee-track ${animClass}`}>
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                padding: "0 1.5rem",
              }}
            >
              {item}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.6rem",
                letterSpacing: 0,
              }}
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
