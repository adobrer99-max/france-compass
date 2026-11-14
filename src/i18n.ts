/* ============================================================
   Interface strings every country shares, by language. Each country
   adds its own (names, dates, method, extra panels) in
   src/countries/<id>/strings.ts; the two are merged into `t`.
   A new language needs a block here and in the country's strings.
   ============================================================ */

import { createContext, useContext } from "react";
import { COUNTRY } from "@country/config";
import type { CountryConfig } from "./countries/types";
import { COUNTRY_STRINGS, type CountryStrings } from "@country/strings";

/** The languages this build runs in: the active country's. */
export type Lang = (typeof COUNTRY.langs)[number];

const en = {
  /** this language's own name, and the switch label shown to readers of other languages */
  langName: "English",
  langSwitch: "Read in English",
  introPrivacy: "Your answers stay in your browser. Nothing is sent anywhere.",
  introTime: "About 10 minutes.",
  start: "Start",
  resume: (n: number, total: number) => `Resume ${n}/${total}`,
  startOver: "Start over",
  candidatesHeading: "The candidates",
  pollLabel: "Poll",
  method: "How it works",
  compare: "Compare two candidates",
  allCandidates: "Candidates",
  allStatements: "Statements",

  scale: ["Strongly disagree", "Somewhat disagree", "Neutral", "Somewhat agree", "Strongly agree"],
  skip: "No opinion, skip",
  back: "Back",
  keysHint: "Keys 1–5 to answer, 0 to skip, backspace to go back. Skipped statements are left out of every calculation.",
  progressLabel: "Progress through the statements",
  yourResponse: "Your response",

  weightsHeading: "Which topics matter most to you?",
  weightsLead: "Topics you mark as more important count double in your match. Less important ones count half.",
  weightLevels: ["Less", "Normal", "More"],
  seeResults: "See my results",

  resultsHeading: "Your results",
  closestToYou: "Closest to you",
  resultsAnswered: (a: number, s: number) => `${a} answered, ${s} skipped.`,
  matchHeading: "Your match with each candidate",
  matchExplain: "The share of statements where you're on the same side, counting the topics you weighted. Only statements a candidate has a position on count.",
  notCoded: "Not enough positions coded yet",
  notCodedYet: "Candidate positions are still being coded. Your own position on the chart below is already accurate.",
  bestWorst: (name: string, best: string, bp: number, worst: string, wp: number) => `You agree with ${name} most on ${best.toLowerCase()} (${bp}%), least on ${worst.toLowerCase()} (${wp}%).`,
  basedOn: (n: number) => `based on ${n} statements`,
  chartHeading: "Where you sit",
  you: "YOU",
  chartText: "Text version of the chart",
  chartYou: (x: number, y: number) => `You sit at ${x} on the economic left–right axis and ${y} on the open–closed axis, both from −100 to +100.`,
  nearest: "Closest on the chart, nearest first:",
  away: (d: number) => `${d} away`,
  runoffHeading: "The likely runoff",
  runoffExplain: "If these two reach the second round, which one are you closer to?",
  closerTo: (name: string) => `You're closer to ${name}.`,
  tie: "You're about equally close to both.",
  pickOther: "Try another pair",
  disagreeHeading: (name: string) => `Where you and ${name} are on opposite sides`,
  none: "None.",
  restart: "Start over",
  copyLink: "Copy link to this page",
  copied: "Copied",

  compareHeading: "Compare two candidates",
  compareLead: "Every statement where the two are coded differently.",
  compareYourMatch: "Your match",
  compareNoSplits: "No coded differences yet.",

  positions: { A: "Agrees", D: "Disagrees", N: "Neutral or mixed", "-": "No position on record" },
  provisional: "provisional",
  placeholder: "placeholder: party vote or older platform, to be sharpened",
  source: "Source",
  candidateCodes: "Position on each statement",
  coverage: (pct: number) => `${pct}% of statements coded`,
  statementWho: "Where the candidates stand",
  statementAxis: (axis: string, pole: string) => `On the chart: counts toward ${axis}, agreeing moves you toward "${pole}".`,
  statementNoAxis: "Not on the chart. It counts toward your match only.",

  methodHeading: "How it works",
  matrixHeading: "Every code",
  matrixWeak: "Dashed outline: a placeholder, from a party vote or an older platform, to be sharpened.",
  changesHeading: "Changes",
  noChanges: "No changes yet.",
  sourcesNote: "Hover or tap a code for its source.",
  close: "Close",
  shareHeading: "Share your result",
  shareLead: "An image with your closest matches and your spot on the chart. Your answers aren't on it.",
  shareBtn: "Share image",
  downloadBtn: "Download image",
  cardTop: "My closest matches",
  cardRunoff: (a: string, b: string) => `${a} vs ${b} in the runoff:`,
  footer: "Made by Adam Dobrer. Independent, not affiliated with any party or campaign.",
};

