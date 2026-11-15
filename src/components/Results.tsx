import { useEffect, useRef, useState } from "react";
import { ACTIVE, BY_CODE, LIKELY_RUNOFF, type CandidateCode } from "@country/candidates";
import { AREA } from "@country/statements";
import { pct, tx, useLang } from "../i18n";
import { bestWorst, COVERAGE_FLOOR, opposites, type Answers, type Result } from "../lib/scoring";
import { Avatar, LangSwitch, MatchBar } from "./bits";
import { Grid, GridText } from "./Grid";
import { downloadCanvas, drawShareCard, shareCanvas } from "../lib/shareCard";
import { COUNTRY } from "@country/config";
import { PANELS, partyLabel } from "../country";
import { Across } from "./Across";

export function Results({ result, answers, onCandidate, onStatement, onCompare, onMethod, onRestart, onExtra }: {
  result: Result;
  answers: Answers;
  onCandidate: (c: CandidateCode) => void;
  onStatement: (id: number) => void;
  onCompare: (a: CandidateCode, b: CandidateCode) => void;
  onMethod: () => void;
  onRestart: () => void;
  onExtra: (id: string) => void;
}) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<CandidateCode | null>(null);
  const none = result.ranked.length === 0;
  const Extra = PANELS.ResultsExtra;

  return (
    <div>
      <div className="topbar"><span className="kicker">{t.title}</span><LangSwitch /></div>
      <h1>{t.resultsHeading}</h1>
      <p className="small muted" style={{ marginTop: 6 }}>{t.resultsAnswered(result.answered, result.skipped)}</p>
      {result.ranked[0] && (() => {
        const m = result.ranked[0], c = BY_CODE[m.code];
        return (
          <div className="lead-board">
            <div className="panel">
              <span className="panel-plate" aria-hidden="true">1</span>
              <button className="poster" style={{ ["--c" as string]: c.color }} onClick={() => onCandidate(m.code)}>
                <span className="poster-name">
                  <span className="poster-first">{c.name.replace(c.short, "").trim()}</span>
                  <span className="poster-last">{c.short}</span>
                </span>
                <span className="poster-party">{partyLabel(c, lang)}</span>
              </button>
            </div>
            <div>
              <p className="lead-label">{t.closestToYou}</p>
              <p className="lead-pct">{pct(lang, m.weighted)}</p>
              <p className="small muted">{t.basedOn(m.compared)}</p>
            </div>
          </div>
        );
      })()}

      <h2 className="section">{t.matchHeading}</h2>
      <p className="small muted">{t.matchExplain}</p>
      {none && <div className="callout">{t.notCodedYet}</div>}
      <ol className="matches">
        {result.ranked.map((m) => {
          const c = BY_CODE[m.code];
          const bw = bestWorst(m);
          const opp = open === m.code ? opposites(m.code, answers) : [];
          return (
            <li key={m.code} className="match-row">
              <button className="match-head" onClick={() => setOpen(open === m.code ? null : m.code)} aria-expanded={open === m.code}>
                <Avatar code={m.code} size={32} />
                <span className="match-name">
                  <span>{c.name}</span>
                  <span className="tiny muted">{partyLabel(c, lang)} · {t.basedOn(m.compared)}</span>
                </span>
                <span className="match-pct mono">{pct(lang, m.weighted)}</span>
              </button>
              <MatchBar value={m.weighted} color={c.color} />
              {open === m.code && (
                <div className="match-more small">
                  {bw && <p>{t.bestWorst(c.name, tx(lang, AREA[bw.best]), Math.round(bw.bestPct), tx(lang, AREA[bw.worst]), Math.round(bw.worstPct))}</p>}
                  <p><strong>{t.disagreeHeading(c.name)}</strong></p>
                  {opp.length ? (
                    <ul className="plain">
                      {opp.map((s) => <li key={s.id}><button className="linkish" onClick={() => onStatement(s.id)}>{s.id}. {s[lang]}</button></li>)}
                    </ul>
                  ) : <p className="muted">{t.none}</p>}
                  <button className="linkish" onClick={() => onCandidate(m.code)}>{t.candidateCodes} →</button>
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {result.lowCoverage.length > 0 && (
        <details className="low">
          <summary className="small">{t.notCoded} ({result.lowCoverage.length})</summary>
          <ul className="plain small">
            {result.lowCoverage.map((m) => (
              <li key={m.code}><button className="linkish" onClick={() => onCandidate(m.code)}>{BY_CODE[m.code].name}</button> <span className="muted">· {t.coverage(Math.round(m.coverage * 100))}</span></li>
            ))}
          </ul>
        </details>
      )}

      <h2 className="section">{t.chartHeading}</h2>
      <p className="small muted">{t.chartExplain}</p>
      <Grid result={result} />
      <GridText result={result} />

      {COUNTRY.headToHead && <Runoff result={result} onCompare={onCompare} onExtra={onExtra} />}
      {Extra && <Extra result={result} />}
      <Across result={result} />

      <ShareCard result={result} />

      <div className="btn-row" style={{ marginTop: 28 }}>
        <button className="btn btn-ghost" onClick={onMethod}>{t.method}</button>
        <button className="btn btn-ghost" onClick={onRestart}>{t.restart}</button>
      </div>
    </div>
  );
}

function Runoff({ result, onCompare, onExtra }: { result: Result; onCompare: (a: CandidateCode, b: CandidateCode) => void; onExtra: (id: string) => void }) {
  const { lang, t } = useLang();
  const [pair, setPair] = useState<[CandidateCode, CandidateCode]>(LIKELY_RUNOFF);
  const [a, b] = pair.map((c) => result.all[c]);
  const ok = a.coverage >= COVERAGE_FLOOR && b.coverage >= COVERAGE_FLOOR;
  const diff = a.weighted - b.weighted;
  const note = PANELS.runoffNote?.(pair) ?? null;
  return (
    <section className="card runoff">
      <h2 style={{ fontSize: 19 }}>{t.runoffHeading}</h2>
      <p className="small muted">{t.runoffExplain}</p>
      <div className="duel">
        {pair.map((code, i) => (
          <div key={i} className="duel-side">
            <Avatar code={code} size={44} />
            <select value={code} aria-label={`${i + 1}`}
              onChange={(e) => setPair(i === 0 ? [e.target.value as CandidateCode, pair[1]] : [pair[0], e.target.value as CandidateCode])}>
              {ACTIVE.filter((c) => c !== pair[1 - i]).map((c) => <option key={c} value={c}>{BY_CODE[c].name}</option>)}
            </select>
            <span className="mono">{ok ? pct(lang, result.all[code].weighted) : "–"}</span>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 10 }}>
        <strong>{!ok ? t.notCoded : Math.abs(diff) < 3 ? t.tie : t.closerTo(BY_CODE[diff > 0 ? pair[0] : pair[1]].name)}</strong>
      </p>
      <button className="linkish small" onClick={() => onCompare(pair[0], pair[1])}>{t.compare} →</button>
      {note && (
        <div className="small runoff-ctx">
          <p className="muted" style={{ margin: "10px 0 4px" }}>{note.text(t)}</p>
          {PANELS.extraPanels.filter((x) => note.panels.includes(x.id)).map((x) => (
            <div key={x.id}><button className="linkish" onClick={() => onExtra(x.id)}>{x.blurb(t)} →</button></div>
          ))}
        </div>
      )}
    </section>
  );
}

function ShareCard({ result }: { result: Result }) {
  const { lang, t } = useLang();
  const ref = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let live = true;
    // Draw once the web fonts are in, so the image uses them.
    (document.fonts?.ready ?? Promise.resolve()).then(() => {
      if (!live || !ref.current) return;
      drawShareCard(ref.current, result, lang, COUNTRY.headToHead ? LIKELY_RUNOFF : null, PANELS.shareLine?.(result, lang) ?? null);
      setReady(true);
    });
    return () => { live = false; };
  }, [result, lang]);
  const name = COUNTRY.shareFile[lang];
  return (
    <section className="share">
      <h2 className="section">{t.shareHeading}</h2>
      <p className="small muted">{t.shareLead}</p>
      <canvas ref={ref} className="share-card" width={1200} height={630} aria-label={t.shareHeading} />
      <div className="btn-row">
        <button className="btn" disabled={!ready} onClick={() => ref.current && shareCanvas(ref.current, name, `${t.shareText} ${COUNTRY.siteUrl}`)}>{t.shareBtn}</button>
        <button className="btn btn-ghost" disabled={!ready} onClick={() => ref.current && downloadCanvas(ref.current, name)}>{t.downloadBtn}</button>
      </div>
    </section>
  );
}
