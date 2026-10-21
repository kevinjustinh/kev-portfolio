"use client";

import type { CSSProperties } from "react";
import RetroWindow from "./RetroWindow";
import { winButton, type Look } from "@/lib/profile/look";
import { CUSTOM_FIELDS, FONTS, PATTERNS, THEMES, THEME_ORDER, TRAILS, type CustomColors, type PatternKey, type ThemeKey } from "@/lib/profile/themes";

type Props = {
  look: Look;
  theme: ThemeKey | "custom";
  font: string;
  trail: string;
  flip: boolean;
  pattern: PatternKey;
  custom: CustomColors;
  shareUrl: string;
  copied: boolean;
  onPickTheme: (k: ThemeKey) => void;
  onFont: (v: string) => void;
  onTrail: (v: string) => void;
  onFlip: () => void;
  onPattern: (p: PatternKey) => void;
  onCustom: (key: keyof CustomColors, value: string) => void;
  onCopy: () => void;
  onClose: () => void;
};

const select: CSSProperties = { font: "11px Verdana,sans-serif", padding: 3, border: "2px inset #fff", background: "#fff", color: "#000" };
const heading: CSSProperties = { fontWeight: "bold", color: "#003399" };

export default function LayoutEditor(p: Props) {
  return (
    <RetroWindow look={p.look} title="Profile Layout Editor 2.0" onClose={p.onClose} width={760}>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, fontSize: 11, fontFamily: "Verdana,sans-serif" }}>
        <div>Pick a layout. Copy-pasted from a layout site circa 2006, no HTML skills required.</div>
        <div role="radiogroup" aria-label="Layouts" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))", gap: 8 }}>
          {THEME_ORDER.map((k) => {
            const th = THEMES[k], c = th.t;
            const on = k === p.theme;
            return (
              <button
                key={k}
                role="radio"
                aria-checked={on}
                onClick={() => p.onPickTheme(k)}
                className="kjh-pick"
                style={{ all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 5, background: "#fff", border: `2px solid ${on ? "#ff6600" : "#d4d0c8"}` }}
              >
                <span aria-hidden style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 72, border: "1px solid #808080", ...th.wall }}>
                  <span style={{ width: "62%", height: 62, background: c.box, border: `2px solid ${c.border}`, display: "flex", flexDirection: "column", gap: 5, padding: 5, boxSizing: "border-box" }}>
                    <span style={{ height: 10, background: c.head }} />
                    <span style={{ height: 5, width: "80%", background: c.link }} />
                    <span style={{ height: 5, width: "55%", background: c.accent }} />
                  </span>
                </span>
                <span style={heading}>{th.label}</span>
                <span style={{ fontSize: 11, color: "#444" }}>{th.desc}</span>
              </button>
            );
          })}
        </div>

        <div style={{ borderTop: "1px solid #aca899", paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={heading}>Extras <span style={{ fontWeight: "normal", color: "#444" }}>(work with any layout)</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 18px", alignItems: "flex-end" }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 3 }}>Font
              <select value={p.font} onChange={(e) => p.onFont(e.target.value)} style={select}>
                {FONTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 3 }}>Cursor trail
              <select value={p.trail} onChange={(e) => p.onTrail(e.target.value)} style={select}>
                {TRAILS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", paddingBottom: 3 }}>
              <input type="checkbox" checked={p.flip} onChange={p.onFlip} />Flip columns
            </label>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #aca899", paddingTop: 10, display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={heading}>Or build your own layout</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {CUSTOM_FIELDS.map(([key, lbl]) => (
              <label key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 11, cursor: "pointer" }}>
                <input type="color" value={p.custom[key]} onChange={(e) => p.onCustom(key, e.target.value)} style={{ width: 46, height: 30, padding: 0, border: "2px inset #fff", background: "#fff", cursor: "pointer" }} />
                {lbl}
              </label>
            ))}
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontSize: 11 }}>
              <select value={p.pattern} onChange={(e) => p.onPattern(e.target.value as PatternKey)} style={{ ...select, height: 30 }}>
                {PATTERNS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
              Pattern
            </label>
          </div>
          <div style={{ fontSize: 11, color: "#444" }}>Share your layout. Anyone who opens this link sees the profile in your colors.</div>
          <div style={{ display: "flex", gap: 6 }}>
            <input readOnly value={p.shareUrl} aria-label="Share link" onFocus={(e) => e.target.select()} style={{ flex: 1, minWidth: 0, font: "11px 'Courier New',monospace", padding: 4, border: "2px inset #fff", background: "#fff", color: "#000" }} />
            <button onClick={p.onCopy} className="kjh-press" style={{ ...winButton, fontWeight: "bold", whiteSpace: "nowrap" }}>{p.copied ? "Copied!" : "Copy link"}</button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={p.onClose} className="kjh-press" style={{ ...winButton, fontWeight: "bold" }}>Save layout</button>
        </div>
      </div>
    </RetroWindow>
  );
}
