/* ============================================================
   The 66 statements, in nine areas, in English and French.
   1–53 are the first set; 54–61 were added in November 2026 to
   cover housing, energy prices, defence, digital and voting age;
   62–64 (leaving the EU, leaving the euro, the EU carbon price) the same day.
   62 and 63 have no backer in the field: they show readers who hold
   that view where they sit beyond every candidate. 65 and 66
   (recognising Palestine, the Yadan bill) were added the same day.
   One claim each, neutral wording, chosen because the main
   candidates split on them. The French is a first draft for the
   colleague in France to copy-check.

   `axis` places a statement on the results chart:
     econ — left (−) to right (+) on the economy: statements 1–12, 54 and 56
     open — open (−) to nationalist (+): 13–18, 25–30 except 29, and 62–63
   `sign` is +1 when agreeing moves you toward the + pole.
   Statements with no axis still count toward the match.
   ============================================================ */

export type AreaId = "eco" | "work" | "imm" | "sec" | "eur" | "nrg" | "ins" | "soc" | "afr";
export type Axis = "econ" | "open";

export interface Area {
  id: AreaId;
  en: string;
  fr: string;
}

export const AREAS: Area[] = [
  { id: "eco", en: "Economy and taxes", fr: "Économie et impôts" },
  { id: "work", en: "Pensions and work", fr: "Retraites et travail" },
  { id: "imm", en: "Immigration and identity", fr: "Immigration et identité" },
  { id: "sec", en: "Security and justice", fr: "Sécurité et justice" },
  { id: "eur", en: "Europe and the world", fr: "L'Europe et le monde" },
  { id: "nrg", en: "Energy and climate", fr: "Énergie et climat" },
  { id: "ins", en: "Institutions and democracy", fr: "Institutions et démocratie" },
  { id: "soc", en: "Society and public services", fr: "Société et services publics" },
  { id: "afr", en: "France in Africa and the Middle East", fr: "La France en Afrique et au Moyen-Orient" },
];

export const AREA = Object.fromEntries(AREAS.map((a) => [a.id, a])) as Record<AreaId, Area>;

export const AXES: Record<Axis, { en: [string, string]; fr: [string, string]; name: { en: string; fr: string } }> = {
  econ: { en: ["Left", "Right"], fr: ["Gauche", "Droite"], name: { en: "Economy: left to right", fr: "Économie : gauche-droite" } },
  open: { en: ["Open", "Nationalist"], fr: ["Ouvert", "Nationaliste"], name: { en: "Europe, immigration and identity: open to nationalist", fr: "Europe, immigration et identité : ouvert-nationaliste" } },
};

export interface Statement {
  /** 1–66, stable: links and codes use it */
  id: number;
  area: AreaId;
  axis: Axis | null;
  sign: 1 | -1;
  en: string;
  fr: string;
}

type Row = [id: number, area: AreaId, axis: Axis | null, sign: 1 | -1, en: string, fr: string];

