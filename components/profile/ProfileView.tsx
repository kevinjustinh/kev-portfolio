"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import ProfileSidebar, { badgeStyle } from "./ProfileSidebar";
import ProfileMain, { type RankedFriend } from "./ProfileMain";
import FriendWindow from "./FriendWindow";
import ResumeWindow from "./ResumeWindow";
import ContactWindow from "./ContactWindow";
import LayoutEditor from "./LayoutEditor";
import RecruiterView from "./RecruiterView";
import { computeLook, MODERN_FONT } from "@/lib/profile/look";
import {
  CUSTOM_FIELDS, DEFAULT_CUSTOM, FONT_CSS, PATTERNS, THEMES, THEME_ORDER, TRAIL_SET,
  buildCustom, isThemeKey, type CustomColors, type Theme, type PatternKey, type ThemeKey,
} from "@/lib/profile/themes";
import { GITHUB_URL, LINKEDIN_URL, RESUME_URL, badges as BADGES, friends, type Badge, type BadgeId } from "@/lib/data/profile";

// Per-visitor progress (badges, Top 8 order). Convenience only: losing it is harmless.
const store = {
  get<T>(key: string, fallback: T): T {
    try { const v = JSON.parse(localStorage.getItem(key) ?? "null"); return v ?? fallback; } catch { return fallback; }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* storage unavailable */ }
  },
};

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run a state update inside a view transition when the browser supports it. */
function transition(update: () => void) {
  if (typeof document !== "undefined" && "startViewTransition" in document && !reducedMotion()) {
    document.startViewTransition(() => flushSync(update));
  } else update();
}

type Window = { kind: "friend"; index: number } | { kind: "resume" } | { kind: "contact" } | { kind: "picker" } | null;

