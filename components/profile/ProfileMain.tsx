/* eslint-disable @next/next/no-img-element -- small fixed-size retro thumbnails */
import type { CSSProperties } from "react";
import RetroBox from "./RetroBox";
import { frame, type Look } from "@/lib/profile/look";
import { blurbs, bulletins, comments, friends, jobs, profileSong, type Friend } from "@/lib/data/profile";

export type RankedFriend = { friend: Friend; index: number };

type Props = {
  look: Look;
  shown: RankedFriend[];
  showAll: boolean;
  customOrder: boolean;
  drag: number | null;
  over: number | null;
  playing: boolean;
  onTogglePlay: () => void;
  onOpenFriend: (index: number) => void;
  onBulletin: (index: number) => void;
  onToggleAll: () => void;
  onResetOrder: () => void;
  onDragStart: (pos: number) => void;
  onDragOver: (pos: number) => void;
  onDrop: (pos: number) => void;
  onDragEnd: () => void;
  onMove: (from: number, to: number) => void;
};

const stripes = (size: number) => `repeating-linear-gradient(45deg,#dfe8f5 0 ${size}px,#cbd8ec ${size}px ${size * 2}px)`;

function Thumb({ friend, size }: { friend: Friend; size: number }) {
  const box: CSSProperties = { width: size, height: size, border: "1px solid #999", display: "block", flex: "none" };
  if (friend.img) return <img src={friend.img} alt={friend.alt} width={size} height={size} style={{ ...box, objectFit: "cover", objectPosition: "top", background: "#c3d9ff" }} />;
  return (
    <span aria-hidden style={{ ...box, background: stripes(size > 80 ? 6 : 5), display: "flex", alignItems: "center", justifyContent: "center", font: "9px 'Courier New',monospace", color: "#336699" }}>
      {size > 80 ? "program photo" : null}
    </span>
  );
}

