/* eslint-disable @next/next/no-img-element -- matches the retro page's plain images */
"use client";

import type { CSSProperties } from "react";
import { MODERN_FONT } from "@/lib/profile/look";
import { HEADSHOT, LINKEDIN_URL, friends, jobs, recruiterIntro, results } from "@/lib/data/profile";

type Props = { onBack: () => void; onResume: () => void; onContact: () => void; onOpenFriend: (index: number) => void };

const ink = "#151515", muted = "#55534d", faint = "#6b6962", rule = "#e4e2dc";
const pill: CSSProperties = { font: `500 14px ${MODERN_FONT}`, padding: "10px 18px", borderRadius: 999, border: `1px solid #d8d6cf`, background: "#fff", color: ink, cursor: "pointer", minHeight: 44, boxSizing: "border-box", display: "inline-flex", alignItems: "center" };
const eyebrow: CSSProperties = { margin: 0, fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: faint };

export default function RecruiterView({ onBack, onResume, onContact, onOpenFriend }: Props) {
  const caseStudies = friends.map((f, i) => ({ f, i })).filter(({ f }) => f.metrics);
  const projects = friends.map((f, i) => ({ f, i })).filter(({ f }) => !f.metrics);

  return (
    <div data-lenis-prevent style={{ position: "fixed", inset: 0, zIndex: 45, overflow: "auto", background: "#f5f4f0", color: ink, fontFamily: MODERN_FONT, fontSize: 15, lineHeight: 1.55 }}>
      <div style={{ position: "sticky", top: 0, zIndex: 2, background: "rgba(245,244,240,.85)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${rule}` }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <span style={{ fontWeight: 600, whiteSpace: "nowrap" }}>Kevin J Hernandez</span>
          <button onClick={onBack} className="kjh-pill" style={{ ...pill, font: `500 13px ${MODERN_FONT}`, padding: "7px 14px", whiteSpace: "nowrap" }}>← Back to the fun version</button>
        </div>
      </div>
      <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 24px 120px", display: "flex", flexDirection: "column", gap: 56 }}>
        <div style={{ display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <img src={HEADSHOT} alt="Kevin Hernandez" width={120} height={120} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 30%" }} />
          <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#2f7a3d", fontWeight: 500 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34a853", flex: "none" }} />{recruiterIntro.status}
            </div>
            <h1 style={{ margin: 0, font: `600 clamp(32px, 8vw, 44px)/1.05 ${MODERN_FONT}`, letterSpacing: -1.5 }}>{recruiterIntro.headline}</h1>
            <p style={{ margin: 0, color: muted, textWrap: "pretty" }}>{recruiterIntro.body}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
              <button onClick={onResume} style={{ ...pill, border: 0, background: ink, color: "#fff" }}>View résumé</button>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="kjh-pill" style={pill}>LinkedIn</a>
              <button onClick={onContact} className="kjh-pill" style={pill}>Send a message</button>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 1, background: rule, border: `1px solid ${rule}`, borderRadius: 16, overflow: "hidden" }}>
          {results.map((r) => (
            <div key={r.label} style={{ background: "#fff", padding: 20, display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ font: `600 30px/1 ${MODERN_FONT}`, letterSpacing: -1 }}>{r.value}</span>
              <span style={{ fontSize: 13, color: faint }}>{r.label}</span>
            </div>
          ))}
        </div>

        <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={eyebrow}>Case studies</h2>
          {caseStudies.map(({ f, i }) => (
            <button key={i} onClick={() => onOpenFriend(i)} className="kjh-cs" style={{ all: "unset", cursor: "pointer", display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 16, alignItems: "start", padding: "18px 20px", background: "#fff", border: `1px solid ${rule}`, borderRadius: 14 }}>
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ fontSize: 12, color: faint }}>{f.tag}</span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>{f.name}</span>
                <span style={{ fontSize: 14, color: muted, textWrap: "pretty" }}>{f.blurb}</span>
              </span>
              <span style={{ font: `600 20px ${MODERN_FONT}`, color: "#e8501a", whiteSpace: "nowrap" }}>{f.metrics?.[0].value}</span>
            </button>
          ))}
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={eyebrow}>Experience</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {jobs.map((j) => (
              <div key={j.co} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto", gap: 12, padding: "14px 0", borderBottom: `1px solid ${rule}` }}>
                <span><b style={{ fontWeight: 600 }}>{j.role}</b><span style={{ color: faint }}> · {j.co}</span></span>
                <span style={{ color: faint, fontSize: 14 }}>{j.yrs}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <h2 style={eyebrow}>Things I&apos;ve built</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))", gap: 12 }}>
            {projects.map(({ f, i }) => (
              <button key={i} onClick={() => onOpenFriend(i)} className="kjh-fade" style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8 }}>
                {f.img && <img src={f.img} alt={f.alt} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", objectPosition: "top", borderRadius: 12, border: `1px solid ${rule}`, background: "#fff", display: "block" }} />}
                <span style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{f.name}</span>
                  <span style={{ fontSize: 12, color: faint }}>{f.tag}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
