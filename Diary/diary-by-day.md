---
layout: default
title: 日付別
permalink: /diary/by-day/
---

# 日付別

月は問わず、カレンダーの「日」だけが同じ日記をまとまっています（例: 毎月14日に書いたものはすべて「14日」のページに並びます）。

{% assign days = "01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31" | split: "," %}
<ul class="diary-by-day-index">
{% for day in days %}
  <li><a href="{{ '/diary/day/' | append: day | append: '/' | relative_url }}">{{ day }}日</a></li>
{% endfor %}
</ul>

<p><a href="{{ '/diary/' | relative_url }}">Diary 一覧へ戻る</a></p>
