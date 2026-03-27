export const bio =
  "I've spent a decade making developer and startup communities run, launching accelerators, managing creator programs, and telling stories to a 520K+ audience. Former founder. Currently vibe coding on the side and figuring out what to build next. Based in the SF Bay Area and open to community, program ops, and DevRel roles.";

export const experience = [
  {
    company: "Google via Cognizant",
    role: "Community Manager · Developer Relations",
    years: "2022–2024",
  },
  {
    company: "Springboard",
    role: "Operations Manager",
    years: "2019–2021",
  },
  {
    company: "Draper University",
    role: "Program Manager",
    years: "2016–2019",
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
    label: "Audience written to across Google Developer channels",
  },
  {
    value: "0→100",
    suffix: "",
    label: "NPS lift at Springboard ML program",
  },
];
