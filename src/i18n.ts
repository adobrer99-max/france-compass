/* ============================================================
   Interface strings every country shares, by language. Each country
   adds its own (names, dates, method, extra panels) in
   src/countries/<id>/strings.ts; the two are merged into `t`.
   A new language needs a block here and in the country's strings.
   ============================================================ */

import { createContext, useContext } from "react";
import { COUNTRY } from "@country/config";
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
  resume: (n: number) => `Pick up where you left off (${n} answered)`,
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
  resume: (n) => `Reprendre là où vous en étiez (${n} réponses)`,
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

const CORE: Record<string, CoreStrings> = { en, fr };

export type Strings = CoreStrings & CountryStrings;

export const STRINGS = Object.fromEntries(
  COUNTRY.langs.map((l) => [l, { ...CORE[l], ...COUNTRY_STRINGS[l] }]),
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
const SPACED_PCT = new Set(["fr", "de", "es", "it", "pl", "cs", "sv", "nb", "da", "fi"]);
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
