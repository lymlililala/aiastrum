#!/usr/bin/env python3
"""enrich-openpagerank.py
批量查询所有外链渠道域名的 OpenPageRank 权重（新 API：openpagerank.keywordseverywhere.com）。
输入：gsc/0719/backlink-prospects-0719.md + competitor-backlinks-serper-0719.json
输出：gsc/0719/openpagerank-0719.json（缓存，重跑不重复扣额度）
"""
import json
import re
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GSC = ROOT / "gsc" / "0719"
MD = GSC / "backlink-prospects-0719.md"
SERPER = GSC / "competitor-backlinks-serper-0719.json"
CACHE = GSC / "openpagerank-0719.json"

API = "https://openpagerank.keywordseverywhere.com/v1/domains/bulk"
KEY = None
for line in (ROOT / ".env").read_text(encoding="utf8").splitlines():
    if line.startswith("OPENPAGERANK_API_KEY="):
        KEY = line.split("=", 1)[1].strip()
assert KEY, "OPENPAGERANK_API_KEY not found in .env"

CN_SLD = {"com", "edu", "gov", "net", "org", "ac"}


def registered_domain(url_or_host):
    host = re.sub(r"^https?://", "", url_or_host.strip()).split("/")[0].split(":")[0].lower()
    host = host.removeprefix("www.")
    parts = host.split(".")
    if len(parts) < 2 or not parts[-1]:
        return None
    if parts[-1] == "cn" and len(parts) >= 3 and parts[-2] in CN_SLD:
        return ".".join(parts[-3:])
    return ".".join(parts[-2:])


def collect_domains() -> set[str]:
    domains = {"aiastrum.com"}
    text = MD.read_text(encoding="utf8")
    for url in re.findall(r"https?://[^\s)\]|\"']+", text):
        d = registered_domain(url)
        if d:
            domains.add(d)
    data = json.loads(SERPER.read_text(encoding="utf8"))
    for comp in data["competitors"]:
        domains.add(comp)
    for r in data["refDomains"]:
        domains.add(r["refDomain"])
    return domains


def query_batch(batch: list[str]) -> dict:
    req = urllib.request.Request(
        API,
        data=json.dumps({"domains": batch, "include_history": False}).encode(),
        headers={"Authorization": f"Bearer {KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def main():
    cache = json.loads(CACHE.read_text(encoding="utf8")) if CACHE.exists() else {}
    todo = sorted(d for d in collect_domains() if d not in cache)
    print(f"cached {len(cache)}, to query {len(todo)}")

    for i in range(0, len(todo), 100):
        batch = todo[i : i + 100]
        try:
            data = query_batch(batch)
        except Exception as e:
            print(f"batch {i // 100 + 1} failed: {e}")
            time.sleep(2)
            continue
        for r in data.get("results", []):
            cache[r["domain"]] = {
                "opr": r.get("open_page_rank"),
                "rank": r.get("rank"),
                "ref_domains": r.get("referring_domains"),
                "found": r.get("found", False),
            }
        print(f"batch {i // 100 + 1}: +{len(data.get('results', []))}")
        time.sleep(1.2)  # 60 req/min 限速内

    CACHE.write_text(json.dumps(cache, indent=1, ensure_ascii=False), encoding="utf8")
    found = sum(1 for v in cache.values() if v.get("found"))
    print(f"saved {len(cache)} domains ({found} found) -> {CACHE}")


if __name__ == "__main__":
    main()
