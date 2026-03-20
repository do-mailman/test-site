---
layout: default
title: Diary
permalink: /diary/
---

# Diary

{% assign diary_pages = site.pages | where: "category", "diary" | sort: "date" | reverse %}
{% for p in diary_pages %}
- [{{ p.title }}]({{ p.url | relative_url }}){% if p.date %} - {{ p.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}
