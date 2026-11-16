/* North Rhine-Westphalia's own text. Shared interface strings live in src/i18n.ts.
   The German is a first draft for a native speaker to check. */

const en = {
  eyebrow: "NRW 2027",
  title: "NRW Chooses",
  subtitle: "A compass for the 2027 North Rhine-Westphalia state election",
  introLead: "Answer 24 statements on the issues that divide the parties in Düsseldorf, say which topics matter most to you, and see which parties you're closest to.",
  introDates: "The Landtag election is on Sunday 25 April 2027.",
  betaBanner: "Beta: no party has published its 2027 programme yet. Positions come from the 2022 programmes, votes and statements since, each with its source; most are placeholders, marked as such.",
  candidatesNote: "The parties in the Landtag, plus the BSW. Lead candidates are shown where chosen; otherwise the state party chairs.",
  chartExplain: "Left to right on the economy (seven statements on Kita fees, housing, tax, tickets and debt), and open to closed on migration and society (five on asylum, deportations, religious education and gender-neutral language).",
  methodBody: [
    "There are 24 statements in seven topics, each on something the state decides: schools and Kita, the police, energy, housing and transport, the state budget and towns, migration, and democracy.",
    "For each statement you pick a side. A party that has taken the same side scores 2 points, a party that is neutral or split scores 1, and a party on the other side scores 0. Your match is the points scored out of the points possible, counting only statements the party has a position on, with your topic weights applied.",
    "Positions come from the parties' 2027 programmes once they are out, then their statements and votes in the Landtag, then their 2022 programmes. Each code links to its source; codes from older programmes or from a party's record in government are placeholders, drawn with a dashed outline. The Wahl-O-Mat's answers are never used.",
    "A party appears in the ranking once a quarter of the statements have a position. The chart uses the same codes, so a party with few positions sits near the middle.",
  ],
  cardSub: "Landtag election, 25 April 2027",
  cardCaveat: "Beta: a match measures agreement on 24 policy statements only, not record, competence or who will win. Party positions are a first, provisional pass, each with its source on the site.",
  shareText: "My result on NRW Chooses, a bilingual compass for the 2027 NRW state election:",
  pollsFrom: (label: string) => `Poll: ${label}.`,
};

export type CountryStrings = typeof en;

const de: CountryStrings = {
  eyebrow: "Landtagswahl 2027",
  title: "NRW wählt",
  subtitle: "Ein Kompass zur Landtagswahl 2027 in Nordrhein-Westfalen",
  introLead: "Beantworte 24 Thesen zu den Fragen, über die die Parteien in Düsseldorf streiten, sag, welche Themen dir am wichtigsten sind, und sieh, welchen Parteien du am nächsten bist.",
  introDates: "Die Landtagswahl ist am Sonntag, 25. April 2027.",
  betaBanner: "Beta: Noch keine Partei hat ihr Programm für 2027 veröffentlicht. Die Positionen stammen aus den Programmen von 2022 sowie aus Abstimmungen und Aussagen seitdem, jeweils mit Quelle; die meisten sind vorläufig und als solche gekennzeichnet.",
  candidatesNote: "Die Parteien im Landtag und das BSW. Gezeigt werden die Spitzenkandidaten, wo sie feststehen, sonst die Landesvorsitzenden.",
  chartExplain: "Von links nach rechts in der Wirtschaft (sieben Thesen zu Kita-Beiträgen, Wohnen, Steuern, Tickets und Schulden) und von offen nach geschlossen bei Migration und Gesellschaft (fünf zu Asyl, Abschiebungen, Religionsunterricht und Gendersprache).",
  methodBody: [
    "Es gibt 24 Thesen in sieben Themen, jede zu etwas, über das das Land entscheidet: Schule und Kita, Polizei, Energie, Wohnen und Verkehr, Landeshaushalt und Kommunen, Migration sowie Demokratie.",
    "Zu jeder These wählst du eine Seite. Eine Partei auf derselben Seite bekommt 2 Punkte, eine neutrale oder gespaltene 1 Punkt, eine auf der anderen Seite 0. Deine Übereinstimmung ist der Anteil der erreichten an den möglichen Punkten, nur für Thesen, zu denen die Partei eine Position hat, gewichtet nach deinen Themen.",
    "Die Positionen stammen aus den Wahlprogrammen 2027, sobald es sie gibt, dann aus Aussagen und Abstimmungen im Landtag, dann aus den Programmen von 2022. Jede Einordnung verlinkt ihre Quelle; Einordnungen aus älteren Programmen oder aus der Regierungsarbeit einer Partei sind vorläufig und gestrichelt umrandet. Antworten aus dem Wahl-O-Mat werden nie verwendet.",
    "Eine Partei erscheint in der Rangfolge, sobald zu einem Viertel der Thesen eine Position vorliegt. Die Grafik nutzt dieselben Einordnungen; eine Partei mit wenigen Positionen steht deshalb nahe der Mitte.",
  ],
  cardSub: "Landtagswahl, 25. April 2027",
  cardCaveat: "Beta: Die Übereinstimmung misst nur die Zustimmung zu 24 Thesen, nicht Bilanz, Kompetenz oder Wahlchancen. Die Parteipositionen sind ein erster, vorläufiger Stand, jede mit Quelle auf der Seite.",
  shareText: "Mein Ergebnis bei NRW wählt, einem zweisprachigen Kompass zur Landtagswahl 2027:",
  pollsFrom: (label) => `Umfrage: ${label}.`,
};

export const COUNTRY_STRINGS = { en, de };
