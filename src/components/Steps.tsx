import { useCallback, useEffect } from "react";
import { CANDIDATES, POLL_SOURCE } from "../data/candidates";
import { AREA, AREAS, type Statement } from "../data/statements";
import { useLang, tx } from "../i18n";
import type { Answer, Weights as W } from "../lib/scoring";
import { Avatar, LangSwitch } from "./bits";

const pollText = (lang: string, p: string) =>
  lang === "fr" ? p.replace("under", "moins de").replace("up to", "jusqu'à").replace(/(\d)\.(\d)/g, "$1,$2").replace(/%$/, " %") : p;

export function Intro({ onStart, onResume, savedCount, onCandidate, onFirewall, onHistory }: {
  onStart: () => void;
  onResume?: () => void;
  savedCount: number;
  onCandidate: (code: (typeof CANDIDATES)[number]["code"]) => void;
  onFirewall: () => void;
  onHistory: () => void;
}) {
  const { lang, t } = useLang();
  return (
    <div>
      <div className="topbar"><span className="eyebrow">{lang === "en" ? "France 2027" : "Présidentielle 2027"}</span><LangSwitch /></div>
      <h1>{t.title}</h1>
      <p className="lede">{t.subtitle}</p>
      <div className="callout">{t.betaBanner}</div>
      <p>{t.introLead}</p>
      <p className="small muted">{t.introDates} {t.introTime} {t.introPrivacy}</p>
      <div className="btn-row">
        <button className="btn" onClick={onStart}>{savedCount ? t.startOver : t.start}</button>
        {onResume && <button className="btn btn-ghost" onClick={onResume}>{t.resume(savedCount)}</button>}
      </div>

      <h2 className="section">{t.candidatesHeading}</h2>
      <p className="small muted">{t.candidatesNote}</p>
      <ul className="cand-list">
        {CANDIDATES.filter((c) => !c.withdrawn).map((c) => (
          <li key={c.code}>
            <button className="cand" onClick={() => onCandidate(c.code)}>
              <Avatar code={c.code} />
              <span className="cand-text">
                <span className="cand-name">{c.name}</span>
                <span className="small muted">{c.party} · {tx(lang, c.bloc)}</span>
              </span>
              {c.poll && <span className="mono tiny muted" title={c.pollFrom}>{pollText(lang, c.poll)}{c.pollFrom && "*"}</span>}
            </button>
          </li>
        ))}
      </ul>
      <p className="tiny muted">{t.pollsFrom(POLL_SOURCE.label)} * {CANDIDATES.filter((c) => c.pollFrom).map((c) => `${c.short}: ${c.pollFrom}`).join("; ")}.</p>

      <div className="ctx-links">
        <button className="ctx-card" onClick={onFirewall}><strong>{t.firewallHeading}</strong><span className="small muted">{t.firewallLink}</span></button>
        <button className="ctx-card" onClick={onHistory}><strong>{t.historyHeading}</strong><span className="small muted">{t.historyLink}</span></button>
      </div>
    </div>
  );
}

export function Question({ s, index, total, value, onAnswer, onBack }: {
  s: Statement;
  index: number;
  total: number;
  value: Answer | undefined;
  onAnswer: (v: Answer) => void;
  onBack: () => void;
}) {
  const { lang, t } = useLang();
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = Number(e.key);
    if (e.key >= "1" && e.key <= "5") onAnswer((k - 3) as Answer);
    else if (e.key === "0") onAnswer(null);
    else if (e.key === "Backspace" && index > 0) { e.preventDefault(); onBack(); }
  }, [onAnswer, onBack, index]);
  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <div>
      <div className="topbar">
        <span className="eyebrow">{tx(lang, AREA[s.area])}</span>
        <span className="mono tiny muted">{index + 1} / {total}</span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total} aria-label={t.progressLabel}>
        <div style={{ width: `${(index / total) * 100}%` }} />
      </div>
      <div className="statement">
        <span className="ident" aria-hidden="true">{s.id}</span>
        <p lang={lang}>{s[lang]}</p>
      </div>
      <div className="stack" role="group" aria-label={t.yourResponse}>
        {t.scale.map((label, i) => {
          const v = (i - 2) as Answer;
          return (
            <button key={i} className="answer" aria-pressed={value === v} onClick={() => onAnswer(v)}>
              <span className="key" aria-hidden="true">{i + 1}</span>{label}
            </button>
          );
        })}
        <div className="btn-row" style={{ marginTop: 4 }}>
          <button className="answer answer-skip" aria-pressed={value === null} onClick={() => onAnswer(null)}>
            <span className="key" aria-hidden="true">0</span>{t.skip}
          </button>
          {index > 0 && <button className="btn-ghost" style={{ flex: "0 0 96px" }} onClick={onBack}>{t.back}</button>}
        </div>
      </div>
      <p className="small muted" style={{ marginTop: 14 }}>{t.keysHint}</p>
    </div>
  );
}

const LEVELS = [0.5, 1, 2];

export function Weights({ weights, setWeights, onDone }: { weights: W; setWeights: (w: W) => void; onDone: () => void }) {
  const { lang, t } = useLang();
  return (
    <div>
      <div className="topbar"><span className="eyebrow">{t.title}</span><LangSwitch /></div>
      <h2>{t.weightsHeading}</h2>
      <p className="small muted" style={{ marginTop: 6 }}>{t.weightsLead}</p>
      <div className="weights">
        {AREAS.map((a) => (
          <fieldset key={a.id} className="weight-row">
            <legend>{tx(lang, a)}</legend>
            <div className="seg">
              {LEVELS.map((lv, i) => (
                <label key={lv} className={weights[a.id] === lv ? "on" : ""}>
                  <input type="radio" name={`w-${a.id}`} checked={weights[a.id] === lv}
                    onChange={() => setWeights({ ...weights, [a.id]: lv })} />
                  {t.weightLevels[i]}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <button className="btn" style={{ marginTop: 18 }} onClick={onDone}>{t.seeResults}</button>
    </div>
  );
}
