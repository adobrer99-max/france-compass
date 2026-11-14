"""Writes review/codes-<country>.csv: every candidate or party × statement, with code,
source and note, for a native-speaker reviewer to check.
Run: python3 scripts/review-csv.py [country]   (default: fr; France also keeps review/codes.csv)"""
import csv, re, sys, pathlib

country = sys.argv[1] if len(sys.argv) > 1 else "fr"
root = pathlib.Path(__file__).resolve().parent.parent
d = root / "src/countries" / country
st = (d / "statements.ts").read_text(encoding="utf-8")
langs = re.findall(r'langs: \["(\w+)", "(\w+)"\]', (d / "config.ts").read_text(encoding="utf-8"))[0]
other = langs[1] if langs[0] == "en" else langs[0]
Q = r'"((?:[^"\\]|\\.)*)"'
stm = {int(m[0]): (m[1], m[2]) for m in re.findall(r'\[(\d+), "\w+", (?:"\w+"|null), -?1, ' + Q + ', ' + Q + r'\]', st)}
cd = (d / "codes.ts").read_text(encoding="utf-8")
srcs = {m[0]: (m[2], m[1]) for m in re.findall(r'const (\w+): S = \{ src: "([^"]+)", label: "([^"]+)"', cd)}
weak = set(re.findall(r'const (\w+): S = \{[^\n]*weak: true', cd))
for name, base in re.findall(r'const (\w+): S = \{ \.\.\.(\w+), weak: true \}', cd):
    srcs[name] = srcs[base]
    weak.add(name)
cands = re.findall(r'code: "(\w+)", name: "((?:[^"\\]|\\.)*)"', (d / "candidates.ts").read_text(encoding="utf-8"))
codes = {}
for k, body in re.findall(r'\n  (\w+): rows\(\[(.*?)\n  \]\),', cd, re.S):
    for m in re.findall(r'\[(\d+), "([AND])", (\w+)(?:, "((?:[^"\\]|\\.)*)")?\]', body):
        codes[(k, int(m[0]))] = (m[1], m[2], m[3].replace('\\"', '"'))
out = root / "review" / f"codes-{country}.csv"
rows = []
for code, name in cands:
    for i in sorted(stm):
        c = codes.get((code, i))
        lab, url = srcs.get(c[1], ("", "")) if c else ("", "")
        rows.append([name.replace("\\'", "'"), i, stm[i][0], stm[i][1].replace("\\'", "'"), c[0] if c else "-", "yes" if c and c[1] in weak else "", lab, url, c[2] if c else "", ""])
head = ["candidate or party", "statement", "statement_en", f"statement_{other}", "code", "placeholder", "source", "url", "note", "check (OK / change to / why)"]
for path in [out] + ([root / "review/codes.csv"] if country == "fr" else []):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(head); w.writerows(rows)
print(f"{country}: {len(codes)} codes, {len(rows)} rows -> {out.relative_to(root)}")
