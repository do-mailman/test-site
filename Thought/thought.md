---
layout: default
title: 考えたこと
permalink: /thought/
---

# 考えたこと

{% assign thought_pages = site.pages | where: "category", "thought" | sort: "date" | reverse %}
{% for p in thought_pages %}
- [{{ p.title }}]({{ p.url | relative_url }}){% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}
