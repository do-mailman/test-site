---
layout: default
title: 本・マンガ・映画の棚(仮)
permalink: /shelf/
---

# 本・マンガ・映画の棚(仮)

<p class="ndc-random-link"><a href="{{ '/library/random/' | relative_url }}">図書館ランダム分類（NDC）</a></p>

{% assign shelf_pages = site.pages | where: "category", "shelf" | sort: "title" %}
{% for p in shelf_pages %}
- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
