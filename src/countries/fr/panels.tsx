import type { CountryPanels } from "../types";
import type { CandidateCode } from "./candidates";
import { lazy } from "react";

// The firewall and history data only load when a panel opens.
const FirewallPanel = lazy(() => import("./Context").then((m) => ({ default: m.FirewallPanel })));
const HistoryPanel = lazy(() => import("./Context").then((m) => ({ default: m.HistoryPanel })));

export const PANELS = {
  extraPanels: [
    { id: "firewall", nav: (t) => t.firewallNav, heading: (t) => t.firewallHeading, blurb: (t) => t.firewallLink,
      render: ({ onCandidate }) => <FirewallPanel onCandidate={onCandidate} /> },
    { id: "history", nav: (t) => t.historyNav, heading: (t) => t.historyHeading, blurb: (t) => t.historyLink,
      render: () => <HistoryPanel /> },
  ],
  runoffNote: (pair) => (pair.includes("RN") ? { text: (t) => t.runoffRNNote, panels: ["firewall", "history"] } : null),
} satisfies CountryPanels<CandidateCode>;
