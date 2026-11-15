import type { CountryPanels } from "../types";
import type { CandidateCode } from "./candidates";
import { lazy } from "react";

const AllianceTool = lazy(() => import("./Alliances").then((m) => ({ default: m.AllianceTool })));
const LawPanel = lazy(() => import("./Alliances").then((m) => ({ default: m.LawPanel })));

export const PANELS = {
  extraPanels: [
    { id: "law", nav: (t) => t.lawNav, heading: (t) => t.lawHeading, blurb: (t) => t.lawLink, render: () => <LawPanel /> },
  ],
  ResultsExtra: ({ result }) => <AllianceTool result={result} />,
} satisfies CountryPanels<CandidateCode>;
