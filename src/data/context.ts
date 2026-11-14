/* ============================================================
   Context for the runoff: the "firewall" (front républicain)
   against the far right, and how the electorate has moved in
   past elections. Every figure and quote carries its source.
   Add new entries at the top of FIREWALL_LOG as the campaign
   goes on; never rewrite an old one.
   ============================================================ */

import type { CandidateCode } from "./candidates";

type T = { en: string; fr: string };
export interface Src { label: string; url: string; date: string }

/* ---------------- Past results ---------------- */

export interface Score { name: string; party: string; pct: number; farRight?: boolean }
export interface Election {
  year: number;
  kind: "pres" | "leg";
  /** leading first-round candidates (or blocs, for 2024) */
  r1: Score[];
  /** runoff, for presidential elections */
  r2?: Score[];
  /** what happened, one or two sentences */
  note: T;
  src: Src[];
}

const wiki = (y: number): Src => ({
  label: `Élection présidentielle française de ${y}, Wikipédia (official results)`,
  url: `https://fr.wikipedia.org/wiki/%C3%89lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_${y}`,
  date: `${y}-05-01`,
});

export const ELECTIONS: Election[] = [
  {
    year: 2002, kind: "pres",
    r1: [
      { name: "Jacques Chirac", party: "RPR", pct: 19.88 },
      { name: "Jean-Marie Le Pen", party: "FN", pct: 16.86, farRight: true },
      { name: "Lionel Jospin", party: "PS", pct: 16.18 },
    ],
    r2: [{ name: "Jacques Chirac", party: "RPR", pct: 82.21 }, { name: "Jean-Marie Le Pen", party: "FN", pct: 17.79, farRight: true }],
    note: {
      en: "The FN reached the runoff for the first time. The left called to vote Chirac, and he won with 82%: the firewall at its strongest.",
      fr: "Le FN accède au second tour pour la première fois. La gauche appelle à voter Chirac, élu avec 82 % : le front républicain à son apogée.",
    },
    src: [wiki(2002)],
  },
  {
    year: 2007, kind: "pres",
    r1: [
      { name: "Nicolas Sarkozy", party: "UMP", pct: 31.18 },
      { name: "Ségolène Royal", party: "PS", pct: 25.87 },
      { name: "François Bayrou", party: "UDF", pct: 18.57 },
      { name: "Jean-Marie Le Pen", party: "FN", pct: 10.44, farRight: true },
    ],
    r2: [{ name: "Nicolas Sarkozy", party: "UMP", pct: 53.06 }, { name: "Ségolène Royal", party: "PS", pct: 46.94 }],
    note: { en: "Sarkozy won over much of the FN vote; Le Pen fell to 10%.", fr: "Sarkozy capte une grande partie de l'électorat FN ; Le Pen tombe à 10 %." },
    src: [wiki(2007)],
  },
  {
    year: 2012, kind: "pres",
    r1: [
      { name: "François Hollande", party: "PS", pct: 28.63 },
      { name: "Nicolas Sarkozy", party: "UMP", pct: 27.18 },
      { name: "Marine Le Pen", party: "FN", pct: 17.9, farRight: true },
      { name: "Jean-Luc Mélenchon", party: "FG", pct: 11.1 },
    ],
    r2: [{ name: "François Hollande", party: "PS", pct: 51.64 }, { name: "Nicolas Sarkozy", party: "UMP", pct: 48.36 }],
    note: { en: "Marine Le Pen's first run: 17.9%, the FN's best first round until then.", fr: "Première candidature de Marine Le Pen : 17,9 %, le meilleur premier tour du FN jusque-là." },
    src: [wiki(2012)],
  },
  {
    year: 2017, kind: "pres",
    r1: [
      { name: "Emmanuel Macron", party: "EM", pct: 24.01 },
      { name: "Marine Le Pen", party: "FN", pct: 21.3, farRight: true },
      { name: "François Fillon", party: "LR", pct: 20.01 },
      { name: "Jean-Luc Mélenchon", party: "LFI", pct: 19.58 },
    ],
    r2: [{ name: "Emmanuel Macron", party: "EM", pct: 66.1 }, { name: "Marine Le Pen", party: "FN", pct: 33.9, farRight: true }],
    note: {
      en: "The firewall held, but thinner: Le Pen nearly doubled her father's 2002 runoff score. Mélenchon gave no instruction.",
      fr: "Le front républicain tient, mais s'amincit : Le Pen double presque le score de son père en 2002. Mélenchon ne donne pas de consigne.",
    },
    src: [wiki(2017)],
  },
  {
    year: 2022, kind: "pres",
    r1: [
      { name: "Emmanuel Macron", party: "LREM", pct: 27.85 },
      { name: "Marine Le Pen", party: "RN", pct: 23.15, farRight: true },
      { name: "Jean-Luc Mélenchon", party: "LFI", pct: 21.95 },
      { name: "Éric Zemmour", party: "Reconquête", pct: 7.07, farRight: true },
    ],
    r2: [{ name: "Emmanuel Macron", party: "LREM", pct: 58.55 }, { name: "Marine Le Pen", party: "RN", pct: 41.45, farRight: true }],
    note: {
      en: "Le Pen's best result yet, 41.5%. Most eliminated candidates called to vote Macron; Mélenchon said not one vote for Le Pen, without naming Macron.",
      fr: "Meilleur score de Le Pen, 41,5 %. La plupart des candidats éliminés appellent à voter Macron ; Mélenchon dit pas une voix pour Le Pen, sans nommer Macron.",
    },
    src: [wiki(2022)],
  },
  {
    year: 2024, kind: "leg",
    r1: [
      { name: "RN + Ciotti", party: "RN–UDR", pct: 33.2, farRight: true },
      { name: "Nouveau Front populaire", party: "NFP", pct: 28.0 },
      { name: "Ensemble", party: "", pct: 20.0 },
    ],
    note: {
      en: "Snap legislative election. The RN led the first round, then about 217 candidates withdrew to block it (130 from the left, 81 from Ensemble). The RN and allies finished third in seats: 143, against 182 for the left and about 168 for Ensemble.",
      fr: "Législatives anticipées. Le RN arrive en tête au premier tour, puis environ 217 candidats se désistent pour lui barrer la route (130 à gauche, 81 chez Ensemble). Le RN et ses alliés finissent troisièmes en sièges : 143, contre 182 pour la gauche et environ 168 pour Ensemble.",
    },
    src: [
      { label: "Élections législatives françaises de 2024, Wikipédia (first-round shares)", url: "https://fr.wikipedia.org/wiki/%C3%89lections_l%C3%A9gislatives_fran%C3%A7aises_de_2024", date: "2024-07-08" },
      { label: "LCP, 3 July 2024 (withdrawals)", url: "https://lcp.fr/actualites/legislatives-2024-217-desistements-pour-barrer-la-route-du-pouvoir-au-rn-tour-d-horizon", date: "2024-07-03" },
      { label: "Maire-info, 8 July 2024 (seats)", url: "https://www.maire-info.com/second-tour-des-legislatives-un-resultat-en-trompe-loeil-article2-28795", date: "2024-07-08" },
    ],
  },
];

