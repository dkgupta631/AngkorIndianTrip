/* =========================================================
   LANGUAGE SWITCH — English (default) / Hindi.
   Pages are written in English; Hindi text lives in js/lang-hi.js.
   The visitor's choice is remembered on their device.
   ========================================================= */
(function () {
  var HI = window.LANG_HI || {};
  var KEY = "ait-lang";
  var ATTRS = ["placeholder", "aria-label", "title"];
  var lang = "en";
  try { if (localStorage.getItem(KEY) === "hi") lang = "hi"; } catch (e) {}

  var texts = new WeakMap();  // text node -> { src: English, out: what we last wrote }
  var attrs = new WeakMap();  // element   -> { attribute: { src, out } }
  var titleSrc = document.title;

  function t(s) {
    if (lang !== "hi") return s;
    var hit = HI[s.replace(/\s+/g, " ").trim()];
    return hit === undefined ? s : s.match(/^\s*/)[0] + hit + s.match(/\s*$/)[0];
  }

  /* If something else changed the text since we last wrote it, that new text is the English source */
  function resolve(rec, current) {
    return rec && rec.out === current ? rec : { src: current };
  }

  function applyAttrs(el) {
    var recs = attrs.get(el) || {};
    ATTRS.forEach(function (a) {
      if (!el.hasAttribute(a)) return;
      var rec = resolve(recs[a], el.getAttribute(a));
      rec.out = t(rec.src);
      if (rec.out !== el.getAttribute(a)) el.setAttribute(a, rec.out);
      recs[a] = rec;
    });
    attrs.set(el, recs);
  }

  function apply(root) {
    root = root || document.body;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var tag = node.parentNode.nodeName;
      if (tag === "SCRIPT" || tag === "STYLE" || !node.nodeValue.trim()) continue;
      var rec = resolve(texts.get(node), node.nodeValue);
      rec.out = t(rec.src);
      if (rec.out !== node.nodeValue) node.nodeValue = rec.out;
      texts.set(node, rec);
    }
    var sel = "[placeholder],[aria-label],[title]";
    if (root.matches && root.matches(sel)) applyAttrs(root);
    root.querySelectorAll(sel).forEach(applyAttrs);

    if (root === document.body) {
      document.title = t(titleSrc);
      document.querySelectorAll("[data-lang]").forEach(function (b) {
        var on = b.getAttribute("data-lang") === lang;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on);
      });
    }
  }

  function loadHindiFonts() {
    if (document.getElementById("hi-fonts")) return;
    var link = document.createElement("link");
    link.id = "hi-fonts";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Serif+Devanagari:wght@700&display=swap";
    document.head.appendChild(link);
  }

  function set(next) {
    lang = next === "hi" ? "hi" : "en";
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    document.documentElement.lang = lang;
    if (lang === "hi") loadHindiFonts();
    apply();
  }

  document.documentElement.lang = lang;
  if (lang === "hi") loadHindiFonts();
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-lang]");
    if (btn) set(btn.getAttribute("data-lang"));
  });

  window.I18N = { t: t, apply: apply, set: set, lang: function () { return lang; } };
})();
