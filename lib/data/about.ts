export const bio =
  "I've spent a decade making developer communities run — from launching accelerators to scaling creator programs to 520K+ on LinkedIn. I'm also a founder and self-taught iOS developer, building real products in public. Based in the SF Bay Area, open to the right opportunity.";

export const experience = [
  {
    company: "Google via Cognizant",
    role: "Program Manager · Developer Relations",
    years: "2022–2024",
  },
  {
    company: "Springboard",
    role: "Operations Manager, ML/AI",
    years: "2019–2021",
  },
  {
    company: "Draper University",
    role: "Program Manager",
    years: "2018–2019",
  },
  {
    company: "RecCheck Inc",
    role: "CEO & Co-Founder",
    years: "2013–2019",
  },
];

export type AvailabilityDetail = {
  label: string;
  value: string;
};

export const availability: { status: string; details: AvailabilityDetail[] } = {
  status: "Open to opportunities",
  details: [
    { label: "Location", value: "SF Bay Area · Remote" },
    { label: "Roles", value: "Program Ops · Community · DevRel" },
    { label: "Type", value: "Full-time · Contract" },
    { label: "Available", value: "Immediately" },
  ],
};

export const heroStats = [
  {
    value: "4.9",
    suffix: "/5",
    label: "CSAT — Google.org GenAI Accelerator launch",
  },
  {
    value: "520",
    suffix: "K+",
    label: "Social followers managed across Google Developer channels",
  },
  {
    value: "0→100",
    suffix: "",
    label: "NPS lift at Springboard ML program",
  },
];