export type CoreStrings = typeof en;

const fr: CoreStrings = {
  langName: "Français",
  langSwitch: "Lire en français",
  introPrivacy: "Vos réponses restent dans votre navigateur. Rien n'est envoyé nulle part.",
  introTime: "Environ 10 minutes.",
  start: "Commencer",
  resume: (n, total) => `Reprendre ${n}/${total}`,
  startOver: "Recommencer",
  candidatesHeading: "Les candidats",
  pollLabel: "Sondage",
  method: "Méthode",
  compare: "Comparer deux candidats",
  allCandidates: "Candidats",
  allStatements: "Affirmations",

  scale: ["Pas du tout d'accord", "Plutôt pas d'accord", "Neutre", "Plutôt d'accord", "Tout à fait d'accord"],
  skip: "Sans avis, passer",
  back: "Retour",
  keysHint: "Touches 1 à 5 pour répondre, 0 pour passer, retour arrière pour revenir. Les affirmations passées sont exclues de tous les calculs.",
  progressLabel: "Progression",
  yourResponse: "Votre réponse",

  weightsHeading: "Quels thèmes comptent le plus pour vous ?",
  weightsLead: "Les thèmes que vous jugez plus importants comptent double dans vos résultats, les moins importants comptent moitié.",
  weightLevels: ["Moins", "Normal", "Plus"],
  seeResults: "Voir mes résultats",

  resultsHeading: "Vos résultats",
  closestToYou: "Le plus proche de vous",
  resultsAnswered: (a, s) => `${a} réponses, ${s} passées.`,
  matchHeading: "Votre proximité avec chaque candidat",
  matchExplain: "La part des affirmations sur lesquelles vous êtes du même côté, en tenant compte des thèmes que vous avez pondérés. Seules comptent les affirmations sur lesquelles le candidat a une position.",
  notCoded: "Pas encore assez de positions codées",
  notCodedYet: "Les positions des candidats sont en cours de codage. Votre propre position sur le graphique ci-dessous est déjà exacte.",
  bestWorst: (name, best, bp, worst, wp) => `Vous êtes le plus d'accord avec ${name} sur ${best.toLowerCase()} (${bp} %), le moins sur ${worst.toLowerCase()} (${wp} %).`,
  basedOn: (n) => `sur ${n} affirmations`,
  chartHeading: "Où vous situez-vous ?",
  you: "VOUS",
  chartText: "Version texte du graphique",
  chartYou: (x, y) => `Vous êtes à ${x} sur l'axe économique gauche-droite et à ${y} sur l'axe ouvert-fermé, tous deux de −100 à +100.`,
  nearest: "Les plus proches sur le graphique :",
  away: (d) => `à ${d}`,
  runoffHeading: "Le second tour probable",
  runoffExplain: "Si ces deux candidats se qualifient pour le second tour, duquel êtes-vous le plus proche ?",
  closerTo: (name) => `Vous êtes plus proche de ${name}.`,
  tie: "Vous êtes à peu près aussi proche de l'un que de l'autre.",
  pickOther: "Essayer un autre duel",
  disagreeHeading: (name) => `Là où vous et ${name} êtes en désaccord total`,
  none: "Aucune.",
  restart: "Recommencer",
  copyLink: "Copier le lien de cette page",
  copied: "Copié",

  compareHeading: "Comparer deux candidats",
  compareLead: "Toutes les affirmations sur lesquelles les deux candidats sont codés différemment.",
  compareYourMatch: "Votre proximité",
  compareNoSplits: "Pas encore de différences codées.",

  positions: { A: "D'accord", D: "Pas d'accord", N: "Neutre ou partagé", "-": "Aucune position connue" },
  provisional: "provisoire",
  placeholder: "position d’attente : vote du parti ou ancien programme, à affiner",
  source: "Source",
  candidateCodes: "Position sur chaque affirmation",
  coverage: (pct) => `${pct} % des affirmations codées`,
  statementWho: "La position des candidats",
  statementAxis: (axis, pole) => `Sur le graphique : compte pour l'axe ${axis.toLowerCase()} ; être d'accord vous rapproche du pôle « ${pole} ».`,
  statementNoAxis: "Absente du graphique. Elle compte seulement pour votre proximité avec les candidats.",

  methodHeading: "Méthode",
  matrixHeading: "Tous les codes",
  matrixWeak: "Contour en pointillés : position d’attente, tirée d’un vote du parti ou d’un ancien programme, à affiner.",
  changesHeading: "Modifications",
  noChanges: "Aucune modification pour l'instant.",
  sourcesNote: "Survolez ou touchez un code pour voir sa source.",
  close: "Fermer",
  shareHeading: "Partager votre résultat",
  shareLead: "Une image avec vos candidats les plus proches et votre position sur le graphique. Vos réponses n'y figurent pas.",
  shareBtn: "Partager l'image",
  downloadBtn: "Télécharger l'image",
  cardTop: "Mes candidats les plus proches",
  cardRunoff: (a, b) => `Au second tour ${a}–${b} :`,
  footer: "Réalisé par Adam Dobrer. Indépendant, sans lien avec aucun parti ni aucune campagne.",
};

