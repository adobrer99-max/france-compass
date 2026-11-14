# Review sheets

One CSV per country, for a native speaker to check, in any spreadsheet app:

- `codes-fr.csv`: France, every candidate × statement (`codes.csv` is the same file, kept for older links)
- `codes-it.csv`: Italy, every party × statement

Each row has the statement in English and the national language, the code (A agree, D disagree,
N neutral or mixed, - no position), whether it is a placeholder, the source and a note. Fill in the
last column: OK, or what it should be and why.

The interface text to copy-check lives in two files per country:
`src/countries/<id>/strings.ts` (the country's own text) and the matching language block in
`src/i18n.ts` (buttons, labels and messages every country shares).

Regenerate after editing codes: `python3 scripts/review-csv.py fr` or `python3 scripts/review-csv.py it`.
