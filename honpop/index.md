---
layout: default
title: ほんぽっぷアーカイブ
permalink: /honpop/
---

# ほんぽっぷアーカイブ

過去ブログ「ほんぽっぷ」の記事一覧です（夜ふかし郵便局に移管）。

{% assign posts = site.pages | where: "archive", "honpop" | sort: "date" | reverse %}
{% assign count = 0 %}
{% for post in posts %}
{% if post.url != '/honpop/' and post.date %}
- {{ post.date | date: "%Y-%m-%d" }}: [{{ post.title }}]({{ post.url | relative_url }})
{% assign count = count | plus: 1 %}
{% endif %}
{% endfor %}
{% if count == 0 %}
- 記事が見つかりませんでした。
{% endif %}
