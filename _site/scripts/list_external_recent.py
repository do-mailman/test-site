#!/usr/bin/env python3
"""List latest note / Substack posts (for updating _data YAML)."""
from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]


def parse_frontmatter(text: str) -> dict[str, str]:
    m = re.match(r"^---\r?\n(.*?)\r?\n---", text, re.DOTALL)
    if not m:
        return {}
    data: dict[str, str] = {}
    for line in m.group(1).splitlines():
        if ":" not in line:
            continue
        key, _, val = line.partition(":")
        val = val.strip().strip('"').strip("'")
        data[key.strip()] = val
    return data


def parse_date(raw: str) -> datetime | None:
    raw = raw.strip().strip('"')
    for fmt in (
        "%Y-%m-%dT%H:%M:%S.%fZ",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d",
    ):
        try:
            return datetime.strptime(raw[:26].replace("Z", ""), fmt.replace("Z", ""))
        except ValueError:
            continue
    try:
        return datetime.fromisoformat(raw.replace("Z", "+00:00"))
    except ValueError:
        return None


def collect(glob_dir: Path, pattern: str) -> list[dict]:
    posts = []
    for path in sorted(glob_dir.glob(pattern)):
        fm = parse_frontmatter(path.read_text(encoding="utf-8"))
        title = fm.get("title")
        url = fm.get("url")
        date_raw = fm.get("date") or fm.get("modified")
        if not (title and url and date_raw):
            continue
        dt = parse_date(date_raw)
        if not dt:
            continue
        posts.append(
            {
                "title": title,
                "date": dt.strftime("%Y-%m-%d"),
                "url": url,
                "sort": dt,
                "file": path.name,
            }
        )
    posts.sort(key=lambda p: p["sort"], reverse=True)
    return posts


def main() -> None:
    substack = collect(ROOT / "Substack", "*.md")
    note = collect(ROOT / "note-export" / "published", "*.md")
    print("=== Substack (top 5) ===")
    for p in substack[:5]:
        print(f"{p['date']} | {p['title'][:60]}")
        print(f"  {p['url']}")
    print("\n=== note (top 5) ===")
    for p in note[:5]:
        print(f"{p['date']} | {p['title'][:60]}")
        print(f"  {p['url']}")


if __name__ == "__main__":
    main()
