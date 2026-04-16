"use client";

// Footer — Kev. logo left · nav links center · copyright right

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{ borderTop: "0.5px solid var(--color-border)" }}
    >
      <div
        className="container-site flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-0"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-normal text-ink"
          style={{ fontSize: "1.05rem", textDecoration: "none" }}
          aria-label="Kevin J Hernandez — home"
        >
          Kevin J Hernandez
        </Link>

        {/* Nav links */}
        <nav aria-label="Footer navigation" className="hidden md:block">
          <ul
            className="flex items-center gap-6"
            style={{ listStyle: "none", margin: 0, padding: 0 }}
          >
            {[
              { label: "About", href: "#about" },
              { label: "Case Studies", href: "#case-studies" },
              { label: "Vibe Coding", href: "#projects" },
              { label: "Resume ↗", href: "/resume.pdf" },
              { label: "Contact", href: "#contact" },
            ].map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="text-label text-muted"
                  style={{
                    textDecoration: "none",
                    transition: "color 150ms ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-ink)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-muted)")
                  }
                  {...(href === "/resume.pdf"
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Copyright */}
        <p
          className="text-label text-muted"
          style={{ fontWeight: 300 }}
        >
          © {year} Kevin Hernandez
        </p>
      </div>
    </footer>
  );
}
