// Content for the MySpace-style /profile exploration.
// Design source: Claude Design project "Kevin Profile" (2026-10-21).

export type Metric = { value: string; label: string };
export type ProjectLink = { label: string; url: string };

export type Friend = {
  name: string;
  screen: string; // MySpace-style screen name shown in the Top 8
  img: string | null; // path under /public, or null for a striped placeholder
  alt: string;
  tag: string;
  blurb: string;
  stack: string;
  metrics?: Metric[]; // present on case studies only
  quote: string;
  links?: ProjectLink[];
};

export type Job = { co: string; role: string; yrs: string };
export type Bulletin = { project: string; subj: string; friend: number };
export type Comment = { friend: number; date: string; text: string };
export type Badge = {
  id: BadgeId;
  text: string;
  hint: string;
  desc: string;
  bg: string;
  fg: string;
};
export type BadgeId =
  | "collector"
  | "completionist"
  | "decorator"
  | "fashionista"
  | "diy"
  | "paper"
  | "reader"
  | "penpal";
export type DetailRow = { label: string; value: string };

export const RESUME_URL = "/resume.pdf";
export const LINKEDIN_URL = "https://www.linkedin.com/in/kevinjustin/";
export const GITHUB_URL = "https://github.com/kevinjustinh";
export const HEADSHOT = "/profile/headshot.jpg";

