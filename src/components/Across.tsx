import { useEffect, useState } from "react";
import { COUNTRY } from "@country/config";
import { BY_CODE } from "@country/candidates";
import { AXES } from "@country/statements";
import { pct, STRINGS, useLang, type Lang } from "../i18n";
import { readSummaries, saveSummary, type Summary } from "../lib/across";
import type { Result } from "../lib/scoring";

const HUB = "https://adamdobrer.ca/compasses/";

/** Saves this result for the other compasses, and shows theirs next to it. */
export function Across({ result }: { result: Result }) {
  const { lang, t } = useLang();
  const [others, setOthers] = useState<Summary[]>([]);

  useEffect(() => {
    const langs = COUNTRY.langs as readonly Lang[];
    saveSummary({
      country: COUNTRY.id,
      title: Object.fromEntries(langs.map((l) => [l, STRINGS[l].title])),
      url: COUNTRY.siteUrl,
      at: new Date().toISOString().slice(0, 10),
      econ: Math.round(result.user.econ.value),
      open: Math.round(result.user.open.value),
      top: result.ranked.slice(0, 3).map((m) => ({ name: BY_CODE[m.code].name, color: BY_CODE[m.code].color, pct: Math.round(m.weighted) })),
    });
    setOthers(Object.values(readSummaries()).filter((s) => s.country !== COUNTRY.id));
  }, [result]);

  const me = { country: COUNTRY.id, econ: result.user.econ.value, open: result.user.open.value, label: t.title };
  const dots = [me, ...others.map((o) => ({ country: o.country, econ: o.econ, open: o.open, label: o.title[lang] ?? o.title.en ?? o.country }))];
  const S = 220, pad = 18;
  const px = (v: number) => pad + ((v + 100) / 200) * (S - 2 * pad);
  const py = (v: number) => pad + ((100 - v) / 200) * (S - 2 * pad);
  const [left, right] = AXES.econ[lang];
  const [open, closed] = AXES.open[lang];

  return (
    <section className="card across">
      <h2 style={{ fontSize: 22 }}>{t.acrossHeading}</h2>
      {others.length === 0 ? (
        <p className="small muted">{t.acrossNone} <a href={HUB}>{t.acrossHub}</a></p>
      ) : (
        <>
          <p className="small muted">{t.acrossLead}</p>
          <div className="across-grid">
            <svg viewBox={`0 0 ${S} ${S}`} className="across-chart" role="img" aria-label={t.acrossHeading}>
              <rect x={0.5} y={0.5} width={S - 1} height={S - 1} className="ac-frame" />
              <line x1={S / 2} y1={0} x2={S / 2} y2={S} className="ac-axis" />
              <line x1={0} y1={S / 2} x2={S} y2={S / 2} className="ac-axis" />
              <text x={4} y={S / 2 - 4} className="ac-lab">{left}</text>
              <text x={S - 4} y={S / 2 - 4} className="ac-lab" textAnchor="end">{right}</text>
              <text x={S / 2 + 4} y={12} className="ac-lab">{closed}</text>
              <text x={S / 2 + 4} y={S - 5} className="ac-lab">{open}</text>
              {dots.map((d) => (
                <g key={d.country}>
                  <circle cx={px(d.econ)} cy={py(d.open)} r={d.country === COUNTRY.id ? 7 : 5} className={d.country === COUNTRY.id ? "ac-me" : "ac-other"} />
                  <text x={px(d.econ) + 9} y={py(d.open) + 4} className="ac-name">{d.country.toUpperCase()}</text>
                </g>
              ))}
            </svg>
            <ul className="plain small across-list">
              {others.map((o) => (
                <li key={o.country}>
                  <a href={o.url}><strong>{o.title[lang] ?? o.title.en}</strong></a>
                  <span className="muted"> · {o.at}</span><br />
                  {o.top[0] ? t.acrossClosest(o.top[0].name, pct(lang, o.top[0].pct)) : t.notCoded}
                </li>
              ))}
            </ul>
          </div>
          <p className="tiny muted">{t.acrossNote} <a href={HUB}>{t.acrossHub}</a></p>
        </>
      )}
    </section>
  );
}
