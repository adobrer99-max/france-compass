/* ============================================================
   The parties. NRW votes on 25 April 2027 with two votes, a
   constituency candidate and a party list; seats follow the list
   vote, with a 5% threshold. The leaders shown are the lead
   candidates or, where none is chosen yet, the state chairs.
   ============================================================ */

export type CandidateCode = "CDU" | "SPD" | "GRUENE" | "AFD" | "LINKE" | "FDP" | "BSW";

export interface Candidate {
  code: CandidateCode;
  /** party name */
  name: string;
  /** shown big on the poster and on the chart */
  short: string;
  /** the leader, shown under the name */
  party: string;
  bloc: { en: string; de: string };
  color: string;
  /** latest poll, shown as context only; never used in the match */
  poll?: string;
  pollFrom?: string;
  note?: { en: string; de: string };
  withdrawn?: boolean;
}

export const CANDIDATES: Candidate[] = [
  { code: "CDU", name: "CDU", short: "CDU", party: "Hendrik Wüst", bloc: { en: "Centre right", de: "Mitte-rechts" }, color: "#2b3a4a", poll: "26%" },
  { code: "AFD", name: "AfD", short: "AfD", party: "Martin Vincentz", bloc: { en: "Far right", de: "Rechtsaußen" }, color: "#0a6fa8", poll: "21%" },
  { code: "SPD", name: "SPD", short: "SPD", party: "Jochen Ott", bloc: { en: "Centre left", de: "Mitte-links" }, color: "#c4161c", poll: "18%" },
  { code: "GRUENE", name: "Bündnis 90/Die Grünen", short: "Grüne", party: "Mona Neubaur", bloc: { en: "Greens", de: "Grüne" }, color: "#2f7d32", poll: "16%" },
  { code: "LINKE", name: "Die Linke", short: "Linke", party: "Alexandra Mehdi, Sebastian Merkens", bloc: { en: "Left", de: "Links" }, color: "#b0135c", poll: "10%" },
  { code: "FDP", name: "FDP", short: "FDP", party: "Henning Höne", bloc: { en: "Liberal", de: "Liberal" }, color: "#8a6d00", poll: "4%" },
  { code: "BSW", name: "Bündnis Sahra Wagenknecht", short: "BSW", party: "Landesverband NRW", bloc: { en: "Left-wing populist", de: "Linkspopulistisch" }, color: "#6d2a5f",
    note: { en: "Founded in 2024; not in the Landtag. The latest poll doesn't list it separately.", de: "2024 gegründet; nicht im Landtag. Die letzte Umfrage weist das BSW nicht gesondert aus." } },
];

export const BY_CODE = Object.fromEntries(CANDIDATES.map((c) => [c.code, c])) as Record<CandidateCode, Candidate>;
export const ACTIVE = CANDIDATES.filter((c) => !c.withdrawn).map((c) => c.code);

/** Not used in NRW (no head-to-head card), kept for the shared code. */
export const LIKELY_RUNOFF: [CandidateCode, CandidateCode] = ["CDU", "SPD"];

export const POLL_SOURCE = { label: "INSA for Bild, 6–13.10.2026 (via DAWUM)", url: "https://dawum.de/Nordrhein-Westfalen/" };

export function initials(name: string): string {
  return name.split(/[\s'/-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
