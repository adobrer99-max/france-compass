/* ============================================================
   Party positions: one code per party per statement.

     A agree · D disagree · N neutral or mixed · - no position on
     record (the default: anything not listed). Unlisted cells are
     left out of that party's match.

   Every code carries a dated source. The Grüne adopted their 2027
   programme on 15 November 2026 and the AfD on 22 November 2026, but
   neither text is online yet (AfD codes come from its programme
   motion as dpa quoted it); no other party has one out. So this is still a first pass: most codes come from
   the 2022 Landtag programmes, the 2022 CDU–Grüne exploratory paper
   or the government's record, and are marked `weak`. A party's own
   2027 programme or statement replaces them. Never fill a gap from
   a party's coalition partner or political family.

   Never use the bpb Wahl-O-Mat data or answers: its licence forbids
   party-matching tools.
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
// Programmes and papers from 2022: placeholders until the 2027 programmes are out.
const GR22: S = { src: "https://gruene-nrw.de/files/ltw22_Wahlprogramm_gruenenrw.pdf", label: "Grüne NRW, programme for the 2022 Landtag election", date: "2022-05-15", weak: true };
const FDP22: S = { src: "https://robert-christofor.wahl.freie-demokraten.de/sites/default/files/2022-02/Landtagswahlprogramm.pdf", label: "FDP NRW, 'Unser Fortschrittsprogramm für NRW' (2022 Landtag election)", date: "2022-05-15", weak: true };
const SPD22: S = { src: "https://e-pflicht.ub.uni-duesseldorf.de/download/pdf/376254", label: "NRWSPD, vorwärts NRW 1/2022 on the 2022 programme", date: "2022-03-01", weak: true };
const SOND22: S = { src: "https://www.stephaneisel.de/clubs/eisel/news/cdu_grune_fur_die_zukunft_von_nordrhein-westfalen%20Kopie.pdf", label: "CDU and Grüne NRW, exploratory paper for the 2022 coalition", date: "2022-05-27", weak: true };
const BDST22: S = { src: "https://steuerzahler.de/fileadmin/user_upload/LV_Nordrhein-Westfalen/Dateien/Wahl2022_Positionen_der_Parteien.pdf", label: "Bund der Steuerzahler NRW, the parties' answers for the 2022 election", date: "2022-04-01", weak: true };
// Since then.
const DAR26: S = { src: "https://netzpolitik.org/2026/automatisierte-datenanalyse-in-nrw-palantir-gesetz-nicht-verfassungskonform/", label: "netzpolitik.org, NRW's data-analysis law and the Palantir contract", date: "2026-04-20", weak: true };
const GRDAR26: S = { src: "https://netzpolitik.org/2026/gruene-palantir-nein-datenanalyse-ja/", label: "netzpolitik.org, 'Grüne: Palantir nein, Datenanalyse ja'", date: "2026-06-22" };
const CDUPT26: S = { src: "https://www.cdu-nrw.de/cdu-landesparteitag-stellt-weichen-fuer-die-landtagswahl-2027", label: "CDU NRW, 48th state party conference opens work on the 2027 programme", date: "2026-07-04" };
const FDPVK26: S = { src: "https://www.fdp.de/aus-weniger-wird-mehr-fdp-startet-vorkampagne", label: "FDP, 'Aus weniger wird mehr': FDP NRW starts its pre-campaign", date: "2026-10-07" };
const GRLDK26: S = { src: "https://www.ad-hoc-news.de/politik/mona-neubaur-fuehrt-nrw-gruene-2027-erneut-in-die-landtagswahl/70506308", label: "dpa via ad-hoc-news, Grüne NRW conference on the 2027 programme draft", date: "2026-11-13" };
const AFDLA26: S = { src: "https://www.onvista.de/news/2026/11-19-nrw-afd-ringt-um-kurs-bei-abschiebungen-und-integration-0-10-26578071", label: "dpa-AFX via onvista, the AfD NRW executive's motion for the 2027 programme (adopted 22 November 2026)", date: "2026-11-19" };
const AFDV26: S = { src: "https://www.juedische-allgemeine.de/politik/wuest-bringt-pruefung-eines-afd-verbots-ins-spiel/", label: "Jüdische Allgemeine, Wüst on examining an AfD ban", date: "2026-09-08" };

type Row = [id: number, p: Exclude<Position, "-">, src: S, note?: string];
const rows = (list: Row[]) =>
  Object.fromEntries(list.map(([id, p, src, note]) => [id, { p, ...src, provisional: true, ...(note ? { note } : {}) }])) as Partial<Record<number, Code>>;

export const CODES: Codes = {
  CDU: rows([
    [1, "N", SOND22, "Promised relief on Kita fees, not full fee-free Kita"],
    [2, "A", CDUPT26, "'Kinder mit unzureichenden Deutschkenntnissen erhalten verpflichtende Sprachförderung bereits vor der Einschulung'"],
    [6, "A", DAR26, "Interior minister Reul: keep automated data analysis, look for a European replacement for Palantir"],
    [9, "A", SOND22, "'Wir halten am Kohleausstieg 2030 fest'"],
    [10, "A", SOND22, "Scrap the blanket distance rule (the 1,000-metre rule)"],
    [15, "N", SOND22, "Repairing roads before building new ones; freight from road to rail"],
    [17, "A", SOND22, "A solution for towns' old debts"],
    [18, "D", SOND22, "Keep to the debt brake"],
    [22, "N", AFDV26, "Wüst: examine a ban first; if it can be banned, a case should follow"],
  ]),
  GRUENE: rows([
    [1, "A", GR22, "'Unser Ziel ist, dass Bildung für alle beitragsfrei wird'"],
    [3, "A", GR22, "Integrated schools offer 'the greatest chances'"],
    [5, "A", GR22],
    [6, "A", GRDAR26, "Keep automated analysis, but no new contract with Palantir"],
    [9, "A", GRLDK26, "2027 programme draft: 'ein um acht Jahre vorgezogener Kohleausstieg 2030'"],
    [10, "A", GR22, "Scrap blanket minimum distances for new wind turbines"],
    [11, "A", GR22, "Solar panels 'should become the standard' on buildings"],
    [13, "A", GR22, "Extend the rent cap and the Kappungsgrenze"],
    [15, "A", GR22, "Priority for public transport, cycling and walking"],
    [16, "A", GR22, "A free ticket for pupils and under-18s, paid for by the state"],
    [17, "A", GR22, "An old-debts fund for towns"],
    [18, "N", GR22, "Use the room the debt brake allows"],
    [20, "D", GR22, "Deportation only ever as a last resort"],
    [21, "D", GR22, "Against long stays in state accommodation"],
  ]),
  SPD: rows([
    [1, "A", SPD22, "Free 'from Kita to the master craftsman's certificate'"],
    [16, "A", SPD22, "A free school ticket"],
  ]),
  FDP: rows([
    [1, "A", FDP22, "Make the further Kita years fee-free step by step"],
    [3, "D", FDP22, "Keep the multi-track school system"],
    [9, "D", FDPVK26, "Höne: 'den vorgezogenen Ausstieg zurückzunehmen'"],
    [13, "N", FDP22, "Keep tenant protection, but evaluate it and cut unnecessary rules"],
    [14, "A", FDP22, "A tax-free allowance for young families' first home"],
    [15, "D", FDP22, "Strengthen all modes: 'Auto, Bahn, Bus und Rad'"],
    [18, "D", FDP22, "'Gewöhnen wir uns aber nicht an geliehenes Geld'"],
    [20, "A", FDP22],
  ]),
  AFD: rows([
    [7, "A", AFDLA26, "Programme motion: more police presence and video surveillance at crime hotspots"],
    [9, "D", AFDLA26, "Programme motion: stop the Energiewende and use domestic lignite for power in the long term"],
    [10, "D", AFDLA26, "Programme motion: building new wind turbines should be made harder"],
    [14, "A", BDST22, "Cut the rate to 3.5%"],
    [20, "A", AFDLA26, "Programme motion: 'forcieren' deportations of people obliged to leave, a 'Task Force Rückführung NRW'; individual cases, no collective deportations"],
  ]),
};

export function positionOf(code: CandidateCode, id: number, codes: Codes = CODES): Position {
  return codes[code]?.[id]?.p ?? "-";
}

export const CHANGES: { date: string; candidate: CandidateCode; statement: number; from: Position; to: Position; why: string }[] = [];
