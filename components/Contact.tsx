"use client";

// Contact — V2 Two Column
// Left: headline + bio pitch + availability badge + social links
// Right: contact form — Name, Email, Subject, Message → Resend → Gmail

import { useRef, useState, useTransition } from "react";
import { MapPin } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  );
}
import { useReveal } from "@/hooks/useReveal";
import { sendContactEmail, type ContactFormState } from "@/app/actions/contact";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  useReveal(sectionRef);

  const [state, setState] = useState<ContactFormState>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const form = e.currentTarget;

    startTransition(async () => {
      const result = await sendContactEmail(formData);
      setState(result);
      if (result.status === "success") {
        form.reset();
      }
    });
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="py-16 md:py-24 border-t contact-textured"
      style={{ borderColor: "var(--color-border)", position: "relative" }}
    >
      <style>{`
        .contact-textured::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
          mix-blend-mode: multiply;
        }
      `}</style>
      <div className="container-site">
        <div
          className="flex flex-col gap-12 md:grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}
        >
          {/* Left: editorial context */}
          <div>
            <p
              className="text-label text-muted"
              style={{ marginBottom: "1.5rem" }}
            >
              Contact
            </p>
            <h2
              id="contact-heading"
              className="font-display font-normal text-ink"
              style={{
                fontSize: "clamp(2rem, 3vw, 2.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "1.25rem",
              }}
            >
              Open to the{" "}
              <em className="italic" style={{ color: "var(--color-accent)" }}>
                right
              </em>{" "}
              opportunity.
            </h2>
            <p
              style={{
                fontSize: "0.88rem",
                fontWeight: 300,
                color: "var(--color-muted)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              Community management, program ops, and DevRel roles. I bring a
              builder&apos;s perspective — I ship products, not just programs.
            </p>

            {/* Availability badge */}
            <div className="flex items-center gap-2">
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
              <span className="text-label text-muted">Open to opportunities</span>
            </div>

            {/* Social links */}
            <div
              className="flex items-center gap-6"
              style={{
                marginTop: "2rem",
                paddingTop: "2rem",
                borderTop: "0.5px solid var(--color-border)",
              }}
            >
              <a
                href="https://linkedin.com/in/kevinjhernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-muted"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", transition: "color 150ms ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
              <span style={{ color: "var(--color-border)" }}>·</span>
              <a
                href="https://github.com/kevinjhernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-muted"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", transition: "color 150ms ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                <GitHubIcon />
                GitHub
              </a>
              <span style={{ color: "var(--color-border)" }}>·</span>
              <span
                className="text-label"
                style={{ fontWeight: 300, color: "var(--color-muted)", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}
              >
                <MapPin size={13} aria-hidden="true" />
                Bay Area &amp; Remote
              </span>
            </div>
          </div>

          {/* Right: contact form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{ paddingTop: "0.25rem" }}
          >
            {/* Name + Email row */}
            <div
              className="grid grid-cols-1 md:grid-cols-2"
              style={{ gap: "1.25rem", marginBottom: "1.25rem" }}
            >
              <FormField label="Name">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  disabled={isPending}
                  style={inputStyle}
                />
              </FormField>
              <FormField label="Email">
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  disabled={isPending}
                  style={inputStyle}
                />
              </FormField>
            </div>

            <FormField label="Subject">
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
                required
                disabled={isPending}
                style={inputStyle}
              />
            </FormField>

            <FormField label="Message">
              <textarea
                name="message"
                placeholder="Tell me about the role or what you're working on..."
                required
                disabled={isPending}
                rows={5}
                style={{
                  ...inputStyle,
                  resize: "none",
                  lineHeight: 1.65,
                  minHeight: "100px",
                }}
              />
            </FormField>

            {/* Feedback */}
            {state.status === "success" && (
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "#22c55e",
                  marginBottom: "1rem",
                }}
              >
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {state.status === "error" && (
              <p
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                }}
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fff",
                backgroundColor: "var(--color-accent)",
                border: "none",
                borderRadius: "2px",
                padding: "0.65rem 1.5rem",
                cursor: isPending ? "not-allowed" : "pointer",
                opacity: isPending ? 0.6 : 1,
                transition: "opacity 150ms ease",
                marginTop: "0.5rem",
              }}
            >
              {isPending ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ── Helpers ──────────────────────────────────────────────

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.25rem" }}>
      <label
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.6rem",
          fontWeight: 500,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--color-muted)",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  fontWeight: 300,
  color: "var(--color-ink)",
  backgroundColor: "transparent",
  border: "none",
  borderBottom: "0.5px solid var(--color-border)",
  padding: "0.5rem 0",
  outline: "none",
  width: "100%",
  transition: "border-color 200ms ease",
};