/* ---------------- How voters moved between rounds ---------------- */

export interface Transfer { from: string; toWinner: number; toFarRight: number; other?: number }
export interface Transfers { year: number; winner: string; farRight: string; rows: Transfer[]; src: Src }

/** Share of each first-round electorate that went to each finalist. The rest: blank, spoiled or stayed home. */
export const TRANSFERS: Transfers[] = [
  {
    year: 2022, winner: "Macron", farRight: "Le Pen",
    rows: [
      { from: "Mélenchon", toWinner: 42, toFarRight: 17 },
      { from: "Jadot", toWinner: 65, toFarRight: 6 },
      { from: "Pécresse", toWinner: 53, toFarRight: 18 },
      { from: "Zemmour", toWinner: 10, toFarRight: 73 },
    ],
    src: { label: "Ipsos-Sopra Steria, 21–23 April 2022, via Public Sénat", url: "https://www.publicsenat.fr/actualites/non-classe/presidentielle-42-des-electeurs-de-jean-luc-melenchon-se-sont-reportes-sur", date: "2022-04-24" },
  },
  {
    year: 2017, winner: "Macron", farRight: "Le Pen",
    rows: [
      { from: "Hamon", toWinner: 71, toFarRight: 2 },
      { from: "Mélenchon", toWinner: 52, toFarRight: 7 },
      { from: "Fillon", toWinner: 48, toFarRight: 20 },
      { from: "Dupont-Aignan", toWinner: 27, toFarRight: 30 },
    ],
    src: { label: "Ipsos-Sopra Steria, 4–6 May 2017, via Public Sénat", url: "https://www.publicsenat.fr/actualites/politique/reports-des-voix-age-revenus-la-sociologie-du-vote-au-second-tour-60214", date: "2017-05-07" },
  },
];

