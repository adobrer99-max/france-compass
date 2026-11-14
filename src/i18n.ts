/* ============================================================
   English and French, side by side. Every string the app shows
   lives here, so the colleague in France can copy-check one file.
   ============================================================ */

import { createContext, useContext } from "react";

export type Lang = "en" | "fr";

const en = {
  title: "France Chooses",
  subtitle: "A compass for the 2027 French presidential election",
  langName: "Français",
  langSwitch: "Lire en français",
  introLead: "Answer 53 statements on the issues that divide the candidates, say which topics matter most to you, and see which candidates you're closest to.",
  introDates: "First round Sunday 18 April 2027, runoff Sunday 2 May.",
  introPrivacy: "Your answers stay in your browser. Nothing is sent anywhere.",
  introTime: "About 10 minutes.",
  start: "Start",
  resume: (n: number) => `Pick up where you left off (${n} answered)`,
  startOver: "Start over",
  betaBanner: "Beta: candidate positions are still being coded, so matches are provisional or missing.",
  candidatesHeading: "The candidates",
  candidatesNote: "The likely field. The official list comes from the Constitutional Council in mid-March 2027, and every official candidate will be included.",
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
  resultsAnswered: (a: number, s: number) => `${a} answered, ${s} skipped.`,
  matchHeading: "Your match with each candidate",
  matchExplain: "The share of statements where you're on the same side, counting the topics you weighted. Only statements a candidate has a position on count.",
  notCoded: "Not enough positions coded yet",
  notCodedYet: "Candidate positions are still being coded. Your own position on the chart below is already accurate.",
  bestWorst: (name: string, best: string, bp: number, worst: string, wp: number) => `You agree with ${name} most on ${best.toLowerCase()} (${bp}%), least on ${worst.toLowerCase()} (${wp}%).`,
  basedOn: (n: number) => `based on ${n} statements`,
  chartHeading: "Where you sit",
  chartExplain: "Left to right on the economy (statements 1–12), and open to closed on Europe, immigration and identity (13–18 and 25–30, except 29).",
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
  source: "Source",
  candidateCodes: "Position on each statement",
  coverage: (pct: number) => `${pct}% of statements coded`,
  statementWho: "Where the candidates stand",
  statementAxis: (axis: string, pole: string) => `On the chart: counts toward ${axis}, agreeing moves you toward "${pole}".`,
  statementNoAxis: "Not on the chart. It counts toward your match only.",

  methodHeading: "How it works",
  methodBody: [
    "There are 53 statements in nine topics. Each is a single claim in plain words, and each was chosen because the main candidates disagree on it.",
    "Each candidate gets one code per statement: agrees, disagrees, neutral or mixed, or no position on record. Every code links to a dated source: first the candidate's 2027 programme, then what they've said since declaring, then their party's 2024 legislative platform and its votes in the National Assembly. Gaps are never filled in from party family.",
    "Your match with a candidate is the share of statements where you're on the same side: 2 points for the same side, 1 if one of you is neutral, 0 for opposite sides. Only direction counts, not strength. Statements you skip, or that a candidate has no position on, are left out. Candidates with fewer than 70% of statements coded aren't ranked.",
    "The chart uses the raw answers, without your topic weights, on two axes: economic left–right, and open–closed on Europe, immigration and identity.",
    "Each campaign is sent its codes and given a week to reply. Every change after that is logged below with its reason. A colleague in France checks every code and the French text.",
  ],
  matrixHeading: "Every code",
  changesHeading: "Changes",
  noChanges: "No changes yet.",
  sourcesNote: "Hover or tap a code for its source.",
  close: "Close",
  footer: "Made by Adam Dobrer. Independent, not affiliated with any party or campaign.",
};

export type Strings = typeof en;

