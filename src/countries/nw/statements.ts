/* ============================================================
   North Rhine-Westphalia 2027: 24 statements in seven areas,
   German and English. Each one is a question the Landtag decides
   or the state government acts on, and that the parties have split
   on in programmes, motions or votes. The German is a first draft
   for a native speaker to check.

   `axis`: econ — left (−) to right (+) on the economy: 1, 12, 13, 14, 16, 17, 18
           open — open (−) to closed (+): 5, 19, 20, 21, 23
   `sign` is +1 when agreeing moves you toward the + pole.
   ============================================================ */

export type AreaId = "edu" | "sec" | "nrg" | "liv" | "fin" | "mig" | "dem";
export type Axis = "econ" | "open";

export interface Area { id: AreaId; en: string; de: string }

export const AREAS: Area[] = [
  { id: "edu", en: "Schools and childcare", de: "Schule und Kita" },
  { id: "sec", en: "Police and safety", de: "Polizei und Sicherheit" },
  { id: "nrg", en: "Energy and climate", de: "Energie und Klima" },
  { id: "liv", en: "Housing and transport", de: "Wohnen und Verkehr" },
  { id: "fin", en: "Money and towns", de: "Haushalt und Kommunen" },
  { id: "mig", en: "Migration and integration", de: "Migration und Integration" },
  { id: "dem", en: "Democracy and society", de: "Demokratie und Gesellschaft" },
];

export const AREA = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<AreaId, Area>;

export const AXES: Record<Axis, { en: [string, string]; de: [string, string]; name: { en: string; de: string } }> = {
  econ: { en: ["Left", "Right"], de: ["Links", "Rechts"], name: { en: "Economy: left to right", de: "Wirtschaft: links–rechts" } },
  open: { en: ["Open", "Closed"], de: ["Offen", "Geschlossen"], name: { en: "Migration and society: open to closed", de: "Migration und Gesellschaft: offen–geschlossen" } },
};

export interface Statement { id: number; area: AreaId; axis: Axis | null; sign: 1 | -1; en: string; de: string }

type Row = [id: number, area: AreaId, axis: Axis | null, sign: 1 | -1, en: string, de: string];