export default function ProfileMain(p: Props) {
  const { look } = p;
  const { t } = look;
  const pd = (fn: () => void) => (e: React.MouseEvent) => { e.preventDefault(); fn(); };
  const cell: CSSProperties = { background: t.cell, padding: "5px 7px" };

  return (
    <div style={{ flex: "1 1 440px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ ...frame(look), background: t.box, color: t.text, padding: 10, display: "flex", alignItems: "center", gap: 10 }}>
        <button
          onClick={p.onTogglePlay}
          aria-label={p.playing ? "Pause profile song" : "Play profile song"}
          style={{ width: 34, height: 34, flex: "none", border: "2px outset #ccc", background: "#eee", fontSize: 13, cursor: "pointer", color: "#003399" }}
        >
          {p.playing ? "❚❚" : "▶"}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: "bold" }}>{profileSong.title}</div>
          <div style={{ fontSize: 11 }}>{profileSong.note}</div>
          <div style={{ marginTop: 5, height: 6, background: "#ddd", border: "1px solid #999" }}>
            {p.playing && <div style={{ height: "100%", background: "#3399ff", animation: "kjhBar 30s linear infinite" }} />}
          </div>
        </div>
      </div>

      <div style={{ ...frame(look), background: t.box, color: t.text, padding: 10, fontWeight: "bold", fontSize: 14 }}>
        Kevin is in your extended network
      </div>

      <RetroBox
        look={look}
        variant="label"
        title={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Kevin&apos;s Bulletin Space</span><span style={{ fontWeight: "normal", fontSize: 11, color: t.labelText }}>what I&apos;m building</span></span>}
      >
        <div style={{ padding: 3, display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: 3, fontSize: 11 }}>
          {bulletins.map((b) => (
            <div key={b.subj} style={{ display: "contents" }}>
              <div style={{ ...cell, whiteSpace: "nowrap" }}>{b.date}</div>
              <a href="#" onClick={pd(() => p.onBulletin(b.friend))} style={{ ...cell, color: t.link, fontWeight: "bold" }}>{b.subj}</a>
            </div>
          ))}
        </div>
      </RetroBox>

      <RetroBox look={look} variant="label" title="Kevin's Blurbs" bodyStyle={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
        <div>
          <h3 style={{ margin: "0 0 3px", font: "inherit", color: t.accent, fontWeight: "bold" }}>About me:</h3>
          <p style={{ margin: 0, textWrap: "pretty" }}>{blurbs.about}</p>
        </div>
        <div>
          <h3 style={{ margin: "0 0 3px", font: "inherit", color: t.accent, fontWeight: "bold" }}>Who I&apos;d like to meet:</h3>
          <p style={{ margin: 0, textWrap: "pretty" }}>{blurbs.meet}</p>
        </div>
      </RetroBox>

      <RetroBox look={look} id="top8" variant="label" title="Kevin's Friend Space" bodyStyle={{ padding: 10 }}>
        <div style={{ fontWeight: "bold", marginBottom: 8 }}>
          Kevin has <span style={{ color: t.accent }}>{friends.length}</span> friends. Click one for the full story.
        </div>
        <div style={{ fontSize: 11, margin: "-4px 0 10px", display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
          <span>Drag friends around to rank your own Top 8.</span>
          {p.customOrder && <a href="#top8" onClick={pd(p.onResetOrder)} className="kjh-hit" style={{ color: t.link, fontWeight: "bold" }}>Reset to Kevin&apos;s order</a>}
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(92px,1fr))", gap: "12px 8px" }}>
          {p.shown.map(({ friend, index }, pos) => (
            <li key={index} style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => p.onOpenFriend(index)}
                onKeyDown={(e) => {
                  // Alt + arrow keys reorder without dragging
                  if (!e.altKey) return;
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); p.onMove(pos, pos - 1); }
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); p.onMove(pos, pos + 1); }
                }}
                aria-label={`#${pos + 1} ${friend.screen}: ${friend.name}`}
                draggable
                onDragStart={(e) => { e.dataTransfer.effectAllowed = "move"; e.dataTransfer.setData("text/plain", String(pos)); p.onDragStart(pos); }}
                onDragOver={(e) => { e.preventDefault(); p.onDragOver(pos); }}
                onDrop={(e) => { e.preventDefault(); p.onDrop(pos); }}
                onDragEnd={p.onDragEnd}
                className="kjh-fade"
                style={{
                  all: "unset", cursor: "grab", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center", position: "relative", padding: 3,
                  opacity: p.drag === pos ? 0.35 : 1,
                  outline: p.over === pos && p.drag !== pos ? `2px dashed ${t.accent}` : undefined, outlineOffset: 2,
                }}
              >
                <span aria-hidden style={{ position: "absolute", top: 18, left: 0, zIndex: 1, minWidth: 18, height: 18, padding: "0 3px", boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center", background: t.accent, color: t.box, font: "bold 10px Verdana,sans-serif", border: `1px solid ${t.box}` }}>{pos + 1}</span>
                <span style={{ fontSize: 11, fontWeight: "bold", color: t.link, textDecoration: "underline", wordBreak: "break-word" }}>{friend.screen}</span>
                <Thumb friend={friend} size={90} />
              </button>
            </li>
          ))}
        </ol>
        <div style={{ textAlign: "right", marginTop: 10, fontSize: 11, fontWeight: "bold" }}>
          <a href="#top8" onClick={pd(p.onToggleAll)} className="kjh-hit" style={{ color: t.link }}>
            {p.showAll ? "Show Top 8 only" : `View All of Kevin's Friends (${friends.length})`}
          </a>
        </div>
      </RetroBox>

      <RetroBox look={look} id="work" variant="label" title="Companies">
        <div style={{ padding: 3, display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1.6fr) auto", gap: 3, fontSize: 11 }}>
          {jobs.map((j) => (
            <div key={j.co} style={{ display: "contents" }}>
              <div style={{ ...cell, fontWeight: "bold" }}>{j.co}</div>
              <div style={cell}>{j.role}</div>
              <div style={{ ...cell, whiteSpace: "nowrap" }}>{j.yrs}</div>
            </div>
          ))}
        </div>
      </RetroBox>

      <RetroBox look={look} id="comments" variant="label" title="Kevin's Friends Comments" bodyStyle={{ padding: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 11 }}>
          Displaying {comments.length} of {comments.length} comments. Written by the projects themselves. They are not real people.
        </div>
        {comments.map((c) => {
          const f = friends[c.friend];
          return (
            <div key={c.date} style={{ ...frame(look), display: "grid", gridTemplateColumns: "100px minmax(0,1fr)" }}>
              <button
                onClick={() => p.onOpenFriend(c.friend)}
                aria-label={`Open ${f.screen}`}
                style={{ all: "unset", cursor: "pointer", background: t.label, padding: 6, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center" }}
              >
                <span style={{ fontSize: 10, fontWeight: "bold", color: t.link, textDecoration: "underline", wordBreak: "break-word" }}>{f.screen}</span>
                <Thumb friend={f} size={60} />
              </button>
              <div style={{ background: t.cell, padding: "8px 10px" }}>
                <div style={{ fontSize: 11, fontWeight: "bold", marginBottom: 4 }}>{c.date}</div>
                <div>{c.text}</div>
              </div>
            </div>
          );
        })}
      </RetroBox>
    </div>
  );
}