export default function ProfileView() {
  const [theme, setTheme] = useState<ThemeKey | "custom">("classic");
  const [custom, setCustom] = useState<CustomColors>(DEFAULT_CUSTOM);
  const [pattern, setPattern] = useState<PatternKey>("dots");
  const [font, setFont] = useState("theme");
  const [trail, setTrail] = useState("theme");
  const [flip, setFlip] = useState(false);
  const [era, setEra] = useState(0);
  const [recruiter, setRecruiter] = useState(false);
  const [win, setWin] = useState<Window>(null);
  const [copied, setCopied] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [order, setOrder] = useState<number[] | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [earned, setEarned] = useState<BadgeId[]>([]);
  const [seen, setSeen] = useState<number[]>([]);
  const [tried, setTried] = useState<string[]>([]);
  const [toast, setToast] = useState<Badge | null>(null);
  const [origin, setOrigin] = useState("");
  const earnedRef = useRef<BadgeId[]>([]);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Restore saved progress and any shared layout from the URL (client only).
  useEffect(() => {
    const saved = store.get<BadgeId[]>("kjh_badges", []);
    earnedRef.current = saved;
    // Browser storage and the URL only exist after hydration, so this must run in an effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEarned(saved);
    setSeen(store.get("kjh_seen", []));
    setTried(store.get("kjh_tried", []));
    setOrder(store.get<number[] | null>("kjh_order", null));
    setOrigin(location.origin + location.pathname);

    const q = new URLSearchParams(location.search);
    const layout = q.get("layout")?.split(",");
    if (layout?.length === 5 && layout.every((x) => /^[0-9a-f]{6}$/i.test(x))) {
      setTheme("custom");
      setCustom(Object.fromEntries(CUSTOM_FIELDS.map(([k], i) => [k, "#" + layout[i]])) as CustomColors);
    } else if (q.get("theme") && isThemeKey(q.get("theme")!)) setTheme(q.get("theme") as ThemeKey);
    const f = q.get("font"), tr = q.get("trail"), pat = q.get("pat");
    if (f && FONT_CSS[f]) setFont(f);
    if (tr && (TRAIL_SET[tr] || tr === "none")) setTrail(tr);
    if (pat && PATTERNS.some(([v]) => v === pat)) setPattern(pat as PatternKey);
    if (q.get("flip") === "1") setFlip(true);
    if (q.get("recruiter") === "1") setRecruiter(true);
  }, []);

  const award = useCallback((id: BadgeId) => {
    if (earnedRef.current.includes(id)) return;
    const badge = BADGES.find((b) => b.id === id);
    if (!badge) return;
    const next = [...earnedRef.current, id];
    earnedRef.current = next;
    store.set("kjh_badges", next);
    setEarned(next);
    setToast(badge);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3600);
  }, []);

  const ranking = order ?? friends.map((_, i) => i);

  const seeFriend = (i: number) => {
    const nextSeen = seen.includes(i) ? seen : [...seen, i];
    if (nextSeen !== seen) { store.set("kjh_seen", nextSeen); setSeen(nextSeen); }
    if (ranking.slice(0, 8).every((j) => nextSeen.includes(j))) award("collector");
    if (nextSeen.length >= friends.length) award("completionist");
  };

  const openFriend = (i: number) => {
    const n = (i + friends.length) % friends.length;
    transition(() => setWin({ kind: "friend", index: n }));
    seeFriend(n);
  };

  const open = (w: Exclude<Window, null>) => transition(() => setWin(w));
  const close = () => transition(() => setWin(null));
  const openResume = () => { award("paper"); open({ kind: "resume" }); };
  const openContact = () => open({ kind: "contact" });

  const pickTheme = (k: ThemeKey) => {
    transition(() => setTheme(k));
    const nextTried = tried.includes(k) ? tried : [...tried, k];
    store.set("kjh_tried", nextTried);
    setTried(nextTried);
    if (nextTried.length >= 5) award("decorator");
    if (THEME_ORDER.every((o) => nextTried.includes(o))) award("fashionista");
  };

  const reorder = (from: number, to: number) => {
    if (to < 0 || to >= ranking.length || from === to) return;
    const next = [...ranking];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    store.set("kjh_order", next);
    transition(() => setOrder(next));
    award("tastemaker");
  };

  const toggleRecruiter = () => {
    if (!recruiter) award("business");
    transition(() => { setRecruiter((r) => !r); setWin(null); });
  };

  // Escape closes any open window.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setWin(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const T: Theme = theme === "custom" ? buildCustom(custom, pattern) : THEMES[theme];
  const look = computeLook(T, era, font);
  const chaos = theme !== "classic" && era < 50;

  // Cursor sparkle trail — retro half of the slider only, never with reduced motion.
  const sparkle = trail === "none" ? null : TRAIL_SET[trail] ?? T.spark ?? null;
  const sparkleOn = !!sparkle && era < 50 && !recruiter;
  const sparkleRef = useRef(sparkle);
  useEffect(() => { sparkleRef.current = sparkle; });
  useEffect(() => {
    if (!sparkleOn || reducedMotion()) return;
    let last = 0;
    const onMove = (e: MouseEvent) => {
      const sp = sparkleRef.current;
      const now = Date.now();
      if (!sp || now - last < 28) return;
      last = now;
      const s = document.createElement("span");
      s.textContent = sp.chars[Math.floor(Math.random() * sp.chars.length)];
      s.setAttribute("aria-hidden", "true");
      Object.assign(s.style, {
        position: "fixed", left: e.clientX + "px", top: e.clientY + "px", pointerEvents: "none", zIndex: "9999",
        color: sp.colors[Math.floor(Math.random() * sp.colors.length)], fontSize: 10 + Math.random() * 12 + "px",
        textShadow: "0 0 4px #fff", animation: "kjhSpark .8s ease-out forwards",
      });
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sparkleOn]);

  const shareUrl = `${origin}?layout=${CUSTOM_FIELDS.map(([k]) => custom[k].slice(1)).join(",")}&pat=${pattern}${font !== "theme" ? "&font=" + font : ""}${trail !== "theme" ? "&trail=" + trail : ""}${flip ? "&flip=1" : ""}`;

  const shown: RankedFriend[] = ranking.map((index) => ({ friend: friends[index], index }));
  const { t } = look;
  const topLink: CSSProperties = { color: "#fff" };
  const navLink: CSSProperties = { color: "#fff", padding: "4px 0" };

  const nameNode = chaos && T.name
    ? <span style={T.name}>{T.nameText}</span>
    : "Kevin J Hernandez";

  return (
    <div
      className="kjh-root"
      data-era={look.late ? "modern" : "retro"}
      style={{ position: "relative", minHeight: "100vh", fontSize: look.fs, lineHeight: 1.45, color: "#000", fontFamily: look.font, background: look.pageBg, paddingBottom: 96 }}
    >
      <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, ...T.wall, opacity: 1 - era / 100 }} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <header>
          <div style={{ background: look.bar1 }}>
            <div style={{ maxWidth: 880, margin: "0 auto", padding: "10px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                <span style={{ color: "#fff", font: "bold 24px/1 Arial,Helvetica,sans-serif", letterSpacing: -1 }}>
                  kevinjhernandez<span style={{ color: "#99ccff" }}>.com</span>
                </span>
                <span style={{ color: "#c3d9ff", fontSize: 11 }}>a profile for hire</span>
              </div>
              <nav aria-label="Elsewhere" style={{ display: "flex", gap: 10, fontSize: 11, color: "#c3d9ff", alignItems: "center", flexWrap: "wrap" }}>
                <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="kjh-hit" style={topLink}>Resume</a><span aria-hidden>|</span>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="kjh-hit" style={topLink}>LinkedIn</a><span aria-hidden>|</span>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="kjh-hit" style={topLink}>GitHub</a><span aria-hidden>|</span>
                <a href="?recruiter=1" onClick={(e) => { e.preventDefault(); toggleRecruiter(); }} className="kjh-hit" style={{ ...topLink, fontWeight: "bold" }}>Recruiter mode →</a>
              </nav>
            </div>
          </div>
          <div style={{ background: look.bar2, borderBottom: `1px solid ${look.bar2b}` }}>
            <div style={{ maxWidth: 880, margin: "0 auto", padding: "5px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <nav aria-label="Profile" style={{ display: "flex", gap: "4px 12px", flexWrap: "wrap", fontSize: 11, fontWeight: "bold" }}>
                <a href="#about" style={navLink}>Home</a>
                <a href="#about" style={navLink}>About</a>
                <a href="#top8" style={navLink}>Top 8</a>
                <a href="#work" style={navLink}>Work</a>
                <a href="#comments" style={navLink}>Comments</a>
                <a href={RESUME_URL} onClick={(e) => { e.preventDefault(); openResume(); }} style={navLink}>Resume</a>
                <a href="#contact" style={navLink}>Contact</a>
              </nav>
              <button
                onClick={() => open({ kind: "picker" })}
                className="kjh-press"
                style={{ font: "bold 11px Verdana,sans-serif", padding: "6px 10px", border: "2px outset #ffcc00", background: "#ffee66", color: "#660066", cursor: "pointer" }}
              >
                ★ Customize my profile ★
              </button>
            </div>
          </div>
        </header>

        {chaos && T.marq && (
          <div style={{ maxWidth: 880, margin: "8px auto 0", padding: "0 12px" }}>
            <div aria-hidden style={{ overflow: "hidden", background: T.marq.bg, border: `2px ridge ${T.marq.border}`, padding: "4px 0" }}>
              <div style={{ whiteSpace: "nowrap", color: T.marq.color, font: "bold 13px Verdana,sans-serif", animation: "kjhMarq 14s linear infinite" }}>{T.marq.text}</div>
            </div>
          </div>
        )}

        <main style={{ maxWidth: 880, margin: "0 auto", padding: 12, display: "flex", flexWrap: "wrap", flexDirection: flip ? "row-reverse" : "row", gap: 14, alignItems: "flex-start" }}>
          <ProfileSidebar
            look={look}
            nameNode={nameNode}
            badges={BADGES.map((b) => ({ badge: b, on: earned.includes(b.id) }))}
            onResume={openResume}
            onContact={openContact}
            onResetBadges={() => {
              ["kjh_badges", "kjh_seen", "kjh_tried"].forEach((k) => store.set(k, []));
              earnedRef.current = [];
              setEarned([]); setSeen([]); setTried([]);
            }}
          />
          <ProfileMain
            look={look}
            shown={showAll ? shown : shown.slice(0, 8)}
            showAll={showAll}
            customOrder={!!order}
            drag={drag}
            over={over}
            playing={playing}
            onTogglePlay={() => setPlaying((v) => !v)}
            onOpenFriend={openFriend}
            onBulletin={(i) => { award("reader"); openFriend(i); }}
            onToggleAll={() => setShowAll((v) => !v)}
            onResetOrder={() => { store.set("kjh_order", null); transition(() => setOrder(null)); }}
            onDragStart={setDrag}
            onDragOver={(pos) => { if (over !== pos) setOver(pos); }}
            onDrop={(pos) => { if (drag !== null) reorder(drag, pos); setDrag(null); setOver(null); }}
            onDragEnd={() => { setDrag(null); setOver(null); }}
            onMove={reorder}
          />
        </main>

        <footer style={{ textAlign: "center", fontSize: 11, color: t.footer, padding: "10px 12px 24px" }}>
          © 2026 Kevin Hernandez · <a href="#about" className="kjh-hit" style={{ color: t.link }}>About</a> · <a href="#top8" className="kjh-hit" style={{ color: t.link }}>Top 8</a> · <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="kjh-hit" style={{ color: t.link }}>Resume</a> · <a href="#contact" className="kjh-hit" style={{ color: t.link }}>Contact</a>
        </footer>
      </div>

      {recruiter && <RecruiterView onBack={toggleRecruiter} onResume={openResume} onContact={openContact} onOpenFriend={openFriend} />}

      {win?.kind === "friend" && (
        <FriendWindow look={look} friend={friends[win.index]} onClose={close} onPrev={() => openFriend(win.index - 1)} onNext={() => openFriend(win.index + 1)} />
      )}
      {win?.kind === "resume" && <ResumeWindow look={look} onClose={close} />}
      {win?.kind === "contact" && <ContactWindow look={look} onClose={close} onSent={() => award("penpal")} />}
      {win?.kind === "picker" && (
        <LayoutEditor
          look={look}
          theme={theme}
          font={font}
          trail={trail}
          flip={flip}
          pattern={pattern}
          custom={custom}
          shareUrl={shareUrl}
          copied={copied}
          onPickTheme={pickTheme}
          onFont={(v) => { setFont(v); setCopied(false); }}
          onTrail={(v) => { setTrail(v); setCopied(false); }}
          onFlip={() => transition(() => { setFlip((v) => !v); setCopied(false); })}
          onPattern={(v) => { setPattern(v); setTheme("custom"); setCopied(false); }}
          onCustom={(k, v) => { setCustom((c) => ({ ...c, [k]: v })); setTheme("custom"); setCopied(false); }}
          onCopy={() => { navigator.clipboard?.writeText(shareUrl).catch(() => {}); setCopied(true); setTheme("custom"); award("diy"); }}
          onClose={close}
        />
      )}

      <div role="status" aria-live="polite" style={{ position: "fixed", right: 16, bottom: "calc(84px + env(safe-area-inset-bottom))", zIndex: 70, width: 260, maxWidth: "calc(100vw - 32px)", pointerEvents: "none" }}>
        {toast && (
          <div style={{ background: look.winBg, border: look.winBorder, boxShadow: look.winShadow, borderRadius: look.r2, overflow: "hidden", viewTransitionName: "kjh-toast" }}>
            <div style={{ background: look.titleBg, color: look.titleText, fontWeight: "bold", fontSize: 11, padding: look.titlePad }}>★ Achievement unlocked!</div>
            <div style={{ padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, fontSize: 11 }}>
              <span style={{ ...badgeStyle(toast, true), flex: "none", cursor: "default" }}>{toast.text}</span>
              <span style={{ color: "#333" }}>{toast.desc}</span>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: "fixed", left: "50%", bottom: "calc(16px + env(safe-area-inset-bottom))", transform: "translateX(-50%)", zIndex: 48, display: "flex", alignItems: "center", gap: 12, padding: "8px 8px 8px 18px", borderRadius: 999, background: "rgba(18,18,18,.86)", backdropFilter: "blur(14px)", color: "#fff", font: `500 12px ${MODERN_FONT}`, boxShadow: "0 10px 30px rgba(0,0,0,.25)", maxWidth: "calc(100vw - 24px)", boxSizing: "border-box" }}>
        <span style={{ opacity: 0.8 }}>2006</span>
        <input
          type="range"
          min={0}
          max={100}
          value={era}
          onChange={(e) => { const v = +e.target.value; setEra(v); if (v >= 98) award("traveler"); }}
          aria-label="Slide from 2006 to 2026 styling"
          style={{ width: 140, minWidth: 0, flexShrink: 1, cursor: "pointer" }}
        />
        <span style={{ opacity: 0.8 }}>2026</span>
        <button
          onClick={toggleRecruiter}
          style={{ font: `600 12px ${MODERN_FONT}`, padding: "8px 14px", minHeight: 36, borderRadius: 999, border: 0, background: "#fff", color: "#121212", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          {recruiter ? "Fun mode" : "Recruiter mode"}
        </button>
      </div>
    </div>
  );
}
