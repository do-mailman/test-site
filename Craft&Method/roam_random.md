---
layout: post
title: Roam Random
subtitle: Roam Research のバレットをランダムに選ぶブックマークレット
date: 2026-06-07
category: craft & method
permalink: /craft/roam-random/
rss: true
description: Roam Research で画面に表示されているバレットのどれかをランダムに選び、スクロールして開くブックマークレット Roam Random の紹介。
---

Roam Research 用に作ったブックマークレットです。名前は **Roam Random** —— 今開いているページに表示されているバレットのどれかを、ランダムにひとつ選んでスクロールし、クリックして開きます。対象のブロックがひとつもなければ「ブロックが見つかりません」と表示して終わります。

積みタスクのどれから手をつけるか迷うとき、書くネタやアイデアを選ぶときなど、「悩むよりやってみる」モードへ切り替えるきっかけに使っています。ランダムで選んだら、ひとまず少しでもいいから触ってみる——それがポイントです。

### 使い方

1. 下のコードをブックマークレットとして登録する（ブックマークの URL に貼る、またはブックマークバーへドラッグ）
2. Roam Research でバレットがたくさんあるページを開く
3. ブックマークレットを実行する

## コード

ブックマークレット用（1行・そのまま登録用）:

```text
javascript:(function(){const blocks=Array.from(document.querySelectorAll('.roam-article .rm-block-main')).filter(el=>{return el.offsetParent!==null&&el.querySelector('.rm-bullet');});if(blocks.length===0){alert('ブロックが見つかりません');return;}const randomBlock=blocks[Math.floor(Math.random()*blocks.length)];const bullet=randomBlock.querySelector('.rm-bullet');if(bullet){bullet.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>bullet.click(),200);}})();
```

読みやすくしたソース:

```javascript
javascript:(function(){
  const blocks = Array.from(
    document.querySelectorAll('.roam-article .rm-block-main')
  ).filter(el => {
    return el.offsetParent !== null && el.querySelector('.rm-bullet');
  });
  if (blocks.length === 0) {
    alert('ブロックが見つかりません');
    return;
  }
  const randomBlock = blocks[Math.floor(Math.random() * blocks.length)];
  const bullet = randomBlock.querySelector('.rm-bullet');
  if (bullet) {
    bullet.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => bullet.click(), 200);
  }
})();
```

### 何をしているか

1. 表示中の Roam ページから `.rm-block-main` 要素を集める
2. 画面に表示されていて、バレット（`.rm-bullet`）を持つブロックだけに絞る
3. その中からひとつをランダムに選ぶ
4. 選んだバレットまでスムーズにスクロールし、少し待ってからクリックして開く

### メモ

- **Roam Research 専用**です（`.roam-article` の DOM 構造を前提にしています）
- 折りたたまれていて画面に見えていないブロックは対象外です
- バレットをクリックするので、子ブロックがある場合は展開されます
- Dynalist や Workflowy など、似たアウトライナーにも応用できそうですが、未検証です
