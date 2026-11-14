# France Chooses / La France choisit

A bilingual (English and French) compass for the 2027 French presidential election.
First round 18 April 2027, runoff 2 May.

53 statements in nine topics, a topic-weighting step, a ranked match with every candidate,
a two-axis chart (economic left–right, open–closed), a runoff matchup, Compare two candidates,
and a method page with every code and its dated source.

Forked from the Israel 2026 compass (adobrer99-max/israquiz): same scoring rules (direction-only
agreement points, topic weights, a 70% coverage floor), rebuilt lean for a candidate field and
two languages.

```bash
npm install
npm run dev        # http://localhost:5173  (?lang=fr for French)
npm test           # statement bank + scoring
npm run build      # static site into dist/

COUNTRY=fr npm run build   # one build per country; fr is the default
```

The app is built to run for any country. Everything French lives in `src/countries/fr/`;
the scoring, chart, panels and share card are shared. See
[`src/countries/README.md`](src/countries/README.md) for adding one.

## Where things live

| File | What's in it |
| --- | --- |
| `src/countries/fr/statements.ts` | The 53 statements, English and French, their topic and axis |
| `src/countries/fr/candidates.ts` | The field, parties, colours, latest poll; the default runoff pair |
| `src/countries/fr/codes.ts` | Every candidate's position on every statement, each with a dated source; the change log |
| `src/countries/fr/strings.ts` | France's own text: title, dates, beta note, method, firewall and history panels |
| `src/countries/fr/context.ts`, `Context.tsx` | Firewall and past-election data and panels |
| `src/i18n.ts` | Interface strings shared by every country, per language |
| `src/lib/scoring.ts` | Matching, axes, splits |

## Addresses

`?lang=fr`, `?candidate=RN`, `?statement=12`, `?compare=RN,HOR`, `?method`, plus France's `?firewall` and `?history`.

## Coding rules

Agree, disagree, neutral or mixed, or no position on record (left out of the match). Sources in order
of weight: the 2027 programme, statements since declaring, the 2024 legislative platform, Assembly votes,
then Le Monde and Institut Montaigne as cross-checks. Never fill a gap from party family. Codes stay
provisional until the campaign has had a week to reply and a colleague in France has checked them.
