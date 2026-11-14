import { ACTIVE, BY_CODE } from "@country/candidates";
import { AXES } from "@country/statements";
import { useLang } from "../i18n";
import { AXIS_CONFIDENCE_FLOOR, COVERAGE_FLOOR, gridDistance, type Result } from "../lib/scoring";

const W = 360, H = 360, PAD = 34;
const px = (v: number) => PAD + ((v + 100) / 200) * (W - 2 * PAD);
const py = (v: number) => PAD + ((100 - v) / 200) * (H - 2 * PAD);

/** Two axes: economy left–right (x) and open–closed (y, closed at the top). */
export function Grid({ result }: { result: Result }) {
  const { lang, t } = useLang();
  const markers = ACTIVE.filter((c) => result.all[c].coverage >= COVERAGE_FLOOR).map((code) => {
    const a = result.axes[code];
    const low = a.econ.confidence < AXIS_CONFIDENCE_FLOOR || a.open.confidence < AXIS_CONFIDENCE_FLOOR;
    return { code, x: px(a.econ.value), y: py(a.open.value), low, dy: -9 };
  });
  markers.forEach((m, i) => {
    const n = markers.slice(0, i).filter((o) => Math.abs(o.x - m.x) < 26 && Math.abs(o.y - m.y) < 12).length;
    if (n) m.dy = n % 2 === 1 ? 17 : -9 - 11 * Math.ceil(n / 2);
  });
  const ux = px(result.user.econ.value), uy = py(result.user.open.value);
  const [left, right] = AXES.econ[lang];
  const [open, closed] = AXES.open[lang];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="grid" role="img"
      aria-label={t.chartYou(Math.round(result.user.econ.value), Math.round(result.user.open.value))}>
      <line x1={PAD} y1={H / 2} x2={W - PAD} y2={H / 2} stroke="var(--rule)" />
      <line x1={W / 2} y1={PAD} x2={W / 2} y2={H - PAD} stroke="var(--rule)" />
      <g fontSize="8" fill="var(--muted)" fontFamily="var(--mono)" letterSpacing="0.08em">
        <text x={3} y={H / 2 + 3}>{left.toUpperCase()}</text>
        <text x={W - 3} y={H / 2 + 3} textAnchor="end">{right.toUpperCase()}</text>
        <text x={W / 2} y={12} textAnchor="middle">{closed.toUpperCase()}</text>
        <text x={W / 2} y={H - 4} textAnchor="middle">{open.toUpperCase()}</text>
      </g>
      {markers.map((m) => (
        <g key={m.code}>
          <circle cx={m.x} cy={m.y} r="5" fill={m.low ? "var(--slip)" : BY_CODE[m.code].color}
            stroke={BY_CODE[m.code].color} strokeWidth={m.low ? 1.5 : 0} strokeDasharray={m.low ? "2 2" : undefined} />
          <text x={m.x} y={m.y + m.dy} textAnchor="middle" fontSize="8.5" fontWeight="600" fill="var(--ink)"
            fontFamily="var(--mono)" stroke="var(--slip)" strokeWidth="2.5" paintOrder="stroke">
            {BY_CODE[m.code].short}
          </text>
        </g>
      ))}
      <circle cx={ux} cy={uy} r="9" fill="none" stroke="var(--slip)" strokeWidth="4" />
      <circle cx={ux} cy={uy} r="9" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle cx={ux} cy={uy} r="3" fill="var(--ink)" />
      <text x={ux} y={uy > H - PAD - 26 ? uy - 14 : uy + 23} textAnchor="middle" fontSize="9" fontWeight="700"
        fill="var(--ink)" fontFamily="var(--mono)" stroke="var(--slip)" strokeWidth="3" paintOrder="stroke">
        {t.you}
      </text>
    </svg>
  );
}

export function GridText({ result }: { result: Result }) {
  const { t } = useLang();
  const near = result.ranked
    .map((r) => ({ code: r.code, d: gridDistance(result.user, result.axes[r.code]) }))
    .sort((a, b) => a.d - b.d).slice(0, 4);
  return (
    <details>
      <summary>{t.chartText}</summary>
      <p className="small" style={{ marginTop: 8 }}>{t.chartYou(Math.round(result.user.econ.value), Math.round(result.user.open.value))}</p>
      {near.length > 0 && (
        <>
          <p className="small">{t.nearest}</p>
          {near.map(({ code, d }) => (
            <div className="row small" key={code}>
              <span>{BY_CODE[code].name} ({Math.round(result.axes[code].econ.value)}, {Math.round(result.axes[code].open.value)})</span>
              <span className="mono muted">{t.away(Math.round(d))}</span>
            </div>
          ))}
        </>
      )}
    </details>
  );
}
