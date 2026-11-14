/* Saved progress and shareable addresses. Storage can be blocked, so every
   read and write is wrapped; the app works without it. */

import type { CandidateCode } from "../data/candidates";
import { BY_CODE } from "../data/candidates";
import { BY_ID } from "../data/statements";
import { DEFAULT_WEIGHTS, type Answers, type Weights } from "./scoring";

export type Stage = "intro" | "quiz" | "weights" | "results";

export interface Session {
  index: number;
  answers: Answers;
  weights: Weights;
  stage: Stage;
}

const KEY = "fc-session-v1";

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

/** Panels with an address of their own: ?candidate=RN, ?statement=12, ?compare=RN,HOR, ?method */
export type Panel =
  | null
  | { kind: "candidate"; code: CandidateCode }
  | { kind: "statement"; id: number }
  | { kind: "compare"; a: CandidateCode; b: CandidateCode }
  | { kind: "method" };

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
  return null;
}

export function writePanel(p: Panel) {
  const q = new URLSearchParams(window.location.search);
  ["candidate", "statement", "compare", "method"].forEach((k) => q.delete(k));
  if (p?.kind === "candidate") q.set("candidate", p.code);
  if (p?.kind === "statement") q.set("statement", String(p.id));
  if (p?.kind === "compare") q.set("compare", `${p.a},${p.b}`);
  if (p?.kind === "method") q.set("method", "");
  const s = q.toString().replace(/=(&|$)/g, "$1");
  try { history.replaceState(null, "", s ? `?${s}` : window.location.pathname); } catch { /* sandboxed */ }
}

export function writeLang(lang: string) {
  const q = new URLSearchParams(window.location.search);
  q.set("lang", lang);
  try { history.replaceState(null, "", `?${q.toString().replace(/=(&|$)/g, "$1")}`); } catch { /* sandboxed */ }
  try { localStorage.setItem("fc-lang", lang); } catch { /* storage blocked */ }
}
