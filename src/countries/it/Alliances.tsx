import { useState } from "react";
import { CANDIDATES, type Alliance, type CandidateCode } from "./candidates";
import { pct, useLang } from "../../i18n";
import { COVERAGE_FLOOR, type Result } from "../../lib/scoring";

const LINE = 42;
const MAX = 60;
const DEFAULT = Object.fromEntries(CANDIDATES.map((c) => [c.code, c.alliance])) as Record<CandidateCode, Alliance>;
const NEXT: Record<string, Alliance> = { cdx: "csx", csx: null, null: "cdx" };
/** Smaller lists in the polls that aren't on the compass but count toward an alliance's total. */
const SMALL: Record<"cdx" | "csx", { name: string; share: number }[]> = { cdx: [{ name: "Sud chiama Nord", share: 1.1 }], csx: [] };
const fmt = (lang: string, n: number) => (lang === "it" ? n.toFixed(1).replace(".", ",") : n.toFixed(1));

/** The 42% rule, live: poll shares added up by alliance, plus your match with each alliance. */
export function AllianceTool({ result }: { result: Result }) {
  const { lang, t } = useLang();
  const [side, setSide] = useState(DEFAULT);
  const groups: { id: Exclude<Alliance, null>; label: string }[] = [
    { id: "cdx", label: t.allianceCdx },
    { id: "csx", label: t.allianceCsx },
  ];
  const totals = Object.fromEntries(groups.map((g) => [g.id,
    CANDIDATES.filter((c) => !c.withdrawn && side[c.code] === g.id).reduce((s, c) => s + c.pollShare, 0) + SMALL[g.id].reduce((s, x) => s + x.share, 0)])) as Record<"cdx" | "csx", number>;
  const winner = totals.cdx >= totals.csx ? "cdx" : "csx";
  const changed = CANDIDATES.some((c) => side[c.code] !== DEFAULT[c.code]);
  const alone = CANDIDATES.filter((c) => !c.withdrawn && side[c.code] === null);

  return (
    <section className="card alliances">
      <h2 style={{ fontSize: 22 }}>{t.allianceHeading}</h2>
      <p className="small muted">{t.allianceLead}</p>
      {groups.map((g) => {
        const members = CANDIDATES.filter((c) => !c.withdrawn && side[c.code] === g.id);
        const total = members.reduce((s, c) => s + c.pollShare, 0) + SMALL[g.id].reduce((s, x) => s + x.share, 0);
        // your match with the alliance: members' matches weighted by poll share, ranked parties only
        const scored = members.filter((c) => result.all[c.code].coverage >= COVERAGE_FLOOR && result.all[c.code].compared > 0);
        const w = scored.reduce((s, c) => s + c.pollShare, 0);
        const match = w ? scored.reduce((s, c) => s + c.pollShare * result.all[c.code].weighted, 0) / w : null;
        return (
          <div key={g.id} className="al-row">
            <div className="al-head">
              <strong>{g.label}</strong>
              <span className="al-total">{fmt(lang, total)}%</span>
            </div>
            <div className="al-bar" role="img" aria-label={`${g.label}: ${fmt(lang, total)}%`}>
              {members.map((c) => (
                <span key={c.code} style={{ width: `${(c.pollShare / MAX) * 100}%`, background: c.color }} title={`${c.name} ${c.poll}`} />
              ))}
              {SMALL[g.id].map((x) => <span key={x.name} style={{ width: `${(x.share / MAX) * 100}%`, background: "var(--zinc-dark)" }} title={`${x.name} ${x.share}%`} />)}
              <i className="al-line" style={{ left: `${(LINE / MAX) * 100}%` }} aria-hidden="true" />
            </div>
            <p className="small" style={{ margin: "4px 0 0" }}>
              {total < LINE ? t.allianceShort(fmt(lang, LINE - total)) : g.id === winner ? <strong>{t.allianceBonus}</strong> : t.allianceSecond}
              {" · "}{match === null ? t.allianceNoMatch : t.allianceMatch(pct(lang, match))}
            </p>
            <div className="al-chips">
              {members.map((c) => (
                <button key={c.code} className="chip" style={{ borderColor: c.color }} aria-label={t.allianceMove(c.name)}
                  onClick={() => setSide({ ...side, [c.code]: NEXT[String(side[c.code])] })}>{c.short}</button>
              ))}
            </div>
          </div>
        );
      })}
      <div className="al-row">
        <div className="al-head"><strong>{t.allianceNone}</strong></div>
        <div className="al-chips">
          {alone.map((c) => (
            <button key={c.code} className="chip" style={{ borderColor: c.color }} aria-label={t.allianceMove(c.name)}
              onClick={() => setSide({ ...side, [c.code]: NEXT["null"] })}>{c.short} {fmt(lang, c.pollShare)}%</button>
          ))}
        </div>
        <p className="tiny muted" style={{ marginTop: 6 }}>{t.allianceThreshold}</p>
      </div>
      {changed && <button className="linkish small" onClick={() => setSide(DEFAULT)}>{t.allianceReset}</button>}
      <p className="tiny muted" style={{ marginTop: 8 }}>{t.allianceNote} {t.allianceSmall}</p>
    </section>
  );
}

export function LawPanel() {
  const { t } = useLang();
  return (
    <div>
      {t.lawBody.map((p, i) => <p key={i} className="small">{p}</p>)}
      <h3 className="section-sm">{t.lawSources}</h3>
      <ul className="plain small">
        <li><a href="https://en.wikipedia.org/wiki/Next_Italian_general_election" target="_blank" rel="noopener">Wikipedia, Next Italian general election</a></li>
        <li><a href="https://www.thelocal.it/20261008/latest-italy-approves-new-electoral-law-ahead-of-2027-vote" target="_blank" rel="noopener">The Local, 8 October 2026</a></li>
      </ul>
    </div>
  );
}
