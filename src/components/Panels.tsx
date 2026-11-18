import { ACTIVE, BY_CODE, CANDIDATES, type CandidateCode } from "@country/candidates";
import { partyLabel } from "../country";
import { CHANGES, CODES, positionOf } from "@country/codes";
import { AREA, AREAS, AXES, BY_ID, STATEMENTS } from "@country/statements";
import { pct, tx, useLang, type Lang } from "../i18n";
import { COUNTRY } from "@country/config";
import { agreementPoints, splits, type Answers, type Result } from "../lib/scoring";
import { Avatar, CodeChip } from "./bits";

function SourceLine({ code, id }: { code: CandidateCode; id: number }) {
  const { t } = useLang();
  const c = CODES[code]?.[id];
  if (!c) return null;
  return (
    <span className="tiny muted">
      {t.source}: <a href={c.src} target="_blank" rel="noopener">{c.label}</a>, {c.date}
      {c.weak ? <> · <span className="weak-tag">{t.placeholder}</span></> : c.provisional && <> · {t.provisional}</>}
      {c.note && <> · {c.note}</>}
    </span>
  );
}

/** Your answer beside the candidate's code, and whether you agree. */
function YouLine({ u, p }: { u: Answers[number]; p: ReturnType<typeof positionOf> }) {
  const { t } = useLang();
  if (u === undefined) return null;
  const you = u === null ? t.skip : t.scale[u + 2];
  if (u === null || p === "-") return <span className="tiny muted you-line">{t.youSaid(you)}</span>;
  const pts = agreementPoints(u, p);
  const k = pts === 2 ? "agree" : pts === 1 ? "partly" : "differ";
  return <span className={`tiny you-line you-${k}`}>{t.youSaid(you)} · {t.youMatch[k]}</span>;
}

