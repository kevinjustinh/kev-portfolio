import type { CSSProperties } from "react";

// Retro layout themes for the /profile exploration. Colors are data here
// because every surface is blended toward MODERN by the 2006→2026 slider.

export type Palette = {
  box: string;
  text: string;
  border: string;
  head: string;
  headText: string;
  label: string;
  labelText: string;
  cell: string;
  accent: string;
  link: string;
  footer: string;
};

export type Sparkle = { chars: string[]; colors: string[] };

export type Theme = {
  label: string;
  desc: string;
  font?: string;
  t: Palette;
  wall: CSSProperties;
  name?: CSSProperties;
  nameText?: string;
  marq?: { bg: string; border: string; color: string; text: string };
  spark?: Sparkle;
};

export const CLASSIC: Palette = { box: "#ffffff", text: "#000000", border: "#6699cc", head: "#6699cc", headText: "#ffffff", label: "#d5e8fb", labelText: "#336699", cell: "#eef5fd", accent: "#ff6600", link: "#003399", footer: "#555555" };
export const MODERN: Palette = { box: "#ffffff", text: "#151515", border: "#e4e2dc", head: "#151515", headText: "#ffffff", label: "#f7f6f2", labelText: "#6b6962", cell: "#fbfaf8", accent: "#ff5a1f", link: "#151515", footer: "#8a877f" };

