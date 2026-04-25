---
layout: default
title: Diary
permalink: /diary/
---

# Diary

毎月の同じ日付の日記を並べているページはこちら → [日付別一覧]({{ "/diary/by-day/" | relative_url }})

---

{% assign diary_pages = site.pages | where: "category", "diary" | sort: "date" | reverse %}
{% for p in diary_pages %}
- [{{ p.title }}]({{ p.url | relative_url }}){% if p.date %} - {{ p.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}
