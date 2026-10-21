import type { CSSProperties } from "react";
import { FONT_CSS, MODERN, mix, type Palette, type Theme } from "./themes";

// Everything the 2006→2026 slider changes. `era` runs 0–100; past the
// halfway mark the page switches to modern fonts and window chrome.

export type Look = {
  t: Palette; // theme colors blended toward MODERN
  fs: string;
  font: string;
  pageBg: string;
  bar1: string;
  bar2: string;
  bar2b: string;
  r: string; // box corner radius
  r2: string; // window corner radius
  sh: string; // box shadow
  winBg: string;
  winBorder: string;
  winShadow: string;
  titleBg: string;
  titleText: string;
  titlePad: string;
  scrim: string;
  blur: string;
  late: boolean;
};

export const MODERN_FONT = "var(--font-geist), system-ui, sans-serif";
export const RETRO_FONT = "Verdana,Arial,Helvetica,sans-serif";

export function computeLook(theme: Theme, era: number, font: string): Look {
  const k = era / 100;
  const late = k >= 0.5;
  const t = Object.fromEntries(
    (Object.keys(MODERN) as (keyof Palette)[]).map((key) => [key, mix(theme.t[key], MODERN[key], k)])
  ) as Palette;
  return {
    t,
    fs: `${12 + 2 * k}px`,
    font: late ? MODERN_FONT : FONT_CSS[font] || theme.font || RETRO_FONT,
    pageBg: mix("#e9edf3", "#f5f4f0", k),
    bar1: mix("#003399", "#151515", k),
    bar2: mix("#6699cc", "#232323", k),
    bar2b: mix("#336699", "#151515", k),
    r: `${Math.round(14 * k)}px`,
    r2: `${Math.round(18 * k)}px`,
    sh: k > 0 ? `0 ${Math.round(8 * k)}px ${Math.round(24 * k)}px rgba(0,0,0,${(0.08 * k).toFixed(3)})` : "none",
    winBg: mix("#ece9d8", "#ffffff", k),
    winBorder: late ? "1px solid #e4e2dc" : "2px solid #0a246a",
    winShadow: late ? "0 24px 60px rgba(0,0,0,.25)" : "4px 4px 0 rgba(0,0,0,.35)",
    titleBg: late ? "#ffffff" : "linear-gradient(90deg,#0a246a,#3a6ea5)",
    titleText: late ? "#151515" : "#ffffff",
    titlePad: late ? "10px 10px 10px 16px" : "4px 4px 4px 8px",
    scrim: late ? "rgba(20,20,20,.35)" : "rgba(0,0,40,.45)",
    blur: late ? "blur(6px)" : "none",
    late,
  };
}

/** Shared bordered-box frame used by every profile panel. */
export const frame = (l: Look): CSSProperties => ({
  border: `1px solid ${l.t.border}`,
  borderRadius: l.r,
  overflow: "hidden",
  boxShadow: l.sh,
});

/** Grey Windows-style push button. */
export const winButton: CSSProperties = {
  font: "11px Verdana,sans-serif",
  padding: "5px 12px",
  border: "2px outset #fff",
  background: "#d4d0c8",
  color: "#000",
  cursor: "pointer",
};
