/* ============================================================
   Results across countries. Every compass on adamdobrer.ca shares
   one browser origin, so each saves a short summary of the reader's
   result under one key, and each results page (and the compasses hub)
   can show the others side by side. Nothing leaves the browser.
   ============================================================ */

export const ACROSS_KEY = "compass-summaries-v1";

export interface Summary {
  country: string;
  title: Record<string, string>;
  url: string;
  at: string;
  econ: number;
  open: number;
  top: { name: string; color: string; pct: number }[];
}

export function readSummaries(): Record<string, Summary> {
  try {
    const raw = localStorage.getItem(ACROSS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, Summary>) : {};
  } catch {
    return {};
  }
}

export function saveSummary(s: Summary): void {
  try {
    localStorage.setItem(ACROSS_KEY, JSON.stringify({ ...readSummaries(), [s.country]: s }));
  } catch { /* storage blocked: the card just stays empty */ }
}

export function clearSummary(country: string): void {
  try {
    const all = readSummaries();
    delete all[country];
    localStorage.setItem(ACROSS_KEY, JSON.stringify(all));
  } catch { /* ignore */ }
}
