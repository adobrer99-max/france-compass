/* The quick version: the statements that split the field most, a few per
   topic, for readers who want a result in about five minutes. Worked out
   from the codes, so it follows the codes as they change. Offered only
   when a country has enough statements for a shorter set to make sense. */

import { ACTIVE } from "@country/candidates";
import { positionOf } from "@country/codes";
import * as BANK from "@country/statements";
import { AREAS, STATEMENTS, type Statement } from "@country/statements";

export type Mode = "full" | "quick" | "rest";

/** Countries with fewer statements than this get no quick version. */
export const QUICK_MIN = 40;
export const PER_AREA = 3;

/** Statements in topic order, so each topic's statements come together. */
export const ORDERED: Statement[] = AREAS.flatMap((a) => STATEMENTS.filter((s) => s.area === a.id));

/** How well a statement separates the field: candidates on both sides count most. */
function splitScore(id: number): number {
  let a = 0, d = 0, n = 0;
  for (const c of ACTIVE) {
    const p = positionOf(c, id);
    if (p === "A") a++;
    else if (p === "D") d++;
    else if (p === "N") n++;
  }
  return Math.min(a, d) * 2 + n * 0.5 + (a + d + n) * 0.1;
}

/** A country can pick its own quick set (`QUICK_IDS` in its statements file); otherwise it's worked out. */
const PICKED = (BANK as { QUICK_IDS?: number[] }).QUICK_IDS;

export const QUICK: Statement[] = STATEMENTS.length < QUICK_MIN ? [] : PICKED
  ? AREAS.flatMap((a) => STATEMENTS.filter((s) => s.area === a.id && PICKED.includes(s.id)))
  : AREAS.flatMap((a) =>
  STATEMENTS.filter((s) => s.area === a.id)
    .map((s) => ({ s, k: splitScore(s.id) }))
    .sort((x, y) => y.k - x.k || x.s.id - y.s.id)
    .slice(0, PER_AREA)
    .map((x) => x.s)
    .sort((x, y) => x.id - y.id),
);

const QUICK_IDS = new Set(QUICK.map((s) => s.id));

export function listFor(mode: Mode = "full"): Statement[] {
  if (mode === "quick") return QUICK;
  if (mode === "rest") return ORDERED.filter((s) => !QUICK_IDS.has(s.id));
  return ORDERED;
}

/** Minutes, at about twelve seconds a statement. */
export const minutesFor = (n: number) => Math.max(1, Math.round(n / 5));