export const THEMES = {
  classic: { label: "Default", desc: "The factory profile. Clean, blue, recruiter-safe.", t: CLASSIC, wall: { background: "#e9edf3" } },
  glitter: {
    label: "Glitter Bomb", desc: "Checkerboard, rainbow glitter, sparkles everywhere.",
    t: { box: "#1a0033", text: "#ffffff", border: "#ff33cc", head: "#ff33cc", headText: "#ffff00", label: "#330066", labelText: "#66ffff", cell: "#24004a", accent: "#ffff00", link: "#66ffff", footer: "#000000" },
    wall: { backgroundColor: "#ff66cc", backgroundImage: "repeating-conic-gradient(#ffff66 0 25%, #66ffff 0 50%)", backgroundSize: "36px 36px" },
    name: { backgroundImage: "linear-gradient(90deg,#ff33cc,#ffff00,#66ffff,#33ff33,#ff33cc)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", animation: "kjhGlitter 1.5s linear infinite" }, nameText: "~*Kevin J Hernandez*~",
    marq: { bg: "#000000", border: "#ff33cc", color: "#ffff00", text: "★ welcome 2 my profile!!! ★ open to Community, Program Ops & DevRel roles ★ click my Top 8 ★ leave me a msg ★ thx for the add ★" },
    spark: { chars: ["✦", "★"], colors: ["#ff33cc", "#ffff00", "#66ffff", "#33ff33", "#ff9900", "#ffffff"] },
  },
  scene: {
    label: "xScene Kidx", desc: "Zebra print, hot pink, lime. Side bangs not included.",
    t: { box: "#000000", text: "#ffffff", border: "#ff0099", head: "#ff0099", headText: "#000000", label: "#1a1a1a", labelText: "#ccff00", cell: "#111111", accent: "#ff0099", link: "#ccff00", footer: "#ffffff" },
    wall: { backgroundColor: "#ffffff", backgroundImage: "repeating-linear-gradient(115deg,#000 0 10px,transparent 10px 22px,#000 22px 27px,transparent 27px 44px),repeating-linear-gradient(65deg,transparent 0 30px,rgba(0,0,0,.85) 30px 36px,transparent 36px 70px)" },
    name: { color: "#ff0099", textShadow: "2px 2px 0 #ccff00, 4px 4px 0 #000", fontFamily: "\"Comic Sans MS\",\"Chalkboard SE\",cursive" }, nameText: "xX kEvIn J hErNaNdEz Xx",
    marq: { bg: "#ff0099", border: "#000000", color: "#000000", text: "♥ rawr means i want 2 build ur community in dinosaur ♥ open 2 Community, Program Ops + DevRel ♥ pc 4 pc? ♥" },
    spark: { chars: ["♥", "✖", "☆"], colors: ["#ff0099", "#ccff00", "#ffffff"] },
  },
  hacker: {
    label: "Mainframe", desc: "Green-on-black terminal. Very much in the Matrix.",
    t: { box: "#000000", text: "#33ff33", border: "#33ff33", head: "#003300", headText: "#33ff33", label: "#001a00", labelText: "#33ff33", cell: "#000a00", accent: "#ccffcc", link: "#66ff66", footer: "#33ff33" },
    wall: { backgroundColor: "#000000", backgroundImage: "linear-gradient(rgba(51,255,51,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(51,255,51,.12) 1px, transparent 1px)", backgroundSize: "24px 24px" },
    name: { color: "#33ff33", fontFamily: "\"Courier New\",monospace", textShadow: "0 0 6px #33ff33" }, nameText: "> kevin_j_hernandez_",
    marq: { bg: "#000000", border: "#33ff33", color: "#33ff33", text: "> ACCESS GRANTED ... loading candidate profile ... roles: community | program_ops | devrel ... status: AVAILABLE ... _" },
    spark: { chars: ["0", "1"], colors: ["#33ff33", "#66ff66", "#ccffcc"] },
  },
  cloud: {
    label: "Cloud Nine", desc: "Baby blue sky, puffy clouds, pastel everything.",
    t: { box: "#ffffff", text: "#333366", border: "#99ccff", head: "#ff99cc", headText: "#ffffff", label: "#fff0f7", labelText: "#cc3399", cell: "#f2f9ff", accent: "#ff6699", link: "#3366cc", footer: "#333355" },
    wall: { backgroundColor: "#9fd8ff", backgroundImage: "radial-gradient(ellipse 60px 26px at 40px 40px,#fff 98%,transparent),radial-gradient(ellipse 40px 22px at 80px 30px,#fff 98%,transparent),radial-gradient(ellipse 50px 20px at 170px 120px,#fff 98%,transparent),radial-gradient(ellipse 34px 18px at 200px 110px,#fff 98%,transparent)", backgroundSize: "260px 180px" },
    name: { color: "#ff6699", textShadow: "2px 2px 0 #fff, 3px 3px 0 #99ccff", fontFamily: "\"Trebuchet MS\",sans-serif" }, nameText: "☁ Kevin J Hernandez ☁",
    marq: { bg: "#ffffff", border: "#ff99cc", color: "#ff6699", text: "☁ hiii welcome to my lil corner ☁ looking for my next Community / Program Ops / DevRel role ☁ say hi!! ☁" },
    spark: { chars: ["☁", "✿", "★"], colors: ["#ffffff", "#ff99cc", "#ffee88"] },
  },
  flames: {
    label: "Nu Metal", desc: "Black, flames, Impact font. Turn it up.",
    t: { box: "#0d0000", text: "#ffffff", border: "#ff3300", head: "#ff3300", headText: "#000000", label: "#2a0000", labelText: "#ffcc00", cell: "#1a0000", accent: "#ffcc00", link: "#ff9933", footer: "#ffcc00" },
    wall: { backgroundColor: "#000000", backgroundImage: "radial-gradient(ellipse 40px 120px at 20px 100%,#ff2200,transparent 70%),radial-gradient(ellipse 30px 90px at 50px 100%,#ff8800,transparent 70%),linear-gradient(0deg,#ff2200 0%,#ff6600 8%,transparent 40%)", backgroundSize: "70px 100%,70px 100%,100% 100%", backgroundRepeat: "repeat-x" },
    name: { color: "#ffcc00", fontFamily: "Impact,\"Arial Black\",sans-serif", letterSpacing: "1px", textTransform: "uppercase", textShadow: "0 0 4px #ff3300, 2px 2px 0 #ff0000" }, nameText: "KEVIN J HERNANDEZ",
    marq: { bg: "#000000", border: "#ff3300", color: "#ff6600", text: "✠ NOW BOOKING: COMMUNITY // PROGRAM OPS // DEVREL ✠ FULL-TIME OR CONTRACT ✠ SEND A MESSAGE ✠" },
    spark: { chars: ["✠", "✦"], colors: ["#ff3300", "#ff9900", "#ffcc00"] },
  },
  bubblegum: {
    label: "Bubblegum Pop", desc: "Pink polka dots and hearts. Extremely sweet.", font: "\"Comic Sans MS\",\"Chalkboard SE\",cursive",
    t: { box: "#ffffff", text: "#66003a", border: "#ff66aa", head: "#ff66aa", headText: "#ffffff", label: "#ffe6f2", labelText: "#cc0066", cell: "#fff5fa", accent: "#ff3399", link: "#cc0066", footer: "#66003a" },
    wall: { backgroundColor: "#ffc0dd", backgroundImage: "radial-gradient(#ffffff 6px, transparent 7px), radial-gradient(#ff99cc 4px, transparent 5px)", backgroundSize: "34px 34px, 34px 34px", backgroundPosition: "0 0, 17px 17px" },
    name: { color: "#ff3399", textShadow: "2px 2px 0 #fff, 3px 3px 0 #ff99cc", fontFamily: "\"Comic Sans MS\",\"Chalkboard SE\",cursive" }, nameText: "♡ Kevin J Hernandez ♡",
    marq: { bg: "#ffffff", border: "#ff66aa", color: "#ff3399", text: "♡ hiii!! ♡ open to Community, Program Ops & DevRel roles ♡ u r so cute for visiting ♡" },
    spark: { chars: ["♡", "✿"], colors: ["#ff3399", "#ff99cc", "#ffffff"] },
  },
  camo: {
    label: "Sk8 Camo", desc: "Camo print, army green, skate shop energy.",
    t: { box: "#1e2414", text: "#e8e4cc", border: "#8a7f55", head: "#3d4a26", headText: "#f0e68c", label: "#2c331d", labelText: "#c2b97a", cell: "#252c18", accent: "#ff9900", link: "#f0e68c", footer: "#f0e68c" },
    wall: { backgroundColor: "#5b6b3a", backgroundImage: "radial-gradient(ellipse 40px 24px at 20% 30%,#3d4a26 60%,transparent 62%),radial-gradient(ellipse 52px 30px at 72% 62%,#8a7f55 60%,transparent 62%),radial-gradient(ellipse 30px 42px at 42% 82%,#2c2418 60%,transparent 62%),radial-gradient(ellipse 26px 18px at 85% 15%,#2c2418 60%,transparent 62%)", backgroundSize: "130px 110px" },
    name: { color: "#f0e68c", fontFamily: "Impact,\"Arial Black\",sans-serif", textTransform: "uppercase", letterSpacing: "1px", textShadow: "2px 2px 0 #000" }, nameText: "Kevin J Hernandez",
    marq: { bg: "#2c331d", border: "#8a7f55", color: "#ff9900", text: "✚ sk8 or die ✚ open to Community, Program Ops & DevRel roles ✚ no posers ✚" },
    spark: { chars: ["✚", "✦"], colors: ["#f0e68c", "#ff9900", "#8a7f55"] },
  },
  emonight: {
    label: "Emo Night", desc: "Black and blood red. It is not a phase.",
    t: { box: "#0a0a0a", text: "#dddddd", border: "#990000", head: "#990000", headText: "#ffffff", label: "#1a0000", labelText: "#ff3333", cell: "#111111", accent: "#ff3333", link: "#ff6666", footer: "#999999" },
    wall: { backgroundColor: "#000000", backgroundImage: "repeating-linear-gradient(45deg,#000 0 18px,#3a0000 18px 20px)" },
    name: { color: "#ff3333", fontFamily: "Georgia,serif", fontStyle: "italic", textShadow: "0 0 6px #990000" }, nameText: "kevin. (x_x)",
    marq: { bg: "#000000", border: "#990000", color: "#ff3333", text: "† my chemical résumé † open to Community, Program Ops & DevRel roles † it's not a phase, mom †" },
    spark: { chars: ["✖", "†"], colors: ["#ff3333", "#ffffff", "#990000"] },
  },
  sunset: {
    label: "Beach Sunset", desc: "Orange-pink sunset, surf shop summer.", font: "\"Trebuchet MS\",sans-serif",
    t: { box: "#fffaf2", text: "#4a2410", border: "#ff7e5f", head: "#ff7e5f", headText: "#ffffff", label: "#ffe9d6", labelText: "#c2410c", cell: "#fff3e6", accent: "#e0115f", link: "#c2410c", footer: "#4a2410" },
    wall: { backgroundColor: "#ff9f6b", backgroundImage: "repeating-linear-gradient(0deg,#ff7e5f 0 40px,#ff9f6b 40px 80px,#ffc27a 80px 120px,#ffd86f 120px 160px)" },
    name: { color: "#ffffff", fontFamily: "\"Trebuchet MS\",sans-serif", textShadow: "2px 2px 0 #e0115f, 4px 4px 0 #ff7e5f" }, nameText: "Kevin J Hernandez ☀",
    marq: { bg: "#fffaf2", border: "#ff7e5f", color: "#e0115f", text: "☀ endless summer ☀ open to Community, Program Ops & DevRel roles ☀ hang loose ☀" },
    spark: { chars: ["☀", "✿"], colors: ["#ffd86f", "#ff7e5f", "#ffffff"] },
  },
  galaxy: {
    label: "Galaxy", desc: "Deep space, tiny stars, lavender glow.",
    t: { box: "#10103a", text: "#e6e6ff", border: "#7f7fff", head: "#4b2fa0", headText: "#ffffff", label: "#1c1650", labelText: "#b9a3ff", cell: "#141448", accent: "#ffd34d", link: "#9fd0ff", footer: "#b9a3ff" },
    wall: { backgroundColor: "#0b0b2e", backgroundImage: "radial-gradient(1.5px 1.5px at 20px 30px,#fff,transparent),radial-gradient(1px 1px at 70px 80px,#fff,transparent),radial-gradient(2px 2px at 120px 40px,#ffe9a8,transparent),radial-gradient(1px 1px at 160px 120px,#fff,transparent),radial-gradient(ellipse 200px 120px at 80% 30%,rgba(140,80,220,.35),transparent)", backgroundSize: "180px 160px,180px 160px,180px 160px,180px 160px,100% 100%" },
    name: { color: "#ffffff", textShadow: "0 0 8px #9f7fff, 0 0 2px #fff" }, nameText: "✧ Kevin J Hernandez ✧",
    marq: { bg: "#10103a", border: "#7f7fff", color: "#ffd34d", text: "✧ greetings, earthling ✧ open to Community, Program Ops & DevRel roles ✧ reach for the stars ✧" },
    spark: { chars: ["✧", "★"], colors: ["#ffffff", "#ffd34d", "#b9a3ff"] },
  },
  notebook: {
    label: "Notebook Doodle", desc: "Lined paper, sticky notes, blue ink.", font: "\"Comic Sans MS\",\"Chalkboard SE\",cursive",
    t: { box: "#fff9b0", text: "#1a2a80", border: "#1a2a80", head: "#1a2a80", headText: "#fff9b0", label: "#fff3a0", labelText: "#1a2a80", cell: "#fffbd0", accent: "#d42020", link: "#1a40c0", footer: "#1a2a80" },
    wall: { backgroundColor: "#fdfdf6", backgroundImage: "linear-gradient(90deg,transparent 60px,#f19a9a 60px,#f19a9a 62px,transparent 62px),linear-gradient(#a9c6ec 1px,transparent 1px)", backgroundSize: "100% 100%,100% 24px" },
    name: { color: "#1a2a80", fontFamily: "\"Comic Sans MS\",\"Chalkboard SE\",cursive", textDecoration: "underline wavy #d42020" }, nameText: "Kevin J Hernandez",
    marq: { bg: "#fff9b0", border: "#1a2a80", color: "#1a2a80", text: "✎ note to self: hire kevin ✎ Community, Program Ops & DevRel ✎ do not forget!!! ✎" },
    spark: { chars: ["✎", "✓"], colors: ["#1a2a80", "#d42020"] },
  },
  leopard: {
    label: "Leopard Diva", desc: "Leopard print, gold and hot pink.",
    t: { box: "#1a1208", text: "#f6e7c1", border: "#d4af37", head: "#d4af37", headText: "#1a1208", label: "#2a1e0c", labelText: "#ffd76a", cell: "#22180a", accent: "#ff4fa3", link: "#ffd76a", footer: "#1a1208" },
    wall: { backgroundColor: "#d9a441", backgroundImage: "radial-gradient(circle at 50% 50%,#2a1a0a 4px,transparent 5px),radial-gradient(ellipse 10px 8px at 50% 50%,#8a5a1a 7px,transparent 8px),radial-gradient(circle at 50% 50%,#2a1a0a 3px,transparent 4px)", backgroundSize: "44px 38px,44px 38px,44px 38px", backgroundPosition: "0 0,0 0,22px 19px" },
    name: { backgroundImage: "linear-gradient(90deg,#ffd76a,#fff6cc,#d4af37,#ffd76a)", backgroundSize: "200% 100%", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "Georgia,serif", animation: "kjhGlitter 2.5s linear infinite" }, nameText: "♛ Kevin J Hernandez ♛",
    marq: { bg: "#1a1208", border: "#d4af37", color: "#ffd76a", text: "♛ iconic ♛ open to Community, Program Ops & DevRel roles ♛ booked and busy (but not too busy) ♛" },
    spark: { chars: ["♛", "✦"], colors: ["#ffd76a", "#ff4fa3", "#ffffff"] },
  },
  plaid: {
    label: "Plaid Punk", desc: "Red tartan, safety pins, yellow stripes.",
    t: { box: "#111111", text: "#f4f4f4", border: "#ffd400", head: "#b80f0a", headText: "#ffffff", label: "#222222", labelText: "#ffd400", cell: "#181818", accent: "#ffd400", link: "#ff6b6b", footer: "#ffffff" },
    wall: { backgroundColor: "#b80f0a", backgroundImage: "repeating-linear-gradient(90deg,rgba(0,0,0,.4) 0 12px,transparent 12px 40px),repeating-linear-gradient(0deg,rgba(0,0,0,.4) 0 12px,transparent 12px 40px),repeating-linear-gradient(90deg,transparent 0 24px,#ffd400 24px 26px,transparent 26px 40px),repeating-linear-gradient(0deg,transparent 0 24px,#ffd400 24px 26px,transparent 26px 40px)" },
    name: { color: "#ffd400", fontFamily: "\"Courier New\",monospace", fontWeight: "bold", textTransform: "uppercase", textShadow: "2px 2px 0 #b80f0a" }, nameText: "Kevin J Hernandez",
    marq: { bg: "#111111", border: "#ffd400", color: "#ffd400", text: "✚ anarchy in the job market ✚ open to Community, Program Ops & DevRel roles ✚ oi! ✚" },
    spark: { chars: ["✚", "★"], colors: ["#ffd400", "#ff3b30", "#ffffff"] },
  },
  chrome: {
    label: "KevAmp", desc: "Brushed metal media player, LCD green.",
    t: { box: "#1b1f24", text: "#c8f5c8", border: "#8a9099", head: "#4a5059", headText: "#e6e9ee", label: "#2b3038", labelText: "#9cf09c", cell: "#20252b", accent: "#3cff6e", link: "#7fd4ff", footer: "#1b1f24" },
    wall: { backgroundColor: "#b8bcc4", backgroundImage: "repeating-linear-gradient(90deg,rgba(255,255,255,.25) 0 1px,transparent 1px 3px),linear-gradient(180deg,#e9ecef,#9aa0a8)" },
    name: { backgroundImage: "linear-gradient(180deg,#ffffff,#9aa0a8 55%,#e6e9ee)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontFamily: "\"Arial Black\",Arial,sans-serif" }, nameText: "Kevin J Hernandez",
    marq: { bg: "#000000", border: "#8a9099", color: "#3cff6e", text: "♫ now playing: kevin_hernandez_portfolio.mp3 ♫ 128kbps ♫ open to Community, Program Ops & DevRel roles ♫" },
    spark: { chars: ["♪", "♫"], colors: ["#3cff6e", "#7fd4ff", "#ffffff"] },
  },
  win98: {
    label: "Desktop 98", desc: "Teal desktop, gray windows, Tahoma.", font: "Tahoma,\"MS Sans Serif\",sans-serif",
    t: { box: "#c0c0c0", text: "#000000", border: "#808080", head: "#000080", headText: "#ffffff", label: "#d4d0c8", labelText: "#000080", cell: "#dcdcdc", accent: "#800080", link: "#0000ee", footer: "#ffffff" },
    wall: { backgroundColor: "#008080" },
    name: { color: "#000080", fontFamily: "Tahoma,sans-serif" }, nameText: "Kevin_J_Hernandez.exe",
    marq: { bg: "#000080", border: "#c0c0c0", color: "#ffffff", text: "Kevin.exe has been running for 10+ years without crashing ■ open to Community, Program Ops & DevRel roles ■ Press OK to hire" },
    spark: { chars: ["■", "✦"], colors: ["#ffffff", "#c0c0c0", "#000080"] },
  },
} satisfies Record<string, Theme>;