export const friends: Friend[] = [
  {
    name: "Launching Google.org's GenAI Accelerator from zero",
    screen: "G.org_Accel",
    img: null,
    alt: "",
    tag: "Case study · Google via Cognizant · 2022–2024",
    blurb:
      "Coordinated end-to-end program design and delivery: curriculum support, materials, and full logistics management (venue, catering, hotels, and flights) across 21 nonprofits, each with different needs and expectations.",
    stack: "Program Launch · Accelerators",
    metrics: [
      { value: "4.9/5", label: "CSAT participant satisfaction" },
      { value: "21", label: "Nonprofits across the cohort" },
      { value: "100+", label: "Attendees at program events" },
      { value: "XFN", label: "Stakeholder alignment across teams" },
    ],
    quote: "remember when u ran my launch and everyone gave it a 4.9?? good times",
  },
  {
    name: "Blue42",
    screen: "xX_Blue42_Xx",
    img: "/screenshots/blue-42/1-blue42-assistant.webp",
    alt: "Blue42 AI fantasy football assistant screen",
    tag: "Web App · AI · Featured",
    blurb:
      "Built for my fantasy league when I got tired of guessing. Pulls live data from Sleeper and ESPN into an AI assistant that gives you lineup calls, trade reads, and matchup breakdowns. Includes a Chrome extension that recommends draft picks in real time.",
    stack: "Next.js · Supabase · pgvector · Gemini · Vercel",
    quote: "thx for the add!! also start ur RB this week, trust me",
    links: [{ label: "Visit site", url: "https://blue42.xyz" }],
  },
  {
    name: "Catchr",
    screen: "~*Catchr*~",
    img: "/screenshots/catchr/1-catchr-catch.webp",
    alt: "Catchr Chrome extension logging a job listing",
    tag: "Chrome Extension · AI · Featured",
    blurb:
      "Built mid-job-search because I needed it. One click logs any listing (company, role, location, link) straight to Google Sheets. Then added AI: a fit score against your resume, tailored bullet rewrites, and a full interview prep doc, all from the same popup. Free and publicly released at jobcatchr.app.",
    stack: "Manifest V3 · Google Sheets API · Gemini",
    quote: "u built me mid job search bc u needed me. glad i could help",
    links: [
      { label: "Visit site", url: "https://jobcatchr.app" },
      { label: "Chrome Web Store", url: "https://chromewebstore.google.com/detail/catchr/kleffbpannecinoopgebbdhkfpkjhbia" },
    ],
  },
  {
    name: "Taking Springboard's ML program NPS from 0 to 100",
    screen: "SpringboardML",
    img: null,
    alt: "",
    tag: "Case study · Springboard · 2019–2021",
    blurb:
      "Inherited a broken mentoring experience, identified dissatisfied mentors, and rebuilt trust through 1:1 conversations and hands-on support, delivering a 0 to 100 NPS turnaround in one month.",
    stack: "Ops Turnaround · Community Health",
    metrics: [
      { value: "0→100", label: "NPS lift in ML program" },
      { value: "4.82/5", label: "Avg mentor rating" },
    ],
    quote: "0 to 100 in one month?? u were the real MVP",
  },
  {
    name: "Managing Google's developer community at scale",
    screen: "GoogleDevs_520K",
    img: null,
    alt: "",
    tag: "Case study · Google via Cognizant · 2022–2024",
    blurb:
      "Ran content and community strategy across Google Developer Twitter (100K) and LinkedIn (420K). Elevated Google Developer Expert voices, surfaced creator stories, and published on the Google Developers Blog.",
    stack: "Community · Social",
    metrics: [
      { value: "520K+", label: "Followers managed across channels" },
      { value: "I/O '22", label: "Story featured at Google I/O keynote" },
    ],
    quote: "520K followers across twitter n linkedin. no pressure lol",
  },
  {
    name: "Stoke",
    screen: "StokeTheFire",
    img: "/screenshots/Stoke/1-stoke-home.webp",
    alt: "Stoke BBQ companion app home screen",
    tag: "iOS App · SwiftUI",
    blurb:
      "AI-powered BBQ and smoking companion: tracks cooks, answers pitmaster questions, and learns your setup.",
    stack: "Swift · SwiftData",
    quote: "low n slow. i'll tell u when the brisket's ready",
  },
  {
    name: "Dungee Podcast",
    screen: "DungeePod",
    img: "/screenshots/dungee/1-dungee-hero.webp",
    alt: "Dungee Podcast website homepage",
    tag: "Website · Next.js",
    blurb:
      "My friend had a real podcast and no home for it. Built the Dungee site from scratch: auto-synced to YouTube, a growing episode library, email capture, and a dark editorial design that matches the show's energy.",
    stack: "Next.js · Tailwind · YouTube API · Vercel",
    quote: "new ep auto-synced. u never have to touch me again <3",
    links: [{ label: "Visit site", url: "https://dungeepodcast.com" }],
  },
  {
    name: "Co-founding RecCheck, from idea to funded iOS app",
    screen: "RecCheck_hoops",
    img: null,
    alt: "",
    tag: "Case study · RecCheck Inc · 2013–2019",
    blurb:
      "Built and launched a mobile app for organizing and discovering local pickup basketball games, from scratch to $25K in early funding. First-hand zero-to-one product ownership.",
    stack: "Founder · Mobile Product",
    metrics: [{ value: "$25K", label: "Early funding raised" }],
    quote: "got next",
  },
  {
    name: "Carro",
    screen: "carro_vroom",
    img: "/screenshots/carro/1-carro-home.webp",
    alt: "Carro car maintenance app home screen",
    tag: "iOS App · SwiftUI",
    blurb:
      "Car maintenance tracker with NHTSA and CarAPI integration for real vehicle data and personal service history tracking.",
    stack: "Swift · SwiftData · NHTSA API",
    quote: "oil change due in 300 mi. just sayin",
  },
  {
    name: "SF Weekend",
    screen: "SF_Weekend",
    img: "/screenshots/sf-site/1-sf-site-hero.webp",
    alt: "SF Weekend travel itinerary site hero",
    tag: "Website · Next.js · GSAP",
    blurb:
      "Cinematic editorial travel itinerary for a San Francisco weekend: scroll-driven animations, an animated video, and Mapbox integration.",
    stack: "Next.js 14 · Mapbox · GSAP · Vercel",
    quote: "karl the fog says hi",
  },
  {
    name: "Tended",
    screen: "Tended<3",
    img: "/screenshots/tended/1-tended-home.webp",
    alt: "Tended pet care app home screen",
    tag: "iOS App · SwiftUI",
    blurb:
      "Pet care companion app for tracking schedules and routines, with a warm earthy design.",
    stack: "Swift · SwiftData",
    quote: "every pet routine on schedule so u don't have to remember",
    links: [{ label: "GitHub", url: "https://github.com/kevinjustinh/tended" }],
  },
  {
    name: "Redesigning mentor onboarding to raise the quality bar",
    screen: "MentorOnboard",
    img: null,
    alt: "",
    tag: "Case study · Springboard · 2019–2021",
    blurb:
      "Audited the end-to-end mentor experience, identified friction points, and redesigned onboarding flows that improved mentor quality scores and reduced early churn across the platform.",
    stack: "Process Design · Ops",
    metrics: [
      { value: "E2E", label: "Full audit-to-redesign process" },
      { value: "↓", label: "Reduced early mentor churn" },
    ],
    quote: "smoother onboarding, better mentors. we love 2 see it",
  },
];

export const comments: Comment[] = [
  { friend: 2, date: "Oct 14, 2026 9:07 AM", text: "one click and that job is in ur google sheet. ur welcome" },
  { friend: 1, date: "Oct 12, 2026 9:41 PM", text: "thx for the add!! also start ur RB this week, trust me" },
  { friend: 3, date: "Oct 11, 2026 3:22 PM", text: "0 to 100 in one month?? u were the real MVP" },
  { friend: 5, date: "Oct 10, 2026 6:15 AM", text: "low n slow. i'll tell u when the brisket's ready" },
  { friend: 10, date: "Oct 8, 2026 8:02 AM", text: "every pet routine on schedule so u don't have to remember" },
  { friend: 6, date: "Oct 5, 2026 11:30 AM", text: "new ep auto-synced. u never have to touch me again <3" },
  { friend: 8, date: "Oct 1, 2026 5:48 PM", text: "oil change due in 300 mi. just sayin" },
];

