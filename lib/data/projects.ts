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
    tag: "Next.js · GSAP",
    category: "web",
    description:
      "Cinematic editorial travel itinerary for a San Francisco weekend with scroll-driven animations and Mapbox integration.",
    stack: "Next.js 14 · Mapbox · GSAP · Vercel",
    url: "https://sf-trip-2026.vercel.app",
    accentColor: "#F04A00", // sf-trip brand orange exact
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
      "/screenshots/Carro/1-carro-home.webp",
      "/screenshots/Carro/2-carro-home-overdue.webp",
      "/screenshots/Carro/3-carro-my-cars.webp",
      "/screenshots/Carro/4-carro-log-service.webp",
      "/screenshots/Carro/5-carro-service-record.webp",
      "/screenshots/Carro/6-carro-add-reminder.webp",
    ],
  },
  {
    name: "Tended",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Pet care companion app with warm earthy design system and care schedule tracking.",
    stack: "Swift · SwiftData",
    github: "https://github.com/kevinjustinh/tended",
    accentColor: "#7A9E7E", // Tended sage green primary exact
  },
  {
    name: "330 Fantasy",
    tag: "Web · Next.js",
    category: "web",
    description:
      "Fantasy football league site with cinematic dark aesthetic and neon purple/blue palette.",
    stack: "Next.js · Tailwind · Vercel",
    accentColor: "#6834D4", // 330 Fantasy purple primary exact
  },
  {
    name: "Catchr",
    tag: "Chrome Extension",
    category: "web",
    description:
      "Chrome extension that scrapes and logs job listings directly to Google Sheets — built during the job search.",
    stack: "Manifest V3 · Google Sheets API",
    accentColor: "#2C5F4A", // Catchr header green exact
  },
];
