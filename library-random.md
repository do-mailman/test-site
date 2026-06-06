---
layout: default
title: 図書分類くじ
permalink: /library/random/
ndc_random_page: true
description: 日本十進分類法（NDC第9版）の分類から1つランダムに選び、図書館で読む本を迷ったときの棚のヒントにするページ。
---

# 図書分類くじ

下のボタンを押すと**日本十進分類法（NDC）** の「類」（3桁の分類）の中から1つランダムで表示します。図書館で何を読もうか迷ったとき、本屋でいつもとはちがう本を読みたくなったときなどにお使いください。

<p class="ndc-random-actions">
  <button type="button" class="ndc-random-button" id="ndc-random-trigger">ランダムに引く</button>
</p>

<p class="ndc-random-placeholder" id="ndc-random-placeholder">ボタンを押すと、ここに分類が表示されます。</p>

<div class="ndc-random-result" id="ndc-random-result" hidden>
  <p class="ndc-random-heading">今日の分類</p>
  <p class="ndc-random-notation"><span class="ndc-random-notation-label">分類記号</span> <strong id="ndc-random-notation"></strong></p>
  <p class="ndc-random-label" id="ndc-random-label"></p>
  <p class="ndc-random-path-label">分類の位置</p>
  <p class="ndc-random-path" id="ndc-random-path"></p>
  <p class="ndc-random-again-wrap">
    <button type="button" class="ndc-random-button ndc-random-button--secondary" id="ndc-random-again">もう一度引く</button>
  </p>
</div>

<p class="ndc-random-note">分類データは <a href="https://ndc.dev/" rel="noopener noreferrer" target="_blank">NDC for Developers</a>（日本十進分類法 第9版）に基づきます。お住いの図書館の版・棚配置と異なる場合があります。</p>

<p class="ndc-random-back"><a href="{{ '/shelf/' | relative_url }}">本・マンガ・映画の棚(仮)へ</a></p>
