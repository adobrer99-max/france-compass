import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { BY_CODE, LIKELY_RUNOFF, type CandidateCode } from "@country/candidates";
import { LangContext, STRINGS, initialLang, type Lang } from "./i18n";
import { score, type Answer } from "./lib/scoring";
import { listFor, QUICK, type Mode } from "./lib/quick";
import { clear, fresh, load, readPanel, save, writeLang, writePanel, type Panel, type Session, type Stage } from "./lib/state";
import { Sheet } from "./components/bits";
import { Intro, Question, Weights } from "./components/Steps";
// Loaded on demand, so the first screen only waits for what it shows.
const Results = lazy(() => import("./components/Results").then((m) => ({ default: m.Results })));
const CandidatePanel = lazy(() => import("./components/Panels").then((m) => ({ default: m.CandidatePanel })));
const ComparePanel = lazy(() => import("./components/Panels").then((m) => ({ default: m.ComparePanel })));
const MethodPanel = lazy(() => import("./components/Panels").then((m) => ({ default: m.MethodPanel })));
const StatementPanel = lazy(() => import("./components/Panels").then((m) => ({ default: m.StatementPanel })));
import { PANELS } from "./country";

export default function App() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const t = STRINGS[lang];
  const setLang = useCallback((l: Lang) => { setLangState(l); writeLang(l); }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = `${t.title} · ${t.subtitle}`;
  }, [lang, t]);

  const [saved] = useState(load);
  const [session, setSession] = useState<Session>(() => saved ?? fresh());
  const [stage, setStage] = useState<Stage>("intro");
  const [panel, setPanelState] = useState<Panel>(() => readPanel(window.location.search));
  const setPanel = useCallback((p: Panel) => { writePanel(p); setPanelState(p); }, []);

  const result = useMemo(() => score(session.answers, session.weights), [session.answers, session.weights]);

  const patch = useCallback((p: Partial<Session>) => {
    setSession((s) => { const n = { ...s, ...p }; save(n); return n; });
  }, []);
  useEffect(() => { if (stage !== "intro") patch({ stage }); }, [stage, patch]);
  useEffect(() => { window.scrollTo({ top: 0 }); }, [stage, session.index]);

  const mode: Mode = session.mode ?? "full";
  const list = useMemo(() => listFor(mode), [mode]);
  const savedCount = saved ? Object.keys(saved.answers).length : 0;
  const savedTotal = saved?.mode === "quick" ? QUICK.length : listFor("full").length;
  const start = (m: Mode = "full") => { clear(); const s = fresh(m); setSession(s); save(s); setStage("quiz"); };
  const resume = () => {
    if (!saved) return;
    // Pick up at the first unanswered statement, so a resumed session survives a reordered list.
    const l = listFor(saved.mode ?? "full");
    const next = l.findIndex((s) => !(s.id in saved.answers));
    setSession({ ...saved, index: next === -1 ? Math.min(saved.index, l.length - 1) : next });
    setStage(saved.stage === "intro" ? "quiz" : saved.stage);
  };

  const answer = (v: Answer) => {
    const s = list[session.index];
    const answers = { ...session.answers, [s.id]: v };
    if (session.index + 1 < list.length) patch({ answers, index: session.index + 1 });
    else { patch({ answers }); setStage(mode === "rest" ? "results" : "weights"); }
  };
  const rest = mode === "quick" ? listFor("rest").filter((s) => !(s.id in session.answers)).length : 0;
  const sharpen = () => { patch({ mode: "rest", index: 0 }); setStage("quiz"); };

  const openCandidate = (code: CandidateCode) => setPanel({ kind: "candidate", code });
  const openStatement = (id: number) => setPanel({ kind: "statement", id });
  const openCompare = (a: CandidateCode, b: CandidateCode) => setPanel({ kind: "compare", a, b });
  const openMethod = () => setPanel({ kind: "method" });
  const openExtra = (id: string) => setPanel({ kind: "extra", id });
  const extra = panel?.kind === "extra" ? PANELS.extraPanels.find((x) => x.id === panel.id) : undefined;

  const title = !panel ? "" : panel.kind === "candidate" ? BY_CODE[panel.code].name
    : panel.kind === "statement" ? `${t.allStatements} · ${panel.id}` : panel.kind === "compare" ? t.compareHeading
    : extra ? extra.heading(t) : t.methodHeading;

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <main className={`shell${stage === "results" ? " results" : ""}`}>
        {stage === "intro" && (
          <Intro onStart={() => start("full")} onQuick={QUICK.length ? () => start("quick") : undefined}
            onResume={savedCount ? resume : undefined} savedCount={savedCount} savedTotal={savedTotal}
            onCandidate={openCandidate} onExtra={openExtra} />
        )}
        {stage === "quiz" && (
          <Question s={list[session.index]} index={session.index} total={list.length}
            value={session.answers[list[session.index].id]} onAnswer={answer}
            onBack={() => patch({ index: Math.max(0, session.index - 1) })} />
        )}
        {stage === "weights" && (
          <Weights weights={session.weights} setWeights={(w) => patch({ weights: w })} onDone={() => setStage("results")} />
        )}
        {stage === "results" && (
          <Suspense fallback={<p className="small muted">…</p>}>
            <Results result={result} answers={session.answers} onCandidate={openCandidate} onStatement={openStatement}
              onCompare={openCompare} onMethod={openMethod} onRestart={() => start(mode === "full" ? "full" : "quick")} onExtra={openExtra}
              quick={mode === "quick"} rest={rest} onSharpen={sharpen} />
          </Suspense>
        )}
        <nav className="nav" aria-label={t.method}>
          <button onClick={openMethod}>{t.method}</button>
          <button onClick={() => openCompare(...LIKELY_RUNOFF)}>{t.compare}</button>
          {PANELS.extraPanels.map((x) => <button key={x.id} onClick={() => openExtra(x.id)}>{x.nav(t)}</button>)}
        </nav>
        <p className="tiny muted footer">{t.footer}</p>
      </main>

      {panel && (
        <Sheet key={JSON.stringify(panel)} title={title} onClose={() => setPanel(null)}>
          <Suspense fallback={<p className="small muted">…</p>}>
          {panel.kind === "candidate" && (
            <CandidatePanel code={panel.code} onStatement={openStatement} answers={stage === "results" ? session.answers : undefined} />
          )}
          {panel.kind === "statement" && <StatementPanel id={panel.id} onCandidate={openCandidate} />}
          {panel.kind === "compare" && (
            <ComparePanel a={panel.a} b={panel.b} result={stage === "results" ? result : null} onPick={openCompare} onStatement={openStatement} />
          )}
          {panel.kind === "method" && <MethodPanel onStatement={openStatement} onCandidate={openCandidate} />}
          {extra?.render({ onCandidate: openCandidate })}
          </Suspense>
        </Sheet>
      )}
    </LangContext.Provider>
  );
}
