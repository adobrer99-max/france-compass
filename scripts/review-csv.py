"""Writes review/codes.csv: every candidate × statement, with code, source and note,
for the colleague in France to check. Run: python3 scripts/review-csv.py"""
import csv, re, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
st = (root / "src/data/statements.ts").read_text(encoding="utf-8")
stm = {int(m[0]): (m[1], m[2]) for m in re.findall(r'\[(\d+), "\w+", (?:"\w+"|null), -?1, "((?:[^"\\]|\\.)*)", "((?:[^"\\]|\\.)*)"\]', st)}
cd = (root / "src/data/codes.ts").read_text(encoding="utf-8")
srcs = {m[0]: (m[2], m[1]) for m in re.findall(r'const (\w+): S = \{ src: "([^"]+)", label: "([^"]+)"', cd)}
cands = re.findall(r'code: "(\w+)", name: "([^"]+)"', (root / "src/data/candidates.ts").read_text(encoding="utf-8"))
codes = {}
for k, body in re.findall(r'\n  (\w+): rows\(\[(.*?)\n  \]\),', cd, re.S):
    for m in re.findall(r'\[(\d+), "([AND])", (\w+)(?:, "((?:[^"\\]|\\.)*)")?\]', body):
        codes[(k, int(m[0]))] = (m[1], m[2], m[3].replace('\\"', '"'))
with open(root / "review/codes.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["candidate", "statement", "statement_en", "statement_fr", "code", "source", "url", "note", "check (OK / change to / why)"])
    for code, name in cands:
        for i in sorted(stm):
            c = codes.get((code, i))
            lab, url = srcs.get(c[1], ("", "")) if c else ("", "")
            w.writerow([name, i, stm[i][0], stm[i][1], c[0] if c else "-", lab, url, c[2] if c else "", ""])
print(f"{len(codes)} codes, {len(cands) * len(stm)} rows")
