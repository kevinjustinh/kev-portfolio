"use client";

// Contact — V2 Two Column
// Left: headline + bio pitch + availability badge + social links
// Right: contact form — Name, Email, Subject, Message → Resend → Gmail

import { useRef, useState, useTransition } from "react";
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
      className="py-16 md:py-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
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
                style={{ transition: "color 150ms ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-muted)")
                }
              >
                LinkedIn ↗
              </a>
              <span style={{ color: "var(--color-border)" }}>·</span>
              <a
                href="https://github.com/kevinjhernandez"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label text-muted"
                style={{ transition: "color 150ms ease" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--color-ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--color-muted)")
                }
              >
                GitHub ↗
              </a>
              <span style={{ color: "var(--color-border)" }}>·</span>
              <span
                className="text-label"
                style={{ fontWeight: 300, color: "var(--color-muted)" }}
              >
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
