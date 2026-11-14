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

/** First coding pass not started yet: every position is "no position on record". */
export const CODES: Codes = {};

export function positionOf(code: CandidateCode, id: number, codes: Codes = CODES): Position {
  return codes[code]?.[id]?.p ?? "-";
}

/** Log of every change after the first pass, newest first, as the Israel compass keeps one. */
export const CHANGES: { date: string; candidate: CandidateCode; statement: number; from: Position; to: Position; why: string }[] = [];
