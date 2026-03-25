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
    accentColor: "#BF4342",
  },
  {
    name: "SF Weekend",
    tag: "Next.js · GSAP",
    category: "web",
    description:
      "Cinematic editorial travel itinerary for a San Francisco weekend with scroll-driven animations and Mapbox integration.",
    stack: "Next.js 14 · Mapbox · GSAP · Vercel",
    url: "https://sf-trip-2026.vercel.app",
  },
  {
    name: "Carro",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Car maintenance tracker with NHTSA and CarAPI integration for real vehicle data and service history.",
    stack: "Swift · SwiftData · NHTSA API",
    accentColor: "#7C3AED",
  },
  {
    name: "Tended",
    tag: "iOS App · SwiftUI",
    category: "ios",
    description:
      "Pet care companion app with warm earthy design system and care schedule tracking.",
    stack: "Swift · SwiftData",
    github: "https://github.com/kevinjustinh/tended",
    accentColor: "#8B6914",
  },
  {
    name: "330 Fantasy",
    tag: "Web · Next.js",
    category: "web",
    description:
      "Fantasy football league site with cinematic dark aesthetic and neon purple/blue palette.",
    stack: "Next.js · Tailwind · Vercel",
    accentColor: "#7C3AED",
  },
  {
    name: "Catchr",
    tag: "Chrome Extension",
    category: "web",
    description:
      "Chrome extension that scrapes and logs job listings directly to Google Sheets — built during the job search.",
    stack: "Manifest V3 · Google Sheets API",
    accentColor: "#1D9E75",
  },
];