const it: CoreStrings = {
  langName: "Italiano",
  langSwitch: "Leggi in italiano",
  introPrivacy: "Le tue risposte restano nel tuo browser. Non viene inviato nulla.",
  introTime: "Circa 10 minuti.",
  start: "Inizia",
  resume: (n, total) => `Riprendi ${n}/${total}`,
  startOver: "Ricomincia",
  candidatesHeading: "I candidati",
  pollLabel: "Sondaggio",
  method: "Come funziona",
  compare: "Confronta due candidati",
  allCandidates: "Candidati",
  allStatements: "Affermazioni",

  scale: ["Per niente d'accordo", "Poco d'accordo", "Neutrale", "Abbastanza d'accordo", "Del tutto d'accordo"],
  skip: "Nessuna opinione, salta",
  back: "Indietro",
  keysHint: "Tasti da 1 a 5 per rispondere, 0 per saltare, backspace per tornare indietro. Le affermazioni saltate non entrano in nessun calcolo.",
  progressLabel: "Avanzamento",
  yourResponse: "La tua risposta",

  weightsHeading: "Quali temi contano di più per te?",
  weightsLead: "I temi che segni come più importanti contano il doppio nel risultato, quelli meno importanti la metà.",
  weightLevels: ["Meno", "Normale", "Di più"],
  seeResults: "Vedi i miei risultati",

  resultsHeading: "I tuoi risultati",
  closestToYou: "Il più vicino a te",
  resultsAnswered: (a, s) => `${a} risposte, ${s} saltate.`,
  matchHeading: "La tua vicinanza a ciascun candidato",
  matchExplain: "La quota di affermazioni su cui siete dalla stessa parte, tenendo conto dei temi che hai pesato. Contano solo le affermazioni su cui il candidato ha una posizione.",
  notCoded: "Posizioni non ancora sufficienti",
  notCodedYet: "Le posizioni sono ancora in fase di codifica. La tua posizione sul grafico qui sotto è già esatta.",
  bestWorst: (name, best, bp, worst, wp) => `Sei più d'accordo con ${name} su ${best.toLowerCase()} (${bp}%), meno su ${worst.toLowerCase()} (${wp}%).`,
  basedOn: (n) => `su ${n} affermazioni`,
  chartHeading: "Dove ti collochi",
  you: "TU",
  chartText: "Versione testuale del grafico",
  chartYou: (x, y) => `Sei a ${x} sull'asse economico sinistra–destra e a ${y} sull'asse aperto–chiuso, entrambi da −100 a +100.`,
  nearest: "I più vicini sul grafico:",
  away: (d) => `a ${d}`,
  runoffHeading: "Il probabile ballottaggio",
  runoffExplain: "Se questi due arrivano al secondo turno, a chi sei più vicino?",
  closerTo: (name) => `Sei più vicino a ${name}.`,
  tie: "Sei vicino a entrambi più o meno allo stesso modo.",
  pickOther: "Prova un'altra coppia",
  disagreeHeading: (name) => `Dove tu e ${name} siete su fronti opposti`,
  none: "Nessuna.",
  restart: "Ricomincia",
  copyLink: "Copia il link a questa pagina",
  copied: "Copiato",

  compareHeading: "Confronta due candidati",
  compareLead: "Ogni affermazione su cui i due sono codificati in modo diverso.",
  compareYourMatch: "La tua vicinanza",
  compareNoSplits: "Nessuna differenza codificata per ora.",

  positions: { A: "D'accordo", D: "Contrario", N: "Neutrale o diviso", "-": "Nessuna posizione nota" },
  provisional: "provvisorio",
  placeholder: "provvisorio: voto del partito o programma precedente, da precisare",
  source: "Fonte",
  candidateCodes: "Posizione su ogni affermazione",
  coverage: (pct) => `${pct}% delle affermazioni codificate`,
  statementWho: "Dove si collocano",
  statementAxis: (axis, pole) => `Sul grafico: conta per l'asse ${axis.toLowerCase()}; essere d'accordo ti sposta verso «${pole}».`,
  statementNoAxis: "Non è sul grafico. Conta solo per la vicinanza.",

  methodHeading: "Come funziona",
  matrixHeading: "Tutti i codici",
  matrixWeak: "Bordo tratteggiato: posizione provvisoria, da un voto del partito o da un programma precedente, da precisare.",
  changesHeading: "Modifiche",
  noChanges: "Nessuna modifica per ora.",
  sourcesNote: "Passa sopra o tocca un codice per vederne la fonte.",
  close: "Chiudi",
  shareHeading: "Condividi il risultato",
  shareLead: "Un'immagine con i più vicini a te e la tua posizione sul grafico. Le tue risposte non compaiono.",
  shareBtn: "Condividi l'immagine",
  downloadBtn: "Scarica l'immagine",
  cardTop: "I più vicini a me",
  cardRunoff: (a, b) => `${a} contro ${b}:`,
  footer: "Realizzato da Adam Dobrer. Indipendente, senza legami con partiti o campagne.",
};

