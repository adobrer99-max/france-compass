import { useEffect, useRef, type ReactNode } from "react";
import { BY_CODE, initials, type CandidateCode } from "@country/candidates";
import type { Position } from "@country/codes";
import { STRINGS, useLang, type Lang } from "../i18n";
import { COUNTRY } from "@country/config";

/** Initials on the candidate's colour, standing in until photos with permission are in. */
export function Avatar({ code, size = 36 }: { code: CandidateCode; size?: number }) {
  const c = BY_CODE[code];
  return (
    <span
      className="avatar"
      aria-hidden="true"
      style={{ width: size, height: size, background: c.color, fontSize: size * 0.38 }}
    >
      {initials(c.name)}
    </span>
  );
}

export function CodeChip({ p, title, weak }: { p: Position; title?: string; weak?: boolean }) {
  const { t } = useLang();
  const short = p === "-" ? "–" : p === "A" ? "+" : p === "D" ? "−" : "~";
  return (
    <span className={`code code-${p === "-" ? "none" : p}${weak ? " code-weak" : ""}`} title={title ?? t.positions[p]} aria-label={t.positions[p]}>
      {short}
    </span>
  );
}

/** Bottom sheet for candidate, statement, compare and method panels. */
export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); }
    };
    window.addEventListener("keydown", onKey, true);
    ref.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey, true); document.body.style.overflow = prev; };
  }, [onClose]);
  return (
    <div className="sheet-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} ref={ref} tabIndex={-1}>
        <div className="sheet-head">
          <h2>{title}</h2>
          <button className="chip" onClick={onClose}>{t.close}</button>
        </div>
        <div style={{ marginTop: 14 }}>{children}</div>
      </div>
    </div>
  );
}

/** Cycles through the country's languages; the label is in the language it switches to. */
export function LangSwitch() {
  const { lang, setLang } = useLang();
  const langs = COUNTRY.langs as readonly Lang[];
  const next = langs[(langs.indexOf(lang) + 1) % langs.length];
  return (
    <button className="chip lang" onClick={() => setLang(next)} lang={next}>
      {STRINGS[next].langSwitch}
    </button>
  );
}

export function MatchBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="match-track" aria-hidden="true">
      <div className="match-fill" style={{ width: `${Math.max(0, Math.min(100, value))}%`, background: color }} />
    </div>
  );
}
