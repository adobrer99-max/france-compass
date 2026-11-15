import { CANDIDATES, type CandidateCode } from "./candidates";
import { COVERAGE_FLOOR, type Result } from "../../lib/scoring";

/** Your match with an alliance: its ranked members' matches, weighted by poll share. */
export function allianceMatch(result: Result, members: CandidateCode[]): number | null {
  const scored = CANDIDATES.filter((c) => members.includes(c.code) && result.all[c.code].coverage >= COVERAGE_FLOOR && result.all[c.code].compared > 0);
  const w = scored.reduce((s, c) => s + c.pollShare, 0);
  return w ? scored.reduce((s, c) => s + c.pollShare * result.all[c.code].weighted, 0) / w : null;
}

/** The reported line-up's alliance you're closest to, or null if neither has enough positions. */
export function closestAlliance(result: Result): { id: "cdx" | "csx"; pct: number } | null {
  const of = (id: "cdx" | "csx") => allianceMatch(result, CANDIDATES.filter((c) => !c.withdrawn && c.alliance === id).map((c) => c.code));
  const cdx = of("cdx"), csx = of("csx");
  if (cdx === null && csx === null) return null;
  if (csx === null || (cdx !== null && cdx >= csx)) return { id: "cdx", pct: cdx! };
  return { id: "csx", pct: csx };
}
