/* Saved progress and shareable addresses. Storage can be blocked, so every
   read and write is wrapped; the app works without it. */

import type { CandidateCode } from "@country/candidates";
import { BY_CODE } from "@country/candidates";
import { BY_ID } from "@country/statements";
import { COUNTRY } from "@country/config";
import { PANELS } from "@country/panels";
import { DEFAULT_WEIGHTS, type Answers, type Weights } from "./scoring";

export type Stage = "intro" | "quiz" | "weights" | "results";

export interface Session {
  index: number;
  answers: Answers;
  weights: Weights;
  stage: Stage;
}

const KEY = `${COUNTRY.storagePrefix}-session-v1`;

export const fresh = (): Session => ({ index: 0, answers: {}, weights: { ...DEFAULT_WEIGHTS }, stage: "intro" });

export function load(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Session;
    return { ...fresh(), ...s, weights: { ...DEFAULT_WEIGHTS, ...s.weights } };
  } catch {
    return null;
  }
}

export function save(s: Session) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* storage blocked */ }
}

export function clear() {
  try { localStorage.removeItem(KEY); } catch { /* storage blocked */ }
}

/** Panels with an address of their own: ?candidate=RN, ?statement=12, ?compare=RN,LFI, ?method,
 *  plus the country's extra panels at ?<id> (France: ?firewall, ?history). */
export type Panel =
  | null
  | { kind: "candidate"; code: CandidateCode }
  | { kind: "statement"; id: number }
  | { kind: "compare"; a: CandidateCode; b: CandidateCode }
  | { kind: "method" }
  | { kind: "extra"; id: string };

const EXTRA_IDS: string[] = PANELS.extraPanels.map((x) => x.id);

const isCode = (x: string | null): x is CandidateCode => !!x && x in BY_CODE;

export function readPanel(search: string): Panel {
  const q = new URLSearchParams(search);
  const c = q.get("candidate");
  if (isCode(c)) return { kind: "candidate", code: c };
  const s = Number(q.get("statement"));
  if (s && BY_ID[s]) return { kind: "statement", id: s };
  const [a, b] = (q.get("compare") ?? "").split(",");
  if (isCode(a) && isCode(b)) return { kind: "compare", a, b };
  if (q.has("method")) return { kind: "method" };
  const extra = EXTRA_IDS.find((id) => q.has(id));
  if (extra) return { kind: "extra", id: extra };
  return null;
}

export function writePanel(p: Panel) {
  const q = new URLSearchParams(window.location.search);
  ["candidate", "statement", "compare", "method", ...EXTRA_IDS].forEach((k) => q.delete(k));
  if (p?.kind === "candidate") q.set("candidate", p.code);
  if (p?.kind === "statement") q.set("statement", String(p.id));
  if (p?.kind === "compare") q.set("compare", `${p.a},${p.b}`);
  if (p?.kind === "method") q.set("method", "");
  if (p?.kind === "extra") q.set(p.id, "");
  const s = q.toString().replace(/=(&|$)/g, "$1");
  try { history.replaceState(null, "", s ? `?${s}` : window.location.pathname); } catch { /* sandboxed */ }
}

export function writeLang(lang: string) {
  const q = new URLSearchParams(window.location.search);
  q.set("lang", lang);
  try { history.replaceState(null, "", `?${q.toString().replace(/=(&|$)/g, "$1")}`); } catch { /* sandboxed */ }
  try { localStorage.setItem(`${COUNTRY.storagePrefix}-lang`, lang); } catch { /* storage blocked */ }
}
