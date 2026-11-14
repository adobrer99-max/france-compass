import type { CountryPanels } from "../types";
import type { CandidateCode } from "./candidates";
import { AllianceTool, LawPanel } from "./Alliances";

export const PANELS = {
  extraPanels: [
    { id: "law", nav: (t) => t.lawNav, heading: (t) => t.lawHeading, blurb: (t) => t.lawLink, render: () => <LawPanel /> },
  ],
  ResultsExtra: ({ result }) => <AllianceTool result={result} />,
} satisfies CountryPanels<CandidateCode>;
