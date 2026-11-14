/* ============================================================
   Scoring. Pure functions, carried over from the Israel compass:
   direction-only agreement points, topic weights, a coverage floor,
   and axis positions from the raw answers.
   ============================================================ */

import { ACTIVE, BY_CODE, type CandidateCode } from "@country/candidates";
import { CODES, positionOf, type Codes, type Position } from "@country/codes";
import { AREAS, STATEMENTS, type AreaId, type Axis } from "@country/statements";

/** −2 … +2, or null for "no opinion": a skip, left out of every calculation. */
export type Answer = -2 | -1 | 0 | 1 | 2 | null;
export type Answers = Partial<Record<number, Answer>>;
/** per-area importance multiplier: 0.5 less, 1 normal, 2 more */
export type Weights = Record<AreaId, number>;

export const DEFAULT_WEIGHTS = Object.fromEntries(AREAS.map((a) => [a.id, 1])) as Weights;

/**
 * Below this share of coded statements a candidate is left out of the ranking.
 * A quarter during the beta, while programmes are still coming out; 70% at launch, as in the Israel compass.
 */
export const COVERAGE_FLOOR = 0.25;
/** Below this share of an axis's statements, a coordinate is drawn hollow. */
export const AXIS_CONFIDENCE_FLOOR = 0.5;

const dir = (n: number): -1 | 0 | 1 => (n > 0 ? 1 : n < 0 ? -1 : 0);
const dirOfPos = (p: Position): -1 | 0 | 1 => (p === "A" ? 1 : p === "D" ? -1 : 0);

/** Direction only: same side 2, one side neutral 1, opposite sides 0. */
export function agreementPoints(u: number, p: Position): 0 | 1 | 2 {
  return (2 - Math.abs(dir(u) - dirOfPos(p))) as 0 | 1 | 2;
}

export interface Match {
  code: CandidateCode;
  weighted: number;
  unweighted: number;
  /** share of all statements with a coded position */
  coverage: number;
  /** statements both coded and answered */
  compared: number;
  byArea: Record<AreaId, { pct: number; n: number }>;
}

export type AxisPoint = Record<Axis, { value: number; confidence: number }>;

const AXIS_IDS: Axis[] = ["econ", "open"];

function axisPoint(valueOf: (id: number) => number | null): AxisPoint {
  const out = {} as AxisPoint;
  for (const ax of AXIS_IDS) {
    const set = STATEMENTS.filter((s) => s.axis === ax);
    let sum = 0, n = 0;
    for (const s of set) {
      const v = valueOf(s.id);
      if (v === null) continue;
      sum += s.sign * v;
      n++;
    }
    out[ax] = { value: n ? (100 * sum) / (2 * n) : 0, confidence: set.length ? n / set.length : 0 };
  }
  return out;
}

export function userAxes(answers: Answers): AxisPoint {
  return axisPoint((id) => {
    const u = answers[id];
    return u === undefined || u === null ? null : u;
  });
}

export function candidateAxes(code: CandidateCode, codes: Codes = CODES): AxisPoint {
  return axisPoint((id) => {
    const p = positionOf(code, id, codes);
    return p === "-" ? null : dirOfPos(p) * 2;
  });
}

export function matchFor(code: CandidateCode, answers: Answers, weights: Weights, codes: Codes = CODES): Match {
  let wNum = 0, wDen = 0, uNum = 0, uDen = 0, coded = 0, compared = 0;
  const acc = Object.fromEntries(AREAS.map((a) => [a.id, { num: 0, den: 0 }])) as Record<AreaId, { num: number; den: number }>;
  for (const s of STATEMENTS) {
    const p = positionOf(code, s.id, codes);
    if (p === "-") continue;
    coded++;
    const u = answers[s.id];
    if (u === undefined || u === null) continue;
    compared++;
    const pts = agreementPoints(u, p);
    const w = weights[s.area] ?? 1;
    wNum += w * pts; wDen += w * 2;
    uNum += pts; uDen += 2;
    acc[s.area].num += pts; acc[s.area].den += 2;
  }
  const byArea = Object.fromEntries(
    AREAS.map((a) => [a.id, { pct: acc[a.id].den ? (acc[a.id].num / acc[a.id].den) * 100 : 0, n: acc[a.id].den / 2 }]),
  ) as Record<AreaId, { pct: number; n: number }>;
  return {
    code,
    weighted: wDen ? (wNum / wDen) * 100 : 0,
    unweighted: uDen ? (uNum / uDen) * 100 : 0,
    coverage: coded / STATEMENTS.length,
    compared,
    byArea,
  };
}

export interface Result {
  ranked: Match[];
  lowCoverage: Match[];
  all: Record<CandidateCode, Match>;
  user: AxisPoint;
  axes: Record<CandidateCode, AxisPoint>;
  answered: number;
  skipped: number;
}

export function score(answers: Answers, weights: Weights = DEFAULT_WEIGHTS, codes: Codes = CODES): Result {
  let answered = 0, skipped = 0;
  for (const s of STATEMENTS) {
    const u = answers[s.id];
    if (u === null) skipped++;
    else if (u !== undefined) answered++;
  }
  const all = {} as Record<CandidateCode, Match>;
  const axes = {} as Record<CandidateCode, AxisPoint>;
  for (const c of ACTIVE) {
    all[c] = matchFor(c, answers, weights, codes);
    axes[c] = candidateAxes(c, codes);
  }
  const rows = ACTIVE.map((c) => all[c]);
  const by = (a: Match, b: Match) => b.weighted - a.weighted || BY_CODE[a.code].name.localeCompare(BY_CODE[b.code].name);
  return {
    ranked: rows.filter((r) => r.coverage >= COVERAGE_FLOOR).sort(by),
    lowCoverage: rows.filter((r) => r.coverage < COVERAGE_FLOOR).sort(by),
    all,
    user: userAxes(answers),
    axes,
    answered,
    skipped,
  };
}

/** Statements where two candidates are coded on opposite sides, or one coded and one neutral. */
export function splits(a: CandidateCode, b: CandidateCode, codes: Codes = CODES) {
  return STATEMENTS.map((s) => ({ s, pa: positionOf(a, s.id, codes), pb: positionOf(b, s.id, codes) }))
    .filter(({ pa, pb }) => pa !== "-" && pb !== "-" && pa !== pb);
}

/** Statements where you and a candidate sit on flatly opposite sides. */
export function opposites(code: CandidateCode, answers: Answers, codes: Codes = CODES) {
  return STATEMENTS.filter((s) => {
    const p = positionOf(code, s.id, codes);
    const u = answers[s.id];
    return p !== "-" && u !== undefined && u !== null && agreementPoints(u, p) === 0;
  });
}

/** The area you agree with a candidate on most and least, if there's a real difference. */
export function bestWorst(m: Match): { best: AreaId; bestPct: number; worst: AreaId; worstPct: number } | null {
  const xs = AREAS.map((a) => ({ id: a.id, ...m.byArea[a.id] })).filter((x) => x.n >= 2).sort((x, y) => y.pct - x.pct);
  if (xs.length < 2) return null;
  const best = xs[0], worst = xs[xs.length - 1];
  if (Math.round(best.pct) === Math.round(worst.pct)) return null;
  return { best: best.id, bestPct: best.pct, worst: worst.id, worstPct: worst.pct };
}

export function gridDistance(u: AxisPoint, c: AxisPoint): number {
  const dx = u.econ.value - c.econ.value;
  const dy = u.open.value - c.open.value;
  return Math.sqrt(dx * dx + dy * dy);
}
