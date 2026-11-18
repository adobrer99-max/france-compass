/* ============================================================
   Candidate positions: one code per candidate per statement.

     A  agree — has clearly taken that side
     D  disagree — has clearly taken the other side
     N  neutral or mixed — genuinely split, or deliberately vague
     -  no position on record (the default: anything not listed
        here). Left out of that candidate's match entirely.

   Every code carries a dated source. Sources, in order of weight:
   the 2027 programme; what they've said since declaring; the 2024
   legislative platform; their party's votes in the Assembly;
   cross-checks against Le Monde and Institut Montaigne.

   Rules: never fill a gap from party family. When the candidate's
   own words and the party record differ, go with the candidate and
   say so in `note`. Codes stay `provisional` until the campaign has
   had a week to reply and the colleague in France has checked them.
   ============================================================ */

import type { CandidateCode } from "./candidates";

export type Position = "A" | "N" | "D" | "-";

export interface Code {
  p: Exclude<Position, "-">;
  /** where the position is on record */
  src: string;
  /** what the source is, in a few words: "2024 programme, p. 12" */
  label: string;
  /** ISO date of the source */
  date: string;
  provisional?: boolean;
  /** placeholder: a party vote, an older platform or a single remark, not the 2027 programme. Counts, but is flagged, until sharpened. */
  weak?: boolean;
  note?: string;
}

export type Codes = Partial<Record<CandidateCode, Partial<Record<number, Code>>>>;

/* ---- Sources for the first pass (November 2026) ---- */
type S = Pick<Code, "src" | "label" | "date" | "weak">;
const IF: S = { src: "https://www.ifrap.org/comparateurs/presidentielles-2027", label: "Fondation iFRAP, 2027 programme comparator (consulted 13 Nov 2026)", date: "2026-11-13" };
const IM22: S = { src: "https://www.institutmontaigne.org/presidentielle-2022/marine-le-pen/synthese/", label: "Institut Montaigne, Le Pen 2022 programme", date: "2022-04-01" };
const RN24: S = { src: "https://lcp.fr/actualites/legislatives-2024-pouvoir-d-achat-immigration-ecole-jordan-bardella-devoile-le-programme", label: "LCP, RN 2024 legislative programme", date: "2024-06-24" };
const INST22: S = { src: "https://www.publicsenat.fr/actualites/politique/la-reforme-des-institutions-au-coeur-du-duel-macron-le-pen-202480", label: "Public Sénat, Le Pen's institutional reforms", date: "2022-04-13" };
const UKR24: S = { src: "https://voanews.com/a/french-far-right-leader-bardella-backs-ukraine-but-would-not-send-long-range-missiles/7661784.html", label: "VOA, Bardella on Ukraine", date: "2024-06-19" };
const FDV: S = { src: "https://lcp.fr/actualites/aide-a-mourir-qui-a-vote-quoi-a-l-assemblee-nationale-431842", label: "LCP, Assembly vote on assisted dying (party's deputies)", date: "2026-02-25" };

/* ---- Second pass (November 2026): placeholders, flagged `weak` until sharpened ----
   Party votes stand in for the candidate's own position only where the candidate
   leads that party or group; older platforms and single remarks are marked as such. */