export type ThemeKey = keyof typeof THEMES;
export const THEME_ORDER = Object.keys(THEMES) as ThemeKey[];
export const isThemeKey = (k: string): k is ThemeKey => k in THEMES;

export const FONTS = [["theme", "Layout default"], ["verdana", "Verdana"], ["comic", "Comic Sans"], ["times", "Times New Roman"], ["courier", "Courier"], ["impact", "Impact"], ["trebuchet", "Trebuchet"], ["georgia", "Georgia"]] as const;
export const FONT_CSS: Record<string, string> = { verdana: "Verdana,Arial,sans-serif", comic: "\"Comic Sans MS\",\"Chalkboard SE\",cursive", times: "\"Times New Roman\",Times,serif", courier: "\"Courier New\",monospace", impact: "Impact,\"Arial Black\",sans-serif", trebuchet: "\"Trebuchet MS\",sans-serif", georgia: "Georgia,serif" };
export const TRAILS = [["theme", "Layout default"], ["stars", "Stars"], ["hearts", "Hearts"], ["bubbles", "Bubbles"], ["music", "Music notes"], ["skulls", "Skulls"], ["none", "None"]] as const;
export const TRAIL_SET: Record<string, Sparkle> = { stars: { chars: ["★", "✦"], colors: ["#ffff00", "#ffffff", "#ff9900"] }, hearts: { chars: ["♥", "♡"], colors: ["#ff3399", "#ff99cc", "#ff0033"] }, bubbles: { chars: ["○", "◯", "°"], colors: ["#66ccff", "#ffffff", "#99ffff"] }, music: { chars: ["♪", "♫"], colors: ["#33ff33", "#66ccff", "#ff66cc"] }, skulls: { chars: ["☠"], colors: ["#ffffff", "#ff3333"] } };
export const PATTERNS = [["dots", "Polka dots"], ["checker", "Checkerboard"], ["stripes", "Stripes"], ["grid", "Grid"], ["solid", "Solid"]] as const;
export type PatternKey = (typeof PATTERNS)[number][0];

