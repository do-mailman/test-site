---
layout: default
title: 日記の研究
permalink: /diary-research/
---

# 日記の研究

{% assign research_pages = site.pages | where: "category", "diary-research" | sort: "date" | reverse %}
{% for p in research_pages %}
- [{{ p.title }}]({{ p.url | relative_url }}){% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}
