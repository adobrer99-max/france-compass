import { useCallback, useEffect } from "react";
import { CANDIDATES, POLL_SOURCE } from "@country/candidates";
import { AREA, AREAS, STATEMENTS, type Statement } from "@country/statements";
import { useLang, tx } from "../i18n";
import { PANELS, partyLabel } from "../country";
import type { Answer, Weights as W } from "../lib/scoring";
import { LangSwitch } from "./bits";
import { minutesFor, QUICK } from "../lib/quick";

/** Poll strings are written in English; localise words, decimal commas and the space before %. */
const pollText = (lang: string, p: string) => {
  if (lang === "en") return p;
  let s = p.replace(/(\d)\.(\d)/g, "$1,$2");
  if (lang === "fr") s = s.replace("under", "moins de").replace("up to", "jusqu'à");
  if (lang === "fr" || lang === "de") s = s.replace(/%$/, " %");
  return s;
};

export function Intro({ onStart, onQuick, onResume, savedCount, savedTotal, onCandidate, onExtra }: {
  onStart: () => void;
  onQuick?: () => void;
  onResume?: () => void;
  savedCount: number;
  savedTotal: number;
  onCandidate: (code: (typeof CANDIDATES)[number]["code"]) => void;
  onExtra: (id: string) => void;
}) {
  const { lang, t } = useLang();
  const field = CANDIDATES.filter((c) => !c.withdrawn);
  return (
    <div className="intro">
      <div className="topbar"><span className="kicker">{t.eyebrow}</span><LangSwitch /></div>
      <header className="masthead">
        <h1 className="poster-title">{t.title}</h1>
        <p className="lede">{t.subtitle}</p>
      </header>
      <div className="intro-cols">
        <div>
          <p className="intro-lead">{t.introLead}</p>
          <p className="small muted">{t.introDates} {t.introTime} {t.introPrivacy}</p>
        </div>
        <div className="intro-go">
          <button className="btn" onClick={onStart}>{savedCount ? t.startOver : t.start}</button>
          {onQuick && <button className="btn btn-ghost" onClick={onQuick}>{t.quickStart(QUICK.length)}</button>}
          {onResume && <button className="btn btn-ghost" onClick={onResume}>{t.resume(savedCount, savedTotal)}</button>}
          {onQuick && <p className="tiny muted">{t.quickNote(STATEMENTS.length, minutesFor(STATEMENTS.length), QUICK.length, minutesFor(QUICK.length))}</p>}
        </div>
      </div>

      <section className="hoardings" aria-labelledby="field-h">
        <h2 id="field-h" className="section">{t.candidatesHeading}</h2>
        <p className="small muted">{t.candidatesNote}</p>
        <ol className="panels">
          {field.map((c, i) => (
            <li key={c.code} className="panel">
              <span className="panel-plate" aria-hidden="true">{i + 1}</span>
              <button className="poster" style={{ ["--c" as string]: c.color }} onClick={() => onCandidate(c.code)}>
                <span className="poster-name">
                  <span className="poster-first">{c.name.replace(c.short, "").trim()}</span>
                  <span className="poster-last">{c.short}</span>
                </span>
                <span className="poster-party">{partyLabel(c, lang)}</span>
                {c.poll && <span className="poster-poll" title={c.pollFrom}>{pollText(lang, c.poll)}{c.pollFrom && "*"}</span>}
              </button>
            </li>
          ))}
        </ol>
        <p className="tiny muted">{t.pollsFrom(POLL_SOURCE.label)}{CANDIDATES.some((c) => c.pollFrom) && <> * {CANDIDATES.filter((c) => c.pollFrom).map((c) => `${c.short}: ${c.pollFrom}`).join("; ")}.</>}</p>
      </section>

      <p className="beta-note small">{t.betaBanner}</p>

      <div className="ctx-links">
        {PANELS.extraPanels.map((x) => (
          <button key={x.id} className="ctx-card" onClick={() => onExtra(x.id)}><strong>{x.heading(t)}</strong><span className="small muted">{x.blurb(t)}</span></button>
        ))}
      </div>
    </div>
  );
}

/** Progress as a polling-station tally: strokes in fives, the fifth across the four. */
function Tally({ done, total }: { done: number; total: number }) {
  const groups = Math.ceil(total / 5);
  const W = 30, H = 22;
  return (
    <svg className="tally" viewBox={`0 0 ${groups * W} ${H}`} aria-hidden="true" preserveAspectRatio="xMinYMid meet">
      {Array.from({ length: total }, (_, i) => {
        const g = Math.floor(i / 5), k = i % 5, x0 = g * W + 3;
        const on = i < done;
        return k < 4
          ? <line key={i} x1={x0 + k * 5} y1={3} x2={x0 + k * 5} y2={H - 3} className={on ? "on" : ""} />
          : <line key={i} x1={x0 - 2} y1={H - 5} x2={x0 + 18} y2={5} className={on ? "on" : ""} />;
      })}
    </svg>
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
        <span className="kicker">{tx(lang, AREA[s.area])}</span>
        <span className="count">{index + 1}<span className="muted"> / {total}</span></span>
      </div>
      <div className="progress" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total} aria-label={t.progressLabel}>
        <Tally done={index} total={total} />
      </div>
      <div className="ballot">
        <p lang={lang}>{s[lang]}</p>
      </div>
      <div className="scale" role="group" aria-label={t.yourResponse}>
        {t.scale.map((label, i) => {
          const v = (i - 2) as Answer;
          return (
            <button key={i} className="answer" aria-pressed={value === v} onClick={() => onAnswer(v)}>
              <span className="key" aria-hidden="true">{i + 1}</span>{label}
            </button>
          );
        })}
      </div>
      <div className="btn-row skip-row">
          <button className="answer answer-skip" aria-pressed={value === null} onClick={() => onAnswer(null)}>
            <span className="key" aria-hidden="true">0</span>{t.skip}
          </button>
          {index > 0 && <button className="btn-ghost" style={{ flex: "0 0 96px" }} onClick={onBack}>{t.back}</button>}
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
      <div className="topbar"><span className="kicker">{t.title}</span><LangSwitch /></div>
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
