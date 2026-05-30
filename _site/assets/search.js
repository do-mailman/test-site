(function () {
  var INDEX_URL = "/search.json";
  var SNIPPET_LENGTH = 120;

  var root = document.getElementById("site-search");
  if (!root) return;

  var input = document.getElementById("site-search-input");
  var resultsEl = document.getElementById("site-search-results");
  var statusEl = document.getElementById("site-search-status");
  var resultsLimit = parseInt(root.getAttribute("data-results-limit") || "20", 10);
  var docs = [];
  var indexReady = false;
  var indexError = false;

  function normalize(text) {
    return (text || "").toLowerCase();
  }

  function readInitialQuery() {
    var params = new URLSearchParams(window.location.search);
    return params.get("q") || "";
  }

  function setStatus(message) {
    if (!statusEl) return;
    if (!message) {
      statusEl.hidden = true;
      statusEl.textContent = "";
      return;
    }
    statusEl.hidden = false;
    statusEl.textContent = message;
  }

  function makeSnippet(content, query) {
    if (!content) return "";
    var lowerContent = content.toLowerCase();
    var lowerQuery = query.toLowerCase();
    var index = lowerContent.indexOf(lowerQuery);
    if (index === -1) {
      return content.slice(0, SNIPPET_LENGTH) + (content.length > SNIPPET_LENGTH ? "…" : "");
    }
    var start = Math.max(0, index - 40);
    var end = Math.min(content.length, index + query.length + 80);
    var snippet = content.slice(start, end);
    if (start > 0) snippet = "…" + snippet;
    if (end < content.length) snippet = snippet + "…";
    return snippet;
  }

  function scoreDoc(doc, query) {
    var q = normalize(query);
    var title = normalize(doc.title);
    var content = normalize(doc.content);
    var category = normalize(doc.category);
    var score = 0;

    if (title === q) score += 100;
    if (title.indexOf(q) !== -1) score += 40;
    if (category.indexOf(q) !== -1) score += 10;
    if (content.indexOf(q) !== -1) score += 5;

    var titlePos = title.indexOf(q);
    if (titlePos !== -1) score += Math.max(0, 20 - titlePos);

    var contentPos = content.indexOf(q);
    if (contentPos !== -1) score += Math.max(0, 10 - Math.floor(contentPos / 100));

    return score;
  }

  function searchDocs(query) {
    var q = query.trim();
    if (!q) return [];

    return docs
      .map(function (doc) {
        return { doc: doc, score: scoreDoc(doc, q) };
      })
      .filter(function (item) {
        return item.score > 0;
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return (b.doc.date || "").localeCompare(a.doc.date || "");
      })
      .slice(0, resultsLimit)
      .map(function (item) {
        return item.doc;
      });
  }

  function renderResults(query) {
    resultsEl.innerHTML = "";

    if (!query.trim()) {
      setStatus("");
      return;
    }

    if (!indexReady) {
      setStatus(indexError ? "検索データの読み込みに失敗しました。" : "検索データを読み込み中…");
      return;
    }

    var hits = searchDocs(query);
    if (!hits.length) {
      setStatus("「" + query + "」に一致するページは見つかりませんでした。");
      return;
    }

    setStatus(hits.length + " 件見つかりました。");

    hits.forEach(function (doc) {
      var item = document.createElement("li");
      item.className = "site-search-result";

      var link = document.createElement("a");
      link.className = "site-search-result-link";
      link.href = doc.url;
      link.textContent = doc.title;

      var meta = document.createElement("span");
      meta.className = "site-search-result-meta";
      meta.textContent = doc.category + (doc.date ? " — " + doc.date : "");

      var snippet = document.createElement("p");
      snippet.className = "site-search-result-snippet";
      snippet.textContent = makeSnippet(doc.content, query);

      item.appendChild(link);
      item.appendChild(meta);
      item.appendChild(snippet);
      resultsEl.appendChild(item);
    });
  }

  function syncQueryToUrl(query) {
    var url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }
    window.history.replaceState(null, "", url.toString());
  }

  function loadIndex() {
    var indexPath = INDEX_URL;
    try {
      indexPath = new URL(INDEX_URL, window.location.origin).pathname;
    } catch (e) {
      /* use INDEX_URL */
    }

    return fetch(indexPath)
      .then(function (response) {
        if (!response.ok) throw new Error("index fetch failed");
        return response.json();
      })
      .then(function (data) {
        docs = Array.isArray(data) ? data : [];
        indexReady = true;
      })
      .catch(function () {
        indexError = true;
      });
  }

  var debounceTimer;
  input.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    var query = input.value;
    debounceTimer = setTimeout(function () {
      syncQueryToUrl(query);
      renderResults(query);
    }, 150);
  });

  document.addEventListener("DOMContentLoaded", function () {
    loadIndex().then(function () {
      var initial = readInitialQuery();
      if (initial) {
        input.value = initial;
      }
      renderResults(input.value);
      if (input.value) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    });
  });
})();
