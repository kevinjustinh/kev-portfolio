export type Metric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  index: string;
  tag: string;
  title: string;
  titleItalic?: string;
  description: string;
  metrics: Metric[];
  company: string;
  year: string;
  slug: string;
  featured?: boolean;
  quote?: {
    text: string;
    attribution: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    index: "01",
    tag: "Program Launch · Accelerators",
    title: "Launching Google.org's GenAI Accelerator from zero.",
    titleItalic: "GenAI Accelerator",
    description:
      "Coordinated end-to-end logistics for Google.org's inaugural Generative AI Accelerator: venue, catering, hotel, and offsite for 100+ attendees across 21 nonprofits. Collaborated cross-functionally with Google.org and Google for Startups to deliver a 4.9/5 participant experience.",
    metrics: [
      { value: "4.9/5", label: "CSAT participant satisfaction" },
      { value: "21", label: "Nonprofits across the cohort" },
      { value: "100+", label: "Attendees at program events" },
      { value: "XFN", label: "Stakeholder alignment across teams" },
    ],
    company: "Google · Google.org",
    year: "2022–2024",
    slug: "genai-accelerator",
    featured: true,
  },
  {
    index: "02",
    tag: "Ops Turnaround · Community Health",
    title: "Taking Springboard's ML program NPS from 0 to 100.",
    titleItalic: "0 to 100",
    description:
      "Inherited a broken mentoring experience, identified dissatisfied mentors, and rebuilt trust through 1:1 conversations and hands-on support — delivering a 0 to 100 NPS turnaround in one month.",
    metrics: [
      { value: "0→100", label: "NPS lift in ML program" },
      { value: "4.82/5", label: "Avg mentor rating" },
    ],
    company: "Springboard",
    year: "2019–2021",
    slug: "springboard-nps",
  },
  {
    index: "03",
    tag: "Process Design · Ops",
    title: "Redesigning mentor onboarding to raise the quality bar.",
    titleItalic: "mentor onboarding",
    description:
      "Audited the end-to-end mentor experience, identified friction points, and redesigned onboarding flows that improved mentor quality scores and reduced early churn across the platform.",
    metrics: [{ value: "4.82/5", label: "Avg mentor rating post-redesign" }],
    company: "Springboard",
    year: "2020",
    slug: "mentor-onboarding",
  },
  {
    index: "04",
    tag: "Community · Social",
    title: "Managing Google's developer community at scale.",
    titleItalic: "at scale",
    description:
      "Ran content and community strategy across Google Developer Twitter (100K) and LinkedIn (420K). Elevated GDE voices, surfaced creator stories, and published on the Google Developers Blog.",
    metrics: [
      { value: "520K+", label: "Followers managed across channels" },
      { value: "✍︎", label: "Published on Google Developers Blog" },
    ],
    company: "Google via Cognizant",
    year: "2022–2024",
    slug: "gde-social",
  },
  {
    index: "05",
    tag: "Founder · Mobile Product",
    title: "Co-founding RecCheck — from idea to funded iOS app.",
    titleItalic: "funded iOS app",
    description:
      "Built and launched an iOS app from scratch, raised $25K in early funding, and pitched competitively at Draper University. First-hand zero-to-one product ownership.",
    metrics: [
      { value: "$25K", label: "Early funding raised" },
      { value: "2nd", label: "Place — Draper pitch competition" },
    ],
    company: "RecCheck Inc",
    year: "2013–2019",
    slug: "reccheck",
  },
];

export type PublishedArticle = {
  title: string;
  publication: string;
  date: string;
  url: string;
};

export const publishedArticles: PublishedArticle[] = [
  {
    title: "Yonatan Levin, Android GDE, uses his developer superpowers to help refugees in Ukraine",
    publication: "Google Developers Blog",
    date: "Apr 2023",
    url: "https://developers.googleblog.com/yonatan-levin-android-gde-uses-his-developer-superpowers-to-help-refugees-in-ukraine/",
  },
  {
    title: "How web GDE Erick Wendel forever changed Node.js with the support of the open-source community",
    publication: "Google Developers Blog",
    date: "May 2023",
    url: "https://developers.googleblog.com/how-web-gde-erick-wendel-forever-changed-nodejs-with-the-support-of-the-open-source-community/",
  },
  {
    title: "How Machine Learning GDE Henry Ruiz is inspired by resilience in his community",
    publication: "Google Developers Blog",
    date: "Oct 2023",
    url: "https://developers.googleblog.com/how-machine-learning-gde-henry-ruiz-is-inspired-by-resilience-in-his-community/",
  },
  {
    title: "Cybersecurity Awareness Month: Web GDE Shrutirupa Banerjiee shares how we can stay safe in a world of cyber attacks",
    publication: "Google Developers Blog",
    date: "Oct 2023",
    url: "https://developers.googleblog.com/cybersecurity-awareness-month-web-gde-shrutirupa-banerjiee-shares-how-we-can-stay-safe-in-a-world-of-cyber-attacks/",
  },
  {
    title: "AAPI Heritage Month: How Web GDE Vickie Li views the importance of diversity",
    publication: "Google Developers Blog",
    date: "May 2023",
    url: "https://developers.googleblog.com/aapi-heritage-month-how-web-gde-vickie-li-views-the-importance-of-diversity/",
  },
  {
    title: "How Web GDE Martine Dowden approaches web design from an accessibility perspective",
    publication: "Google Developers Blog",
    date: "May 2023",
    url: "https://developers.googleblog.com/how-web-gde-martine-dowden-approaches-web-design-from-an-accessibility-perspective/",
  },
];
