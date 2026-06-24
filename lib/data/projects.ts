export type Project = {
  name: string;
  tag: string;
  category: "ios" | "web" | "ops";
  description: string;
  stack: string;
  url?: string;
  urlLabel?: string; // overrides the default "View live" link label, e.g. "Visit Site" for a marketing landing page
  github?: string;
  chromeStore?: string;
  featured?: boolean;
  accentColor?: string;
  screenshots?: string[]; // paths relative to /public, e.g. ["/screenshots/stoke-1.png"]
  screenshotPadding?: (string | undefined)[]; // per-screenshot padding override, e.g. ["12%", undefined, "12%"]
};

export const projects: Project[] = [
  {
    name: "Blue42",
    tag: "Web App · AI",
    category: "web",
    description:
      "Built for my fantasy league when I got tired of guessing. Pulls live data from Sleeper and ESPN into an AI assistant that gives you lineup calls, trade reads, and matchup breakdowns. Includes a Chrome extension that recommends draft picks in real time.",
    stack: "Next.js · Supabase · pgvector · Gemini · Vercel",
    featured: true,
    url: "https://blue42.xyz",
    accentColor: "#1b9cfc",
    screenshots: [
      "/screenshots/blue-42/1-blue42-assistant.webp",
      "/screenshots/blue-42/2-blue42-lineup-v2.webp",
      "/screenshots/blue-42/3-blue42-matchup-v2.webp",
      "/screenshots/blue-42/4-blue42-draft-v2.webp",
    ],
  },
  {
    name: "Catchr",
    tag: "Chrome Extension · AI",
    category: "web",
    description:
      "Built mid-job-search because I needed it. One click logs any listing (company, role, location, link) straight to Google Sheets. Then added AI: a fit score against your resume, tailored bullet rewrites, and a full interview prep doc, all from the same popup. Published to the Chrome Web Store for private users.",
    stack: "Manifest V3 · Google Sheets API · Gemini",
    featured: true,
    url: "https://jobcatchr.app",
    urlLabel: "Visit Site",
    chromeStore:
      "https://chromewebstore.google.com/detail/catchr/kleffbpannecinoopgebbdhkfpkjhbia",
    accentColor: "#2C5F4A", // Catchr header green exact
    screenshots: [
      "/screenshots/catchr/1-catchr-catch.webp",
      "/screenshots/catchr/2-catchr-fit.webp",
      "/screenshots/catchr/3-catchr-tailor.webp",
      "/screenshots/catchr/4-catchr-prep.webp",
    ],
  },
  {
    name: "Stoke",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "AI-powered BBQ and smoking companion — tracks cooks, answers pitmaster questions, and learns your setup.",
    stack: "Swift · SwiftData",
    accentColor: "#BF4341", // Stoke colorAccent exact
    screenshots: [
      "/screenshots/stoke/1-stoke-home.webp",
      "/screenshots/stoke/2-stoke-select-cut.webp",
      "/screenshots/stoke/3-stoke-select-your-grill.webp",
      "/screenshots/stoke/4-stoke-select-your-wood.webp",
      "/screenshots/stoke/5-stoke-active-cook.webp",
      "/screenshots/stoke/6-stoke-reference-screen.webp",
      "/screenshots/stoke/7-stoke-brisket-instructions.webp",
      "/screenshots/stoke/8-stoke-chatbot.webp",
      "/screenshots/stoke/9-stoke-cook-log.webp",
    ],
  },
  {
    name: "Dungee Podcast",
    tag: "Website · Next.js",
    category: "web",
    description:
      "My friend had a real podcast and no home for it. Built the Dungee site from scratch: auto-synced to YouTube, a growing episode library, email capture, and a dark editorial design that matches the show's energy.",
    stack: "Next.js · Tailwind · YouTube API · Vercel",
    url: "https://dungeepodcast.com",
    accentColor: "#4CAF4C", // Dungee accent green exact
    screenshots: [
      "/screenshots/dungee/1-dungee-hero.webp",
      "/screenshots/dungee/4-dungee-about.webp",
      "/screenshots/dungee/2-dungee-latest.webp",
      "/screenshots/dungee/3-dungee-episodes.webp",
    ],
  },
  {
    name: "Carro",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Car maintenance tracker with NHTSA and CarAPI integration for real vehicle data and personal service history tracking.",
    stack: "Swift · SwiftData · NHTSA API",
    accentColor: "#6D28D9", // Carro Theme.swift light mode primary exact
    screenshots: [
      "/screenshots/carro/1-carro-home.webp",
      "/screenshots/carro/2-carro-home-overdue.webp",
      "/screenshots/carro/3-carro-my-cars.webp",
      "/screenshots/carro/4-carro-log-service.webp",
      "/screenshots/carro/5-carro-service-record.webp",
      "/screenshots/carro/6-carro-add-reminder.webp",
    ],
  },
  {
    name: "SF Weekend",
    tag: "Website · Next.js · GSAP",
    category: "web",
    description:
      "Cinematic editorial travel itinerary for a San Francisco weekend — scroll-driven animations, an animated video, and Mapbox integration.",
    stack: "Next.js 14 · Mapbox · GSAP · Vercel",
    accentColor: "#F04A00", // sf-trip brand orange exact
    screenshots: [
      "/screenshots/sf-site/1-sf-site-hero.webp",
      "/screenshots/sf-site/2-sf-site-video-animation.webp",
      "/screenshots/sf-site/3-sf-site-saturday.webp",
      "/screenshots/sf-site/4-sf-site-sunday.webp",
      "/screenshots/sf-site/5-sf-site-monday.webp",
      "/screenshots/sf-site/6-sf-site-map.webp",
      "/screenshots/sf-site/7-sf-site-what-to-expect.webp",
      "/screenshots/sf-site/8-sf-site-resources.webp",
    ],
  },
  {
    name: "Tended",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Pet care companion app for tracking schedules and routines, with a warm earthy design.",
    stack: "Swift · SwiftData",
    github: "https://github.com/kevinjustinh/tended",
    accentColor: "#7A9E7E", // Tended sage green primary exact
    screenshots: [
      "/screenshots/tended/1-tended-home.webp",
      "/screenshots/tended/2-tended-overdue.webp",
      "/screenshots/tended/3-tended-add-task.webp",
      "/screenshots/tended/4-tended-add-pets.webp",
      "/screenshots/tended/5-tended-pets.webp",
      "/screenshots/tended/6-tended-pet-profile.webp",
      "/screenshots/tended/7-tended-packing-list.webp",
      "/screenshots/tended/8-tended-task-list.webp",
      "/screenshots/tended/9-tended-calendar.webp",
    ],
  },
];
