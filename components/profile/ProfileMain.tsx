/* eslint-disable @next/next/no-img-element -- small fixed-size retro thumbnails */
import type { CSSProperties } from "react";
import RetroBox from "./RetroBox";
import { frame, type Look } from "@/lib/profile/look";
import { blurbs, bulletins, comments, friends, jobs, profileSong, type Friend } from "@/lib/data/profile";
import { publishedArticles } from "@/lib/data/caseStudies";

export type RankedFriend = { friend: Friend; index: number };

type Props = {
  look: Look;
  shown: RankedFriend[];
  showAll: boolean;
  playing: boolean;
  onTogglePlay: () => void;
  onOpenFriend: (index: number) => void;
  onBulletin: (index: number) => void;
  onToggleAll: () => void;
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
              <div style={{ ...cell, whiteSpace: "nowrap" }}>{b.project}</div>
              <a href="#" onClick={pd(() => p.onBulletin(b.friend))} style={{ ...cell, color: t.link, fontWeight: "bold" }}>{b.subj}</a>
            </div>
          ))}
        </div>
      </RetroBox>

      <RetroBox
        look={look}
        id="blog"
        variant="label"
        title={<span style={{ display: "flex", justifyContent: "space-between", gap: 8 }}><span>Kevin&apos;s Latest Blog Entries</span><span style={{ fontWeight: "normal", fontSize: 11, color: t.labelText }}>published work</span></span>}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 3, display: "grid", gridTemplateColumns: "auto minmax(0,1fr)", gap: 3, fontSize: 11 }}>
          {publishedArticles.map((a) => (
            <li key={a.url} style={{ display: "contents" }}>
              <span style={{ ...cell, whiteSpace: "nowrap" }}>{a.date}</span>
              <span style={cell}>
                <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: t.link, fontWeight: "bold" }}>{a.title}</a>
                <span style={{ display: "block" }}>{a.publication}</span>
              </span>
            </li>
          ))}
        </ul>
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
        <div style={{ fontWeight: "bold", marginBottom: 10 }}>
          Kevin has <span style={{ color: t.accent }}>{friends.length}</span> friends. Click one for the full story.
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(92px,1fr))", gap: "12px 8px" }}>
          {p.shown.map(({ friend, index }, pos) => (
            <li key={index} style={{ display: "flex", justifyContent: "center" }}>
              <button
                onClick={() => p.onOpenFriend(index)}
                aria-label={`#${pos + 1} ${friend.screen}: ${friend.name}`}
                className="kjh-fade"
                style={{
                  all: "unset", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center", position: "relative", padding: 3,
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