const UKRV: S = { src: "https://datan.fr/votes/legislature-16/vote_3461", label: "Assembly vote on the France–Ukraine security accord (party's deputies)", date: "2024-03-12", weak: true };
const MERV: S = { src: "https://datan.fr/votes/legislature-17/vote_456", label: "Assembly vote opposing the EU–Mercosur deal as it stands (party's deputies)", date: "2024-11-26", weak: true };
const ZUCV: S = { src: "https://datan.fr/votes/legislature-17/vote_3300", label: "Assembly vote on the Zucman tax, 2026 budget (party's deputies)", date: "2025-10-31", weak: true };
const VSAV: S = { src: "https://datan.fr/votes/legislature-16/vote_1274", label: "Assembly vote on algorithmic video surveillance for the 2024 Olympics (party's deputies)", date: "2023-03-23", weak: true };
const PROP25: S = { src: "https://lcp.fr/actualites/proportionnelle-aux-legislatives-francois-bayrou-consulte-les-avis-divergent-sur-le", label: "LCP, parties' positions on proportional representation", date: "2025-04-30", weak: true };
const ISR24: S = { src: "https://www.publicsenat.fr/actualites/international/propos-de-macron-sur-larret-des-ventes-darmes-a-israel-la-droite-deplore-le-timing-la-gauche-salue-la-responsabilite-du-president", label: "Public Sénat, reactions to Macron's call to stop arms deliveries for Gaza", date: "2024-10-07", weak: true };
const CAR24: S = { src: "https://www.tomsguide.fr/fin-des-voitures-thermiques-la-droite-veut-revenir-sur-linterdiction-de-2035/", label: "Tom's Guide, Bardella on the 2035 combustion-car ban", date: "2024-07-03", weak: true };
const ATM25: S = { src: "https://lcp.fr/actualites/delinquance-des-mineurs-la-proposition-de-loi-de-gabriel-attal-pour-restaurer-l-autorite", label: "LCP, Attal's bill on juvenile offenders", date: "2025-02-13" };
const ATI25: S = { src: "https://www.publicsenat.fr/actualites/politique/gabriel-attal-propose-dinterdire-le-voile-pour-les-moins-de-15-ans-et-souhaite-une-nouvelle-loi-separatisme", label: "Public Sénat, Attal's proposals after the Muslim Brotherhood report", date: "2025-05-21", weak: true };
const ATU23: S = { src: "https://www.linfodurable.fr/uniforme-lecole-une-experimentation-de-grande-ampleur-annoncee-sous-peu-dit-attal-42599", label: "L'Info durable, Attal on school uniforms", date: "2023-12-06", weak: true };
const PHE26: S = { src: "https://fr.euronews.com/2026/10/09/presidentielle-2027-edouard-philippe-mise-sur-le-travail-et-la-reduction-des-depenses-publ", label: "Euronews, Philippe's programme", date: "2026-10-09" };
const PHV26: S = { src: "https://votons-2027.fr/candidats/philippe/programme", label: "Votons 2027 summary of edouardphilippe.fr", date: "2026-11-14", weak: true };
const PCF22: S = { src: "https://www.publicsenat.fr/actualites/politique/presidentielle-fabien-roussel-presente-180-propositions-pour-une-france-des-jours", label: "Public Sénat, Roussel's 2022 programme", date: "2022-01-24", weak: true };
const RUF25: S = { src: "https://datan.fr/votes/legislature-17/vote_2107", label: "Assembly vote on the right to assisted dying, first reading (Ruffin's own vote)", date: "2025-05-27" };
const RUF23: S = { src: "https://en.wikipedia.org/wiki/Fran%C3%A7ois_Ruffin", label: "Wikipedia: backed the 2023 petition for a citizens' initiative referendum", date: "2023-05-01", weak: true };
const XB21: S = { src: "https://en.wikipedia.org/wiki/Xavier_Bertrand", label: "Wikipedia summary of Bertrand's 2021–22 platform", date: "2021-12-01", weak: true };
/* ---- Weekly check, 16 November 2026: LFI's 2027 programme (L'Avenir en commun, 2027 edition) ---- */
const LFI_E2C1: S = { src: "https://melenchon2027.fr/programme/livre/une-economie-au-service-des-besoins/chapitre1/", label: "L'Avenir en commun 2027, part 2 ch. 1", date: "2026-11-07" };
const LFI_F6C2: S = { src: "https://melenchon2027.fr/programme/livre/fonder-la-6e-republique/chapitre2/", label: "L'Avenir en commun 2027, part 5 ch. 2", date: "2026-11-07" };
const LFI_M6C1: S = { src: "https://melenchon2027.fr/programme/livre/un-monde-ordonne/chapitre1/", label: "L'Avenir en commun 2027, part 6 ch. 1", date: "2026-11-07" };
const LFI_M6C2: S = { src: "https://melenchon2027.fr/programme/livre/un-monde-ordonne/chapitre2/", label: "L'Avenir en commun 2027, part 6 ch. 2", date: "2026-11-07" };

