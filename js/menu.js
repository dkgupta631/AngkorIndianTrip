/* =========================================================
   MENU, HEADER & FOOTER — shared by every page.
   To rename, add or remove a menu item, edit MENU below.
   Every page updates automatically.
   ========================================================= */
var MENU = [
  { label: "Home",           href: "index.html",          page: "home" },
  { label: "About Us",       href: "about-us.html",       page: "about" },
  { label: "Tour",           href: "tour.html",           page: "tour" },
  { label: "Attractions",    href: "attractions.html",    page: "attractions" },
  { label: "Traveller Zone", href: "traveller-zone.html", page: "traveller" },
  { label: "Contact us",     href: "contact-us.html",     page: "contact" }
];

var TEMPLES_COVERED = ["Angkor Wat", "Ta Prohm", "Angkor Thom", "Banteay Srei", "Preah Khan"];

/* ---------- Icons (inline SVG, stroke style) ---------- */
var ICONS = {
  plane: '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/>',
  support: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/><path d="M18 17v1a3 3 0 0 1-3 3h-3"/>',
  temple: '<path d="M12 2l2 4h-4zM9 6h6l1 4H8zM7 10h10l1.5 4h-13zM4 14h16v3H4zM3 17h18v4H3z"/><path d="M10 21v-3h4v3"/>',
  star: '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.6 7.3L3 21l2.2-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  passport: '<rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3.5"/><path d="M8 17h8"/>',
  visa: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h4"/>',
  hotel: '<path d="M2 20V8M2 14h20v6M22 14v-2a3 3 0 0 0-3-3h-8v5"/><circle cx="6.5" cy="11" r="2"/>',
  umbrella: '<path d="M22 12a10 10 0 0 0-20 0z"/><path d="M12 12v8a2 2 0 0 0 4 0M12 2v1"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 12h.01M18 12h.01"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  bag: '<path d="M6 8h12l1 13H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
  bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>',
  wifi: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0"/><path d="M12 20h.01"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  rupee: '<path d="M6 3h12M6 8h12M6 13l8.5 8M6 13h3a5 5 0 0 0 0-10"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  arrow: '<path d="M5 12h14M13 5l7 7-7 7"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  youtube: '<path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.8 4 12 4 12 4s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 5.6 2.8 2.8 0 0 0 2 2C5.2 20 12 20 12 20s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-5.6z"/><path d="m10 15 5-3-5-3z"/>',
  xsocial: '<path d="M4 4l16 16M20 4 4 20"/>'
};
var WA_SVG = '<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7a10.7 10.7 0 0 1-5.5-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1a8.8 8.8 0 0 1-4.4-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.7 14.7 0 0 0 5.7 5c2.1.9 2.9 1 4 .8.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5l-.6-.3z"/></svg>';

/* ---------- Language flags ---------- */
var FLAG_EN = '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#012169"/><path d="M0 0l60 40M60 0L0 40" stroke="#fff" stroke-width="8"/><path d="M0 0l60 40M60 0L0 40" stroke="#C8102E" stroke-width="3"/><path d="M30 0v40M0 20h60" stroke="#fff" stroke-width="13"/><path d="M30 0v40M0 20h60" stroke="#C8102E" stroke-width="8"/></svg>';
var FLAG_HI = '<svg viewBox="0 0 60 40" aria-hidden="true"><rect width="60" height="40" fill="#fff"/><rect width="60" height="13.4" fill="#FF9933"/><rect y="26.6" width="60" height="13.4" fill="#138808"/><g fill="none" stroke="#000080"><circle cx="30" cy="20" r="5" stroke-width="1.2"/><path stroke-width=".6" d="M25 20h10M30 15v10M25.67 17.5l8.66 5M25.67 22.5l8.66-5M27.5 15.67l5 8.66M27.5 24.33l5-8.66"/></g></svg>';

function icon(name, cls) {
  return '<svg class="ico ' + (cls || "") + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || "") + "</svg>";
}

