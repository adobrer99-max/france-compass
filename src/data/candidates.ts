/* ============================================================
   Candidates
   The likely field as of November 2026 (plan: everyone polling
   about 2% or more, plus leaders of parties with seats). Locked to
   the Constitutional Council's official list in mid-March 2027:
   every official candidate goes in, nobody else stays.

   The RN slot is coded to the RN programme, not the person, so if
   the Court of Cassation bars Le Pen and Bardella runs, only `name`
   changes.
   ============================================================ */

export type CandidateCode =
  | "RN" | "LFI" | "HOR" | "PP" | "LR" | "REN" | "ECO"
  | "REC" | "PCF" | "DEB" | "XB" | "DLF" | "NE";

export interface Candidate {
  code: CandidateCode;
  name: string;
  /** surname as used on the chart and matrix */
  short: string;
  party: string;
  /** political family, in both languages */
  bloc: { en: string; fr: string };
  color: string;
  /** latest poll share, shown as context only; never used in scoring */
  poll?: string;
  /** shown on the profile and in the method notes */
  note?: { en: string; fr: string };
  /** dropped from the field: kept in the published matrix, out of the results */
  withdrawn?: boolean;
}

export const CANDIDATES: Candidate[] = [
  {
    code: "RN", name: "Marine Le Pen", short: "Le Pen", party: "Rassemblement national",
    bloc: { en: "Far right", fr: "Extrême droite" }, color: "#0b2f6b", poll: "33%",
    note: {
      en: "Coded to the RN programme rather than the person. If the Court of Cassation bars Le Pen and Jordan Bardella runs, the codes stay and the name changes.",
      fr: "Codé sur le programme du RN plutôt que sur la personne. Si la Cour de cassation déclare Marine Le Pen inéligible et que Jordan Bardella se présente, les codes restent et seul le nom change.",
    },
  },
  { code: "LFI", name: "Jean-Luc Mélenchon", short: "Mélenchon", party: "La France insoumise", bloc: { en: "Radical left", fr: "Gauche radicale" }, color: "#c8102e", poll: "15.5%" },
  { code: "HOR", name: "Édouard Philippe", short: "Philippe", party: "Horizons", bloc: { en: "Centre right", fr: "Centre droit" }, color: "#2f6db5", poll: "14%" },
  { code: "PP", name: "Raphaël Glucksmann", short: "Glucksmann", party: "Place publique / Parti socialiste", bloc: { en: "Centre left", fr: "Centre gauche" }, color: "#d6337a", poll: "11.5%" },
  { code: "LR", name: "Bruno Retailleau", short: "Retailleau", party: "Les Républicains", bloc: { en: "Right", fr: "Droite" }, color: "#1560bd", poll: "7%" },
  { code: "NE", name: "David Lisnard", short: "Lisnard", party: "Nouvelle Énergie", bloc: { en: "Libertarian right", fr: "Droite libérale" }, color: "#6a4fb3", poll: "7%" },
  { code: "REN", name: "Gabriel Attal", short: "Attal", party: "Renaissance", bloc: { en: "Centre", fr: "Centre" }, color: "#b08900", poll: "6%" },
  { code: "ECO", name: "Marine Tondelier", short: "Tondelier", party: "Les Écologistes", bloc: { en: "Green left", fr: "Gauche écologiste" }, color: "#1e8a4c", poll: "4%" },
  { code: "REC", name: "Éric Zemmour", short: "Zemmour", party: "Reconquête", bloc: { en: "Far right", fr: "Extrême droite" }, color: "#3b3b46", poll: "4%" },
  { code: "PCF", name: "Fabien Roussel", short: "Roussel", party: "Parti communiste français", bloc: { en: "Left", fr: "Gauche" }, color: "#9b1b1b", poll: "2.5%" },
  { code: "DLF", name: "Nicolas Dupont-Aignan", short: "Dupont-Aignan", party: "Debout la France", bloc: { en: "Sovereigntist right", fr: "Droite souverainiste" }, color: "#2b7a99", poll: "~2%" },
  { code: "DEB", name: "François Ruffin", short: "Ruffin", party: "Debout !", bloc: { en: "Left", fr: "Gauche" }, color: "#d9622b" },
  { code: "XB", name: "Xavier Bertrand", short: "Bertrand", party: "Independent (ex-LR)", bloc: { en: "Right", fr: "Droite" }, color: "#4d8fc4" },
];

export const BY_CODE = Object.fromEntries(CANDIDATES.map((c) => [c.code, c])) as Record<CandidateCode, Candidate>;
export const ACTIVE = CANDIDATES.filter((c) => !c.withdrawn).map((c) => c.code);

/** Default runoff matchup: the two candidates polling highest for the second round. Update with the polls. */
export const LIKELY_RUNOFF: [CandidateCode, CandidateCode] = ["RN", "HOR"];

export const POLL_SOURCE = { label: "Ipsos, 3–9 Sep 2026", url: "https://en.wikipedia.org/wiki/Opinion_polling_for_the_2027_French_presidential_election" };

export function initials(name: string): string {
  return name.split(/[\s-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
