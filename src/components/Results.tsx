import { useEffect, useRef, useState } from "react";
import { ACTIVE, BY_CODE, LIKELY_RUNOFF, type CandidateCode } from "../data/candidates";
import { AREA } from "../data/statements";
import { pct, tx, useLang } from "../i18n";
import { bestWorst, COVERAGE_FLOOR, opposites, type Answers, type Result } from "../lib/scoring";
import { Avatar, LangSwitch, MatchBar } from "./bits";
import { Grid, GridText } from "./Grid";
import { downloadCanvas, drawShareCard, shareCanvas } from "../lib/shareCard";

export function Results({ result, answers, onCandidate, onStatement, onCompare, onMethod, onRestart, onFirewall, onHistory }: {
  result: Result;
  answers: Answers;
  onCandidate: (c: CandidateCode) => void;
  onStatement: (id: number) => void;
  onCompare: (a: CandidateCode, b: CandidateCode) => void;
  onMethod: () => void;
  onRestart: () => void;
  onFirewall: () => void;
  onHistory: () => void;
}) {
  const { lang, t } = useLang();
  const [open, setOpen] = useState<CandidateCode | null>(null);
  const none = result.ranked.length === 0;

  return (
    <div>
      <div className="topbar"><span className="eyebrow">{t.title}</span><LangSwitch /></div>
      <h1>{t.resultsHeading}</h1>
      <p className="small muted" style={{ marginTop: 6 }}>{t.resultsAnswered(result.answered, result.skipped)}</p>

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
                  <span className="tiny muted">{c.party} · {t.basedOn(m.compared)}</span>
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

      <Runoff result={result} onCompare={onCompare} onFirewall={onFirewall} onHistory={onHistory} />

      <ShareCard result={result} />

      <div className="btn-row" style={{ marginTop: 28 }}>
        <button className="btn btn-ghost" onClick={onMethod}>{t.method}</button>
        <button className="btn btn-ghost" onClick={onRestart}>{t.restart}</button>
      </div>
    </div>
  );
}

function Runoff({ result, onCompare, onFirewall, onHistory }: { result: Result; onCompare: (a: CandidateCode, b: CandidateCode) => void; onFirewall: () => void; onHistory: () => void }) {
  const { lang, t } = useLang();
  const [pair, setPair] = useState<[CandidateCode, CandidateCode]>(LIKELY_RUNOFF);
  const [a, b] = pair.map((c) => result.all[c]);
  const ok = a.coverage >= COVERAGE_FLOOR && b.coverage >= COVERAGE_FLOOR;
  const diff = a.weighted - b.weighted;
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
      {pair.includes("RN") && (
        <div className="small runoff-ctx">
          <p className="muted" style={{ margin: "10px 0 4px" }}>{t.runoffRNNote}</p>
          <button className="linkish" onClick={onFirewall}>{t.firewallLink} →</button><br />
          <button className="linkish" onClick={onHistory}>{t.historyLink} →</button>
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
      drawShareCard(ref.current, result, lang, LIKELY_RUNOFF);
      setReady(true);
    });
    return () => { live = false; };
  }, [result, lang]);
  const name = lang === "fr" ? "la-france-choisit.png" : "france-chooses.png";
  return (
    <section className="share">
      <h2 className="section">{t.shareHeading}</h2>
      <p className="small muted">{t.shareLead}</p>
      <canvas ref={ref} className="share-card" width={1200} height={630} aria-label={t.shareHeading} />
      <div className="btn-row">
        <button className="btn" disabled={!ready} onClick={() => ref.current && shareCanvas(ref.current, name, `${t.shareText} https://adamdobrer.ca/projects/france-compass/`)}>{t.shareBtn}</button>
        <button className="btn btn-ghost" disabled={!ready} onClick={() => ref.current && downloadCanvas(ref.current, name)}>{t.downloadBtn}</button>
      </div>
    </section>
  );
}
