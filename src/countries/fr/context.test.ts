import { describe, expect, it } from "vitest";
import { ACTIVE } from "./candidates";
import { ELECTIONS, FIREWALL, TRANSFERS } from "./context";

describe("context data", () => {
  it("has a firewall row for every candidate in the field", () => {
    expect(FIREWALL.map((r) => r.code).sort()).toEqual([...ACTIVE].sort());
  });
  it("sources every claim with a link", () => {
    for (const r of FIREWALL) for (const ev of r.record) expect(ev.src.url).toMatch(/^https:\/\//);
    for (const e of ELECTIONS) { expect(e.src.length).toBeGreaterThan(0); e.src.forEach((s) => expect(s.url).toMatch(/^https:\/\//)); }
    for (const t of TRANSFERS) expect(t.src.url).toMatch(/^https:\/\//);
  });
  it("has runoff results that add up to 100", () => {
    for (const e of ELECTIONS) if (e.r2) expect(e.r2.reduce((s, x) => s + x.pct, 0)).toBeCloseTo(100, 1);
  });
  it("never has transfers over 100%", () => {
    for (const t of TRANSFERS) for (const r of t.rows) expect(r.toWinner + r.toFarRight).toBeLessThanOrEqual(100);
  });
});
