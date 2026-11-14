import { useEffect, useRef, type ReactNode } from "react";
import { BY_CODE, initials, type CandidateCode } from "../data/candidates";
import type { Position } from "../data/codes";
import { useLang } from "../i18n";

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

export function CodeChip({ p, title }: { p: Position; title?: string }) {
  const { t } = useLang();
  const short = p === "-" ? "–" : p === "A" ? "+" : p === "D" ? "−" : "~";
  return (
    <span className={`code code-${p === "-" ? "none" : p}`} title={title ?? t.positions[p]} aria-label={t.positions[p]}>
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

export function LangSwitch() {
  const { lang, t, setLang } = useLang();
  return (
    <button className="chip lang" onClick={() => setLang(lang === "en" ? "fr" : "en")} lang={lang === "en" ? "fr" : "en"}>
      {t.langSwitch}
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
