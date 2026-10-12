/**
 * AngkorIndianTrip — website form receiver
 *
 * Saves every enquiry from the website into this Google Sheet
 * and emails a copy to NOTIFY_EMAIL.
 *
 * Setup (5 minutes) — see README.md, section "Where do form enquiries go?"
 *   1. Create a Google Sheet → Extensions → Apps Script → paste this file.
 *   2. Deploy → New deployment → Web app
 *        Execute as: Me      Who has access: Anyone
 *   3. Copy the Web app URL into js/config.js → formEndpoint.
 */

var NOTIFY_EMAIL = "angkorindiantrip@gmail.com";

var COLUMNS = [
  "Date & time",
  "Form",
  "Name",
  "Phone",
  "Email",
  "Travel month",
  "Travellers",
  "Message",
  "Location",
  "IP address"
];

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spam trap: real visitors never fill the hidden "website" field
  if (p.website) return json({ ok: true });

  var isNewsletter = p.form === "Newsletter";
  var sheet = getSheet(isNewsletter ? "Newsletter" : "contacts");
  var customerLocation = clean(p.location || p.address || "");
  var ipAddress = clean((e && e.headers && e.headers['X-Forwarded-For']) || "");

  var row = [
    new Date(),
    clean(p.form),
    clean(p.name),
    clean(p.phone),
    clean(p.email),
    clean(p.month),
    clean(p.travellers),
    clean(p.message),
    customerLocation,
    ipAddress
  ];
  sheet.appendRow(row);

  try {
    var subject = isNewsletter
      ? "New newsletter subscriber: " + clean(p.email)
      : "New Angkor Wat enquiry: " + clean(p.name) + " (" + clean(p.phone) + ")";
    var body = COLUMNS.map(function (c, i) { return c + ": " + (row[i] || "-"); }).join("\n");
    MailApp.sendEmail({ to: NOTIFY_EMAIL, subject: subject, body: body, replyTo: p.email || NOTIFY_EMAIL });
  } catch (err) {
    // Row is already saved; ignore mail quota errors
  }

  return json({ ok: true });
}

// Lets you open the Web app URL in a browser to check it is live
function doGet() {
  return json({ ok: true, message: "AngkorIndianTrip form endpoint is running." });
}

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold").setBackground("#2B2A7C").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
  }

  normalizeSheetColumns(sheet);
  return sheet;
}

function normalizeSheetColumns(sheet) {
  var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), COLUMNS.length)).getValues()[0];
  var staleIndexes = [];

  headers.forEach(function (header, index) {
    var h = String(header || "").trim();
    if (h === "Page" || h === "Address") {
      staleIndexes.push(index + 1);
    }
  });

  if (staleIndexes.length === 0) {
    return;
  }

  for (var i = staleIndexes.length - 1; i >= 0; i--) {
    sheet.deleteColumn(staleIndexes[i]);
  }
}

function clean(v) {
  v = String(v == null ? "" : v).trim().slice(0, 2000);
  // Stop spreadsheet formula injection
  return /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
