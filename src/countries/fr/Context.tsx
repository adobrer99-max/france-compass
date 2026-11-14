import { BY_CODE } from "./candidates";
import { ELECTIONS, FIREWALL, FIREWALL_LOG, POLL_NOW, TRANSFERS, type Src, type Stance } from "./context";
import { tx, useLang, type Lang } from "../../i18n";

const pctx = (lang: Lang, v: number) => (lang === "fr" ? `${v.toLocaleString("fr-FR")} %` : `${v}%`);
import { Avatar } from "../../components/bits";

function SrcLink({ s }: { s: Src }) {
  return <a href={s.url} target="_blank" rel="noopener">{s.label}</a>;
}

const STANCE_CLASS: Record<Stance, string> = {
  block: "st-block", noRN: "st-norn", niNi: "st-nini", free: "st-free", backsRN: "st-backs", isRN: "st-isrn", unknown: "st-unknown",
};

export function StanceTag({ s }: { s: Stance }) {
  const { t } = useLang();
  return <span className={`stance ${STANCE_CLASS[s]}`}>{t.stances[s]}</span>;
}

/** The front républicain: who has called to block the far right, then and now. */
export function FirewallPanel({ onCandidate }: { onCandidate: (c: (typeof FIREWALL)[number]["code"]) => void }) {
  const { lang, t } = useLang();
  return (
    <div>
      {t.firewallIntro.map((p, i) => <p key={i} className="small">{p}</p>)}

      <h3 className="section-sm">{t.firewallTimeline}</h3>
      <ol className="fw-timeline">
        {ELECTIONS.filter((e) => e.year !== 2007 && e.year !== 2012).map((e) => {
          const fr = e.r2?.find((x) => x.farRight);
          return (
            <li key={e.year}>
              <span className="mono fw-year">{e.year}</span>
              <div>
                <div className="small"><strong>{e.kind === "leg" ? t.legislative : t.runoffWord}</strong>{fr && <> · {fr.name} {pctx(lang, fr.pct)}</>}</div>
                <p className="small" style={{ margin: "2px 0" }}>{tx(lang, e.note)}</p>
                <div className="tiny muted">{e.src.map((s, i) => <span key={i}>{i > 0 && " · "}<SrcLink s={s} /></span>)}</div>
              </div>
            </li>
          );
        })}
      </ol>

      <h3 className="section-sm">{t.firewall2027}</h3>
      <p className="small muted">{t.firewall2027Lead}</p>
      <div className="fw-legend">
        {(["block", "noRN", "niNi", "free", "backsRN"] as Stance[]).map((s) => <div key={s} className="tiny"><StanceTag s={s} /> {t.stanceExplain[s as keyof typeof t.stanceExplain]}</div>)}
      </div>
      <ul className="fw-list">
        {FIREWALL.map((row) => {
          const c = BY_CODE[row.code];
          return (
            <li key={row.code}>
              <div className="fw-head">
                <Avatar code={row.code} size={30} />
                <button className="linkish cand-name" onClick={() => onCandidate(row.code)}>{c.name}</button>
                <span className="fw-now"><span className="tiny muted">2027: </span><StanceTag s={row.for2027} /></span>
              </div>
              {row.record.length > 0 ? (
                <ul className="plain fw-record">
                  {row.record.map((ev, i) => (
                    <li key={i} className="small">
                      <StanceTag s={ev.stance} /> <span className="muted">{ev.who}:</span> {tx(lang, ev.quote)}{" "}
                      <span className="tiny muted">(<SrcLink s={ev.src} />)</span>
                    </li>
                  ))}
                </ul>
              ) : row.for2027 !== "isRN" && <p className="tiny muted fw-record">{t.noRecord}</p>}
            </li>
          );
        })}
      </ul>

      <h3 className="section-sm">{t.firewallLog}</h3>
      {FIREWALL_LOG.length === 0 ? <p className="small muted">{t.firewallLogEmpty}</p> : (
        <ul className="plain small">
          {FIREWALL_LOG.map((x, i) => <li key={i}><span className="mono">{x.date}</span> {tx(lang, x.text)} <span className="tiny">(<SrcLink s={x.src} />)</span></li>)}
        </ul>
      )}
    </div>
  );
}

const W = 340, H = 170, PAD_L = 30, PAD_B = 22;

