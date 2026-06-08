---
layout: post
title: ブックマークレット Random Rain
subtitle: ページ内のリンクをランダムに開くブックマークレット
date: 2026-06-07
category: craft & method
permalink: /craft/random-rain/
rss: true
description: 今見ているページの http リンクのどれかをランダムに新しいタブで開くブックマークレット Random Rain の紹介。
---

初めて自分用に作ったブックマークレットです。今開いているページに散らばったリンクのどれかを、ランダムにひとつ拾って開きます。リンクがひとつもなければ「リンクが見つかりません」と表示して終わります。名前は「**Random Rain**」です。

### 使い方

1. 下のコードをブックマークレットとして登録する（ブックマークの URL に貼る、またはブックマークバーへドラッグ）
2. リンクがたくさんあるページを開く
3. ブックマークレットを実行する

保存記事一覧、まとめサイト、ニュースサイトなど、「どれを読もうか迷う」ときに向いています。

## コード

ブックマークレット用（1行・そのまま登録用）:

```text
javascript:(function(){const links=Array.from(document.querySelectorAll('a')).map(a=>a.href).filter(h=>h&&h.startsWith('http'));if(links.length===0){alert('リンクが見つかりません');return;}const url=links[Math.floor(Math.random()*links.length)];window.open(url,'_blank');})();
```

読みやすくしたソース:

```javascript
javascript:(function(){
  const links = Array.from(document.querySelectorAll('a'))
    .map(a => a.href)
    .filter(h => h && h.startsWith('http'));
  if (links.length === 0) {
    alert('リンクが見つかりません');
    return;
  }
  const url = links[Math.floor(Math.random() * links.length)];
  window.open(url, '_blank');
})();
```

### 何をしているか

1. 表示中のページから `<a>` 要素を集める
2. `http` で始まる URL だけに絞る
3. その中からひとつをランダムに選び、新しいタブで開く

### メモ

- 同一ページ内のリンクだけが対象です（別ドメインへの外部リンクも含みます）
- `javascript:` や `mailto:` などは `http` で始まらないため除外されます