export const jobs: Job[] = [
  { co: "Google via Cognizant", role: "Community Manager · Developer Relations", yrs: "2022–2024" },
  { co: "Springboard", role: "Operations Manager", yrs: "2019–2021" },
  { co: "Draper University", role: "Program Manager", yrs: "2016–2019" },
  { co: "RecCheck Inc", role: "CEO & Co-Founder", yrs: "2013–2019" },
];

export const bulletins: Bulletin[] = [
  { project: "Catchr", subj: "Catchr writes a full interview prep doc from any job post", friend: 2 },
  { project: "Blue42", subj: "Blue42 has a Chrome extension that recommends draft picks in real time", friend: 1 },
  { project: "Stoke", subj: "Stoke learns your smoker setup and answers pitmaster questions", friend: 5 },
  { project: "Dungee", subj: "The Dungee site auto-syncs every new episode from YouTube", friend: 6 },
];

export const badges: Badge[] = [
  { id: "collector", text: "Top 8 Fan", hint: "Open every friend in the Top 8", desc: "You met all of my Top 8.", bg: "#ff33cc", fg: "#ffff00" },
  { id: "completionist", text: "Completionist", hint: "Open all 12 friends", desc: "Every single friend. Respect.", bg: "#000000", fg: "#33ff33" },
  { id: "decorator", text: "Decorator", hint: "Try 5 different layouts", desc: "Five layouts tried on.", bg: "#66ffff", fg: "#003399" },
  { id: "fashionista", text: "Fashionista", hint: "Try every layout", desc: "You tried on the whole closet.", bg: "#663399", fg: "#ffd76a" },
  { id: "diy", text: "DIY Designer", hint: "Build your own layout and copy the link", desc: "Custom layout shared.", bg: "#ff6600", fg: "#ffffff" },
  { id: "paper", text: "Paper Trail", hint: "Open the résumé", desc: "Résumé acquired.", bg: "#3399ff", fg: "#ffffff" },
  { id: "reader", text: "Bulletin Reader", hint: "Open a bulletin", desc: "Caught up on the bulletins.", bg: "#33cc33", fg: "#003300" },
  { id: "penpal", text: "Pen Pal", hint: "Send Kevin a message", desc: "Message sent. thx for the add!", bg: "#ff99cc", fg: "#990033" },
];

export const profileIntro = {
  name: "Kevin J Hernandez",
  quote: "\"I build programs and communities people actually care about.\"",
  roles: "Program Ops · Community · Builder",
  location: ["SF Bay Area", "Remote OK"],
  mood: "shipping :)",
  summary: "A decade building communities and programs at Google, Springboard, and from scratch.",
  url: "https://www.kevinjhernandez.com/",
};

export const details: DetailRow[] = [
  { label: "Status:", value: "Open to opportunities" },
  { label: "Roles:", value: "Program Ops · Community · DevRel" },
  { label: "Here for:", value: "Full-time · Contract" },
  { label: "Location:", value: "SF Bay Area · Remote" },
  { label: "Available:", value: "Immediately" },
  { label: "Experience:", value: "10+ years" },
];

// Music, Movies and Heroes are still placeholders from the design.
export const interests: DetailRow[] = [
  { label: "General:", value: "Developer communities, accelerators, fantasy football, low-and-slow BBQ, vibe coding" },
  { label: "Music:", value: "[ your favorite artists ]" },
  { label: "Movies:", value: "[ your favorite movies ]" },
  { label: "Heroes:", value: "[ your heroes ]" },
];

export const blurbs = {
  about:
    "I've spent a decade making developer and startup communities run, launching accelerators, managing creator programs, and telling stories to a 520K+ audience. Former founder. Currently vibe coding on the side and figuring out what to build next. Based in the SF Bay Area and open to community, program ops, and DevRel roles.",
  meet:
    "You! Especially if you're hiring a Community Manager, Program Ops lead, or DevRel person. I'd love to run your launch, keep your community happy, and probably build a little tool to help out. I show up curious, stay until it's done, and somehow people remember me too. Bonus points if you have strong opinions about brisket or your fantasy lineup.",
};

export const profileSong = {
  title: "Profile song: [ song slot ]",
  note: "original chiptune or real song goes here · never autoplays",
};
