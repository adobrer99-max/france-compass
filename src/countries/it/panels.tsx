import type { CountryPanels } from "../types";
import type { CandidateCode } from "./candidates";
import { closestAlliance } from "./allianceMatch";
import { STRINGS, pct, type Lang } from "../../i18n";
import { lazy } from "react";

const AllianceTool = lazy(() => import("./Alliances").then((m) => ({ default: m.AllianceTool })));
const LawPanel = lazy(() => import("./Alliances").then((m) => ({ default: m.LawPanel })));

export const PANELS = {
  extraPanels: [
    { id: "law", nav: (t) => t.lawNav, heading: (t) => t.lawHeading, blurb: (t) => t.lawLink, render: () => <LawPanel /> },
  ],
  ResultsExtra: ({ result }) => <AllianceTool result={result} />,
  shareLine: (result, lang) => {
    const c = closestAlliance(result);
    if (!c) return null;
    const t = STRINGS[lang as Lang];
    return t.allianceCard(c.id === "cdx" ? t.allianceCdx : t.allianceCsx, pct(lang as Lang, c.pct));
  },
} satisfies CountryPanels<CandidateCode>;
