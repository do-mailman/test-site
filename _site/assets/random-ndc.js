(function () {
  var POOL_ID = "ndc-random-pool";
  var RESULT_ID = "ndc-random-result";
  var PATH_ID = "ndc-random-path";
  var NOTATION_ID = "ndc-random-notation";
  var LABEL_ID = "ndc-random-label";
  var PLACEHOLDER_ID = "ndc-random-placeholder";

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

  function pickRandom(pool, previousNotation) {
    if (!pool.length) return null;
    var candidates = pool;
    if (previousNotation && pool.length > 1) {
      var filtered = pool.filter(function (item) {
        return item.notation !== previousNotation;
      });
      if (filtered.length) candidates = filtered;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function showResult(item) {
    var result = document.getElementById(RESULT_ID);
    var placeholder = document.getElementById(PLACEHOLDER_ID);
    var notation = document.getElementById(NOTATION_ID);
    var label = document.getElementById(LABEL_ID);
    var path = document.getElementById(PATH_ID);
    if (!result || !notation || !label || !path) return;

    notation.textContent = item.notation;
    label.textContent = item.label;
    path.textContent = item.path || item.label;
    result.hidden = false;
    if (placeholder) placeholder.hidden = true;
  }

  function draw(pool, previousNotation) {
    var item = pickRandom(pool, previousNotation);
    if (!item) return null;
    showResult(item);
    return item.notation;
  }

  function setupTrigger(id, pool, getPrevious, setPrevious) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var prev = getPrevious();
      var notation = draw(pool, prev);
      if (notation) setPrevious(notation);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var pool = readPool();
    var lastNotation = null;

    setupTrigger(
      "ndc-random-trigger",
      pool,
      function () {
        return lastNotation;
      },
      function (notation) {
        lastNotation = notation;
      }
    );
    setupTrigger(
      "ndc-random-again",
      pool,
      function () {
        return lastNotation;
      },
      function (notation) {
        lastNotation = notation;
      }
    );
  });
})();
