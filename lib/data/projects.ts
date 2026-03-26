export type Project = {
  name: string;
  tag: string;
  category: "ios" | "web" | "ops";
  description: string;
  stack: string;
  url?: string;
  github?: string;
  featured?: boolean;
  accentColor?: string;
  screenshots?: string[]; // paths relative to /public, e.g. ["/screenshots/stoke-1.png"]
  screenshotPadding?: string[]; // per-screenshot padding override, e.g. ["12%", undefined, "12%"]
};

export const projects: Project[] = [
  {
    name: "Stoke",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "AI-powered BBQ and smoking companion — tracks cooks, answers pitmaster questions, and learns your setup.",
    stack: "Swift · SwiftData · Claude AI",
    featured: true,
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
    name: "SF Weekend",
    tag: "Website · Next.js · GSAP",
    category: "web",
    description:
      "Cinematic editorial travel itinerary for a San Francisco weekend with scroll-driven animations and Mapbox integration.",
    stack: "Next.js 14 · Mapbox · GSAP · Vercel",
    url: "https://sf-trip-2026.vercel.app",
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
    name: "Carro",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Car maintenance tracker with NHTSA and CarAPI integration for real vehicle data and service history.",
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
    name: "Fantasy Football League Site",
    tag: "Website · Next.js",
    category: "web",
    description:
      "Fantasy football league site with cinematic dark aesthetic and neon purple/blue palette.",
    stack: "Next.js · Tailwind · Vercel",
    accentColor: "#6834D4", // 330 Fantasy purple primary exact
    screenshots: [
      "/screenshots/fantasy-football-league-site/1-ff-site-hero.webp",
      "/screenshots/fantasy-football-league-site/2-ff-site-countdown.webp",
      "/screenshots/fantasy-football-league-site/3-ff-site-stats.webp",
      "/screenshots/fantasy-football-league-site/4-ff-site-standings.webp",
      "/screenshots/fantasy-football-league-site/5-ff-site-schedule.webp",
      "/screenshots/fantasy-football-league-site/6-ff-site-contact.webp",
    ],
  },
  {
    name: "Catchr",
    tag: "Chrome Extension",
    category: "web",
    description:
      "Chrome extension that scrapes and logs job listings directly to Google Sheets — built during the job search.",
    stack: "Manifest V3 · Google Sheets API",
    accentColor: "#2C5F4A", // Catchr header green exact
    screenshots: [
      "/screenshots/catchr/1-catchr-pop-up.webp",
      "/screenshots/catchr/2-catchr-linkedin.webp",
      "/screenshots/catchr/3-catchr-success.webp",
      "/screenshots/catchr/4-catchr-sheets.webp",
    ],
    screenshotPadding: ["12%", undefined, "12%", "12%"],
  },
  {
    name: "Tended",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Pet care companion app with warm earthy design system and care schedule tracking.",
    stack: "Swift · SwiftData",
    github: "https://github.com/kevinjustinh/tended",
    featured: true,
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
