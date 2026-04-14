"use client";

// CaseStudies — dynamic import of scroll-expansion variant
// The expansion component is client-only (wheel events, RAF, GSAP, DOM refs)
// so we use next/dynamic with ssr:false to keep it out of the server bundle.

import dynamic from "next/dynamic";
import type { CaseStudiesExpansionProps } from "./CaseStudiesExpansion";

const CaseStudiesExpansion = dynamic(
  () => import("./CaseStudiesExpansion"),
  { ssr: false }
);

export default function CaseStudies({ studies }: CaseStudiesExpansionProps) {
  return <CaseStudiesExpansion studies={studies} />;
}