/* ---------------- The firewall, candidate by candidate ---------------- */

export type Stance = "block" | "noRN" | "niNi" | "free" | "backsRN" | "isRN" | "unknown";

export interface Evidence { stance: Exclude<Stance, "unknown" | "isRN">; who: string; quote: T; src: Src }

export interface FirewallRow {
  code: CandidateCode;
  /** what the candidate has said about a 2027 runoff involving the RN */
  for2027: Stance;
  /** the candidate's own most recent statement, or their party's, clearly labelled */
  record: Evidence[];
}

const S = {
  lnc2022: { label: "Les Nouvelles Calédoniennes / AFP, 10 April 2022", url: "https://www.lnc.nc/article-direct/politique/france/presidentielle-les-candidats-decus-donnent-leur-consigne-de-vote", date: "2022-04-10" },
  ps2024a: { label: "Public Sénat, 27 June 2024", url: "https://www.publicsenat.fr/actualites/politique/legislatives-face-au-rn-le-ni-ni-va-t-il-supplanter-le-barrage-republicain", date: "2024-06-27" },
  ps2024b: { label: "Public Sénat, 1 July 2024", url: "https://www.publicsenat.fr/actualites/politique/desistements-cas-par-cas-ni-ni-le-camp-presidentiel-divise-sur-la-strategie-du-second-tour-des-legislatives", date: "2024-07-01" },
  lcp2024: { label: "LCP, 3 July 2024", url: "https://lcp.fr/actualites/legislatives-2024-217-desistements-pour-barrer-la-route-du-pouvoir-au-rn-tour-d-horizon", date: "2024-07-03" },
  cnews2026: { label: "CNews, 19 February 2026", url: "https://www.cnews.fr/france/2026-02-19/municipales-2026-en-cas-de-duel-entre-lfi-et-le-rn-au-second-tour-pas-une-seule", date: "2026-02-19" },
} satisfies Record<string, Src>;