const ROWS: Row[] = [
  [1, "edu", "econ", -1, "Kita should be free of charge for every year until a child starts school.", "Die Kita sollte in allen Jahren bis zur Einschulung beitragsfrei sein."],
  [2, "edu", null, 1, "Every four-year-old should take a compulsory German test, with compulsory support for those who need it.", "Alle Vierjährigen sollten verpflichtend einen Deutschtest machen, mit verpflichtender Förderung für alle, die sie brauchen."],
  [3, "edu", null, -1, "Children should learn together for longer, in more comprehensive schools, instead of being split up after year 4.", "Kinder sollten länger gemeinsam lernen, in mehr Gesamtschulen, statt nach der vierten Klasse aufgeteilt zu werden."],
  [4, "edu", null, 1, "Smartphones should be banned in all schools during the school day.", "Smartphones sollten an allen Schulen während des Schultags verboten sein."],
  [5, "edu", "open", -1, "More state schools should offer Islamic religious education taught in German.", "Mehr staatliche Schulen sollten islamischen Religionsunterricht auf Deutsch anbieten."],

  [6, "sec", null, 1, "The police should keep using software that automatically analyses their databases to find links between suspects.", "Die Polizei sollte weiter Software nutzen, die ihre Datenbanken automatisch auswertet, um Verbindungen zwischen Verdächtigen zu finden."],
  [7, "sec", null, 1, "There should be more video surveillance in public places.", "Es sollte mehr Videoüberwachung an öffentlichen Orten geben."],
  [8, "sec", null, 1, "City centres and stations should have more zones where carrying knives and weapons is banned.", "In Innenstädten und an Bahnhöfen sollte es mehr Zonen geben, in denen Messer und Waffen verboten sind."],

  [9, "nrg", null, -1, "NRW should stick to ending coal power in the Rhineland by 2030.", "NRW sollte am Kohleausstieg im Rheinischen Revier bis 2030 festhalten."],
  [10, "nrg", null, -1, "New wind turbines should be allowed without a fixed minimum distance from homes.", "Neue Windräder sollten ohne festen Mindestabstand zu Wohnhäusern erlaubt sein."],
  [11, "nrg", null, -1, "New buildings and major roof renovations should have to include solar panels.", "Bei Neubauten und großen Dachsanierungen sollten Solaranlagen Pflicht sein."],

  [12, "liv", "econ", -1, "NRW should set up a state housing company to build affordable rental flats.", "NRW sollte eine Landeswohnungsbaugesellschaft gründen, die bezahlbare Mietwohnungen baut."],
  [13, "liv", "econ", -1, "The rent cap (Mietpreisbremse) should apply in more NRW cities.", "Die Mietpreisbremse sollte in mehr Städten in NRW gelten."],
  [14, "liv", "econ", 1, "The property purchase tax (Grunderwerbsteuer) should be cut, at least for people buying their first home.", "Die Grunderwerbsteuer sollte sinken, zumindest für Menschen, die ihr erstes Eigenheim kaufen."],
  [15, "liv", null, -1, "Money planned for new roads should go to rail, buses and cycling instead.", "Geld, das für neue Straßen geplant ist, sollte stattdessen in Bahn, Bus und Radverkehr fließen."],
  [16, "liv", "econ", -1, "The state should pay so that bus and train tickets are cheaper or free for children and young people.", "Das Land sollte dafür zahlen, dass Bus- und Bahntickets für Kinder und Jugendliche günstiger oder kostenlos sind."],

  [17, "fin", "econ", -1, "The state should take over a large part of the old debts of NRW's towns and cities.", "Das Land sollte einen großen Teil der Altschulden der Städte und Gemeinden übernehmen."],
  [18, "fin", "econ", -1, "NRW should borrow more to invest in schools, roads and rail, even if that means loosening the debt brake.", "NRW sollte mehr Kredite für Investitionen in Schulen, Straßen und Schiene aufnehmen, auch wenn dafür die Schuldenbremse gelockert wird."],

  [19, "mig", "open", 1, "Asylum seekers should get a payment card instead of cash everywhere in NRW, with no opt-out for cities.", "Asylbewerber sollten überall in NRW eine Bezahlkarte statt Bargeld bekommen, ohne Ausstiegsmöglichkeit für Kommunen."],
  [20, "mig", "open", 1, "Rejected asylum seekers should be deported more consistently.", "Abgelehnte Asylbewerber sollten konsequenter abgeschoben werden."],
  [21, "mig", "open", 1, "Refugees with little chance of staying should remain in state reception centres until they leave, instead of being sent to towns.", "Geflüchtete mit geringer Bleibeperspektive sollten bis zur Ausreise in Landeseinrichtungen bleiben, statt auf die Kommunen verteilt zu werden."],

  [22, "dem", null, 1, "NRW should push for the Federal Constitutional Court to examine banning the AfD.", "NRW sollte sich dafür einsetzen, dass das Bundesverfassungsgericht ein Verbot der AfD prüft."],
  [23, "dem", "open", 1, "Gender-neutral spellings such as the gender star should be banned in state authorities and schools.", "Gendersternchen und ähnliche Schreibweisen sollten in Landesbehörden und Schulen verboten werden."],
  [24, "dem", null, 1, "Specialist hospital care should be concentrated in fewer hospitals, even if some small ones close.", "Spezialisierte Behandlungen sollten in weniger Krankenhäusern gebündelt werden, auch wenn dafür kleine Häuser schließen."],
];

export const STATEMENTS: Statement[] = ROWS.map(([id, area, axis, sign, en, de]) => ({ id, area, axis, sign, en, de }));
export const BY_ID = Object.fromEntries(STATEMENTS.map((s) => [s.id, s])) as Record<number, Statement>;
