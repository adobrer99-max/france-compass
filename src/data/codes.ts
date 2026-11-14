/* ============================================================
   Candidate positions: one code per candidate per statement.

     A  agree — has clearly taken that side
     D  disagree — has clearly taken the other side
     N  neutral or mixed — genuinely split, or deliberately vague
     -  no position on record (the default: anything not listed
        here). Left out of that candidate's match entirely.

   Every code carries a dated source. Sources, in order of weight:
   the 2027 programme; what they've said since declaring; the 2024
   legislative platform; their party's votes in the Assembly;
   cross-checks against Le Monde and Institut Montaigne.

   Rules: never fill a gap from party family. When the candidate's
   own words and the party record differ, go with the candidate and
   say so in `note`. Codes stay `provisional` until the campaign has
   had a week to reply and the colleague in France has checked them.
   ============================================================ */

import type { CandidateCode } from "./candidates";

export type Position = "A" | "N" | "D" | "-";

export interface Code {
  p: Exclude<Position, "-">;
  /** where the position is on record */
  src: string;
  /** what the source is, in a few words: "2024 programme, p. 12" */
  label: string;
  /** ISO date of the source */
  date: string;
  provisional?: boolean;
  note?: string;
}

export type Codes = Partial<Record<CandidateCode, Partial<Record<number, Code>>>>;

/* ---- Sources for the first pass (November 2026) ---- */
type S = Pick<Code, "src" | "label" | "date">;
const IF: S = { src: "https://www.ifrap.org/comparateurs/presidentielles-2027", label: "Fondation iFRAP, 2027 programme comparator (consulted 13 Nov 2026)", date: "2026-11-13" };
const IM22: S = { src: "https://www.institutmontaigne.org/presidentielle-2022/marine-le-pen/synthese/", label: "Institut Montaigne, Le Pen 2022 programme", date: "2022-04-01" };
const RN24: S = { src: "https://lcp.fr/actualites/legislatives-2024-pouvoir-d-achat-immigration-ecole-jordan-bardella-devoile-le-programme", label: "LCP, RN 2024 legislative programme", date: "2024-06-24" };
const INST22: S = { src: "https://www.publicsenat.fr/actualites/politique/la-reforme-des-institutions-au-coeur-du-duel-macron-le-pen-202480", label: "Public Sénat, Le Pen's institutional reforms", date: "2022-04-13" };
const UKR24: S = { src: "https://voanews.com/a/french-far-right-leader-bardella-backs-ukraine-but-would-not-send-long-range-missiles/7661784.html", label: "VOA, Bardella on Ukraine", date: "2024-06-19" };
const FDV: S = { src: "https://lcp.fr/actualites/aide-a-mourir-qui-a-vote-quoi-a-l-assemblee-nationale-431842", label: "LCP, Assembly vote on assisted dying (party's deputies)", date: "2026-02-25" };

/** [statement, position, source, note?] */
type Row = [number, "A" | "N" | "D", S, string?];

const rows = (list: Row[]) =>
  Object.fromEntries(list.map(([id, p, src, note]) => [id, { p, ...src, provisional: true, ...(note ? { note } : {}) }])) as Partial<Record<number, Code>>;

