import { describe, expect, it } from "vitest";
import { ACTIVE, CANDIDATES, LIKELY_RUNOFF } from "./candidates";
import { CODES, type Codes } from "./codes";
import { AREAS, STATEMENTS } from "./statements";
import { STRINGS } from "../../i18n";
import { agreementPoints, candidateAxes, DEFAULT_WEIGHTS, matchFor, score, splits, userAxes, type Answers } from "../../lib/scoring";

describe("statement bank", () => {
  it("has 64 statements numbered 1–64 in order", () => {
    expect(STATEMENTS.map((s) => s.id)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
  });
  it("has English and French for every statement, and they differ", () => {
    for (const s of STATEMENTS) {
      expect(s.en.trim().length).toBeGreaterThan(10);
      expect(s.fr.trim().length).toBeGreaterThan(10);
      expect(s.fr).not.toEqual(s.en);
    }
  });
  it("puts 1–12, 54 and 56 on the economic axis and 13–18, 25–28, 30 on open–nationalist", () => {
    const on = (ax: string) => STATEMENTS.filter((s) => s.axis === ax).map((s) => s.id);
    expect(on("econ")).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 54, 56]);
    expect(on("open")).toEqual([13, 14, 15, 16, 17, 18, 25, 26, 27, 28, 30, 62, 63]);
  });
  it("has the expected number of statements in each area", () => {
    const n = { eco: 9, work: 6, imm: 6, sec: 7, eur: 9, nrg: 8, ins: 7, soc: 7, afr: 5 } as Record<string, number>;
    for (const a of AREAS) expect(STATEMENTS.filter((s) => s.area === a.id).length).toBe(n[a.id]);
  });
  it("only codes candidates and statements that exist, each with a dated source", () => {
    for (const [code, rows] of Object.entries(CODES)) {
      expect(CANDIDATES.some((c) => c.code === code)).toBe(true);
      for (const [id, c] of Object.entries(rows ?? {})) {
        expect(STATEMENTS.some((s) => s.id === Number(id))).toBe(true);
        expect(c!.src).toMatch(/^https?:\/\//);
        expect(c!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });
  it("has the runoff pair in the field", () => {
    for (const c of LIKELY_RUNOFF) expect(ACTIVE).toContain(c);
  });
  it("has every UI string in both languages", () => {
    expect(Object.keys(STRINGS.fr).sort()).toEqual(Object.keys(STRINGS.en).sort());
    expect(STRINGS.fr.methodBody.length).toBe(STRINGS.en.methodBody.length);
  });
});

/** A made-up field for testing the maths only. */
const all = (p: "A" | "D" | "N") => Object.fromEntries(STATEMENTS.map((s) => [s.id, { p, src: "https://example.org", label: "test", date: "2026-11-13" }]));
const FAKE: Codes = { RN: all("A"), LFI: all("D"), HOR: all("N") };

describe("scoring", () => {
  it("gives 2 points for the same side, 1 when one is neutral, 0 for opposite", () => {
    expect(agreementPoints(2, "A")).toBe(2);
    expect(agreementPoints(1, "A")).toBe(2);
    expect(agreementPoints(0, "A")).toBe(1);
    expect(agreementPoints(-1, "N")).toBe(1);
    expect(agreementPoints(-2, "A")).toBe(0);
  });
  it("matches 100% when you agree with everything a candidate agrees with", () => {
    const answers: Answers = Object.fromEntries(STATEMENTS.map((s) => [s.id, 2]));
    expect(matchFor("RN", answers, DEFAULT_WEIGHTS, FAKE).weighted).toBe(100);
    expect(matchFor("LFI", answers, DEFAULT_WEIGHTS, FAKE).weighted).toBe(0);
    expect(matchFor("HOR", answers, DEFAULT_WEIGHTS, FAKE).weighted).toBe(50);
  });
  it("leaves skipped statements out instead of counting them as neutral", () => {
    const answers: Answers = { 1: 2, 2: null };
    const m = matchFor("RN", answers, DEFAULT_WEIGHTS, FAKE);
    expect(m.compared).toBe(1);
    expect(m.weighted).toBe(100);
  });
  it("weights topics: an area marked 'more' counts double", () => {
    const answers: Answers = { 1: 2, 13: -2 }; // agrees with RN on eco, opposes on imm
    const even = matchFor("RN", answers, DEFAULT_WEIGHTS, FAKE).weighted;
    const eco = matchFor("RN", answers, { ...DEFAULT_WEIGHTS, eco: 2 }, FAKE).weighted;
    expect(even).toBe(50);
    expect(eco).toBeCloseTo(66.67, 1);
  });
  it("doesn't rank a candidate with under 70% coded", () => {
    const r = score({ 1: 2 }, DEFAULT_WEIGHTS, FAKE);
    expect(r.ranked.map((m) => m.code)).toEqual(["RN", "HOR", "LFI"]);
    expect(r.lowCoverage.map((m) => m.code)).toContain("PP");
  });
  it("places the axes with the right signs", () => {
    // Agreeing with everything: on econ, 5 statements push right and 9 push left.
    const yes: Answers = Object.fromEntries(STATEMENTS.map((s) => [s.id, 2]));
    const u = userAxes(yes);
    expect(Math.round(u.econ.value)).toBe(Math.round((100 * (5 - 9)) / 14));
    expect(u.econ.confidence).toBe(1);
    expect(candidateAxes("RN", FAKE).open.value).toBeCloseTo(u.open.value);
  });
  it("lists the statements two candidates split on", () => {
    expect(splits("RN", "LFI", FAKE).length).toBe(64);
    expect(splits("RN", "PP", FAKE).length).toBe(0);
  });
  it("runs on the real (still empty) codes without ranking anyone", () => {
    const r = score({ 1: 1 });
    expect(r.answered).toBe(1);
    if (Object.keys(CODES).length === 0) expect(r.ranked.length).toBe(0);
  });
});

import { listFor, QUICK } from "../../lib/quick";
describe("quick version", () => {
  it("asks three statements per topic, and the rest covers everything else", () => {
    expect(QUICK.length).toBe(AREAS.length * 3);
    for (const a of AREAS) expect(QUICK.filter((s) => s.area === a.id).length).toBe(3);
    const all = [...listFor("quick"), ...listFor("rest")].map((s) => s.id).sort((x, y) => x - y);
    expect(all).toEqual(STATEMENTS.map((s) => s.id));
  });
});