const fr: Strings = {
  title: "La France choisit",
  subtitle: "Une boussole pour l'élection présidentielle de 2027",
  langName: "English",
  langSwitch: "Read in English",
  introLead: "Répondez à 53 affirmations sur les sujets qui divisent les candidats, dites quels thèmes comptent le plus pour vous, et découvrez de quels candidats vous êtes le plus proche.",
  introDates: "Premier tour le dimanche 18 avril 2027, second tour le dimanche 2 mai.",
  introPrivacy: "Vos réponses restent dans votre navigateur. Rien n'est envoyé nulle part.",
  introTime: "Environ 10 minutes.",
  start: "Commencer",
  resume: (n) => `Reprendre là où vous en étiez (${n} réponses)`,
  startOver: "Recommencer",
  betaBanner: "Version bêta : les positions des candidats sont en cours de codage, les résultats sont donc provisoires ou manquants.",
  candidatesHeading: "Les candidats",
  candidatesNote: "Les candidats probables. La liste officielle sera publiée par le Conseil constitutionnel à la mi-mars 2027, et tous les candidats officiels y figureront.",
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
  resultsAnswered: (a, s) => `${a} réponses, ${s} passées.`,
  matchHeading: "Votre proximité avec chaque candidat",
  matchExplain: "La part des affirmations sur lesquelles vous êtes du même côté, en tenant compte des thèmes que vous avez pondérés. Seules comptent les affirmations sur lesquelles le candidat a une position.",
  notCoded: "Pas encore assez de positions codées",
  notCodedYet: "Les positions des candidats sont en cours de codage. Votre propre position sur le graphique ci-dessous est déjà exacte.",
  bestWorst: (name, best, bp, worst, wp) => `Vous êtes le plus d'accord avec ${name} sur ${best.toLowerCase()} (${bp} %), le moins sur ${worst.toLowerCase()} (${wp} %).`,
  basedOn: (n) => `sur ${n} affirmations`,
  chartHeading: "Où vous situez-vous ?",
  chartExplain: "De gauche à droite sur l'économie (affirmations 1 à 12), et d'ouvert à fermé sur l'Europe, l'immigration et l'identité (13 à 18 et 25 à 30, sauf 29).",
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
  source: "Source",
  candidateCodes: "Position sur chaque affirmation",
  coverage: (pct) => `${pct} % des affirmations codées`,
  statementWho: "La position des candidats",
  statementAxis: (axis, pole) => `Sur le graphique : compte pour l'axe ${axis.toLowerCase()} ; être d'accord vous rapproche du pôle « ${pole} ».`,
  statementNoAxis: "Absente du graphique. Elle compte seulement pour votre proximité avec les candidats.",

  methodHeading: "Méthode",
  methodBody: [
    "53 affirmations réparties en neuf thèmes. Chacune ne contient qu'une seule idée, en termes simples, et a été choisie parce que les principaux candidats s'y opposent.",
    "Chaque candidat reçoit un code par affirmation : d'accord, pas d'accord, neutre ou partagé, ou aucune position connue. Chaque code renvoie à une source datée : d'abord le programme 2027 du candidat, puis ses déclarations depuis sa candidature, puis le programme de son parti aux législatives de 2024 et ses votes à l'Assemblée nationale. Une position manquante n'est jamais déduite de la famille politique.",
    "Votre proximité avec un candidat est la part des affirmations sur lesquelles vous êtes du même côté : 2 points si vous êtes du même côté, 1 si l'un de vous est neutre, 0 si vous êtes opposés. Seul le sens compte, pas l'intensité. Les affirmations que vous passez, ou sur lesquelles un candidat n'a pas de position, sont exclues. Les candidats dont moins de 70 % des positions sont codées ne sont pas classés.",
    "Le graphique utilise vos réponses brutes, sans la pondération des thèmes, sur deux axes : gauche-droite sur l'économie, et ouvert-fermé sur l'Europe, l'immigration et l'identité.",
    "Chaque équipe de campagne reçoit ses codes et dispose d'une semaine pour répondre. Toute modification ultérieure est consignée ci-dessous avec sa raison. Un collègue en France vérifie chaque code et le texte français.",
  ],
  matrixHeading: "Tous les codes",
  changesHeading: "Modifications",
  noChanges: "Aucune modification pour l'instant.",
  sourcesNote: "Survolez ou touchez un code pour voir sa source.",
  close: "Fermer",
  footer: "Réalisé par Adam Dobrer. Indépendant, sans lien avec aucun parti ni aucune campagne.",
};

export const STRINGS: Record<Lang, Strings> = { en, fr };

export const LangContext = createContext<{ lang: Lang; t: Strings; setLang: (l: Lang) => void }>({
  lang: "en",
  t: en,
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

/** The statement or area text in the current language. */
export const tx = (lang: Lang, x: { en: string; fr: string }) => x[lang];

/** French puts a space before % and uses a comma; English doesn't. */
export const pct = (lang: Lang, n: number) => (lang === "fr" ? `${Math.round(n)} %` : `${Math.round(n)}%`);

export function initialLang(): Lang {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "fr" || q === "en") return q;
  try {
    const s = localStorage.getItem("fc-lang");
    if (s === "fr" || s === "en") return s;
  } catch { /* storage blocked */ }
  return navigator.language?.toLowerCase().startsWith("fr") ? "fr" : "en";
}