export const FIREWALL: FirewallRow[] = [
  { code: "RN", for2027: "isRN", record: [] },
  {
    code: "LFI", for2027: "unknown",
    record: [
      { stance: "noRN", who: "Jean-Luc Mélenchon, 2024 legislative", quote: { en: "\"No Insoumis voter will ever give their vote to the Rassemblement national.\"", fr: "« Jamais aucun électeur insoumis ne donnera sa voix au Rassemblement national. »" }, src: S.ps2024a },
      { stance: "noRN", who: "Jean-Luc Mélenchon, 2022 runoff", quote: { en: "Not \"a single vote\" for Le Pen, without naming Macron.", fr: "Pas « une seule voix » pour Mme Le Pen, sans nommer Macron." }, src: S.lnc2022 },
    ],
  },
  {
    code: "HOR", for2027: "unknown",
    record: [
      { stance: "niNi", who: "Édouard Philippe, 2024 legislative", quote: { en: "No vote should go to candidates of the Rassemblement national, \"nor to those of La France insoumise\".", fr: "Aucune voix ne doit « se porter sur les candidats du Rassemblement national, ni sur ceux de la France insoumise »." }, src: S.ps2024b },
    ],
  },
  {
    code: "PP", for2027: "unknown",
    record: [
      { stance: "block", who: "Parti socialiste (Anne Hidalgo), 2022 runoff", quote: { en: "Called on voters to use \"the Emmanuel Macron ballot\" against Le Pen.", fr: "Invite à utiliser « le bulletin de vote Emmanuel Macron » contre Le Pen." }, src: S.lnc2022 },
    ],
  },
  {
    code: "LR", for2027: "unknown",
    record: [
      { stance: "free", who: "Bruno Retailleau, 2026 municipal", quote: { en: "\"Not a single vote should go to candidates backed by LFI.\" Where LR isn't in the runoff, freedom of vote; no call to back anyone against the RN.", fr: "« Pas une seule voix ne doit aller sur des candidats soutenus par LFI. » Là où LR n'est pas au second tour, liberté de vote ; pas d'appel à faire barrage au RN." }, src: S.cnews2026 },
      { stance: "block", who: "Les Républicains (Valérie Pécresse), 2022 runoff", quote: { en: "Said she would vote Macron \"in conscience\".", fr: "Votera Macron « en conscience »." }, src: S.lnc2022 },
    ],
  },
  { code: "NE", for2027: "unknown", record: [] },
  {
    code: "REN", for2027: "unknown",
    record: [
      { stance: "block", who: "Gabriel Attal, 2024 legislative", quote: { en: "Withdrew third-placed Ensemble candidates where the RN could win and the second-placed candidate \"shares the values of the Republic\": 81 withdrawals.", fr: "Désistement des candidats Ensemble arrivés troisièmes là où le RN pouvait gagner et où le deuxième « partage les valeurs de la République » : 81 désistements." }, src: S.ps2024b },
    ],
  },
  {
    code: "ECO", for2027: "unknown",
    record: [
      { stance: "block", who: "Marine Tondelier, 2024 legislative", quote: { en: "Asked the presidential camp for \"simple, clear commitments\" to withdraw mutually to defeat the RN.", fr: "Demande au camp présidentiel des « engagements simples et clairs » de désistement réciproque pour battre le RN." }, src: S.ps2024a },
      { stance: "block", who: "Les Écologistes (Yannick Jadot), 2022 runoff", quote: { en: "\"Block the far right by putting an Emmanuel Macron ballot in the box.\"", fr: "« Faire barrage à l'extrême droite en déposant dans l'urne un bulletin Emmanuel Macron. »" }, src: S.lnc2022 },
    ],
  },
  {
    code: "REC", for2027: "unknown",
    record: [
      { stance: "backsRN", who: "Éric Zemmour, 2022 runoff", quote: { en: "\"I call on my voters to vote for Marine Le Pen.\"", fr: "« J'appelle mes électeurs à voter pour Marine Le Pen. »" }, src: S.lnc2022 },
    ],
  },
  {
    code: "PCF", for2027: "unknown",
    record: [
      { stance: "block", who: "Fabien Roussel, 2022 runoff", quote: { en: "\"Beat the far right\" with \"the only ballot available to us\": Macron.", fr: "« Battre l'extrême droite » avec « le seul bulletin à notre disposition » : Macron." }, src: S.lnc2022 },
    ],
  },
  {
    code: "DLF", for2027: "unknown",
    record: [
      { stance: "backsRN", who: "Nicolas Dupont-Aignan, 2022 runoff", quote: { en: "Urged voters to block Macron and said he would vote Le Pen.", fr: "Appelle à « tout faire pour faire barrage » à Macron et votera Le Pen." }, src: S.lnc2022 },
    ],
  },
  { code: "DEB", for2027: "unknown", record: [] },
  { code: "XB", for2027: "unknown", record: [] },
];

/** Dated log of firewall news during the 2027 campaign, newest first. */
export const FIREWALL_LOG: { date: string; text: T; src: Src }[] = [];

export const POLL_NOW = {
  label: "Ifop for LCI, 27–29 October 2026",
  url: "https://www.publicsenat.fr/actualites/politique/sondage-presidentielle-2027-un-second-tour-le-pen-melenchon-assure-la-droite-et-le-bloc-central-peine-a-remonter-lisnard-confirme-sa-percee",
  text: {
    en: "The latest poll puts Le Pen at 35–37% in the first round and Mélenchon at 17.5–18%, making a Le Pen–Mélenchon runoff the likeliest. In May, Odoxa had Bardella beating Philippe 52–48 in a runoff, the reverse of two months earlier.",
    fr: "Le dernier sondage place Le Pen à 35-37 % au premier tour et Mélenchon à 17,5-18 %, faisant d'un duel Le Pen–Mélenchon le scénario le plus probable. En mai, Odoxa donnait Bardella vainqueur de Philippe au second tour, 52-48, l'inverse de deux mois plus tôt.",
  },
  odoxa: { label: "Odoxa-Mascaret, 20–21 May 2026", url: "https://www.publicsenat.fr/actualites/politique/presidentielle-2027-melenchon-et-philippe-au-coude-a-coude-pour-la-qualification-au-second-tour-bardella-toujours-largement-en-tete-selon-le-sondage-odoxa" },
};
