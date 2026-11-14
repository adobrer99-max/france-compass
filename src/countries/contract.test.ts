/* The checks every country has to pass before it ships. Runs against the
   active country (COUNTRY=<id> npm test; fr by default). */
import { describe, expect, it } from "vitest";
import { COUNTRY } from "@country/config";
import { PANELS } from "@country/panels";
import { COUNTRY_STRINGS } from "@country/strings";
import { ACTIVE, BY_CODE, CANDIDATES, LIKELY_RUNOFF } from "@country/candidates";
import { AREAS, AXES, BY_ID, STATEMENTS } from "@country/statements";
import { CHANGES, CODES } from "@country/codes";

const langs = COUNTRY.langs as readonly string[];
const RESERVED = ["candidate", "statement", "compare", "method", "lang"];

describe(`country contract: ${COUNTRY.id}`, () => {
  it("names a default language it supports, and a share file for each", () => {
    expect(langs).toContain(COUNTRY.defaultLang);
    for (const l of langs) expect((COUNTRY.shareFile as Record<string, string>)[l]).toMatch(/\.png$/);
  });

  it("has the same country strings in every language", () => {
    const strs = COUNTRY_STRINGS as Record<string, object>;
    const keys = Object.keys(strs[langs[0]]).sort();
    for (const l of langs) expect(Object.keys(strs[l]).sort()).toEqual(keys);
  });

  it("gives statements unique ids, text in every language, a known area and a sign", () => {
    const ids = STATEMENTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    const areas = new Set(AREAS.map((a) => a.id as string));
    for (const s of STATEMENTS) {
      for (const l of langs) expect((s as unknown as Record<string, string>)[l]?.length).toBeGreaterThan(10);
      expect(areas.has(s.area)).toBe(true);
      expect([1, -1]).toContain(s.sign);
    }
  });

  it("puts statements on both chart axes", () => {
    for (const ax of Object.keys(AXES)) expect(STATEMENTS.filter((s) => s.axis === ax).length).toBeGreaterThanOrEqual(4);
  });

  it("has unique candidate codes, a colour each, and a likely runoff from the field", () => {
    const codes = CANDIDATES.map((c) => c.code);
    expect(new Set(codes).size).toBe(codes.length);
    for (const c of CANDIDATES) expect(c.color).toMatch(/^#[0-9a-f]{6}$/i);
    for (const c of LIKELY_RUNOFF) expect(ACTIVE).toContain(c);
  });

  it("codes only real candidates and statements, each with an https source and a date", () => {
    for (const [code, rows] of Object.entries(CODES)) {
      expect(BY_CODE[code as keyof typeof BY_CODE]).toBeDefined();
      for (const [id, c] of Object.entries(rows ?? {})) {
        expect(BY_ID[Number(id)]).toBeDefined();
        expect(c!.src).toMatch(/^https:\/\//);
        expect(c!.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
    for (const ch of CHANGES) expect(BY_ID[ch.statement]).toBeDefined();
  });

  it("gives extra panels ids that don't clash with the built-in addresses", () => {
    const ids = PANELS.extraPanels.map((x) => x.id as string);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(RESERVED).not.toContain(id);
  });
});
