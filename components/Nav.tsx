"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";

const NAV_LINKS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Case Studies", href: "#case-studies" },
  { num: "03", label: "Vibe Coded Apps & Projects", href: "#projects" },
  { num: "04", label: "Resume", href: "/resume.pdf", external: true, isResume: true },
  { num: "05", label: "Contact", href: "#contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide on scroll down, show on scroll up + transparent at top
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let lastScrollY = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      // Transparency: clear at top, solid once scrolled
      nav.style.backgroundColor = y < 20 ? "transparent" : "var(--color-bg)";
      // Hide/show on scroll direction
      if (y > lastScrollY && y > 80) {
        nav.style.transform = "translateY(-100%)";
        setMenuOpen(false);
      } else {
        nav.style.transform = "translateY(0)";
      }
      lastScrollY = y;
    };

    update(); // set initial state
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "var(--color-bg)",
        transition: "transform 200ms ease",
      }}
    >
      <div className="container-site" style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Kevin Hernandez — home"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontStyle: "italic",
            fontSize: "1.35rem",
            color: "var(--color-ink)",
            textDecoration: "none",
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          Kev.
        </Link>

        {/* Desktop links */}
        <nav aria-label="Main navigation">
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
            }}
            className="nav-desktop-links"
          >
            {NAV_LINKS.map(({ num, label, href, external, isResume }) => (
              <li key={num}>
                <a
                  href={href}
                  className="nav-link"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 400,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      color: "var(--color-muted)",
                      fontSize: "0.55rem",
                      fontWeight: 300,
                      letterSpacing: "0.06em",
                    }}
                  >
                    {num}
                  </span>
                  {label}
                  {isResume && (
                    <span
                      aria-hidden="true"
                      className="resume-icon"
                      style={{
                        color: "var(--color-muted)",
                        display: "inline-flex",
                        alignItems: "center",
                        opacity: 0.7,
                        transition: "opacity 150ms ease",
                      }}
                    >
                      <Download size={11} />
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-hamburger"
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
            color: "var(--color-ink)",
          }}
        >
          {menuOpen ? (
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <line x1="0" y1="1" x2="18" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="0" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="nav-mobile-menu"
          style={{
            backgroundColor: "var(--color-bg)",
            borderTop: "0.5px solid var(--color-border)",
            padding: "1.5rem 2.5rem 2rem",
          }}
        >
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {NAV_LINKS.map(({ num, label, href, external }) => (
              <li key={num}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-body), system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 400,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-ink)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ color: "var(--color-muted)", fontSize: "0.6rem", fontWeight: 300 }}>{num}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        /* Resume icon brightens on hover */
        .nav-link:hover .resume-icon {
          opacity: 1 !important;
        }

        /* Mobile: hide desktop links, show hamburger */
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
