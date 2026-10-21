import type { CSSProperties, ReactNode } from "react";
import { frame, type Look } from "@/lib/profile/look";

type Props = {
  look: Look;
  title?: ReactNode;
  // "head" = solid colored bar (left column); "label" = tinted bar with accent text (right column)
  variant?: "head" | "label";
  id?: string;
  bodyStyle?: CSSProperties;
  children: ReactNode;
};

export default function RetroBox({ look, title, variant = "head", id, bodyStyle, children }: Props) {
  const { t } = look;
  const header: CSSProperties =
    variant === "head"
      ? { background: t.head, color: t.headText, padding: "3px 7px" }
      : { background: t.label, color: t.accent, padding: "4px 8px" };
  return (
    <section id={id} style={frame(look)}>
      {title && (
        <h2 style={{ ...header, margin: 0, font: "inherit", fontWeight: "bold" }}>{title}</h2>
      )}
      <div style={{ background: t.box, color: t.text, ...bodyStyle }}>{children}</div>
    </section>
  );
}
