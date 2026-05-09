---
layout: default
title: ホーム
---

### 夜ふかし郵便局(仮)のトップページです

#### カテゴリ一覧
- [日記](diary/)
    - [連用日記（毎月版）](diary/by-day/)
- [ログハピ！アーカイブ](loghapi-archive/)
- [本・マンガ・映画の棚(仮)](shelf/)

#### 最新記事

<ul class="recent-posts">
{% assign recent_pages = site.pages | where_exp: "p", "p.date" | sort: "date" | reverse %}
{% for p in recent_pages limit: 5 %}
<li><a href="{{ p.url | relative_url }}">{{ p.title | xml_escape }}</a>{% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}</li>
{% endfor %}
</ul>

[日記の一覧を見る]({{ "/diary/" | relative_url }})
