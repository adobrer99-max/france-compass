/* ============================================================
   Italy 2027: 18 statements in six areas, English and Italian.
   Each one is an issue the parties have split on in Parliament or
   in their programmes, so every statement has positions to match.
   The Italian is a first draft for a native speaker to check.

   `axis`: econ — left (−) to right (+) on the economy: 1–4
           open — open (−) to closed (+): 5–8
   `sign` is +1 when agreeing moves you toward the + pole.
   ============================================================ */

export type AreaId = "eco" | "imm" | "eur" | "ins" | "nrg" | "soc";
export type Axis = "econ" | "open";

export interface Area { id: AreaId; en: string; it: string }

export const AREAS: Area[] = [
  { id: "eco", en: "Economy and welfare", it: "Economia e welfare" },
  { id: "imm", en: "Immigration and citizenship", it: "Immigrazione e cittadinanza" },
  { id: "eur", en: "Europe and the world", it: "Europa e mondo" },
  { id: "ins", en: "Institutions and justice", it: "Istituzioni e giustizia" },
  { id: "nrg", en: "Energy and infrastructure", it: "Energia e infrastrutture" },
  { id: "soc", en: "Rights", it: "Diritti" },
];

export const AREA = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<AreaId, Area>;

export const AXES: Record<Axis, { en: [string, string]; it: [string, string]; name: { en: string; it: string } }> = {
  econ: { en: ["Left", "Right"], it: ["Sinistra", "Destra"], name: { en: "Economy: left to right", it: "Economia: sinistra-destra" } },
  open: { en: ["Open", "Closed"], it: ["Aperto", "Chiuso"], name: { en: "Europe and immigration: open to closed", it: "Europa e immigrazione: aperto-chiuso" } },
};

export interface Statement { id: number; area: AreaId; axis: Axis | null; sign: 1 | -1; en: string; it: string }

type Row = [id: number, area: AreaId, axis: Axis | null, sign: 1 | -1, en: string, it: string];

const ROWS: Row[] = [
  [1, "eco", "econ", -1, "Italy should have a legal minimum wage of at least €9 an hour.", "L'Italia dovrebbe avere un salario minimo legale di almeno 9 euro l'ora."],
  [2, "eco", "econ", -1, "Italy should tax large fortunes.", "L'Italia dovrebbe tassare i grandi patrimoni."],
  [3, "eco", "econ", -1, "A guaranteed income for the poor, like the old citizens' income, should come back.", "Un reddito garantito per i più poveri, come il vecchio reddito di cittadinanza, dovrebbe tornare."],
  [4, "eco", "econ", -1, "Public health spending should rise to the European average.", "La spesa sanitaria pubblica dovrebbe salire alla media europea."],

  [5, "imm", "open", -1, "Children of immigrants who complete their schooling in Italy should be able to become citizens.", "I figli di immigrati che completano gli studi in Italia dovrebbero poter diventare cittadini."],
  [6, "imm", "open", 1, "Asylum seekers should be held and processed in centres outside Italy, like those in Albania.", "I richiedenti asilo dovrebbero essere trattenuti ed esaminati in centri fuori dall'Italia, come quelli in Albania."],
  [7, "eur", "open", -1, "Italy should keep sending weapons to Ukraine.", "L'Italia dovrebbe continuare a inviare armi all'Ucraina."],
  [8, "eur", "open", -1, "The EU should borrow together again to pay for shared priorities, as it did for the recovery fund.", "L'UE dovrebbe tornare a indebitarsi in comune per finanziare priorità condivise, come ha fatto con il PNRR."],
  [9, "eur", null, 1, "Italy should raise defence spending, as it has promised NATO.", "L'Italia dovrebbe aumentare la spesa per la difesa, come ha promesso alla NATO."],
  [10, "eur", null, 1, "Italy should recognise the State of Palestine now, without conditions.", "L'Italia dovrebbe riconoscere subito lo Stato di Palestina, senza condizioni."],

  [11, "ins", null, 1, "Judges and prosecutors should have separate careers.", "Giudici e pubblici ministeri dovrebbero avere carriere separate."],
  [12, "ins", null, 1, "The prime minister should be elected directly by voters.", "Il presidente del Consiglio dovrebbe essere eletto direttamente dai cittadini."],
  [13, "ins", null, 1, "Regions should be able to take on more powers, as the differentiated autonomy law allows.", "Le regioni dovrebbero poter assumere più competenze, come prevede la legge sull'autonomia differenziata."],
  [14, "ins", null, 1, "An alliance that wins 42% of the vote should be guaranteed a majority in Parliament.", "Una coalizione che ottiene il 42% dei voti dovrebbe avere la maggioranza garantita in Parlamento."],

  [15, "nrg", null, 1, "Italy should go back to nuclear power.", "L'Italia dovrebbe tornare all'energia nucleare."],
  [16, "nrg", null, 1, "The bridge over the Strait of Messina should be built.", "Il ponte sullo Stretto di Messina dovrebbe essere costruito."],

  [17, "soc", null, 1, "Same-sex couples should be able to marry.", "Le coppie dello stesso sesso dovrebbero potersi sposare."],
  [18, "soc", null, 1, "Assisted suicide should be legal, with the national health service involved.", "Il suicidio assistito dovrebbe essere legale, con il coinvolgimento del Servizio sanitario nazionale."],
];

export const STATEMENTS: Statement[] = ROWS.map(([id, area, axis, sign, en, it]) => ({ id, area, axis, sign, en, it }));
export const BY_ID = Object.fromEntries(STATEMENTS.map((s) => [s.id, s])) as Record<number, Statement>;
