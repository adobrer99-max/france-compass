/* ============================================================
   Share card, carried over from the Israel compass: assume every
   result is screenshotted and posted without the page around it,
   so the caveat lives on the image. 1200×630, in the reader's
   language.
   ============================================================ */

import { BY_CODE, initials, type CandidateCode } from "../data/candidates";
import { AXES } from "../data/statements";
import { STRINGS, type Lang } from "../i18n";
import type { Result } from "./scoring";

const W = 1200;
const H = 630;
const INK = "#131a2b";
const PAPER = "#f1f2ed";
const SLIP = "#fbfbf7";
const RULE = "#c9cbc4";
const MUTED = "#5a6070";
const ENVELOPE = "#1e4b8f";
const SANS = "Archivo, system-ui, sans-serif";
const MONO = "'IBM Plex Mono', monospace";

function wrap(ctx: CanvasRenderingContext2D, text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const w of text.split(" ")) {
    const next = line ? `${line} ${w}` : w;
    if (ctx.measureText(next).width > max && line) { lines.push(line); line = w; } else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

const pct = (lang: Lang, n: number) => (lang === "fr" ? `${Math.round(n)}\u202F%` : `${Math.round(n)}%`);

export function drawShareCard(canvas: HTMLCanvasElement, result: Result, lang: Lang, runoff: [CandidateCode, CandidateCode]): void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const t = STRINGS[lang];
  canvas.width = W;
  canvas.height = H;

  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = ENVELOPE;
  ctx.fillRect(0, 0, 10, H);

  ctx.fillStyle = ENVELOPE;
  ctx.font = `600 20px ${MONO}`;
  ctx.fillText(t.title.toUpperCase(), 56, 64);
  ctx.fillStyle = MUTED;
  ctx.font = `400 17px ${MONO}`;
  ctx.fillText(t.cardSub.toUpperCase(), 56, 92);

  // --- closest matches ---
  ctx.fillStyle = INK;
  ctx.font = `700 30px ${SANS}`;
  ctx.fillText(t.cardTop, 56, 152);

  let y = 178;
  const top = result.ranked.slice(0, 3);
  if (top.length === 0) {
    ctx.fillStyle = MUTED;
    ctx.font = `400 20px ${SANS}`;
    wrap(ctx, t.notCodedYet, 600).forEach((l, i) => ctx.fillText(l, 56, y + 30 + i * 28));
  }
  top.forEach((m, i) => {
    const c = BY_CODE[m.code];
    ctx.fillStyle = SLIP;
    ctx.fillRect(56, y, 640, 76);
    ctx.strokeStyle = i === 0 ? INK : RULE;
    ctx.lineWidth = i === 0 ? 2 : 1;
    ctx.strokeRect(56, y, 640, 76);
    // initials badge in the candidate's colour
    ctx.fillStyle = c.color;
    ctx.beginPath();
    ctx.arc(100, y + 38, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.font = `700 18px ${SANS}`;
    ctx.textAlign = "center";
    ctx.fillText(initials(c.name), 100, y + 44);
    ctx.textAlign = "left";
    ctx.fillStyle = INK;
    ctx.font = `600 26px ${SANS}`;
    ctx.fillText(c.name, 140, y + 36);
    ctx.fillStyle = MUTED;
    ctx.font = `400 16px ${SANS}`;
    ctx.fillText(`${c.party} · ${t.basedOn(m.compared)}`, 140, y + 60);
    ctx.fillStyle = INK;
    ctx.font = `700 32px ${MONO}`;
    ctx.textAlign = "right";
    ctx.fillText(pct(lang, m.weighted), 676, y + 50);
    ctx.textAlign = "left";
    y += 88;
  });

  // --- the chart ---
  const gx = 760, gy = 140, gs = 290;
  ctx.fillStyle = INK;
  ctx.font = `700 22px ${SANS}`;
  ctx.fillText(t.chartHeading, gx, gy - 4);
  const top0 = gy + 16;
  ctx.fillStyle = SLIP;
  ctx.fillRect(gx, top0, gs, gs);
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1;
  ctx.strokeRect(gx, top0, gs, gs);
  ctx.beginPath();
  ctx.moveTo(gx + gs / 2, top0); ctx.lineTo(gx + gs / 2, top0 + gs);
  ctx.moveTo(gx, top0 + gs / 2); ctx.lineTo(gx + gs, top0 + gs / 2);
  ctx.stroke();
  const [left, right] = AXES.econ[lang];
  const [open, closed] = AXES.open[lang];
  ctx.fillStyle = MUTED;
  ctx.font = `500 12px ${MONO}`;
  ctx.fillText(left.toUpperCase(), gx + 6, top0 + gs / 2 - 6);
  ctx.textAlign = "right";
  ctx.fillText(right.toUpperCase(), gx + gs - 6, top0 + gs / 2 - 6);
  ctx.textAlign = "center";
  ctx.fillText(closed.toUpperCase(), gx + gs / 2, top0 + 16);
  ctx.fillText(open.toUpperCase(), gx + gs / 2, top0 + gs - 8);
  const pad = 22; // keep dots and labels inside the frame
  const px = (v: number) => gx + pad + ((v + 100) / 200) * (gs - 2 * pad);
  const py = (v: number) => top0 + pad + ((100 - v) / 200) * (gs - 2 * pad);
  for (const m of top) {
    const a = result.axes[m.code];
    ctx.fillStyle = BY_CODE[m.code].color;
    ctx.beginPath();
    ctx.arc(px(a.econ.value), py(a.open.value), 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = `600 13px ${MONO}`;
    const lx = Math.min(Math.max(px(a.econ.value), gx + 50), gx + gs - 50);
    const ly = py(a.open.value) < top0 + 40 ? py(a.open.value) + 22 : py(a.open.value) - 11;
    ctx.fillText(BY_CODE[m.code].short, lx, ly);
  }
  const ux = px(result.user.econ.value), uy = py(result.user.open.value);
  ctx.strokeStyle = INK;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(ux, uy, 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.beginPath();
  ctx.arc(ux, uy, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = `700 13px ${MONO}`;
  ctx.fillText(t.you, ux, uy + 28);
  ctx.textAlign = "left";

  // --- runoff line ---
  const [a, b] = runoff.map((c) => result.all[c]);
  const ok = a.coverage > 0 && b.coverage > 0 && result.ranked.some((r) => r.code === a.code) && result.ranked.some((r) => r.code === b.code);
  if (ok) {
    const d = a.weighted - b.weighted;
    const line = Math.abs(d) < 3 ? t.tie : t.closerTo(BY_CODE[d > 0 ? runoff[0] : runoff[1]].name);
    ctx.fillStyle = INK;
    ctx.font = `600 18px ${SANS}`;
    wrap(ctx, `${t.cardRunoff(BY_CODE[runoff[0]].short, BY_CODE[runoff[1]].short)} ${line}`, 640).slice(0, 2)
      .forEach((l, i) => ctx.fillText(l, 56, 456 + i * 24));
  }

  // --- the caveat, on the image ---
  ctx.fillStyle = SLIP;
  ctx.fillRect(56, H - 132, W - 112, 92);
  ctx.strokeStyle = RULE;
  ctx.lineWidth = 1;
  ctx.strokeRect(56, H - 132, W - 112, 92);
  ctx.fillStyle = MUTED;
  ctx.font = `400 16px ${SANS}`;
  wrap(ctx, t.cardCaveat, W - 152).slice(0, 3).forEach((l, i) => ctx.fillText(l, 76, H - 104 + i * 22));
  ctx.fillStyle = ENVELOPE;
  ctx.font = `600 15px ${MONO}`;
  ctx.textAlign = "right";
  ctx.fillText("Adam Dobrer ©", W - 76, H - 52);
  ctx.textAlign = "left";
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string): void {
  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, "image/png");
}

/** Share the image itself where the device can (phones), otherwise download it. */
export async function shareCanvas(canvas: HTMLCanvasElement, filename: string, text: string): Promise<void> {
  const blob: Blob | null = await new Promise((r) => canvas.toBlob(r, "image/png"));
  if (!blob) return;
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
  if (nav.share && nav.canShare?.({ files: [file] })) {
    try { await nav.share({ files: [file], text }); return; } catch { /* cancelled */ }
  }
  downloadCanvas(canvas, filename);
}
