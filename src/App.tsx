import { useCallback, useEffect, useMemo, useState } from "react";
import { BY_CODE, LIKELY_RUNOFF, type CandidateCode } from "@country/candidates";
import { STATEMENTS } from "@country/statements";
import { LangContext, STRINGS, initialLang, type Lang } from "./i18n";
import { score, type Answer } from "./lib/scoring";
import { clear, fresh, load, readPanel, save, writeLang, writePanel, type Panel, type Session, type Stage } from "./lib/state";
import { Sheet } from "./components/bits";
import { Intro, Question, Weights } from "./components/Steps";
import { Results } from "./components/Results";
import { CandidatePanel, ComparePanel, MethodPanel, StatementPanel } from "./components/Panels";
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

  const savedCount = saved ? Object.keys(saved.answers).length : 0;
  const start = () => { clear(); const s = fresh(); setSession(s); save(s); setStage("quiz"); };
  const resume = () => { if (!saved) return; setSession(saved); setStage(saved.stage === "intro" ? "quiz" : saved.stage); };

  const answer = (v: Answer) => {
    const s = STATEMENTS[session.index];
    const answers = { ...session.answers, [s.id]: v };
    if (session.index + 1 < STATEMENTS.length) patch({ answers, index: session.index + 1 });
    else { patch({ answers }); setStage("weights"); }
  };

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
          <Intro onStart={start} onResume={savedCount ? resume : undefined} savedCount={savedCount}
            onCandidate={openCandidate} onExtra={openExtra} />
        )}
        {stage === "quiz" && (
          <Question s={STATEMENTS[session.index]} index={session.index} total={STATEMENTS.length}
            value={session.answers[STATEMENTS[session.index].id]} onAnswer={answer}
            onBack={() => patch({ index: Math.max(0, session.index - 1) })} />
        )}
        {stage === "weights" && (
          <Weights weights={session.weights} setWeights={(w) => patch({ weights: w })} onDone={() => setStage("results")} />
        )}
        {stage === "results" && (
          <Results result={result} answers={session.answers} onCandidate={openCandidate} onStatement={openStatement}
            onCompare={openCompare} onMethod={openMethod} onRestart={start} onExtra={openExtra} />
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
          {panel.kind === "candidate" && <CandidatePanel code={panel.code} onStatement={openStatement} />}
          {panel.kind === "statement" && <StatementPanel id={panel.id} onCandidate={openCandidate} />}
          {panel.kind === "compare" && (
            <ComparePanel a={panel.a} b={panel.b} result={stage === "results" ? result : null} onPick={openCompare} onStatement={openStatement} />
          )}
          {panel.kind === "method" && <MethodPanel onStatement={openStatement} onCandidate={openCandidate} />}
          {extra?.render({ onCandidate: openCandidate })}
        </Sheet>
      )}
    </LangContext.Provider>
  );
}