(function () {
  var S = window.SITE;
  var page = document.body.getAttribute("data-page");
  var waLink = "https://wa.me/" + S.whatsapp;

  /* ---------- Header ---------- */
  var navItems = MENU.map(function (m) {
    return '<li><a href="' + m.href + '"' + (m.page === page ? ' class="active" aria-current="page"' : "") + ">" + m.label + "</a></li>";
  }).join("");

  var header =
    '<header class="site-header" id="top">' +
      '<div class="container header-inner">' +
        '<a class="brand" href="index.html" aria-label="' + S.brand + ' home">' +
          '<img class="logo-on-dark" src="assets/img/logo-light.webp" alt="' + S.brand + ' — Tours · Travel · Experiences" width="900" height="288">' +
          '<img class="logo-on-light" src="assets/img/logo.webp" alt="" aria-hidden="true" width="900" height="288">' +
        "</a>" +
        '<nav class="main-nav" aria-label="Main menu"><ul>' + navItems + "</ul>" +
          '<a class="btn btn-primary nav-cta-mobile" href="contact-us.html#enquiry">Book Now</a>' +
        "</nav>" +
        '<div class="lang-switch" role="group" aria-label="Language">' +
          '<button type="button" data-lang="en" class="active" aria-pressed="true" title="English">' + FLAG_EN + "<span>EN</span></button>" +
          '<button type="button" data-lang="hi" aria-pressed="false" title="हिन्दी">' + FLAG_HI + "<span>हिं</span></button>" +
        "</div>" +
        '<a class="btn btn-primary nav-cta" href="contact-us.html#enquiry">Book Now</a>' +
        '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "</div>" +
    "</header>";
  document.getElementById("site-header").outerHTML = header;

  /* ---------- Newsletter strip + footer ---------- */
  var newsletter = document.body.getAttribute("data-newsletter") === "false" ? "" :
    '<section class="newsletter-wrap"><div class="container">' +
      '<div class="newsletter">' +
        "<div><h2>Planning a Cambodia trip?</h2>" +
        "<p>Get travel tips, seat availability and seasonal offers on the Angkor Wat package — straight to your inbox.</p></div>" +
        '<form class="newsletter-form js-form" data-form="Newsletter" novalidate>' +
          '<input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
          '<label class="sr-only" for="nl-email">Email address</label>' +
          '<input id="nl-email" type="email" name="email" placeholder="Your email address" required>' +
          '<button class="btn btn-dark" type="submit">Subscribe</button>' +
          '<p class="form-msg" role="status"></p>' +
        "</form>" +
      "</div>" +
    "</div></section>";

  var socials = [["facebook", "facebook", "Facebook"], ["instagram", "instagram", "Instagram"], ["youtube", "youtube", "YouTube"], ["x", "xsocial", "X"]]
    .filter(function (s) { return S.social[s[0]]; })
    .map(function (s) { return '<a href="' + S.social[s[0]] + '" target="_blank" rel="noopener" aria-label="' + s[2] + '">' + icon(s[1]) + "</a>"; })
    .join("");

  var footer = newsletter +
    '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
        '<div class="footer-about">' +
          '<a href="index.html"><img src="assets/img/logo-light.webp" alt="' + S.brand + '" width="900" height="288" loading="lazy"></a>' +
          "<p>A single-country travel agency built around one trip we know well — Angkor Wat, Cambodia. Air, visa, stay and an Indian-speaking escort, handled end to end.</p>" +
          (socials ? '<div class="socials">' + socials + "</div>" : "") +
        "</div>" +
        "<div><h3>Explore</h3><ul>" + MENU.map(function (m) { return '<li><a href="' + m.href + '">' + m.label + "</a></li>"; }).join("") + "</ul></div>" +
        "<div><h3>Temples Covered</h3><ul>" + TEMPLES_COVERED.map(function (t) { return '<li><a href="attractions.html">' + t + "</a></li>"; }).join("") + "</ul></div>" +
        '<div class="footer-contact"><h3>Get In Touch</h3><ul>' +
          '<li>' + icon("phone") + '<a href="tel:' + S.phoneLink + '">' + S.phoneDisplay + "</a></li>" +
          '<li>' + icon("chat") + '<a href="' + waLink + '" target="_blank" rel="noopener">WhatsApp: ' + S.phoneDisplay + "</a></li>" +
          '<li>' + icon("mail") + '<a href="mailto:' + S.email + '">' + S.email + "</a></li>" +
          '<li>' + icon("pin") + "<span>" + S.address + "</span></li>" +
        "</ul></div>" +
      "</div>" +
      '<div class="container footer-bottom"><p>© ' + new Date().getFullYear() + " " + S.brand + ". <span>All rights reserved.</span></p></div>" +
    "</footer>" +
    '<a class="float-btn float-call" href="tel:' + S.phoneLink + '" aria-label="Call us">' + icon("phone") + "</a>" +
    '<a class="float-btn float-wa" href="' + waLink + '" target="_blank" rel="noopener" aria-label="WhatsApp us">' + WA_SVG + "</a>";
  document.getElementById("site-footer").outerHTML = footer;
})();
