/* Page behaviour: icons, contact details, mobile menu, filters, forms */
(function () {
  var S = window.SITE;
  var I18N = window.I18N;
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Icons: <span data-icon="plane"></span> */
  document.querySelectorAll("[data-icon]").forEach(function (el) {
    el.innerHTML = icon(el.getAttribute("data-icon"));
  });

  /* Contact details from js/config.js */
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var k = el.getAttribute("data-site");
    if (k === "phone") { el.textContent = S.phoneDisplay; el.href = "tel:" + S.phoneLink; }
    if (k === "call") { el.href = "tel:" + S.phoneLink; }
    if (k === "whatsapp") { el.href = "https://wa.me/" + S.whatsapp; el.target = "_blank"; el.rel = "noopener"; }
    if (k === "email") { el.textContent = S.email; el.href = "mailto:" + S.email; }
    if (k === "address") { el.textContent = S.address; }
  });

  /* Header: solid background after scrolling */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  function setMenu(open) {
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    I18N.apply(toggle);
  }
  toggle.addEventListener("click", function () { setMenu(!document.body.classList.contains("nav-open")); });
  document.querySelectorAll(".main-nav a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  window.addEventListener("resize", function () { if (window.innerWidth > 920) setMenu(false); });

  /* Filter tabs (Home → "Where in Angkor do you want to go?") */
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    var tabs = group.querySelectorAll("[data-filter]");
    var cards = document.querySelectorAll(group.getAttribute("data-filter-group") + " [data-cat]");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var f = tab.getAttribute("data-filter");
        tabs.forEach(function (t) { t.classList.toggle("active", t === tab); t.setAttribute("aria-pressed", t === tab); });
        cards.forEach(function (c) { c.hidden = !(f === "all" || c.getAttribute("data-cat") === f); });
      });
    });
  });

  /* Hero slider (Home): each .hero-slide pairs with the .hero-bg at the same position */
  var hero = document.querySelector(".hero");
  var slides = hero ? hero.querySelectorAll(".hero-slide") : [];
  if (slides.length > 1) {
    var bgs = hero.querySelectorAll(".hero-slides .hero-bg");
    var sweep = hero.querySelector(".hero-sweep");
    var card = hero.querySelector(".hero-card");
    var nav = document.createElement("div");
    var dots = [];
    var current = 0;
    nav.className = "hero-nav";
    nav.setAttribute("role", "group");
    nav.setAttribute("aria-label", "Choose destination");

    function show(n) {
      n = (n + slides.length) % slides.length;
      if (n === current) return;
      bgs.forEach(function (bg, i) {
        bg.classList.toggle("is-prev", i === current);
        bg.classList.toggle("is-active", i === n);
      });
      slides.forEach(function (sl, i) {
        sl.classList.toggle("is-active", i === n);
        sl.setAttribute("aria-hidden", i !== n);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === n);
        d.setAttribute("aria-pressed", i === n);
      });
      sweep.classList.remove("run");
      void sweep.offsetWidth; // restart the shadow sweep
      sweep.classList.add("run");
      if (card) {
        var d = slides[n].dataset;
        card.classList.add("is-swapping");
        setTimeout(function () {
          card.querySelector("img").src = d.cardImg;
          card.querySelector("small").textContent = d.cardPlace;
          card.querySelector("strong").textContent = d.cardTitle;
          card.querySelector("em").textContent = d.cardNote;
          I18N.apply(card);
          card.classList.remove("is-swapping");
        }, 320);
      }
      current = n;
    }

    slides.forEach(function (sl, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero-dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("aria-pressed", i === 0);
      dot.innerHTML = "0" + (i + 1) + " <span>" + sl.dataset.label + "</span><i></i>";
      dot.addEventListener("click", function () { show(i); });
      // The progress bar under the active name is the autoplay timer
      dot.addEventListener("animationend", function () { show(current + 1); });
      sl.setAttribute("aria-hidden", i !== 0);
      dots.push(dot);
      nav.appendChild(dot);
    });
    hero.appendChild(nav);

    /* Pause while the visitor is reading or using the controls */
    [hero.querySelector(".hero-copy"), nav].forEach(function (el) {
      el.addEventListener("mouseenter", function () { hero.classList.add("is-paused"); });
      el.addEventListener("mouseleave", function () { hero.classList.remove("is-paused"); });
    });
    nav.addEventListener("focusin", function () { hero.classList.add("is-paused"); });
    nav.addEventListener("focusout", function () { hero.classList.remove("is-paused"); });

    /* Swipe on touch screens */
    var startX = null;
    hero.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* Reveal on scroll. Every page gets it: elements are tagged here, so the HTML stays clean. */
  function tag(sel, variant) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add("reveal");
      if (variant) el.classList.add(variant);
    });
  }
  tag(".section-head, .cards > *, .features > *, .footer-grid > *, .footer-bottom, .lead, .note");
  tag(".split > :first-child, .newsletter > :first-child, .plan-row, .day-block:nth-child(even)", "from-left");
  tag(".split > :last-child, .newsletter > :last-child, .day-block:nth-child(odd)", "from-right");
  tag(".ticks li, .crosses li, .hours li, .info-list li, .faq details, tbody tr", "from-left");
  tag(".stop-card, .gallery > *, .number, .pills li", "zoom");
  // .reels is tagged as a whole: Instagram swaps each post for an iframe, which would never be revealed
  tag(".cta-band, .contact-panel, .enquiry-box, .tour-facts, .map, .table-wrap, .reels", "zoom");

  function countUp(el) {
    var end = parseInt(el.textContent, 10);
    if (calm || !end || String(end) !== el.textContent.trim()) return;
    var t0 = null;
    function step(now) {
      t0 = t0 || now;
      var p = Math.min((now - t0) / 1200, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = "0";
    requestAnimationFrame(step);
  }

  function revealNow(el, order) {
    var delay = Math.min(order, 8) * 90;
    el.style.transitionDelay = delay + "ms";
    el.classList.add("in");
    el.querySelectorAll(":scope > b").forEach(countUp);
    // Once it has arrived, hand the element back to its normal hover transitions
    setTimeout(function () {
      el.classList.remove("reveal", "in", "from-left", "from-right", "zoom");
      el.style.transitionDelay = "";
    }, delay + 900);
  }

  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(function (entries) {
      var order = 0;
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        revealNow(e.target, order++); // elements arriving together cascade one after another
      });
    }, { rootMargin: "0px 0px -60px 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* Enquiry & newsletter forms */
  var LABELS = { name: "Name", phone: "Phone", email: "Email", month: "Travel month", travellers: "Travellers", message: "Message" };

  /* Keep form values in English whichever language is shown */
  document.querySelectorAll("option:not([value])").forEach(function (o) { o.value = o.textContent; });

  document.querySelectorAll(".js-form").forEach(function (form) {
    var label = form.querySelector("button[type=submit]").textContent;
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var msg = form.querySelector(".form-msg");
      var btn = form.querySelector("button[type=submit]");
      if (form.website && form.website.value) return; // spam trap

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      data.delete("website");
      data.append("form", form.getAttribute("data-form"));
      data.append("page", document.title);

      if (S.formEndpoint) {
        btn.disabled = true;
        btn.textContent = I18N.t("Sending…");
        fetch(S.formEndpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams(data) })
          .then(function () {
            form.reset();
            msg.className = "form-msg ok";
            msg.textContent = form.getAttribute("data-form") === "Newsletter"
              ? "Thank you — you're subscribed."
              : "Thank you! We'll call you back with dates and pricing.";
            I18N.apply(msg);
          })
          .catch(function () {
            msg.className = "form-msg err";
            msg.textContent = I18N.t("Couldn't send right now. Please WhatsApp us on {phone}.").replace("{phone}", S.phoneDisplay);
          })
          .then(function () { btn.disabled = false; btn.textContent = label; I18N.apply(btn); });
      } else {
        // No backend configured yet: hand the enquiry to WhatsApp
        var lines = ["Hello " + S.brand + ", " + (form.getAttribute("data-form") === "Newsletter" ? "please add me to your mailing list." : "I'd like to plan an Angkor Wat trip.")];
        data.forEach(function (v, k) { if (LABELS[k] && v) lines.push(LABELS[k] + ": " + v); });
        window.open("https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
        msg.className = "form-msg ok";
        msg.textContent = "Opening WhatsApp with your details — just press send.";
        I18N.apply(msg);
      }
    });
  });

  /* Show the visitor's saved language (English unless they chose Hindi) */
  I18N.apply();
})();
