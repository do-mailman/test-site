#!/usr/bin/env python3
"""Build NDC Section pool for the library random page (Phase 1)."""
from __future__ import annotations

import json
import sys
import urllib.request
from pathlib import Path

NDC9_JSON_URL = "https://api-4pccg7v5ma-an.a.run.app/ndc9.json"
SITE_ROOT = Path(__file__).resolve().parents[1]
OUTPUT = SITE_ROOT / "_data" / "ndc9_sections.json"
PATH_TYPES = frozenset({"Main", "Division", "Section"})


def fetch_ndc9() -> dict:
    print(f"Fetching {NDC9_JSON_URL} ...")
    with urllib.request.urlopen(NDC9_JSON_URL, timeout=120) as resp:
        return json.load(resp)


def breadcrumb(data: dict, notation: str) -> str:
    labels: list[str] = []
    current = notation
    seen: set[str] = set()
    while current and current in data and current not in seen:
        seen.add(current)
        item = data[current]
        if item.get("type") in PATH_TYPES:
            label = item.get("prefLabel@ja") or item.get("label@ja")
            if label:
                labels.append(label)
        current = item.get("broader") or ""
    labels.reverse()
    deduped: list[str] = []
    for label in labels:
        if not deduped or deduped[-1] != label:
            deduped.append(label)
    return " › ".join(deduped)


def build_pool(data: dict) -> list[dict]:
    pool: list[dict] = []
    for item in data.values():
        if item.get("type") != "Section":
            continue
        notation = item.get("notation")
        label = item.get("prefLabel@ja")
        if not notation or not label:
            continue
        pool.append(
            {
                "notation": notation,
                "label": label,
                "path": breadcrumb(data, notation),
            }
        )
    pool.sort(key=lambda entry: entry["notation"])
    return pool


def main() -> int:
    data = fetch_ndc9()
    pool = build_pool(data)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(pool, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(pool)} sections to {OUTPUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
