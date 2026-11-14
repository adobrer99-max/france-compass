import type { CountryPanels } from "../types";
import type { CandidateCode } from "./candidates";
import { FirewallPanel, HistoryPanel } from "./Context";

export const PANELS = {
  extraPanels: [
    { id: "firewall", nav: (t) => t.firewallNav, heading: (t) => t.firewallHeading, blurb: (t) => t.firewallLink,
      render: ({ onCandidate }) => <FirewallPanel onCandidate={onCandidate} /> },
    { id: "history", nav: (t) => t.historyNav, heading: (t) => t.historyHeading, blurb: (t) => t.historyLink,
      render: () => <HistoryPanel /> },
  ],
  runoffNote: (pair) => (pair.includes("RN") ? { text: (t) => t.runoffRNNote, panels: ["firewall", "history"] } : null),
} satisfies CountryPanels<CandidateCode>;
