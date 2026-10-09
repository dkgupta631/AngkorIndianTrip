# AngkorIndianTrip — website

A fast, static website (HTML + CSS + JavaScript) for the Angkor Wat, Cambodia tour.
No WordPress, no database — it runs free on **GitHub

Example — rename "Tour" to "Packages" in the menu on every page:

### Brand colours (from the logo)

| Name | Hex | Used for |
|---|---|---|
| Orange | `#E8461F` | Buttons, highlights, day numbers |
| Navy | `#2B2A7C` | Header text, dark sections, footer |
| Gold | `#E8B02D` | Accents on dark backgrounds |
| Grey | `#5F6368` | Secondary text |

### Custom domain (optional)

1. Settings → Pages → **Custom domain** → enter e.g. `www.angkorindiantrip.com` → Save. Tick **Enforce HTTPS** once it's available.

## Languages (English / Hindi)

The pages are written in English. The flag buttons in the header switch to Hindi; the choice is remembered on the visitor's device.

- Hindi text lives in `js/lang-hi.js` as `"English text": "हिन्दी पाठ"` pairs.
- When you change or add English text on a page, add or update the matching line there. The English side must match the page text exactly — anything without a match simply stays in English.
- Phone, email, the office address and image descriptions are not translated.