/** First coding pass, all provisional until the colleague in France has checked them. */
export const CODES: Codes = {
  RN: rows([
    [1, "A", IF, "As a tax on financial wealth (IFF) replacing the property-wealth tax"],
    [3, "A", IM22, "Abolish the CFE and cut production taxes"],
    [5, "D", IF, "Exempts family inheritances of property up to €300,000"],
    [7, "A", IF, "62, and 60 for those who started work before 20"],
    [9, "A", IF, "Benefits suspended for missed monthly check-ins"],
    [11, "A", IF, "200,000 posts cut or not renewed"],
    [13, "A", RN24],
    [14, "A", RN24],
    [15, "A", IF, "Replaced by emergency-only care"],
    [16, "A", RN24],
    [17, "A", RN24, "Systematic removal of foreign offenders"],
    [18, "A", IF, "Family benefits reserved to households with a French parent"],
    [19, "A", IF, "30,000 more places"],
    [20, "A", IF],
    [26, "N", UKR24, "Backs Ukraine's defence but no long-range missiles"],
    [27, "A", IM22, "2022 programme; not restated since"],
    [30, "A", IF, "Exclude agriculture from all free-trade deals"],
    [31, "A", IF],
    [32, "A", IF, "Gradually dismantle existing wind farms"],
    [35, "A", IF, "Allow pesticides where there's no alternative"],
    [38, "A", INST22, "Two-thirds of seats, likely with a majority bonus"],
    [39, "A", INST22, "500,000 signatures"],
    [40, "A", INST22, "Single seven-year term"],
    [43, "D", FDV, "102 of 122 RN deputies voted against"],
    [45, "A", IF, "Primary and middle school"],
    [46, "A", IF, "Legal ban on the Islamic headscarf in public"],
    [48, "A", IM22],
  ]),
  LFI: rows([
    [1, "A", IF, "Restore the ISF with a climate component"],
    [4, "A", IF, "Net SMIC to €1,700 at once"],
    [5, "A", IF, "100% above €12m"],
    [7, "A", IF, "62, then 60"],
    [9, "D", IF, "Benefits from day one; end sanctions for missed appointments"],
    [10, "D", IF, "Restore the 35-hour week"],
    [11, "D", IF],
    [13, "D", IF, "Full birthright citizenship, regularise undocumented workers"],
    [14, "D", IF],
    [15, "D", IF, "Guarantee access to AME"],
    [18, "D", IF],
    [21, "D", IF, "Return to the primacy of education (1945 ordinance)"],
    [22, "D", IF, "Ban it in public spaces"],
    [23, "A", IF, "Under a state monopoly"],
    [27, "A", IF],
    [29, "A", IF, "Calls for sanctions on the Netanyahu government"],
    [31, "D", IF, "Close plants progressively, stop EPR2"],
    [32, "D", IF, "45 GW offshore wind by 2050"],
    [37, "A", IF],
    [38, "A", IF],
    [39, "A", IF],
    [41, "A", IF],
    [42, "A", IF, "New Caledonian independence by 2028"],
    [43, "A", FDV, "62 of 71 LFI deputies voted for"],
    [45, "D", IF, "End the uniform experiment"],
    [47, "N", IF, "Repeal the Carle law, penalise segregating private schools"],
    [48, "D", IF, "Elect the heads of public broadcasters"],
  ]),
  HOR: rows([
    [3, "A", IF, "Cut production taxes by €50bn a year"],
    [5, "D", IF, "Raise donation allowances, keep the Dutreil pact"],
    [7, "D", IF, "Raise the age to 65"],
    [8, "A", IF, "Early exit for one in three workers, by job hardship"],
    [11, "A", IF, "250,000 posts over five years"],
    [13, "A", IF, "Quotas, restrict family immigration"],
    [14, "N", IF, "Suspend it in Mayotte only"],
    [17, "A", IF, "Immediate expulsion of foreign offenders; return centres"],
    [19, "A", IF],
    [20, "A", IF, "For serious offences"],
    [21, "A", IF, "For drug trafficking: lift the minority excuse"],
    [22, "A", IF, "Targeted use in a 'narco state of emergency'"],
    [31, "A", IF],
    [35, "A", IF, "No over-transposition of EU farm rules"],
    [43, "N", FDV, "Horizons deputies split, 14 for and 18 against"],
  ]),
  PP: rows([
    [1, "A", IF, "Zucman tax: 2% minimum on fortunes over €100m"],
    [4, "A", IF, "Net SMIC to €1,700"],
    [5, "A", IF, "Top rate 50% above €1.8m"],
    [7, "A", IF],
    [8, "A", IF, "Job hardship at the centre of any reform"],
    [9, "D", IF, "Repeal the Macron unemployment reform"],
    [13, "D", IF, "Regularise undocumented workers, repeal the 2024 law"],
    [23, "N", IF, "A citizens' convention on drugs, legalisation included"],
    [26, "A", IF, "Drastically increase military aid"],
    [28, "N", IF, "A €500bn European defence fund, not an army"],
    [31, "N", IF, "Extend existing reactors"],
    [36, "D", IF, "Net zero by 2050"],
    [37, "A", IF, "A constituent process"],
    [41, "A", IF, "Replace it with a constructive censure motion"],
    [43, "A", FDV, "Party record: 60 of 69 PS deputies voted for"],
    [47, "N", IF, "Bring private schools into the school map"],
  ]),
  LR: rows([
    [3, "A", IF, "Cut production taxes by €15bn"],
    [5, "D", IF, "Exemptions for young heirs"],
    [7, "D", IF, "Minimum 63, full pension at 65"],
    [8, "A", IF, "Hardship rules set job by job"],
    [10, "A", IF],
    [11, "A", IF, "Don't replace 600,000 retirements over ten years"],
    [13, "A", IF, "Visa and residence quotas set by law"],
    [14, "A", IF],
    [17, "A", IF, "Mandatory expulsion written into the Constitution"],
    [18, "N", IF, "Benefits after five years of legal residence and work"],
    [20, "A", IF, "For violence against people in authority"],
    [22, "A", IF],
    [25, "A", IF, "In some cases"],
    [31, "A", IF],
    [32, "A", IF, "End subsidies for onshore wind and solar"],
    [35, "A", IF, "Ban over-transposition, scrap the precautionary principle"],
    [39, "A", IF, "Halve the signature threshold"],
    [43, "D", FDV, "Party record: 42 of 49 Droite républicaine deputies voted against"],
  ]),
  NE: rows([
    [1, "D", IF, "Abolish the IFI"],
    [3, "A", IF, "Corporate tax to 20%"],
    [5, "D", IF],
    [7, "D", IF, "Legal age 65"],
    [11, "A", IF, "Cut half of the state's 1,200 agencies"],
    [13, "A", IF, "Quotas by economic need, tighter family reunification"],
    [15, "A", IF],
    [17, "A", IF],
    [18, "N", IF, "After five years of legal residence"],
    [20, "A", IF],
    [21, "A", IF, "Criminal majority at 16"],
    [24, "A", IF, "Ban the Muslim Brotherhood"],
    [25, "A", IF, "Review the hierarchy of norms"],
    [31, "A", IF],
    [35, "A", IF],
    [46, "A", IF],
    [47, "D", IF, "A school allowance usable at private schools"],
  ]),
  REN: rows([
    [2, "A", IF, "A constitutional golden rule on balanced budgets"],
    [3, "A", IF, "Abolish the CVAE"],
    [5, "D", IF],
    [7, "D", IF, "Remove the legal age, keep contribution length"],
    [9, "A", IF, "Reform unemployment insurance to push people into work"],
    [11, "A", IF, "100,000 posts through voluntary departures"],
    [30, "A", IF],
    [31, "A", IF, "One EPR a year"],
    [36, "D", IF, "Net zero by 2050"],
    [43, "A", FDV, "Party record: 64 of 92 EPR deputies voted for"],
  ]),
  ECO: rows([
    [1, "A", IF],
    [5, "A", IF],
    [7, "A", IF, "62, then 60"],
    [8, "A", IF, "Restore the four hardship criteria"],
    [9, "D", IF],
    [13, "D", IF],
    [14, "D", IF],
    [15, "D", IF],
    [19, "D", IF, "Moratorium on new prisons"],
    [21, "D", IF],
    [22, "D", IF],
    [23, "A", IF],
    [26, "A", IF, "\"Support Ukraine\""],
    [30, "A", IF, "No trade deal that fails climate criteria"],
    [31, "D", IF, "Phase out nuclear over 20 years"],
    [37, "A", IF, "A constituent assembly"],
    [41, "A", IF],
    [43, "A", FDV, "Party record: 35 of 38 ecologist deputies voted for"],
    [47, "N", IF, "Cut public funding of private schools to 50%"],
  ]),
  REC: rows([
    [1, "D", IF],
    [3, "A", IF],
    [5, "D", IF, "Abolish inheritance duties"],
    [11, "A", IF, "Don't replace 800,000 posts"],
    [13, "A", IF, "Two million fewer immigrants"],
    [14, "A", IF],
    [15, "A", IF],
    [16, "A", IF, "Migration law by referendum"],
    [17, "A", IF],
    [18, "A", IF],
    [19, "A", IF, "100,000 places"],
    [20, "A", IF],
    [31, "A", IF],
    [32, "A", IF, "End public support for renewables"],
    [47, "D", IF],
    [48, "A", IF],
  ]),
  PCF: rows([
    [1, "A", IF],
    [4, "A", IF, "SMIC to €2,200 gross"],
    [5, "A", IF],
    [6, "A", IF, "Nationalise EDF, Engie and Total"],
    [11, "D", IF, "Recruit 500,000 civil servants"],
    [27, "A", IF, "\"Refuse alignment on NATO\""],
    [29, "A", IF, "Sanctions on the Israeli government"],
    [31, "A", IF],
    [43, "A", FDV, "Party record: 11 of 17 GDR deputies voted for"],
  ]),
  DLF: rows([
    [1, "A", IF, "On very large fortunes, excluding the main home"],
    [5, "N", IF, "Exempts business transfers only"],
    [13, "A", IF],
    [14, "A", IF, "By referendum"],
    [15, "A", IF],
    [18, "A", IF],
    [19, "A", IF, "40,000 places"],
    [20, "A", IF],
    [25, "A", IF],
    [26, "D", IF, "Seek peace and renew partnership with Russia"],
    [27, "A", IF],
    [30, "A", IF],
    [31, "A", IF],
    [32, "A", IF, "End state aid for wind"],
    [33, "A", IF],
    [45, "A", IF],
  ]),
  DEB: rows([
    [8, "A", IF, "Extra quarters for exposed jobs"],
  ]),
};

export function positionOf(code: CandidateCode, id: number, codes: Codes = CODES): Position {
  return codes[code]?.[id]?.p ?? "-";
}

/** Log of every change after the first pass, newest first, as the Israel compass keeps one. */
export const CHANGES: { date: string; candidate: CandidateCode; statement: number; from: Position; to: Position; why: string }[] = [];
