---
layout: default
title: Craft & Method
permalink: /craft/
---

# Craft & Method

{% assign craft_pages = site.pages | where: "category", "craft & method" | sort: "date" | reverse %}
{% for p in craft_pages %}
- [{{ p.title }}]({{ p.url | relative_url }}){% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}
{% endfor %}