export type CustomColors = { wall: string; box: string; text: string; accent: string; link: string };
export const CUSTOM_FIELDS: [keyof CustomColors, string][] = [["wall", "Wallpaper"], ["box", "Boxes"], ["text", "Text"], ["accent", "Accent"], ["link", "Links"]];
export const DEFAULT_CUSTOM: CustomColors = { wall: "#222244", box: "#ffffff", text: "#111111", accent: "#ff3366", link: "#3355ff" };

const hx = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));

/** Linear blend between two #rrggbb colors; k=0 → a, k=1 → b. */
export const mix = (a: string, b: string, k: number) => {
  const A = hx(a), B = hx(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * k).toString(16).padStart(2, "0")).join("");
};

const patternWall = (c: CustomColors, p: PatternKey): CSSProperties => {
  const a = mix(c.wall, c.accent, 0.45);
  if (p === "checker") return { backgroundColor: c.wall, backgroundImage: `repeating-conic-gradient(${a} 0 25%, transparent 0 50%)`, backgroundSize: "36px 36px" };
  if (p === "stripes") return { backgroundColor: c.wall, backgroundImage: `repeating-linear-gradient(45deg,${a} 0 10px, transparent 10px 24px)` };
  if (p === "grid") return { backgroundColor: c.wall, backgroundImage: `linear-gradient(${a} 1px, transparent 1px), linear-gradient(90deg,${a} 1px, transparent 1px)`, backgroundSize: "24px 24px" };
  if (p === "solid") return { backgroundColor: c.wall };
  return { backgroundColor: c.wall, backgroundImage: `radial-gradient(${a} 2px, transparent 2.5px)`, backgroundSize: "22px 22px" };
};

export const buildCustom = (c: CustomColors, p: PatternKey): Theme => ({
  label: "Your layout",
  desc: "Built in the editor below.",
  t: { box: c.box, text: c.text, border: c.accent, head: c.accent, headText: c.box, label: mix(c.box, c.accent, 0.15), labelText: c.accent, cell: mix(c.box, c.text, 0.04), accent: c.accent, link: c.link, footer: mix(c.wall, "#ffffff", 0.7) },
  wall: patternWall(c, p),
  name: { color: c.accent, textShadow: `2px 2px 0 ${mix(c.box, c.text, 0.2)}` },
  nameText: "~ Kevin J Hernandez ~",
  marq: { bg: c.box, border: c.accent, color: c.accent, text: "★ custom layout by a visitor ★ open to Community, Program Ops & DevRel roles ★ thx for the add ★" },
  spark: { chars: ["✦", "★"], colors: [c.accent, c.link, c.box] },
});
