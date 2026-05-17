(function () {
  var POOL_ID = "random-article-pool";
  var FLOW_KEY = "randomArticleFlow";

  function readPool() {
    var el = document.getElementById(POOL_ID);
    if (!el) return [];
    try {
      var list = JSON.parse(el.textContent);
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function currentPath() {
    return window.location.pathname.replace(/\/$/, "") || "/";
  }

  function normalizePath(url) {
    var path = url;
    try {
      path = new URL(url, window.location.origin).pathname;
    } catch (e) {
      /* use url as path */
    }
    return path.replace(/\/$/, "") || "/";
  }

  function pickRandom(pool) {
    if (!pool.length) return null;
    var here = currentPath();
    var candidates = pool.length > 1 ? pool.filter(function (u) {
      return normalizePath(u) !== here;
    }) : pool;
    if (!candidates.length) candidates = pool;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function goRandom() {
    var pool = readPool();
    var dest = pickRandom(pool);
    if (!dest) return;
    try {
      sessionStorage.setItem(FLOW_KEY, "1");
    } catch (e) {
      /* ignore */
    }
    window.location.href = dest;
  }

  function poolContainsCurrent(pool) {
    var here = currentPath();
    return pool.some(function (u) {
      return normalizePath(u) === here;
    });
  }

  function setupTrigger(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      goRandom();
    });
  }

  function setupAgain() {
    var pool = readPool();
    var again = document.getElementById("random-article-again");
    if (!again || !poolContainsCurrent(pool)) return;

    var show = false;
    try {
      show = sessionStorage.getItem(FLOW_KEY) === "1";
    } catch (e) {
      show = false;
    }
    again.hidden = !show;
    setupTrigger("random-article-again-link");
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupTrigger("random-article-trigger");
    setupAgain();
  });
})();
