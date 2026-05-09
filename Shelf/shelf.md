---
layout: default
title: 本・マンガ・映画の棚(仮)
permalink: /shelf/
---

# 本・マンガ・映画の棚(仮)

{% assign shelf_pages = site.pages | where_exp: "p", "p.path contains 'Shelf'" | reject: "url", "/shelf/" | sort: "title" %}
{% for p in shelf_pages %}
- [{{ p.title }}]({{ p.url | relative_url }})
{% endfor %}
