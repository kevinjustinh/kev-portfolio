/* eslint-disable @next/next/no-img-element -- full-width screenshot inside retro window */
"use client";

import RetroWindow from "./RetroWindow";
import { winButton, type Look } from "@/lib/profile/look";
import type { Friend } from "@/lib/data/profile";

type Props = { look: Look; friend: Friend; onClose: () => void; onPrev: () => void; onNext: () => void };

export default function FriendWindow({ look, friend, onClose, onPrev, onNext }: Props) {
  const external = friend.link.startsWith("http");
  return (
    <RetroWindow look={look} title={`${friend.screen}'s Profile`} onClose={onClose} width={560}>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10, fontFamily: "Verdana,sans-serif" }}>
        {friend.img ? (
          <img src={friend.img} alt={friend.alt} style={{ width: "100%", height: 240, objectFit: "cover", objectPosition: "top", border: "1px solid #808080", background: "#fff", display: "block" }} />
        ) : (
          <div aria-hidden style={{ height: 160, border: "1px solid #808080", background: "repeating-linear-gradient(45deg,#dfe8f5 0 8px,#cbd8ec 8px 16px)", display: "flex", alignItems: "center", justifyContent: "center", font: "11px 'Courier New',monospace", color: "#336699" }}>
            program / event photo
          </div>
        )}
        <div style={{ fontSize: 11, fontWeight: "bold", color: "#c2410c", textTransform: "uppercase", letterSpacing: ".5px" }}>{friend.tag}</div>
        <div style={{ font: "bold 20px Arial,sans-serif", color: "#003399", marginTop: -6 }}>{friend.name}</div>
        <div style={{ fontSize: 12, textWrap: "pretty" }}>{friend.blurb}</div>
        {friend.metrics && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(110px,1fr))", gap: 6 }}>
            {friend.metrics.map((m) => (
              <div key={m.label} style={{ background: "#fff", border: "1px solid #808080", padding: "6px 8px" }}>
                <div style={{ font: "bold 18px Arial,sans-serif", color: "#003399" }}>{m.value}</div>
                <div style={{ fontSize: 11 }}>{m.label}</div>
              </div>
            ))}
          </div>
        )}
        <div style={{ fontSize: 11 }}><b>{friend.metrics ? "Focus:" : "Built with:"}</b> {friend.stack}</div>
        <div style={{ background: "#fff", border: "1px solid #808080", padding: 8, fontSize: 11 }}>
          <b style={{ color: "#003399" }}>{friend.screen} says:</b> {friend.quote}
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
          <button onClick={onPrev} className="kjh-press" style={winButton}>&lt; Prev friend</button>
          <button onClick={onNext} className="kjh-press" style={winButton}>Next friend &gt;</button>
          <a href={friend.link} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="kjh-press" style={{ ...winButton, fontWeight: "bold" }}>
            View project
          </a>
        </div>
      </div>
    </RetroWindow>
  );
}
