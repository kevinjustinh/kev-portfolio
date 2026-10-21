"use client";

import RetroWindow from "./RetroWindow";
import { winButton, type Look } from "@/lib/profile/look";
import { RESUME_URL } from "@/lib/data/profile";

export default function ResumeWindow({ look, onClose }: { look: Look; onClose: () => void }) {
  return (
    <RetroWindow
      look={look}
      title="Kevin_Hernandez_Resume.pdf"
      onClose={onClose}
      width={780}
      zIndex={60}
      panelStyle={{ height: "88vh", maxHeight: "88vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <iframe src={RESUME_URL} title="Kevin Hernandez résumé" style={{ flex: 1, width: "100%", border: 0, background: "#fff" }} />
      <div style={{ padding: "8px 10px", display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap", fontSize: 11 }}>
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" style={winButton}>Open in new tab</a>
        <a href={RESUME_URL} download="Kevin_Hernandez_Resume.pdf" style={{ ...winButton, fontWeight: "bold" }}>Download</a>
      </div>
    </RetroWindow>
  );
}