const de: CoreStrings = {
  langName: "Deutsch",
  langSwitch: "Auf Deutsch lesen",
  introPrivacy: "Deine Antworten bleiben in deinem Browser. Nichts wird verschickt.",
  introTime: "Etwa 10 Minuten.",
  start: "Los geht's",
  resume: (n, total) => `Weiter ${n}/${total}`,
  startOver: "Neu anfangen",
  candidatesHeading: "Die Kandidierenden",
  pollLabel: "Umfrage",
  method: "So funktioniert's",
  compare: "Zwei vergleichen",
  allCandidates: "Kandidierende",
  allStatements: "Thesen",

  scale: ["Stimme gar nicht zu", "Stimme eher nicht zu", "Neutral", "Stimme eher zu", "Stimme voll zu"],
  skip: "Keine Meinung, überspringen",
  back: "Zurück",
  keysHint: "Tasten 1 bis 5 zum Antworten, 0 zum Überspringen, Rücktaste für zurück. Übersprungene Thesen zählen in keiner Rechnung.",
  progressLabel: "Fortschritt",
  yourResponse: "Deine Antwort",

  weightsHeading: "Welche Themen sind dir am wichtigsten?",
  weightsLead: "Themen, die du als wichtiger markierst, zählen doppelt, weniger wichtige halb.",
  weightLevels: ["Weniger", "Normal", "Mehr"],
  seeResults: "Zu meinem Ergebnis",

  resultsHeading: "Dein Ergebnis",
  closestToYou: "Am nächsten an dir",
  resultsAnswered: (a, s) => `${a} beantwortet, ${s} übersprungen.`,
  matchHeading: "Deine Übereinstimmung",
  matchExplain: "Der Anteil der Thesen, bei denen ihr auf derselben Seite steht, mit deiner Gewichtung der Themen. Es zählen nur Thesen, zu denen eine Position vorliegt.",
  notCoded: "Noch nicht genug Positionen erfasst",
  notCodedYet: "Die Positionen werden noch erfasst. Deine eigene Position im Diagramm unten stimmt schon.",
  bestWorst: (name, best, bp, worst, wp) => `Mit ${name} stimmst du bei ${best} am meisten überein (${bp} %), bei ${worst} am wenigsten (${wp} %).`,
  basedOn: (n) => `aus ${n} Thesen`,
  chartHeading: "Wo du stehst",
  you: "DU",
  chartText: "Textfassung des Diagramms",
  chartYou: (x, y) => `Du stehst bei ${x} auf der wirtschaftlichen Links-rechts-Achse und bei ${y} auf der Achse offen–geschlossen, jeweils von −100 bis +100.`,
  nearest: "Am nächsten im Diagramm:",
  away: (d) => `${d} entfernt`,
  runoffHeading: "Das wahrscheinliche Duell",
  runoffExplain: "Wem von beiden stehst du näher?",
  closerTo: (name) => `Du stehst ${name} näher.`,
  tie: "Du stehst beiden etwa gleich nah.",
  pickOther: "Anderes Paar",
  disagreeHeading: (name) => `Wo du und ${name} auf entgegengesetzten Seiten steht`,
  none: "Keine.",
  restart: "Neu anfangen",
  copyLink: "Link zu dieser Seite kopieren",
  copied: "Kopiert",

  compareHeading: "Zwei vergleichen",
  compareLead: "Jede These, bei der die beiden unterschiedlich erfasst sind.",
  compareYourMatch: "Deine Übereinstimmung",
  compareNoSplits: "Noch keine erfassten Unterschiede.",

  positions: { A: "Stimmt zu", D: "Lehnt ab", N: "Neutral oder gespalten", "-": "Keine Position bekannt" },
  provisional: "vorläufig",
  placeholder: "Platzhalter: Abstimmung der Partei oder älteres Programm, wird präzisiert",
  source: "Quelle",
  candidateCodes: "Position zu jeder These",
  coverage: (pct) => `${pct} % der Thesen erfasst`,
  statementWho: "Wer wo steht",
  statementAxis: (axis, pole) => `Im Diagramm: zählt für die Achse ${axis}; Zustimmung rückt dich Richtung „${pole}“.`,
  statementNoAxis: "Nicht im Diagramm. Zählt nur für die Übereinstimmung.",

  methodHeading: "So funktioniert's",
  matrixHeading: "Alle Positionen",
  matrixWeak: "Gestrichelter Rand: Platzhalter aus einer Abstimmung der Partei oder einem älteren Programm, wird präzisiert.",
  changesHeading: "Änderungen",
  noChanges: "Noch keine Änderungen.",
  sourcesNote: "Für die Quelle über eine Position fahren oder sie antippen.",
  close: "Schließen",
  shareHeading: "Ergebnis teilen",
  shareLead: "Ein Bild mit deinen größten Übereinstimmungen und deinem Platz im Diagramm. Deine Antworten stehen nicht darauf.",
  shareBtn: "Bild teilen",
  downloadBtn: "Bild herunterladen",
  cardTop: "Meine größten Übereinstimmungen",
  cardRunoff: (a, b) => `${a} gegen ${b}:`,
  footer: "Von Adam Dobrer. Unabhängig, ohne Verbindung zu einer Partei oder Kampagne.",
};

