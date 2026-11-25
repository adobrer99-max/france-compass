/* ============================================================
   The parties. Italians vote for party lists, grouped in alliances;
   an alliance past 42% gets the majority bonus. `alliance` is the
   reported line-up as of late November 2026 and is what the alliance
   tool starts from; readers can move parties around.
   ============================================================ */

export type CandidateCode = "FDI" | "PD" | "M5S" | "FI" | "AVS" | "LEGA" | "FN" | "AZ" | "IV" | "PE" | "NM";
export type Alliance = "cdx" | "csx" | null;

export interface Candidate {
  code: CandidateCode;
  /** party name */
  name: string;
  /** shown big on the poster and on the chart */
  short: string;
  /** the leader, shown under the name */
  party: string;
  bloc: { en: string; it: string };
  color: string;
  alliance: Alliance;
  /** latest poll, shown as context only; never used in the match */
  poll?: string;
  /** numeric share for the alliance tool */
  pollShare: number;
  pollFrom?: string;
  note?: { en: string; it: string };
  withdrawn?: boolean;
}

export const CANDIDATES: Candidate[] = [
  { code: "FDI", name: "Fratelli d'Italia", short: "FdI", party: "Giorgia Meloni", bloc: { en: "National conservative", it: "Destra conservatrice" }, color: "#17306b", alliance: "cdx", poll: "27.8%", pollShare: 27.8 },
  { code: "PD", name: "Partito Democratico", short: "PD", party: "Elly Schlein", bloc: { en: "Centre left", it: "Centrosinistra" }, color: "#c62828", alliance: "csx", poll: "20.5%", pollShare: 20.5 },
  { code: "M5S", name: "Movimento 5 Stelle", short: "M5S", party: "Giuseppe Conte", bloc: { en: "Populist left", it: "Populisti progressisti" }, color: "#9a6f00", alliance: "csx", poll: "12.8%", pollShare: 12.8 },
  { code: "FI", name: "Forza Italia", short: "FI", party: "Antonio Tajani", bloc: { en: "Centre right", it: "Centrodestra liberale" }, color: "#1f74b8", alliance: "cdx", poll: "7.1%", pollShare: 7.1 },
  { code: "AVS", name: "Alleanza Verdi e Sinistra", short: "AVS", party: "Angelo Bonelli, Nicola Fratoianni", bloc: { en: "Green left", it: "Sinistra ecologista" }, color: "#4d7a1f", alliance: "csx", poll: "6.2%", pollShare: 6.2 },
  { code: "LEGA", name: "Lega", short: "Lega", party: "Matteo Salvini", bloc: { en: "Right", it: "Destra" }, color: "#1b6b3a", alliance: "cdx", poll: "5.6%", pollShare: 5.6 },
  { code: "FN", name: "Futuro Nazionale", short: "Vannacci", party: "Roberto Vannacci", bloc: { en: "Far right", it: "Destra radicale" }, color: "#3b3b46", alliance: null, poll: "6.5%", pollShare: 6.5,
    note: { en: "Founded in 2026 by Roberto Vannacci after leaving the Lega. Meloni has ruled out taking it into the centre-right alliance.", it: "Fondato nel 2026 da Roberto Vannacci dopo l'uscita dalla Lega. Meloni ha escluso di accoglierlo nella coalizione di centrodestra." } },
  { code: "AZ", name: "Azione", short: "Azione", party: "Carlo Calenda", bloc: { en: "Liberal centre", it: "Centro liberale" }, color: "#0d6e78", alliance: null, poll: "3.2%", pollShare: 3.2 },
  { code: "IV", name: "Italia Viva", short: "IV", party: "Matteo Renzi", bloc: { en: "Liberal centre", it: "Centro liberale" }, color: "#b0206e", alliance: "csx", poll: "2.4%", pollShare: 2.4 },
  { code: "PE", name: "+Europa", short: "+Europa", party: "Riccardo Magi", bloc: { en: "Liberal, pro-European", it: "Liberali europeisti" }, color: "#2b4fa0", alliance: "csx", poll: "1.2%", pollShare: 1.2 },
  { code: "NM", name: "Noi Moderati", short: "NM", party: "Maurizio Lupi", bloc: { en: "Christian democrat", it: "Centristi cattolici" }, color: "#6a4c9c", alliance: "cdx", poll: "1.0%", pollShare: 1.0 },
];

export const BY_CODE = Object.fromEntries(CANDIDATES.map((c) => [c.code, c])) as Record<CandidateCode, Candidate>;
export const ACTIVE = CANDIDATES.filter((c) => !c.withdrawn).map((c) => c.code);

/** Not used in Italy (no head-to-head card), kept for the shared code. */
export const LIKELY_RUNOFF: [CandidateCode, CandidateCode] = ["FDI", "PD"];

export const POLL_SOURCE = { label: "YouTrend Supermedia for Agi, 5–18.11.2026", url: "https://quifinanza.it/politica/sondaggi-politici-21-novembre-2026/1025214/" };

export function initials(name: string): string {
  return name.split(/[\s'-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
