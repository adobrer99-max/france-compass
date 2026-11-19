/* ============================================================
   Party positions: one code per party per statement.

     A agree · D disagree · N neutral or mixed · - no position on
     record (the default: anything not listed). Unlisted cells are
     left out of that party's match.

   Every code carries a dated source: party votes in Parliament,
   positions reported by Pagella Politica, Open, Il Post and others,
   and programmes. No party has published a 2027 programme yet, so
   everything is provisional; codes from older platforms, collective
   reporting ("the opposition") or a party's governing record are
   marked `weak`. Never fill a gap from the alliance a party is in.
   ============================================================ */

import type { CandidateCode } from "./candidates";

export type Position = "A" | "N" | "D" | "-";

export interface Code {
  p: Exclude<Position, "-">;
  src: string;
  label: string;
  date: string;
  provisional?: boolean;
  weak?: boolean;
  note?: string;
}

export type Codes = Partial<Record<CandidateCode, Partial<Record<number, Code>>>>;

type S = Pick<Code, "src" | "label" | "date" | "weak">;
const MW22: S = { src: "https://pagellapolitica.it/articoli/salario-minimo-mozioni-camera-opposizione", label: "Pagella Politica, Chamber votes on minimum-wage motions", date: "2022-12-01" };
const WT25: S = { src: "https://pagellapolitica.it/articoli/dibattito-patrimoniale-divisioni-partiti", label: "Pagella Politica, the parties on a wealth tax", date: "2025-11-10" };
const WT25W: S = { ...WT25, weak: true };
const WT26: S = { src: "https://pagellapolitica.it/articoli/campo-largo-accordo-patrimoniale", label: "Pagella Politica, the centre-left split on a wealth tax", date: "2026-11-16" };
const WT26W: S = { ...WT26, weak: true };
const RDC26: S = { src: "https://quifinanza.it/politica/reddito-cittadinanza-2-0-m5s-proposta-costi/1022498/", label: "QuiFinanza, M5S 'Reddito 2.0' and the allies' replies", date: "2026-11-03" };
const CL26: S = { src: "https://www.open.online/2026/10/13/campo-largo-trova-intesa-sui-conti-no-scostamento-per-spese-militari/", label: "Open, the centre-left's joint budget resolutions", date: "2026-10-13" };
const CL26W: S = { ...CL26, weak: true };
const CIT24: S = { src: "https://pagellapolitica.it/articoli/posizioni-partiti-riforma-cittadinanza-ius-scholae", label: "Pagella Politica, the parties on citizenship reform", date: "2024-08-19" };
const ALB23: S = { src: "https://www.lapresse.it/politica/2023/11/21/migranti-tajani-accordo-con-albania-non-paragonabile-a-quello-gb-ruanda-2/", label: "LaPresse, Tajani presents the Italy–Albania protocol", date: "2023-11-21" };
const ALB25: S = { src: "https://www.deputatipd.it/files/documenti/162_DL_Albania_una_tragica_farsa_1.pdf", label: "PD deputies' briefing on the 2025 Albania decree", date: "2025-05-15" };
const UKR26A: S = { src: "https://www.open.online/2026/02/11/decreto-ucraina-governo-fiducia-voto-vannacciani/", label: "Open, Chamber confidence vote on the 2026 Ukraine decree", date: "2026-02-11" };
const UKR26B: S = { src: "https://www.open.online/2026/02/25/ucraina-dl-senato-fiducia-no-opposizione-calenda/", label: "Open, Senate vote on the 2026 Ukraine decree", date: "2026-02-25" };
const COAL: S = { src: "https://www.orizzontipolitici.it/coalizioni-a-confronto-campo-largo-centrodestra/", label: "Orizzonti Politici, the coalitions compared (consulted 14 Nov 2026)", date: "2026-11-14", weak: true };
const EUD24: S = { src: "https://pagellapolitica.it/articoli/pnrr-debito-comune-confronto-programmi-elezioni-europee-2024", label: "Pagella Politica, 2024 European programmes on common debt", date: "2024-05-21", weak: true };
const PAL25: S = { src: "https://www.open.online/2025/09/24/palestina-riconoscimento-condizinato-meloni-partiti-cosa-faranno/", label: "Open, the parties on recognising Palestine", date: "2025-09-24" };
const PAL25W: S = { ...PAL25, weak: true };
const JUS26: S = { src: "https://www.fanpage.it/politica/chi-vota-si-e-chi-vota-no-al-referendum-sulla-giustizia-2026-la-posizione-dei-partiti-sul-quesito/", label: "Fanpage, the parties on the 2026 justice referendum", date: "2026-03-13" };
const PRM24: S = { src: "https://www.ilpost.it/2024/06/18/senato-approvato-ddl-premierato/", label: "Il Post, Senate passes the direct-election reform 109–77", date: "2024-06-18", weak: true };
const AUT24: S = { src: "https://www.lapresse.it/politica/2024/06/19/autonomia-camera-approva-testo-con-172-si-e-99-no/", label: "LaPresse, Chamber passes differentiated autonomy 172–99", date: "2024-06-19", weak: true };
const LAW26: S = { src: "https://www.thelocal.it/20261008/latest-italy-approves-new-electoral-law-ahead-of-2027-vote", label: "The Local, Italy approves the new electoral law", date: "2026-10-08" };
const NUC26: S = { src: "https://www.ilfattoquotidiano.it/2026/06/04/nucleare-la-camera-approva-la-legge-delega-pichetto-scelta-di-concretezza-non-ideologica-opposizioni-di-traverso/8408721/", label: "Il Fatto Quotidiano, Chamber passes the nuclear law 155–86", date: "2026-06-04" };
const NUC26W: S = { ...NUC26, weak: true };
const BRG23: S = { src: "https://pagellapolitica.it/articoli/posizioni-partiti-ponte-sullo-stretto", label: "Pagella Politica, the parties on the Strait bridge", date: "2023-12-22" };
const SSM22: S = { src: "https://www.editorialedomani.it/politica/italia/cosa-pensano-i-partiti-su-matrimonio-egualitario-e-omogenitorialita-m7gz1hfl", label: "Domani, 2022 programmes on same-sex marriage", date: "2022-09-13", weak: true };
const EOL26: S = { src: "https://www.open.online/2026/05/12/fine-vita-senato-forza-italia-pd-scontro/", label: "Open, the end-of-life bill in the Senate", date: "2026-05-12" };
const FLT22: S = { src: "https://ntplusfisco.ilsole24ore.com/art/delega-fiscale-partiti-467-emendamenti-destra-no-catasto-sinistra-frena-flat-tax-AEJAG97", label: "Il Sole 24 Ore, the parties' tax-reform amendments", date: "2022-01-14", weak: true };
const PEN: S = { src: "https://www.finanza.com/lavoro/pensioni/pensioni-quota-41-uscite-flessibili-proposte-partiti", label: "Finanza.com, the parties' pension proposals (consulted 15 Nov 2026)", date: "2026-11-15", weak: true };
const REF25: S = { src: "https://www.agi.it/politica/news/2025-06-06/posizioni-partiti-referendum-lavoro-cittadinanza-31745055/", label: "AGI, the parties on the June 2025 referendums", date: "2025-06-06" };
const RUS22: S = { src: "https://pagellapolitica.it/articoli/posizioni-partiti-sanzioni-russia", label: "Pagella Politica, the parties on Russia sanctions", date: "2022-09-06", weak: true };
const RUS26: S = { src: "https://www.ilpost.it/2026/09/15/matteo-salvini-incontro-imprenditori-italiani-russia/", label: "Il Post, Salvini meets businesses trading with Russia", date: "2026-09-15" };
const UKR26C: S = { src: "https://www.ilpost.it/2026/02/24/guerra-ucraina-24-febbraio-quattro-anni-politica-italiana-salvini-conte-meloni-schlein/", label: "Il Post, Italian politics and Ukraine four years on", date: "2026-02-24" };
const LEV24: S = { src: "https://www.open.online/2024/05/12/leva-militare-obbligatoria-proposta-salvini-reazioni", label: "Open, reactions to Salvini's military-service proposal", date: "2024-05-12" };
const LEV24W: S = { ...LEV24, weak: true };
const CAN25: S = { src: "https://www.fanpage.it/politica/la-destra-continua-la-guerra-alla-cannabis-bocciate-tutte-le-mozioni-in-parlamento-cosa-chiedevano/", label: "Fanpage, Chamber votes on cannabis motions", date: "2025-01-23" };
const FN26: S = { src: "https://pagellapolitica.it/articoli/programma-futuro-nazionale-vannacci-elezioni-2027", label: "Pagella Politica, Futuro Nazionale's 2027 programme (consulted 14 Nov 2026)", date: "2026-11-14" };