/** Far-right share in each presidential first round and runoff since 2002. */
function FarRightChart() {
  const { lang, t } = useLang();
  const pres = ELECTIONS.filter((e) => e.kind === "pres");
  const bw = (W - PAD_L - 10) / pres.length;
  const y = (v: number) => H - PAD_B - (v / 50) * (H - PAD_B - 10);
  const num = (v: number) => v.toLocaleString(lang === "fr" ? "fr-FR" : "en-GB", { maximumFractionDigits: 1 });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img" aria-label={t.historyChartAlt}>
      {[0, 25, 50].map((v) => (
        <g key={v}>
          <line x1={PAD_L} x2={W - 6} y1={y(v)} y2={y(v)} stroke="var(--rule)" />
          <text x={PAD_L - 4} y={y(v) + 3} textAnchor="end" fontSize="8" fill="var(--muted)" fontFamily="var(--mono)">{v}%</text>
        </g>
      ))}
      {pres.map((e, i) => {
        const r1 = e.r1.filter((x) => x.farRight).reduce((s, x) => s + x.pct, 0);
        const r2 = e.r2?.find((x) => x.farRight)?.pct;
        const x0 = PAD_L + i * bw + bw * 0.18;
        const w = bw * 0.3;
        return (
          <g key={e.year}>
            <rect x={x0} y={y(r1)} width={w} height={y(0) - y(r1)} fill="var(--envelope)" opacity="0.45" />
            <text x={x0 + w / 2} y={y(r1) - 3} textAnchor="middle" fontSize="7.5" fontFamily="var(--mono)" fill="var(--ink)">{num(r1)}</text>
            {r2 !== undefined && (
              <>
                <rect x={x0 + w + 2} y={y(r2)} width={w} height={y(0) - y(r2)} fill="var(--envelope)" />
                <text x={x0 + w * 1.5 + 2} y={y(r2) - 3} textAnchor="middle" fontSize="7.5" fontFamily="var(--mono)" fill="var(--ink)">{num(r2)}</text>
              </>
            )}
            <text x={x0 + w + 1} y={H - 8} textAnchor="middle" fontSize="8.5" fontFamily="var(--mono)" fill="var(--muted)">{e.year}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function HistoryPanel() {
  const { lang, t } = useLang();
  return (
    <div>
      {t.historyIntro.map((p, i) => <p key={i} className="small">{p}</p>)}

      <h3 className="section-sm">{t.historyChart}</h3>
      <FarRightChart />
      <div className="tiny muted chart-key">
        <span><i className="key-sw" style={{ opacity: 0.45 }} /> {t.keyR1}</span>
        <span><i className="key-sw" /> {t.keyR2}</span>
      </div>

      <h3 className="section-sm">{t.transfersHeading}</h3>
      <p className="small muted">{t.transfersLead}</p>
      {TRANSFERS.map((tr) => (
        <div key={tr.year} className="transfers">
          <div className="small"><strong>{tr.year}</strong> · {t.transfersCols(tr.winner, tr.farRight)}</div>
          {tr.rows.map((r) => {
            const rest = 100 - r.toWinner - r.toFarRight;
            return (
              <div key={r.from} className="tr-row">
                <span className="tr-from small">{r.from}</span>
                <div className="tr-bar" role="img" aria-label={`${r.from}: ${r.toWinner}% ${tr.winner}, ${r.toFarRight}% ${tr.farRight}, ${rest}% ${t.blankOrHome}`}>
                  <span className="tr-w" style={{ width: `${r.toWinner}%` }}>{r.toWinner}</span>
                  <span className="tr-r" style={{ width: `${rest}%` }}>{rest >= 12 ? rest : ""}</span>
                  <span className="tr-f" style={{ width: `${r.toFarRight}%` }}>{r.toFarRight >= 6 ? r.toFarRight : ""}</span>
                </div>
              </div>
            );
          })}
          <div className="tiny muted"><SrcLink s={tr.src} /></div>
        </div>
      ))}
      <div className="tiny muted chart-key">
        <span><i className="key-sw tr-w" /> {t.keyWinner}</span>
        <span><i className="key-sw tr-r" /> {t.blankOrHome}</span>
        <span><i className="key-sw tr-f" /> {t.keyFar}</span>
      </div>

      <h3 className="section-sm">{t.resultsTable}</h3>
      <div className="scroller">
        <table className="hist">
          <tbody>
            {[...ELECTIONS].reverse().map((e) => (
              <tr key={e.year}>
                <th scope="row" className="mono">{e.year}{e.kind === "leg" && <div className="tiny muted">{t.legislativeShort}</div>}</th>
                <td>
                  <div className="tiny muted">{t.round1}</div>
                  {e.r1.map((x) => <div key={x.name} className={`small${x.farRight ? " far" : ""}`}>{x.name}{x.party && <span className="muted"> ({x.party})</span>} {pctx(lang, x.pct)}</div>)}
                  <div className="tiny muted" style={{ marginTop: 6 }}>{e.r2 ? t.round2 : t.noRunoffRow}</div>
                  {e.r2?.map((x) => <div key={x.name} className={`small${x.farRight ? " far" : ""}`}>{x.name} {pctx(lang, x.pct)}</div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="section-sm">{t.pollNowHeading}</h3>
      <p className="small">{tx(lang, POLL_NOW.text)}</p>
      <p className="tiny muted"><a href={POLL_NOW.url} target="_blank" rel="noopener">{POLL_NOW.label}</a> · <a href={POLL_NOW.odoxa.url} target="_blank" rel="noopener">{POLL_NOW.odoxa.label}</a></p>
    </div>
  );
}