/* ---- Statements 54–61, added 18 November 2026 ----
   Party votes stand in only where the candidate leads that party or its group, flagged `weak`. */
const LOY26: S = { src: "https://www.investissement-locatif.com/le-volet-logement-de-lfi-jean-luc-melenchon.html", label: "Investissement-Locatif.com, LFI's housing programme", date: "2026-09-21" };
const RNP24: S = { src: "https://rassemblementnational.fr/documents/202406-programme.pdf", label: "RN 2024 legislative programme: VAT at 5.5% on fuel, gas and electricity", date: "2024-06-24" };
const LRT26: S = { src: "https://www.publicsenat.fr/actualites/politique/essence-energie-logement-travail-bruno-retailleau-promet-daugmenter-le-pouvoir-dachat-des-francais-sans-un-euro-de-dette-en-plus", label: "Public Sénat, Retailleau's purchasing-power plan", date: "2026-09-15" };
const AID26: S = { src: "https://www.connaissancedesenergies.org/afp/la-campagne-dattal-et-de-philippe-percutee-par-la-crise-des-carburants-260922", label: "AFP, Attal and Philippe on fuel prices", date: "2026-09-22" };
const PCFT25: S = { src: "https://www.publicsenat.fr/actualites/politique/le-groupe-communiste-depose-une-proposition-de-loi-pour-reduire-a-55-la-tva-sur-lenergie-pour-eviter-un-massacre-social", label: "Public Sénat, communist senators' bill for 5.5% VAT on energy", date: "2025-07-16", weak: true };
const ZUC25: S = { src: "https://lcp.fr/actualites/budget-2026-la-taxe-zucman-rejetee-par-l-assemblee-nationale-413632", label: "LCP, Assembly vote on the Zucman tax, 2026 budget (party's deputies)", date: "2025-10-31", weak: true };
const DUP25: S = { src: "https://datan.fr/votes/legislature-17/vote_2957", label: "Assembly final vote on the Duplomb law reauthorising neonicotinoids (party's deputies)", date: "2025-07-08", weak: true };
const DEF26: S = { src: "https://lhemicycle.com/theme/defense/", label: "L'Hémicycle, candidates on defence (consulted 18 Nov 2026)", date: "2026-11-18" };
const LFIS26: S = { src: "https://poligraph.fr/elections/presidentielle-2027/mesures/jean-luc-melenchon-ouvrir-la-possibilite-d-un-service-militaire-comme-composante-optionnelle-du-service-citoyen-obligatoire", label: "Poligraph, L'Avenir en commun 2027: compulsory citizen service", date: "2026-11-08" };
const RNS24: S = { src: "https://www.politis.fr/articles/2024/07/elections-legislatives-service-national-universel-les-ambitions-demesurees-du-rn/", label: "Politis, the RN on national service", date: "2024-07-02", weak: true };
const RS26: S = { src: "https://nosparlementaires.fr/actualites/reseaux-sociaux-interdits-15-ans-adoption-definitive", label: "NosParlementaires, final Assembly vote on the under-15 social media ban (party's deputies)", date: "2026-07-21", weak: true };
const V16: S = { src: "https://www.elyseescope.com/le-radar/jean-luc-melenchon-vote-16-ans", label: "ÉlyséeScope, candidates on voting at 16", date: "2026-10-16", weak: true };

/** [statement, position, source, note?] */
type Row = [number, "A" | "N" | "D", S, string?];