type Row = [id: number, p: Exclude<Position, "-">, src: S, note?: string];
const rows = (list: Row[]) =>
  Object.fromEntries(list.map(([id, p, src, note]) => [id, { p, ...src, provisional: true, ...(note ? { note } : {}) }])) as Partial<Record<number, Code>>;

export const CODES: Codes = {
  FDI: rows([
    [1, "D", MW22, "Co-signed the majority motion without a minimum wage"],
    [2, "D", WT25, "Meloni: a wealth tax will 'never see the light' with the right in government"],
    [5, "D", CIT24, "'Not on our agenda'"],
    [6, "A", ALB23, "The Meloni government's protocol"],
    [7, "A", UKR26A, "Government decree extending military aid for 2026"],
    [9, "A", CL26W, "Government asked to use the EU escape clause for defence and energy"],
    [10, "D", PAL25, "Recognition only once hostages are freed and Hamas is out of Gaza's government"],
    [11, "A", JUS26],
    [12, "A", PRM24, "The government's reform"],
    [14, "A", LAW26, "Meloni: 'stable governments and greater participation'"],
    [15, "A", NUC26W, "The governing majority's law"],
    [16, "A", BRG23],
    [17, "D", SSM22],
    [19, "A", FLT22, "Backed raising the self-employed flat-tax ceiling"],
    [20, "N", PEN, "'Gradually move beyond the Fornero law', with an eye on costs"],
    [23, "A", RUS22, "Meloni: 'we won't pull out of the sanctions'"],
    [24, "D", LEV24W, "Defence minister Crosetto: the armed forces aren't there to educate the young"],
    [25, "D", CAN25, "Voted down every cannabis motion"],
  ]),
  PD: rows([
    [1, "A", MW22, "Proposed €9.50 an hour"],
    [2, "A", WT26, "Schlein: in favour of a tax on the super-rich, which 'can also be done at national level'; no formal proposal yet"],
    [3, "A", RDC26, "'The principle is shared'; proposes a universal social protection scheme"],
    [4, "A", CL26],
    [5, "A", CIT24, "Prefers ius soli; open to other routes"],
    [6, "D", ALB25, "Calls the centres a costly failure"],
    [7, "A", UKR26C, "Has voted consistently for aid; Schlein says little about it"],
    [8, "A", EUD24, "Make the recovery facility permanent"],
    [9, "D", CL26, "Asks to reconsider NATO spending commitments"],
    [10, "A", PAL25, "Braga: recognition now; conditions 'make no sense'"],
    [11, "D", JUS26, "Party line No; some members dissented"],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [13, "D", AUT24, "Voted against with the opposition"],
    [15, "D", NUC26],
    [16, "D", BRG23],
    [17, "A", SSM22],
    [18, "A", EOL26, "Backs the Bazoli bill with the health service involved"],
    [19, "N", FLT22, "Wants the flat tax rethought, not extended"],
    [20, "N", PEN, "Flexible retirement from 63 with a recalculated pension"],
    [21, "A", REF25, "Five Yes votes in the 2025 referendums"],
    [22, "A", REF25],
    [23, "A", RUS22],
    [25, "N", CAN25, "Proposed allowing limited home growing, not full legalisation"],
  ]),
  M5S: rows([
    [1, "A", MW22, "Proposed at least €9 an hour"],
    [2, "D", WT26, "Conte: no to a wealth tax; tax financial speculation instead"],
    [3, "A", RDC26, "Its 'Reddito 2.0'"],
    [4, "A", CL26],
    [5, "A", CIT24, "Ius scholae after a full school cycle; against ius soli"],
    [7, "D", COAL],
    [8, "A", EUD24, "For green investment"],
    [9, "D", CL26],
    [10, "A", PAL25, "Recognition 'regardless'"],
    [11, "D", JUS26],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [13, "D", AUT24, "Voted against with the opposition"],
    [15, "D", NUC26W, "Raised constitutional objections to the bill"],
    [16, "D", BRG23],
    [17, "A", SSM22],
    [18, "A", EOL26],
    [19, "N", FLT22, "Proposed a two-year path for those above the ceiling"],
    [20, "N", PEN, "Flexible retirement from 63 or 64 with a recalculated pension"],
    [21, "A", REF25],
    [22, "N", REF25, "Free vote; Conte opposed halving the residence period"],
    [23, "A", RUS22, "Conte: 'the sanctions hurt us, but we must keep them'"],
    [25, "A", CAN25, "Proposed legalising therapeutic and recreational use"],
  ]),
  FI: rows([
    [1, "D", MW22],
    [2, "D", WT25W, "Reported with the other governing parties"],
    [5, "A", CIT24, "Tajani: in favour, not a priority"],
    [6, "A", ALB23, "Tajani presented the protocol to the Chamber"],
    [7, "A", UKR26A, "Government decree"],
    [8, "A", EUD24, "Pool debt to handle crises"],
    [9, "A", CL26W, "Government request"],
    [11, "A", JUS26],
    [12, "A", PRM24, "The government's reform"],
    [15, "A", NUC26W, "The governing majority's law"],
    [16, "A", BRG23],
    [17, "D", SSM22],
    [18, "N", EOL26, "Backs a narrower text that follows the Constitutional Court"],
    [19, "A", FLT22],
    [23, "A", RUS22, "Tajani: 'the sanctions must stay. Full stop.'"],
  ]),
  AVS: rows([
    [1, "A", MW22, "Proposed €10 an hour"],
    [2, "A", WT26, "Fratoianni: a tax on the largest fortunes in the programme 'is a necessity'; proposes it above €5.4 million"],
    [3, "A", RDC26, "Bonelli: 'certainly a priority'"],
    [4, "A", CL26],
    [5, "A", CIT24, "Ius soli, from its 2022 platform"],
    [7, "D", COAL],
    [8, "A", EUD24],
    [9, "D", CL26],
    [10, "A", PAL25W, "Opposed the government's conditional motion; wants recognition of the Palestinian Authority"],
    [11, "D", JUS26],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [13, "D", AUT24, "Voted against with the opposition"],
    [14, "D", LAW26, "Piccolotti called the pressure to pass it 'blackmail'"],
    [15, "D", NUC26W, "Raised constitutional objections to the bill"],
    [16, "D", BRG23],
    [17, "A", SSM22, "Sinistra Italiana"],
    [18, "A", EOL26],
    [21, "A", REF25],
    [22, "A", REF25],
    [23, "A", RUS22, "Fratoianni wanted them widened"],
    [25, "A", CAN25, "Proposed decriminalising and regulating cultivation"],
  ]),
  LEGA: rows([
    [1, "D", MW22],
    [2, "D", WT25W, "Reported with the other governing parties"],
    [5, "D", CIT24],
    [7, "A", UKR26B, "Romeo: backing the decree while talks go on"],
    [9, "A", CL26W, "Government request"],
    [11, "A", JUS26],
    [12, "A", PRM24, "The government's reform"],
    [13, "A", AUT24, "The law of Lega minister Calderoli"],
    [15, "A", NUC26W, "The governing majority's law"],
    [16, "A", BRG23, "Salvini, as infrastructure minister, leads the project"],
    [17, "D", SSM22],
    [19, "A", FLT22, "Salvini: raise the ceiling to €100,000"],
    [20, "A", PEN, "Its 'Quota 41'"],
    [23, "N", RUS26, "Votes for sanctions but calls them self-harm; wants trade restored after the war"],
    [24, "A", LEV24, "Salvini's six-month service bill"],
  ]),
  FN: rows([
    [5, "D", FN26, "Citizenship only after 20 years' residence"],
    [6, "A", FN26, "More returns and 'safe third country' deals"],
    [7, "D", UKR26A, "Its deputies voted against the decree on the merits"],
    [9, "D", CL26, "Wants defence money spent on internal security instead"],
    [11, "A", FN26],
    [15, "A", FN26],
    [22, "D", FN26, "Citizenship only after 20 years' residence"],
  ]),
  AZ: rows([
    [1, "A", MW22, "Joint Azione–Italia Viva motion for at least €9"],
    [5, "A", CIT24],
    [7, "A", UKR26B, "Strongly backs Kyiv; voted no only because confidence was attached"],
    [8, "A", EUD24, "Including for defence"],
    [9, "N", CL26, "Wants the extra borrowing spent on growth instead"],
    [10, "A", PAL25W, "Calenda called the government's conditions 'a clever way to say no'"],
    [11, "A", JUS26, "In favour, with doubts on details"],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [15, "A", NUC26],
    [16, "N", BRG23, "Voted for the bridge decree; Calenda has wavered"],
    [21, "D", REF25],
    [22, "A", REF25, "Its only Yes in the 2025 referendums"],
    [23, "A", RUS22, "Wanted an oil embargo too"],
    [25, "N", CAN25, "Proposed decriminalising use, not legal sale"],
  ]),
  IV: rows([
    [1, "A", CL26, "Signed the centre-left's call for a minimum-wage law"],
    [2, "D", WT26W, "Renzi calls a wealth tax a hard-to-apply slogan that would drive capital away (reported, not quoted)"],
    [3, "N", RDC26, "Open to talks, after earlier trying to abolish it"],
    [4, "A", CL26],
    [5, "A", CIT24],
    [7, "A", UKR26B, "Agrees with the decree; voted no on confidence"],
    [8, "A", EUD24, "Joint list with +Europa"],
    [9, "D", CL26],
    [11, "N", JUS26, "Free vote"],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [16, "A", BRG23, "Voted for the 2023 bridge decree"],
    [21, "D", REF25, "Renzi's own reform"],
    [22, "A", REF25],
  ]),
  PE: rows([
    [2, "N", WT26, "Magi: 'no prejudicial closure' but doubts it works; prefers taxing idle capital and large inheritances"],
    [5, "A", CIT24, "Magi: the law is outdated"],
    [8, "A", EUD24, "Joint list with Italia Viva"],
    [10, "A", PAL25W, "Magi called the conditional motion a 'sleight of hand'"],
    [11, "A", JUS26, "In favour, with doubts on details"],
    [12, "D", PRM24, "Voted against with the whole opposition"],
    [17, "A", SSM22],
    [21, "D", REF25],
    [22, "A", REF25],
    [23, "A", RUS22],
    [25, "A", CAN25, "Proposed regulated cultivation, distribution and sale"],
  ]),
  NM: rows([
    [1, "D", MW22],
    [2, "D", WT25W, "Reported with the other governing parties"],
    [5, "A", CIT24, "Lupi: citizenship after two school cycles"],
    [7, "A", UKR26A, "Government decree"],
    [9, "A", CL26W, "Government request"],
    [11, "A", JUS26],
    [12, "A", PRM24, "The government's reform"],
    [21, "D", REF25],
    [24, "D", LEV24, "Lupi: build a common European defence instead"],
  ]),
};

export function positionOf(code: CandidateCode, id: number, codes: Codes = CODES): Position {
  return codes[code]?.[id]?.p ?? "-";
}

export const CHANGES: { date: string; candidate: CandidateCode; statement: number; from: Position; to: Position; why: string }[] = [
  { date: "2026-11-15", candidate: "PD", statement: 2, from: "N", to: "A", why: "Schlein said a tax on the super-rich can also be done at national level, not only in the EU (Pagella Politica, 16 Nov 2026)." },
];