const ROWS: Row[] = [
  [1, "eco", "econ", -1, "France should bring back a wealth tax on large fortunes.", "La France devrait rétablir un impôt sur les grandes fortunes."],
  [2, "eco", "econ", 1, "Cutting the deficit should come before new public spending.", "Réduire le déficit devrait passer avant toute nouvelle dépense publique."],
  [3, "eco", "econ", 1, "Taxes on businesses should be cut to attract investment.", "Les impôts des entreprises devraient baisser pour attirer les investissements."],
  [4, "eco", "econ", -1, "The minimum wage should rise faster than inflation.", "Le SMIC devrait augmenter plus vite que l'inflation."],
  [5, "eco", "econ", -1, "Very large inheritances should be taxed more heavily.", "Les très gros héritages devraient être taxés plus lourdement."],
  [6, "eco", "econ", -1, "The state should take stakes in strategic companies to keep them French.", "L'État devrait prendre des participations dans les entreprises stratégiques pour qu'elles restent françaises."],

  [7, "work", "econ", -1, "The retirement age should go back to 62.", "L'âge de départ à la retraite devrait revenir à 62 ans."],
  [8, "work", "econ", -1, "People who had physically hard jobs should be able to retire earlier.", "Les personnes qui ont exercé un métier physiquement pénible devraient pouvoir partir plus tôt à la retraite."],
  [9, "work", "econ", 1, "Unemployment benefits should be cut for people who turn down job offers.", "Les allocations chômage devraient être réduites pour les personnes qui refusent des offres d'emploi."],
  [10, "work", "econ", 1, "The 35-hour work week should be scrapped.", "Les 35 heures devraient être supprimées."],
  [11, "work", "econ", 1, "Public-sector jobs should be cut to reduce spending.", "Il faudrait supprimer des postes de fonctionnaires pour réduire les dépenses."],
  [12, "work", "econ", -1, "Workers should get a bigger share of company profits.", "Les salariés devraient recevoir une plus grande part des bénéfices des entreprises."],

  [13, "imm", "open", 1, "Immigration to France should be sharply reduced.", "L'immigration en France devrait être fortement réduite."],
  [14, "imm", "open", 1, "Children born in France to foreign parents should no longer become French automatically.", "Les enfants nés en France de parents étrangers ne devraient plus devenir automatiquement français."],
  [15, "imm", "open", 1, "State medical aid (AME), which gives undocumented migrants free health care, should be scrapped.", "L'aide médicale d'État (AME), qui soigne gratuitement les étrangers en situation irrégulière, devrait être supprimée."],
  [16, "imm", "open", 1, "France should hold a referendum on immigration.", "La France devrait organiser un référendum sur l'immigration."],
  [17, "imm", "open", 1, "Foreigners without the right to stay should be deported more often, even to countries that resist taking them back.", "Les étrangers sans droit au séjour devraient être expulsés plus souvent, même vers des pays qui refusent de les reprendre."],
  [18, "imm", "open", 1, "Social benefits should be reserved for French citizens first.", "Les prestations sociales devraient être réservées en priorité aux Français."],

  [19, "sec", null, 1, "More prisons should be built.", "Il faudrait construire davantage de prisons."],
  [20, "sec", null, 1, "Minimum sentences should apply to repeat offenders.", "Des peines minimales devraient s'appliquer aux récidivistes."],
  [21, "sec", null, 1, "Minors who commit serious crimes should be tried as adults.", "Les mineurs qui commettent des crimes graves devraient être jugés comme des majeurs."],
  [22, "sec", null, 1, "Police should be allowed more use of facial recognition in public places.", "La police devrait pouvoir utiliser davantage la reconnaissance faciale dans l'espace public."],
  [23, "sec", null, -1, "Recreational cannabis should be legalised.", "Le cannabis récréatif devrait être légalisé."],
  [24, "sec", null, 1, "Political Islam should be treated as a security threat in its own right.", "L'islam politique devrait être traité comme une menace pour la sécurité en tant que telle."],

  [25, "eur", "open", 1, "EU law should no longer take priority over French law.", "Le droit européen ne devrait plus primer sur le droit français."],
  [26, "eur", "open", -1, "France should keep sending weapons to Ukraine.", "La France devrait continuer à livrer des armes à l'Ukraine."],
  [27, "eur", "open", 1, "France should leave NATO's integrated command.", "La France devrait quitter le commandement intégré de l'OTAN."],
  [28, "eur", "open", -1, "France should push for a joint European army.", "La France devrait pousser à la création d'une armée européenne commune."],
  // 29 stays off the open–closed axis: the candidates who agree (the left) and
  // those who disagree (the right and far right) don't line up with open–closed,
  // so placing it there would pull both ends toward the middle. It still counts
  // toward the match.
  [29, "eur", null, 1, "France should suspend arms sales to Israel.", "La France devrait suspendre ses ventes d'armes à Israël."],
  [30, "eur", "open", 1, "The EU–Mercosur trade deal should be rejected.", "L'accord commercial entre l'UE et le Mercosur devrait être rejeté."],

  [31, "nrg", null, 1, "France should build more nuclear reactors.", "La France devrait construire davantage de réacteurs nucléaires."],
  [32, "nrg", null, 1, "Building new wind farms should be stopped.", "La construction de nouveaux parcs éoliens devrait être arrêtée."],
  [33, "nrg", null, 1, "The ban on new petrol and diesel cars from 2035 should be scrapped.", "L'interdiction de vendre des voitures neuves à essence et diesel à partir de 2035 devrait être abandonnée."],
  [34, "nrg", null, -1, "Air travel should be taxed more to cut emissions.", "Le transport aérien devrait être davantage taxé pour réduire les émissions."],
  [35, "nrg", null, 1, "Farmers should be exempt from some environmental rules.", "Les agriculteurs devraient être exemptés de certaines règles environnementales."],
  [36, "nrg", null, -1, "France should aim for net zero earlier than 2050.", "La France devrait viser la neutralité carbone avant 2050."],

  [37, "ins", null, 1, "France should move to a Sixth Republic with a weaker president.", "La France devrait passer à une VIe République, avec un président aux pouvoirs réduits."],
  [38, "ins", null, 1, "Members of the National Assembly should be elected by proportional representation.", "Les députés devraient être élus à la proportionnelle."],
  [39, "ins", null, 1, "Citizens should be able to force a referendum by petition.", "Les citoyens devraient pouvoir imposer un référendum par pétition."],
  [40, "ins", null, 1, "The president should be limited to one longer term.", "Le président devrait être limité à un seul mandat, plus long."],
  [41, "ins", null, 1, "Article 49.3, which lets the government pass laws without a vote, should be abolished.", "L'article 49.3, qui permet au gouvernement de faire adopter une loi sans vote, devrait être supprimé."],
  [42, "ins", null, 1, "Overseas territories should get more autonomy.", "Les territoires d'outre-mer devraient obtenir davantage d'autonomie."],

  [43, "soc", null, 1, "Medically assisted dying should be legal.", "L'aide à mourir devrait être légale."],
  [44, "soc", null, 1, "Doctors should be required to work for some years in areas short of doctors.", "Les médecins devraient être obligés d'exercer quelques années dans les déserts médicaux."],
  [45, "soc", null, 1, "School uniforms should be compulsory in public schools.", "L'uniforme devrait être obligatoire dans les écoles publiques."],
  [46, "soc", null, 1, "The ban on religious symbols should extend to university students.", "L'interdiction des signes religieux devrait s'étendre aux étudiants à l'université."],
  [47, "soc", null, 1, "Private schools should lose public funding.", "Les écoles privées devraient perdre leurs financements publics."],
  [48, "soc", null, 1, "Public broadcasting should be privatised.", "L'audiovisuel public devrait être privatisé."],

  [49, "afr", null, 1, "France should resume military operations against jihadist groups in the Sahel.", "La France devrait reprendre ses opérations militaires contre les groupes djihadistes au Sahel."],
  [50, "afr", null, 1, "France should end its remaining role in the CFA franc.", "La France devrait mettre fin au rôle qu'elle garde dans le franc CFA."],
  [51, "afr", null, 1, "France should pay reparations to its former colonies.", "La France devrait verser des réparations à ses anciennes colonies."],
  [52, "afr", null, 1, "The French state should formally apologise to Algeria for colonisation.", "L'État français devrait présenter des excuses officielles à l'Algérie pour la colonisation."],
  [53, "afr", null, 1, "France should push to keep UNIFIL, the UN peacekeeping force in southern Lebanon, beyond its planned withdrawal.", "La France devrait œuvrer au maintien de la FINUL, la force de maintien de la paix de l'ONU au Sud-Liban, au-delà de son retrait prévu."],
  // Added November 2026
  [54, "eco", "econ", -1, "Rents should be capped across France, not only in some cities.", "Les loyers devraient être encadrés partout en France, et pas seulement dans certaines villes."],
  [55, "eco", null, 1, "VAT on electricity, gas and fuel should be cut to 5.5%.", "La TVA sur l'électricité, le gaz et les carburants devrait être ramenée à 5,5 %."],
  [56, "eco", "econ", -1, "A minimum tax of 2% should apply to fortunes above €100 million.", "Un impôt minimum de 2 % devrait s'appliquer aux patrimoines de plus de 100 millions d'euros."],
  [57, "nrg", null, 1, "The pesticide acetamiprid should stay banned.", "Le pesticide acétamipride devrait rester interdit."],
  [58, "eur", null, 1, "France should raise defence spending to at least 3% of GDP.", "La France devrait porter ses dépenses de défense à au moins 3 % du PIB."],
  [59, "sec", null, 1, "Compulsory national or military service should be brought back.", "Un service national ou militaire obligatoire devrait être rétabli."],
  [60, "soc", null, 1, "Social media should be off-limits to children under 15.", "Les réseaux sociaux devraient être interdits aux moins de 15 ans."],
  [61, "ins", null, 1, "The voting age should be lowered to 16.", "Le droit de vote devrait être abaissé à 16 ans."],
  [62, "eur", "open", 1, "France should leave the European Union.", "La France devrait quitter l'Union européenne."],
  [63, "eur", "open", 1, "France should leave the euro.", "La France devrait sortir de l'euro."],
  [64, "nrg", null, 1, "The EU's carbon price on fuel and heating (ETS2) should start in 2028 as planned.", "Le prix du carbone européen sur les carburants et le chauffage (ETS2) devrait s'appliquer dès 2028, comme prévu."],
  [65, "afr", null, 1, "France was right to recognise the State of Palestine in 2025.", "La France a eu raison de reconnaître l'État de Palestine en 2025."],
  [66, "sec", null, 1, "Publicly calling for the destruction of a state recognised by France should be a crime.", "Appeler publiquement à la destruction d'un État reconnu par la France devrait être un délit."],
];

export const STATEMENTS: Statement[] = ROWS.map(([id, area, axis, sign, en, fr]) => ({ id, area, axis, sign, en, fr }));
export const BY_ID = Object.fromEntries(STATEMENTS.map((s) => [s.id, s])) as Record<number, Statement>;

/** The quick version: three per topic, picked for how sharply they split the field
 *  and to avoid near-duplicates (one wealth tax, not three). */
export const QUICK_IDS: number[] = [
  1, 2, 55,    // economy
  7, 9, 10,    // pensions and work
  13, 14, 15,  // immigration
  20, 22, 59,  // security
  25, 26, 29,  // Europe and the world
  31, 33, 57,  // energy
  37, 38, 39,  // institutions
  43, 47, 60,  // society
  49, 50, 52,  // Africa and the Middle East
];
