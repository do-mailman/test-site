---
layout: default
title: ホーム
---

### 夜ふかし郵便局(仮)のトップページです

#### カテゴリ一覧
- [日記](diary/)
    - [連用日記（毎月版）](diary/by-day/)
- [考えたこと](thought/)
- [本・マンガ・映画の棚(仮)](shelf/)
- [ログハピ！アーカイブ](loghapi-archive/)

#### 更新情報

<ul class="recent-posts">
{% assign recent_diary = site.pages | where_exp: "p", "p.date" | where: "category", "diary" %}
{% assign recent_thought = site.pages | where_exp: "p", "p.date" | where: "category", "thought" %}
{% assign recent_shelf = site.pages | where_exp: "p", "p.date" | where: "category", "shelf" %}
{% assign recent_pages = recent_diary | concat: recent_thought | concat: recent_shelf | sort: "date" | reverse %}
{% for p in recent_pages limit: 5 %}
<li><a href="{{ p.url | relative_url }}">{{ p.title | xml_escape }}</a>{% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}</li>
{% endfor %}
</ul>

[日記の一覧を見る]({{ "/diary/" | relative_url }})

<p class="random-article-home"><a href="#" id="random-article-trigger">ランダムに記事を読む</a></p>

#### Substack の更新：[独学同好会通信（Substack）](https://diarist.substack.com)

<ul class="recent-posts recent-posts--external">
{% for item in site.data.recent_substack limit: 5 %}
<li><a href="{{ item.url }}" rel="noopener noreferrer" target="_blank">{{ item.title | xml_escape }}</a> — {{ item.date }}（外部リンク：Substack）</li>
{% endfor %}
</ul>

#### note の更新：[ゆうびんやの note](https://note.com/mailman)

<ul class="recent-posts recent-posts--external">
{% for item in site.data.recent_note limit: 5 %}
<li><a href="{{ item.url }}" rel="noopener noreferrer" target="_blank">{{ item.title | xml_escape }}</a> — {{ item.date }}（外部リンク：note）</li>
{% endfor %}
</ul>

