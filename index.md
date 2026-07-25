---
layout: default
title: ホーム
---

### 夜ふかし郵便局(仮)のトップページです

<p class="site-search-more"><a href="{{ '/search/' | relative_url }}">検索ページを開く</a></p>

#### カテゴリ一覧
- [日記](diary/)
    - [連用日記（毎月版）](diary/by-day/)
- [日記の研究](diary-research/)
- [考えたこと](thought/)
- [Craft & Method](craft/)
- [本・マンガ・映画の棚(仮)](shelf/)
- [ログハピ！アーカイブ](loghapi-archive/)
- [ほんぽっぷアーカイブ]({{ '/honpop/' | relative_url }})

<p class="random-article-home"><a href="#" id="random-article-trigger">ランダムに記事を読む</a></p>

#### 更新情報

<ul class="recent-posts">
{% assign recent_diary = site.pages | where_exp: "p", "p.date" | where: "category", "diary" %}
{% assign recent_research = site.pages | where_exp: "p", "p.date" | where: "category", "diary-research" %}
{% assign recent_thought = site.pages | where_exp: "p", "p.date" | where: "category", "thought" %}
{% assign recent_shelf = site.pages | where_exp: "p", "p.date" | where: "category", "shelf" %}
{% assign recent_craft = site.pages | where_exp: "p", "p.date" | where: "category", "craft & method" %}
{% assign recent_pages = recent_diary | concat: recent_research | concat: recent_thought | concat: recent_shelf | concat: recent_craft | sort: "date" | reverse %}
{% for p in recent_pages limit: 5 %}
<li><a href="{{ p.url | relative_url }}">{{ p.title | xml_escape }}</a>{% if p.date %} — {{ p.date | date: "%Y-%m-%d" }}{% endif %}</li>
{% endfor %}
</ul>

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

