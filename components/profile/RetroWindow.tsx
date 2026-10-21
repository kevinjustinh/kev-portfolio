"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import type { Look } from "@/lib/profile/look";

type Props = {
  look: Look;
  title: string;
  onClose: () => void;
  width: number;
  zIndex?: number;
  panelStyle?: CSSProperties;
  children: ReactNode;
};

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

// XP-style modal window. Traps focus while open and hands it back to
// whatever opened it on close. Escape is handled by the page.
export default function RetroWindow({ look, title, onClose, width, zIndex = 50, panelStyle, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    return () => opener?.focus?.();
  }, []);

  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex, background: look.scrim, backdropFilter: look.blur, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={trapTab}
        data-lenis-prevent
        style={{ viewTransitionName: "kjh-win", width, maxWidth: "100%", maxHeight: "90vh", overflow: "auto", background: look.winBg, border: look.winBorder, boxShadow: look.winShadow, borderRadius: look.r2, color: "#000", ...panelStyle }}
      >
        <div style={{ background: look.titleBg, color: look.titleText, fontWeight: "bold", fontSize: 12, padding: look.titlePad, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span id={titleId}>{title}</span>
          <button
            data-autofocus
            onClick={onClose}
            aria-label="Close"
            className="kjh-focus"
            style={{ width: 24, height: 22, border: "2px outset #fff", background: "#d4d0c8", font: "bold 11px Verdana,sans-serif", cursor: "pointer", padding: 0, lineHeight: 1, color: "#000" }}
          >
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
