/* eslint-disable @next/next/no-img-element -- fixed-size retro frame, decorative crop */
import type { CSSProperties, ReactNode } from "react";
import RetroBox from "./RetroBox";
import { frame, type Look } from "@/lib/profile/look";
import { GITHUB_URL, HEADSHOT, LINKEDIN_URL, details, interests, profileIntro, type Badge, type DetailRow } from "@/lib/data/profile";

type Props = {
  look: Look;
  nameNode: ReactNode;
  badges: { badge: Badge; on: boolean }[];
  onResume: () => void;
  onContact: () => void;
  onResetBadges: () => void;
};

export const badgeStyle = (b: Badge, on: boolean): CSSProperties => ({
  height: 31, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center",
  padding: "0 4px", boxSizing: "border-box", font: "bold 9px Verdana,sans-serif", lineHeight: 1.1,
  background: on ? b.bg : "#e2e2e2", color: on ? b.fg : "#767676",
  border: `1px ${on ? "solid" : "dashed"} ${on ? b.fg : "#c4c4c4"}`, minWidth: 88, cursor: "help",
});

function DetailTable({ look, rows }: { look: Look; rows: DetailRow[] }) {
  const { t } = look;
  return (
    <dl style={{ margin: 0, padding: 3, display: "grid", gridTemplateColumns: "90px 1fr", gap: 3, fontSize: 11 }}>
      {rows.map((r) => (
        <div key={r.label} style={{ display: "contents" }}>
          <dt style={{ background: t.label, color: t.labelText, fontWeight: "bold", padding: "4px 6px" }}>{r.label}</dt>
          <dd style={{ margin: 0, background: t.cell, color: t.text, padding: "4px 6px" }}>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProfileSidebar({ look, nameNode, badges, onResume, onContact, onResetBadges }: Props) {
  const { t } = look;
  const link: CSSProperties = { color: t.link };
  const contactLink: CSSProperties = { display: "flex", alignItems: "center", gap: 6, color: t.link, minHeight: 24, background: "none", border: 0, padding: 0, font: "inherit", fontWeight: "bold", cursor: "pointer", textAlign: "left" };
  const swatch = (bg: string, bd: string): CSSProperties => ({ width: 12, height: 12, background: bg, border: `1px solid ${bd}`, flex: "none" });
  const pd = (fn: () => void) => (e: React.MouseEvent) => { e.preventDefault(); fn(); };
  const unlocked = badges.filter((b) => b.on).length;

  return (
    <div id="about" style={{ flex: "1 1 300px", maxWidth: "100%", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ ...frame(look), background: t.box, color: t.text, padding: 10 }}>
        <h1 style={{ margin: "0 0 8px", font: "bold 20px/1.1 Arial,Helvetica,sans-serif" }}>{nameNode}</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <img
            src={HEADSHOT}
            alt="Kevin Hernandez"
            width={130}
            height={160}
            style={{ ...frame(look), width: 130, height: 160, objectFit: "cover", objectPosition: "50% 30%", flex: "none", background: "#c3d9ff" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, minWidth: 0 }}>
            <div style={{ fontStyle: "italic" }}>{profileIntro.quote}</div>
            <div>{profileIntro.roles}</div>
            <div>{profileIntro.summary}</div>
            <div>{profileIntro.location[0]}<br />{profileIntro.location[1]}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: "bold", color: t.accent }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#33cc33", border: "1px solid #1a801a" }} />
              Open to work!
            </div>
            <div>Last login: today</div>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 11 }}><b>Mood:</b> {profileIntro.mood}</div>
        <div style={{ marginTop: 4, fontSize: 11 }}>
          <b>View my:</b> <a href="#top8" className="kjh-hit" style={link}>Projects</a> |{" "}
          <a href="/resume.pdf" onClick={pd(onResume)} className="kjh-hit" style={link}>Resume</a> |{" "}
          <a href="#work" className="kjh-hit" style={link}>Work history</a>
        </div>
      </div>

      <RetroBox look={look} id="contact" title="Contacting Kevin" bodyStyle={{ background: t.cell }}>
        <div style={{ padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 10px", fontSize: 11, fontWeight: "bold" }}>
          <button onClick={onContact} style={contactLink}><span style={swatch("#ff9933", "#996600")} />Send Message</button>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" style={contactLink}><span style={swatch("#33cc33", "#1a801a")} />Add to Friends</a>
          <button onClick={onResume} style={contactLink}><span style={swatch("#3399ff", "#003399")} />Get Résumé</button>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" style={contactLink}><span style={swatch("#666", "#333")} />View GitHub</a>
          <a href="#top8" style={contactLink}><span style={swatch("#ffcc00", "#996600")} />See Top 8</a>
          <button onClick={onContact} style={contactLink}><span style={swatch("#cc66ff", "#660099")} />Book a Chat</button>
        </div>
      </RetroBox>

      <div style={{ ...frame(look), background: t.box, color: t.text, padding: "6px 8px", fontSize: 11 }}>
        <b>Kevin&apos;s URL:</b><br />
        <a href={profileIntro.url} style={link}>{profileIntro.url}</a>
      </div>

      <RetroBox look={look} title="Kevin's Details"><DetailTable look={look} rows={details} /></RetroBox>
      <RetroBox look={look} title="Kevin's Interests"><DetailTable look={look} rows={interests} /></RetroBox>

      <RetroBox
        look={look}
        title={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Kevin&apos;s Badges</span><span>{unlocked}/{badges.length}</span></span>}
        bodyStyle={{ padding: 8, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div style={{ fontSize: 11 }}>Explore the profile to unlock them all. Hover a badge for a hint.</div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(88px,1fr))", gap: 5 }}>
          {badges.map(({ badge, on }) => (
            <li key={badge.id} title={`${on ? badge.text + ": " : "Locked: "}${badge.hint}`} style={badgeStyle(badge, on)}>
              {on ? badge.text : <span aria-label={`Locked badge: ${badge.hint}`}>???</span>}
            </li>
          ))}
        </ul>
        <div style={{ textAlign: "right", fontSize: 11 }}>
          <a href="#" onClick={pd(onResetBadges)} className="kjh-hit" style={link}>reset badges</a>
        </div>
      </RetroBox>
    </div>
  );
}
