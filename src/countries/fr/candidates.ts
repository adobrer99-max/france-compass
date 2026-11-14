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
  /** latest first-round poll share, shown as context only; never used in scoring */
  poll?: string;
  /** set when the poll isn't POLL_SOURCE */
  pollFrom?: string;
  /** shown on the profile and in the method notes */
  note?: { en: string; fr: string };
  /** dropped from the field: kept in the published matrix, out of the results */
  withdrawn?: boolean;
}

export const CANDIDATES: Candidate[] = [
  {
    code: "RN", name: "Marine Le Pen", short: "Le Pen", party: "Rassemblement national",
    bloc: { en: "Far right", fr: "Extrême droite" }, color: "#0b2f6b", poll: "35–37%",
    note: {
      en: "Coded to the RN programme rather than the person. If the Court of Cassation bars Le Pen and Jordan Bardella runs, the codes stay and the name changes.",
      fr: "Codé sur le programme du RN plutôt que sur la personne. Si la Cour de cassation déclare Marine Le Pen inéligible et que Jordan Bardella se présente, les codes restent et seul le nom change.",
    },
  },
  { code: "LFI", name: "Jean-Luc Mélenchon", short: "Mélenchon", party: "La France insoumise", bloc: { en: "Radical left", fr: "Gauche radicale" }, color: "#c8102e", poll: "17.5–18%" },
  { code: "HOR", name: "Édouard Philippe", short: "Philippe", party: "Horizons", bloc: { en: "Centre right", fr: "Centre droit" }, color: "#2f6db5", poll: "9.5–15%" },
  { code: "PP", name: "Raphaël Glucksmann", short: "Glucksmann", party: "Place publique / Parti socialiste", bloc: { en: "Centre left", fr: "Centre gauche" }, color: "#c42a6d", poll: "10–13%" },
  { code: "LR", name: "Bruno Retailleau", short: "Retailleau", party: "Les Républicains", bloc: { en: "Right", fr: "Droite" }, color: "#1560bd", poll: "under 10%" },
  { code: "NE", name: "David Lisnard", short: "Lisnard", party: "Nouvelle Énergie", bloc: { en: "Libertarian right", fr: "Droite libérale" }, color: "#6a4fb3", poll: "up to 9%" },
  { code: "REN", name: "Gabriel Attal", short: "Attal", party: "Renaissance", bloc: { en: "Centre", fr: "Centre" }, color: "#8a6a00", poll: "6%", pollFrom: "Ipsos, 3–9.09.2026" },
  { code: "ECO", name: "Marine Tondelier", short: "Tondelier", party: "Les Écologistes", bloc: { en: "Green left", fr: "Gauche écologiste" }, color: "#1a7a43", poll: "3–3.5%" },
  { code: "REC", name: "Éric Zemmour", short: "Zemmour", party: "Reconquête", bloc: { en: "Far right", fr: "Extrême droite" }, color: "#3b3b46", poll: "4%", pollFrom: "Ipsos, 3–9.09.2026" },
  { code: "PCF", name: "Fabien Roussel", short: "Roussel", party: "Parti communiste français", bloc: { en: "Left", fr: "Gauche" }, color: "#9b1b1b", poll: "1.5–2%" },
  { code: "DLF", name: "Nicolas Dupont-Aignan", short: "Dupont-Aignan", party: "Debout la France", bloc: { en: "Sovereigntist right", fr: "Droite souverainiste" }, color: "#2b7a99", poll: "~2%", pollFrom: "Ifop, 22–24.06.2026" },
  { code: "DEB", name: "François Ruffin", short: "Ruffin", party: "Debout !", bloc: { en: "Left", fr: "Gauche" }, color: "#b4501f" },
  { code: "XB", name: "Xavier Bertrand", short: "Bertrand", party: "Independent (ex-LR)", bloc: { en: "Right", fr: "Droite" }, color: "#2f6fa3" },
];

export const BY_CODE = Object.fromEntries(CANDIDATES.map((c) => [c.code, c])) as Record<CandidateCode, Candidate>;
export const ACTIVE = CANDIDATES.filter((c) => !c.withdrawn).map((c) => c.code);

/** Default runoff matchup: the two candidates polling highest for the second round. Update with the polls. */
export const LIKELY_RUNOFF: [CandidateCode, CandidateCode] = ["RN", "LFI"];

export const POLL_SOURCE = { label: "Ifop / LCI, 27–29.10.2026", url: "https://www.publicsenat.fr/actualites/politique/sondage-presidentielle-2027-un-second-tour-le-pen-melenchon-assure-la-droite-et-le-bloc-central-peine-a-remonter-lisnard-confirme-sa-percee" };

export function initials(name: string): string {
  return name.split(/[\s-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}