const rows = (list: Row[]) =>
  Object.fromEntries(list.map(([id, p, src, note]) => [id, { p, ...src, provisional: true, ...(note ? { note } : {}) }])) as Partial<Record<number, Code>>;

/** First coding pass, all provisional until the colleague in France has checked them. */
export const CODES: Codes = {
  RN: rows([
    [1, "A", IF, "As a tax on financial wealth (IFF) replacing the property-wealth tax"],
    [3, "A", IM22, "Abolish the CFE and cut production taxes"],
    [5, "D", IF, "Exempts family inheritances of property up to €300,000"],
    [7, "A", IF, "62, and 60 for those who started work before 20"],
    [9, "A", IF, "Benefits suspended for missed monthly check-ins"],
    [11, "A", IF, "200,000 posts cut or not renewed"],
    [13, "A", RN24],
    [14, "A", RN24],
    [15, "A", IF, "Replaced by emergency-only care"],
    [16, "A", RN24],
    [17, "A", RN24, "Systematic removal of foreign offenders"],
    [18, "A", IF, "Family benefits reserved to households with a French parent"],
    [19, "A", IF, "30,000 more places"],
    [20, "A", IF],
    [26, "N", UKR24, "Backs Ukraine's defence but no long-range missiles"],
    [27, "A", IM22, "2022 programme; not restated since"],
    [30, "A", IF, "Exclude agriculture from all free-trade deals"],
    [31, "A", IF],
    [32, "A", IF, "Gradually dismantle existing wind farms"],
    [35, "A", IF, "Allow pesticides where there's no alternative"],
    [38, "A", INST22, "Two-thirds of seats, likely with a majority bonus"],
    [39, "A", INST22, "500,000 signatures"],
    [40, "A", INST22, "Single seven-year term"],
    [43, "D", FDV, "102 of 122 RN deputies voted against"],
    [45, "A", IF, "Primary and middle school"],
    [46, "A", IF, "Legal ban on the Islamic headscarf in public"],
    [48, "A", IM22],
    // second pass
    [22, "A", VSAV, "Voted for algorithmic video surveillance; not facial recognition as such"],
    [33, "A", CAR24, "Bardella wants the 2035 ban reversed"],
    // statements 54–61 (18 Nov 2026)
    [55, "A", RNP24, "Le Pen restated the fuel cut in September 2026 (Sud Radio)"],
    [56, "D", ZUC25, "Party record: RN deputies"],
    [57, "D", DUP25, "Party record: RN deputies voted for the Duplomb law"],
    [59, "A", RNS24, "Prefers 'a real return of military service' to the SNU; Le Pen's 2017 programme had a three-month service"],
    [60, "N", RS26, "Party record: RN deputies mostly abstained (14 abstentions, 2 against)"],
    [61, "D", V16],
  ]),
  LFI: rows([
    [1, "A", IF, "Restore the ISF with a climate component"],
    [4, "A", IF, "Net SMIC to €1,700 at once"],
    [5, "A", IF, "100% above €12m"],
    [7, "A", IF, "62, then 60"],
    [9, "D", IF, "Benefits from day one; end sanctions for missed appointments"],
    [10, "D", IF, "Restore the 35-hour week"],
    [11, "D", IF],
    [13, "D", IF, "Full birthright citizenship, regularise undocumented workers"],
    [14, "D", IF],
    [15, "D", IF, "Guarantee access to AME"],
    [18, "D", IF],
    [21, "D", IF, "Return to the primacy of education (1945 ordinance)"],
    [22, "D", IF, "Ban it in public spaces"],
    [23, "A", IF, "Under a state monopoly"],
    [27, "A", IF],
    [29, "A", IF, "Calls for sanctions on the Netanyahu government"],
    [31, "D", IF, "Close plants progressively, stop EPR2"],
    [32, "D", IF, "45 GW offshore wind by 2050"],
    [37, "A", IF],
    [38, "A", IF],
    [39, "A", IF],
    [41, "A", IF],
    [42, "A", IF, "New Caledonian independence by 2028"],
    [43, "A", FDV, "62 of 71 LFI deputies voted for"],
    [45, "D", IF, "End the uniform experiment"],
    [47, "N", IF, "Repeal the Carle law, penalise segregating private schools"],
    [48, "D", IF, "Elect the heads of public broadcasters"],
    // second pass
    [26, "N", UKRV, "Voted against the 2024 security accord with Ukraine"],
    // weekly check, 16 Nov 2026: 2027 programme
    [6, "A", LFI_E2C1, "Public poles in strategic sectors: medicines, transport, banking, energy, arms"],
    [19, "D", LFI_F6C2, "\"Sortir de la logique du tout carcéral\""],
    [25, "N", LFI_M6C1, "EU rules set aside only where less ambitious than French social or green ones; stays in the EU and the euro"],
    [30, "A", LFI_M6C1, "Calls the Mercosur deal destructive; veto on free-trade deals"],
    [53, "A", LFI_M6C2, "Strengthen the UN presence in Lebanon"],
    // statements 54–61 (18 Nov 2026)
    [54, "A", LOY26, "Extend rent control to the whole country"],
    [56, "A", ZUC25, "Party record: LFI deputies"],
    [57, "A", DUP25, "Party record: LFI deputies voted against the Duplomb law"],
    [59, "A", LFIS26, "Compulsory citizen service, with military service as an option within it"],
    [60, "D", RS26, "Party record: LFI deputies voted against as a bloc"],
    [61, "A", V16],
  ]),
  HOR: rows([
    [3, "A", IF, "Cut production taxes by €50bn a year"],
    [5, "D", IF, "Raise donation allowances, keep the Dutreil pact"],
    [7, "D", IF, "Raise the age to 65"],
    [8, "A", IF, "Early exit for one in three workers, by job hardship"],
    [11, "A", IF, "250,000 posts over five years"],
    [13, "A", IF, "Quotas, restrict family immigration"],
    [14, "N", IF, "Suspend it in Mayotte only"],
    [17, "A", IF, "Immediate expulsion of foreign offenders; return centres"],
    [19, "A", IF],
    [20, "A", IF, "For serious offences"],
    [21, "A", IF, "For drug trafficking: lift the minority excuse"],
    [22, "A", IF, "Targeted use in a 'narco state of emergency'"],
    [31, "A", IF],
    [35, "A", IF, "No over-transposition of EU farm rules"],
    [43, "N", FDV, "Horizons deputies split, 14 for and 18 against"],
    // second pass
    [1, "D", ZUCV],
    [2, "A", PHE26, "Spending cuts to carry the budget effort; no deficit figure"],
    [9, "A", PHE26, "Cut maximum benefit period from 18 to 12 months for under-50s"],
    [10, "N", PHV26, "Firms free to set working time; no employer contributions beyond the 37th hour"],
    [26, "A", UKRV],
    [30, "A", MERV],
    [38, "D", PROP25, "Defends the current system unless local and national mandates can be combined again"],
    [45, "N", PHV26, "School heads could impose uniforms; not a national rule"],
    // statements 54–61 (18 Nov 2026)
    [55, "D", AID26, "Targeted, temporary aid rather than tax cuts"],
    [56, "D", ZUC25, "Party record: Horizons deputies"],
    [57, "D", DUP25, "Party record: Horizons deputies voted for the Duplomb law"],
    [58, "A", DEF26, "3% of GDP"],
    [60, "A", RS26, "Party record: Horizons deputies"],
  ]),
  PP: rows([
    [1, "A", IF, "Zucman tax: 2% minimum on fortunes over €100m"],
    [4, "A", IF, "Net SMIC to €1,700"],
    [5, "A", IF, "Top rate 50% above €1.8m"],
    [7, "A", IF],
    [8, "A", IF, "Job hardship at the centre of any reform"],
    [9, "D", IF, "Repeal the Macron unemployment reform"],
    [13, "D", IF, "Regularise undocumented workers, repeal the 2024 law"],
    [23, "N", IF, "A citizens' convention on drugs, legalisation included"],
    [26, "A", IF, "Drastically increase military aid"],
    [28, "N", IF, "A €500bn European defence fund, not an army"],
    [31, "N", IF, "Extend existing reactors"],
    [36, "D", IF, "Net zero by 2050"],
    [37, "A", IF, "A constituent process"],
    [41, "A", IF, "Replace it with a constructive censure motion"],
    [43, "A", FDV, "Party record: 60 of 69 PS deputies voted for"],
    [47, "N", IF, "Bring private schools into the school map"],
    // second pass
    [22, "D", VSAV, "Party record: PS deputies voted against"],
    [29, "A", ISR24, "Party record: PS senator Hélène Conway-Mouret"],
    [30, "A", MERV, "Party record: PS deputies"],
    // statements 54–61 (18 Nov 2026)
    [56, "A", ZUC25, "Party record: Socialist group deputies, where Place publique sits"],
    [57, "A", DUP25, "Party record: Socialist group deputies voted against the Duplomb law"],
    [60, "N", RS26, "Party record: Socialist group split, 30 for and 28 abstentions"],
  ]),
  LR: rows([
    [3, "A", IF, "Cut production taxes by €15bn"],
    [5, "D", IF, "Exemptions for young heirs"],
    [7, "D", IF, "Minimum 63, full pension at 65"],
    [8, "A", IF, "Hardship rules set job by job"],
    [10, "A", IF],
    [11, "A", IF, "Don't replace 600,000 retirements over ten years"],
    [13, "A", IF, "Visa and residence quotas set by law"],
    [14, "A", IF],
    [17, "A", IF, "Mandatory expulsion written into the Constitution"],
    [18, "N", IF, "Benefits after five years of legal residence and work"],
    [20, "A", IF, "For violence against people in authority"],
    [22, "A", IF],
    [25, "A", IF, "In some cases"],
    [31, "A", IF],
    [32, "A", IF, "End subsidies for onshore wind and solar"],
    [35, "A", IF, "Ban over-transposition, scrap the precautionary principle"],
    [39, "A", IF, "Halve the signature threshold"],
    [43, "D", FDV, "Party record: 42 of 49 Droite républicaine deputies voted against"],
    // second pass
    [1, "D", ZUCV],
    [26, "A", UKRV, "49 for, 11 abstentions"],
    [29, "D", ISR24, "Party record: LR senators Karoutchi and Perrin"],
    [30, "A", MERV],
    [38, "D", PROP25, "Retailleau opposed"],
    // statements 54–61 (18 Nov 2026)
    [55, "D", LRT26, "Cut fuel costs by scrapping energy-saving certificates instead; criticised the 5.5% VAT proposal"],
    [56, "D", ZUC25, "Party record: LR deputies"],
    [57, "D", DUP25, "Party record: LR deputies voted for the Duplomb law"],
    [58, "A", DEF26, "€100 billion a year by the end of the term, about 3% of GDP"],
    [60, "A", RS26, "Party record: LR deputies"],
  ]),
  NE: rows([
    [1, "D", IF, "Abolish the IFI"],
    [3, "A", IF, "Corporate tax to 20%"],
    [5, "D", IF],
    [7, "D", IF, "Legal age 65"],
    [11, "A", IF, "Cut half of the state's 1,200 agencies"],
    [13, "A", IF, "Quotas by economic need, tighter family reunification"],
    [15, "A", IF],
    [17, "A", IF],
    [18, "N", IF, "After five years of legal residence"],
    [20, "A", IF],
    [21, "A", IF, "Criminal majority at 16"],
    [24, "A", IF, "Ban the Muslim Brotherhood"],
    [25, "A", IF, "Review the hierarchy of norms"],
    [31, "A", IF],
    [35, "A", IF],
    [46, "A", IF],
    [47, "D", IF, "A school allowance usable at private schools"],
    // statements 54–61 (18 Nov 2026)
    [58, "A", DEF26, "3% to 3.5% of GDP"],
    [59, "A", DEF26, "A short compulsory national service, in barracks and uniform"],
  ]),
  REN: rows([
    [2, "A", IF, "A constitutional golden rule on balanced budgets"],
    [3, "A", IF, "Abolish the CVAE"],
    [5, "D", IF],
    [7, "D", IF, "Remove the legal age, keep contribution length"],
    [9, "A", IF, "Reform unemployment insurance to push people into work"],
    [11, "A", IF, "100,000 posts through voluntary departures"],
    [30, "A", IF],
    [31, "A", IF, "One EPR a year"],
    [36, "D", IF, "Net zero by 2050"],
    [43, "A", FDV, "Party record: 64 of 92 EPR deputies voted for"],
    // second pass
    [1, "D", ZUCV, "Party record: EPR deputies"],
    [21, "A", ATM25, "Attal's own bill: narrows the 'excuse of minority' for repeat offenders over 16"],
    [22, "A", VSAV, "Party record: Renaissance deputies"],
    [24, "A", ATI25, "A new offence of 'communautarisme'; ban the veil for under-15s in public"],
    [26, "A", UKRV, "Party record: Renaissance deputies"],
    [29, "N", ISR24, "Macron called for a halt to arms used in Gaza; Yaël Braun-Pivet opposed 'disarming Israel'"],
    [38, "N", PROP25, "Party record: Renaissance sceptical, 'not a priority'"],
    [45, "N", ATU23, "As education minister: 'not yet convinced', backed a large trial"],
    // statements 54–61 (18 Nov 2026)
    [55, "D", AID26, "Targeted, temporary aid rather than tax cuts"],
    [56, "D", ZUC25, "Party record: EPR deputies"],
    [57, "D", DUP25, "Party record: EPR deputies voted for the Duplomb law (64 for, 14 against)"],
    [60, "A", RS26, "Party record: EPR deputies"],
  ]),
  ECO: rows([
    [1, "A", IF],
    [5, "A", IF],
    [7, "A", IF, "62, then 60"],
    [8, "A", IF, "Restore the four hardship criteria"],
    [9, "D", IF],
    [13, "D", IF],
    [14, "D", IF],
    [15, "D", IF],
    [19, "D", IF, "Moratorium on new prisons"],
    [21, "D", IF],
    [22, "D", IF],
    [23, "A", IF],
    [26, "A", IF, "\"Support Ukraine\""],
    [30, "A", IF, "No trade deal that fails climate criteria"],
    [31, "D", IF, "Phase out nuclear over 20 years"],
    [37, "A", IF, "A constituent assembly"],
    [41, "A", IF],
    [43, "A", FDV, "Party record: 35 of 38 ecologist deputies voted for"],
    [47, "N", IF, "Cut public funding of private schools to 50%"],
    // second pass
    [29, "A", ISR24, "Party record: ecologist senator Akli Mellouli"],
    [38, "A", PROP25, "Regional proportional representation"],
    // statements 54–61 (18 Nov 2026)
    [56, "A", ZUC25, "Party record: Écologiste deputies"],
    [57, "A", DUP25, "Party record: Écologiste deputies voted against the Duplomb law"],
    [60, "A", RS26, "Party record: Écologiste deputies, 19 for, 7 against, 7 abstentions"],
  ]),
  REC: rows([
    [1, "D", IF],
    [3, "A", IF],
    [5, "D", IF, "Abolish inheritance duties"],
    [11, "A", IF, "Don't replace 800,000 posts"],
    [13, "A", IF, "Two million fewer immigrants"],
    [14, "A", IF],
    [15, "A", IF],
    [16, "A", IF, "Migration law by referendum"],
    [17, "A", IF],
    [18, "A", IF],
    [19, "A", IF, "100,000 places"],
    [20, "A", IF],
    [31, "A", IF],
    [32, "A", IF, "End public support for renewables"],
    [47, "D", IF],
    [48, "A", IF],
    // statements 54–61 (18 Nov 2026)
    [58, "D", DEF26, "2022 programme: €70 billion a year by 2030, about 2% of GDP"],
  ]),
  PCF: rows([
    [1, "A", IF],
    [4, "A", IF, "SMIC to €2,200 gross"],
    [5, "A", IF],
    [6, "A", IF, "Nationalise EDF, Engie and Total"],
    [11, "D", IF, "Recruit 500,000 civil servants"],
    [27, "A", IF, "\"Refuse alignment on NATO\""],
    [29, "A", IF, "Sanctions on the Israeli government"],
    [31, "A", IF],
    [43, "A", FDV, "Party record: 11 of 17 GDR deputies voted for"],
    // second pass
    [3, "D", PCF22, "2022: a new corporate tax, higher for firms that offshore or cut jobs"],
    [7, "A", PCF22, "2022: retirement at 60"],
    [10, "D", PCF22, "2022: move to a 32-hour week"],
    [22, "D", VSAV, "Party record: GDR deputies"],
    [26, "D", UKRV, "Party record: GDR deputies voted against the 2024 security accord"],
    [30, "A", MERV, "Party record: GDR deputies"],
    [39, "A", PCF22, "2022: referendums triggered by a million citizens"],
    // statements 54–61 (18 Nov 2026)
    [55, "A", PCFT25, "Party record: communist senators' bill"],
    [56, "A", ZUC25, "Party record: GDR deputies"],
    [57, "A", DUP25, "Party record: GDR deputies voted against the Duplomb law"],
    [58, "D", DEF26, "Cancel the planned €36 billion rise in defence spending"],
    [60, "N", RS26, "Party record: GDR deputies split, 6 for, 3 against, 5 abstentions"],
  ]),
  DLF: rows([
    [1, "A", IF, "On very large fortunes, excluding the main home"],
    [5, "N", IF, "Exempts business transfers only"],
    [13, "A", IF],
    [14, "A", IF, "By referendum"],
    [15, "A", IF],
    [18, "A", IF],
    [19, "A", IF, "40,000 places"],
    [20, "A", IF],
    [25, "A", IF],
    [26, "D", IF, "Seek peace and renew partnership with Russia"],
    [27, "A", IF],
    [30, "A", IF],
    [31, "A", IF],
    [32, "A", IF, "End state aid for wind"],
    [33, "A", IF],
    [45, "A", IF],
    // statements 54–61 (18 Nov 2026)
    [58, "D", DEF26, "2.5% of GDP"],
    [59, "A", DEF26, "Three months' compulsory civic service, with a one-year military option"],
  ]),
  DEB: rows([
    [8, "A", IF, "Extra quarters for exposed jobs"],
    // second pass
    [39, "A", RUF23],
    [43, "A", RUF25, "Voted for at first reading"],
  ]),
  XB: rows([
    // second pass: no 2027 programme yet; his 2021–22 platform as placeholder
    [3, "A", XB21, "2021: halve production taxes"],
    [7, "D", XB21, "2021: push the retirement age back two years"],
    [9, "A", XB21, "2021: tighter conditions for unemployment benefits"],
    [13, "A", XB21, "2021: immigration quotas"],
    [27, "A", XB21, "2021: argued for leaving NATO's integrated command"],
  ]),
};

export function positionOf(code: CandidateCode, id: number, codes: Codes = CODES): Position {
  return codes[code]?.[id]?.p ?? "-";
}

/** Log of every change after the first pass, newest first, as the Israel compass keeps one. */
export const CHANGES: { date: string; candidate: CandidateCode; statement: number; from: Position; to: Position; why: string }[] = [];