export function CandidatePanel({ code, onStatement, answers }: { code: CandidateCode; onStatement: (id: number) => void; answers?: Answers }) {
  const { lang, t } = useLang();
  const c = BY_CODE[code];
  const coded = STATEMENTS.filter((s) => positionOf(code, s.id) !== "-").length;
  const tally = { agree: 0, partly: 0, differ: 0 };
  if (answers) for (const s of STATEMENTS) {
    const u = answers[s.id], p = positionOf(code, s.id);
    if (u === undefined || u === null || p === "-") continue;
    const pts = agreementPoints(u, p);
    tally[pts === 2 ? "agree" : pts === 1 ? "partly" : "differ"]++;
  }
  const compared = tally.agree + tally.partly + tally.differ;
  return (
    <div>
      <div className="profile-head">
        <Avatar code={code} size={52} />
        <div>
          <div className="cand-name">{c.name}</div>
          <div className="small muted">{partyLabel(c, lang)} · {tx(lang, c.bloc)}</div>
          <div className="tiny muted">{t.coverage(Math.round((coded / STATEMENTS.length) * 100))}</div>
        </div>
      </div>
      {c.note && <p className="small" style={{ marginTop: 12 }}>{tx(lang, c.note)}</p>}
      {answers && compared > 0 && (
        <p className="small you-tally">{t.youTally(tally.agree, tally.partly, tally.differ)}</p>
      )}
      <h3 className="section-sm">{t.candidateCodes}</h3>
      {AREAS.map((a) => (
        <div key={a.id} className="profile-block">
          <div className="kicker">{tx(lang, a)}</div>
          {STATEMENTS.filter((s) => s.area === a.id).map((s) => (
            <div key={s.id} className="profile-line">
              <CodeChip p={positionOf(code, s.id)} weak={CODES[code]?.[s.id]?.weak} />
              <div>
                <button className="linkish" onClick={() => onStatement(s.id)}>{s.id}. {s[lang]}</button>
                <div><SourceLine code={code} id={s.id} /></div>
                {answers && <div><YouLine u={answers[s.id]} p={positionOf(code, s.id)} /></div>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function StatementPanel({ id, onCandidate }: { id: number; onCandidate: (c: CandidateCode) => void }) {
  const { lang, t } = useLang();
  const s = BY_ID[id];
  const groups = (["A", "N", "D", "-"] as const).map((p) => ({ p, list: ACTIVE.filter((c) => positionOf(c, id) === p) }));
  return (
    <div>
      <div className="kicker">{tx(lang, AREA[s.area])}</div>
      <p className="statement-big" lang={lang}>{s[lang]}</p>
      {(COUNTRY.langs as readonly Lang[]).filter((l) => l !== lang).map((l) => <p key={l} className="tiny muted" lang={l}>{s[l]}</p>)}
      <p className="small muted">
        {s.axis ? t.statementAxis(AXES[s.axis].name[lang], AXES[s.axis][lang][s.sign > 0 ? 1 : 0]) : t.statementNoAxis}
      </p>
      <h3 className="section-sm">{t.statementWho}</h3>
      {groups.filter((g) => g.list.length).map(({ p, list }) => (
        <div key={p} className="profile-block">
          <div className="small"><CodeChip p={p} /> <strong>{t.positions[p]}</strong></div>
          <ul className="plain">
            {list.map((c) => (
              <li key={c}>
                <button className="linkish" onClick={() => onCandidate(c)}>{BY_CODE[c].name}</button>
                <div><SourceLine code={c} id={id} /></div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function ComparePanel({ a, b, result, onPick, onStatement }: {
  a: CandidateCode;
  b: CandidateCode;
  result: Result | null;
  onPick: (a: CandidateCode, b: CandidateCode) => void;
  onStatement: (id: number) => void;
}) {
  const { lang, t } = useLang();
  const rows = splits(a, b);
  const pick = (i: 0 | 1, v: CandidateCode) => (i === 0 ? onPick(v, b) : onPick(a, v));
  return (
    <div>
      <p className="small muted">{t.compareLead}</p>
      <div className="duel">
        {([a, b] as const).map((code, i) => (
          <div key={i} className="duel-side">
            <Avatar code={code} size={40} />
            <select value={code} onChange={(e) => pick(i as 0 | 1, e.target.value as CandidateCode)} aria-label={`${i + 1}`}>
              {CANDIDATES.filter((c) => !c.withdrawn && c.code !== (i === 0 ? b : a)).map((c) => <option key={c.code} value={c.code}>{c.name}</option>)}
            </select>
            {result && result.answered > 0 && <span className="tiny muted">{t.compareYourMatch}: {pct(lang, result.all[code].weighted)}</span>}
          </div>
        ))}
      </div>
      {rows.length === 0 ? <p className="muted small" style={{ marginTop: 12 }}>{t.compareNoSplits}</p> : (
        <table className="compare">
          <tbody>
            {rows.map(({ s, pa, pb }) => (
              <tr key={s.id}>
                <td><CodeChip p={pa} weak={CODES[a]?.[s.id]?.weak} /></td>
                <td><button className="linkish" onClick={() => onStatement(s.id)}>{s.id}. {s[lang]}</button></td>
                <td><CodeChip p={pb} weak={CODES[b]?.[s.id]?.weak} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function MethodPanel({ onStatement, onCandidate }: { onStatement: (id: number) => void; onCandidate: (c: CandidateCode) => void }) {
  const { lang, t } = useLang();
  return (
    <div>
      {t.methodBody.map((p, i) => <p key={i} className="small">{p}</p>)}
      <p className="small"><a href="https://adamdobrer.ca/compasses/method/">{t.methodFull}</a></p>
      <h3 className="section-sm">{t.matrixHeading}</h3>
      <p className="tiny muted"><CodeChip p="A" weak /> {t.matrixWeak}</p>
      <p className="tiny muted">{t.sourcesNote}</p>
      <div className="scroller">
        <table className="matrix">
          <thead>
            <tr>
              <th />
              {ACTIVE.map((c) => (
                <th key={c} scope="col"><button className="linkish" onClick={() => onCandidate(c)} title={BY_CODE[c].name}>{BY_CODE[c].short}</button></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATEMENTS.map((s) => (
              <tr key={s.id}>
                <th scope="row"><button className="linkish" onClick={() => onStatement(s.id)} title={s[lang]}>{s.id}</button></th>
                {ACTIVE.map((c) => {
                  const k = CODES[c]?.[s.id];
                  return <td key={c}><CodeChip p={positionOf(c, s.id)} weak={k?.weak} title={k ? `${t.positions[k.p]}${k.weak ? ` (${t.placeholder})` : ""}: ${k.label}, ${k.date}` : undefined} /></td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3 className="section-sm">{t.changesHeading}</h3>
      {CHANGES.length === 0 ? <p className="small muted">{t.noChanges}</p> : (
        <ul className="plain small">
          {CHANGES.map((ch, i) => (
            <li key={i}>{ch.date}: {BY_CODE[ch.candidate].name}, {ch.statement}: {ch.from} → {ch.to}. {ch.why}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