/** Where the choice is between parties, not candidates (Italy, German states). */
const PARTY_WORDING: Record<string, Partial<CoreStrings>> = {
  en: {
    candidatesHeading: "The parties", compare: "Compare two parties", allCandidates: "Parties",
    matchHeading: "Your match with each party",
    matchExplain: "The share of statements where you're on the same side, counting the topics you weighted. Only statements a party has a position on count.",
    notCodedYet: "Party positions are still being coded. Your own position on the chart below is already accurate.",
    compareHeading: "Compare two parties", compareLead: "Every statement where the two parties are coded differently.",
    statementWho: "Where the parties stand", cardTop: "My closest parties",
    shareLead: "An image with your closest parties and your spot on the chart. Your answers aren't on it.",
  },
  fr: {
    candidatesHeading: "Les partis", compare: "Comparer deux partis", allCandidates: "Partis",
    matchHeading: "Votre proximité avec chaque parti",
    matchExplain: "La part des affirmations sur lesquelles vous êtes du même côté, en tenant compte des thèmes pondérés. Seules comptent les affirmations sur lesquelles le parti a une position.",
    notCodedYet: "Les positions des partis sont en cours de codage. Votre propre position sur le graphique est déjà exacte.",
    compareHeading: "Comparer deux partis", compareLead: "Toutes les affirmations sur lesquelles les deux partis sont codés différemment.",
    statementWho: "La position des partis", cardTop: "Mes partis les plus proches",
    shareLead: "Une image avec vos partis les plus proches et votre position sur le graphique. Vos réponses n'y figurent pas.",
  },
  it: {
    candidatesHeading: "I partiti", compare: "Confronta due partiti", allCandidates: "Partiti",
    matchHeading: "La tua vicinanza a ciascun partito",
    matchExplain: "La quota di affermazioni su cui siete dalla stessa parte, tenendo conto dei temi che hai pesato. Contano solo le affermazioni su cui il partito ha una posizione.",
    notCodedYet: "Le posizioni dei partiti sono ancora in fase di codifica. La tua posizione sul grafico qui sotto è già esatta.",
    compareHeading: "Confronta due partiti", compareLead: "Ogni affermazione su cui i due partiti sono codificati in modo diverso.",
    statementWho: "Dove si collocano i partiti", cardTop: "I partiti più vicini a me", closestToYou: "Il partito più vicino a te",
    shareLead: "Un'immagine con i partiti più vicini a te e la tua posizione sul grafico. Le tue risposte non compaiono.",
  },
  de: {
    candidatesHeading: "Die Parteien", compare: "Zwei Parteien vergleichen", allCandidates: "Parteien",
    matchHeading: "Deine Übereinstimmung mit jeder Partei",
    matchExplain: "Der Anteil der Thesen, bei denen ihr auf derselben Seite steht, mit deiner Gewichtung der Themen. Es zählen nur Thesen, zu denen die Partei eine Position hat.",
    notCodedYet: "Die Positionen der Parteien werden noch erfasst. Deine eigene Position im Diagramm unten stimmt schon.",
    compareHeading: "Zwei Parteien vergleichen", compareLead: "Jede These, bei der die beiden Parteien unterschiedlich erfasst sind.",
    statementWho: "Wo die Parteien stehen", cardTop: "Meine nächsten Parteien",
    shareLead: "Ein Bild mit den Parteien, die dir am nächsten sind, und deinem Platz im Diagramm. Deine Antworten stehen nicht darauf.",
  },
};

