# Countries

Live: `fr` (France Chooses, 2027 presidential), `it` (Italy Chooses, 2027 general election).
In progress, not yet on the site: `nw` (NRW wählt, North Rhine-Westphalia state election, 25 April 2027).

One compass engine, one folder per country. A build serves one country:

```bash
COUNTRY=de npm run dev
COUNTRY=de npm test        # runs the country contract (contract.test.ts) plus the shared tests
COUNTRY=de npm run build   # → dist/
```

`@country/…` imports resolve to `src/countries/$COUNTRY/` (vite.config.ts). Each country has a
`tsconfig.<id>.json` that points `@country/*` at its folder and includes only that country, and
`COUNTRY=<id> npm run typecheck` uses it. Tests in the country's folder run only for that country.

## What a country folder holds

| File | Exports | Notes |
| --- | --- | --- |
| `config.ts` | `COUNTRY` | id, storage prefix (never change once live), languages, default language, site URL, share-card file names. Plain data, no imports. |
| `strings.ts` | `COUNTRY_STRINGS`, `CountryStrings` | title, subtitle, eyebrow, intro, dates, beta note, candidate note, chart explainer, method text, share-card lines, plus any keys its own panels use. Same keys in every language. |
| `statements.ts` | `STATEMENTS`, `AREAS`, `AREA`, `AXES`, `BY_ID`, types | Statement text in each language, a topic, a sign, and an axis (`econ` or `open`) or none. Both axes need statements. |
| `candidates.ts` | `CANDIDATES`, `BY_CODE`, `ACTIVE`, `LIKELY_RUNOFF`, `POLL_SOURCE`, `initials`, `CandidateCode` | For a parliamentary election the "candidates" are parties; `LIKELY_RUNOFF` becomes the pairing shown in the head-to-head card. |
| `codes.ts` | `CODES`, `CHANGES`, `positionOf`, `Position`, `Code`, `Codes` | Every position with an https source and a date. Placeholders carry `weak: true`. |
| `panels.tsx` | `PANELS` | Extra panels only this country has (France: firewall, past elections), each at `?<id>`, and an optional note under the runoff card. Can be empty. |
| `meta.json` | | `lang`, `title`, `description` for the page head. |

`config.ts` also sets `subject` ("candidate" or "party", which switches the interface wording)
and `headToHead` (whether the runoff card shows). `panels.tsx` can add `ResultsExtra`, a card
on the results page (Italy: the alliance tool). Strings every country must provide: `title`,
`subtitle`, `eyebrow`, `introLead`, `introDates`, `betaBanner`, `candidatesNote`, `chartExplain`,
`methodBody`, `cardSub`, `cardCaveat`, `shareText`, `pollsFrom`.

## Adding a country

1. Copy `fr/` to the new id (`de/`, `it/`…) and replace the data. Start from the
   statements: about 50, in the topics that actually divide that election.
2. Set the languages in `config.ts`. English plus the national language is the default.
   A language the shared interface doesn't have yet needs a block in `src/i18n.ts`.
3. Code positions with the same rules: the current programme first, then statements,
   votes, older platforms (as `weak` placeholders). Never fill a gap from party family.
4. `COUNTRY=<id> npm test` must pass, including the contract.
5. Add `tsconfig.<id>.json` and the id to the CI matrix in `.github/workflows/ci.yml`.

The scoring (direction-only agreement points, topic weights, the coverage floor) and the
two-axis chart are shared and stay the same everywhere, so results are comparable across
countries.