const CORE: Record<string, CoreStrings> = { en, fr, it, de };

export type Strings = CoreStrings & CountryStrings;

export const STRINGS = Object.fromEntries(
  COUNTRY.langs.map((l) => [l, { ...CORE[l], ...((COUNTRY as CountryConfig).subject === "party" ? PARTY_WORDING[l] : {}), ...COUNTRY_STRINGS[l] }]),
) as Record<Lang, Strings>;

export const LangContext = createContext<{ lang: Lang; t: Strings; setLang: (l: Lang) => void }>({
  lang: COUNTRY.langs[0],
  t: STRINGS[COUNTRY.langs[0]],
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

/** Statement, area or note text in the current language. */
export const tx = (lang: Lang, x: Record<Lang, string>) => x[lang];

/** Languages that put a (narrow) space before % (French, German…). */
const SPACED_PCT = new Set(["fr", "de", "es", "pl", "cs", "sv", "nb", "da", "fi"]);
export const pct = (lang: Lang, n: number) => (SPACED_PCT.has(lang) ? `${Math.round(n)}\u202F%` : `${Math.round(n)}%`);

const isLang = (x: string | null | undefined): x is Lang => !!x && (COUNTRY.langs as readonly string[]).includes(x);

export function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (isLang(q)) return q;
  try {
    const s = localStorage.getItem(`${COUNTRY.storagePrefix}-lang`);
    if (isLang(s)) return s;
  } catch { /* storage blocked */ }
  const nav = navigator.language?.toLowerCase().slice(0, 2);
  return isLang(nav) ? nav : COUNTRY.defaultLang;
}
