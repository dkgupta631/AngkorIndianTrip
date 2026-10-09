# AngkorIndianTrip — website

A fast, static website (HTML + CSS + JavaScript) for the Angkor Wat, Cambodia tour.
No WordPress, no database — it runs free on **GitHub Pages**.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `about-us.html` | About Us |
| `tour.html` | Tour (itinerary, inclusions, policy, terms) |
| `attractions.html` | Attractions + transport |
| `traveller-zone.html` | Traveller Zone (visa, currency, emergency numbers) |
| `contact-us.html` | Contact us (enquiry form, map, FAQ) |

## What to edit, and where

| I want to change… | Edit this file | Language |
|---|---|---|
| **Menu items** (Home, About Us, …) — rename, add, remove | `js/menu.js` → the `MENU` list at the top | JavaScript |
| Footer "Temples Covered" list | `js/menu.js` → `TEMPLES_COVERED` | JavaScript |
| Phone, WhatsApp, email, address, social links | `js/config.js` | JavaScript |
| Where the enquiry forms send data | `js/config.js` → `formEndpoint` | JavaScript |
| Colours, fonts, spacing | `css/style.css` → `:root` at the top | CSS |
| Page text and photos | the page's `.html` file | HTML |
| Logo | `assets/img/logo.webp` (light backgrounds) and `assets/img/logo-light.webp` (dark backgrounds) | — |

Example — rename "Tour" to "Packages" in the menu on every page:

```js
// js/menu.js
{ label: "Packages", href: "tour.html", page: "tour" },
```

### Brand colours (from the logo)

| Name | Hex | Used for |
|---|---|---|
| Orange | `#E8461F` | Buttons, highlights, day numbers |
| Navy | `#2B2A7C` | Header text, dark sections, footer |
| Gold | `#E8B02D` | Accents on dark backgrounds |
| Grey | `#5F6368` | Secondary text |

## Where do form enquiries go?

GitHub Pages only serves files — it **cannot store form data**. The forms send data to a
free **Google Sheet** instead. Every enquiry becomes a new row, and you also get an email.

**Until this is set up**, the forms open WhatsApp with the customer's details filled in,
so no enquiry is lost.

### Set up the Google Sheet (about 5 minutes)

1. Go to [sheets.new](https://sheets.new) (signed in as **angkorindiantrip@gmail.com**). Name it *Website Enquiries*.
2. **Extensions → Apps Script**. Delete the sample code, paste everything from
   `google-apps-script/Code.gs`, and click **Save**.
3. **Deploy → New deployment** → gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, allow the permissions, and **copy the Web app URL**
   (it looks like `https://script.google.com/macros/s/…/exec`).
5. Paste it into `js/config.js`:
   ```js
   formEndpoint: "https://script.google.com/macros/s/XXXX/exec"
   ```
6. Commit and push. Test the form — a row appears in the **Enquiries** tab (newsletter sign-ups go to the **Newsletter** tab).

> If you later change `Code.gs`, use **Deploy → Manage deployments → Edit → New version**
> so the URL stays the same.

## Deploy on GitHub Pages

1. Push this folder to a GitHub repository.
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**.
3. After about a minute the site is live at `https://<username>.github.io/<repo>/`.

### Custom domain (optional)

1. Settings → Pages → **Custom domain** → enter e.g. `www.angkorindiantrip.com` → Save. Tick **Enforce HTTPS** once it's available.
2. At your domain registrar, add DNS records:
   - `CNAME` `www` → `<username>.github.io`
   - For the root domain, `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`

## Photos

All photos are stored in the site itself — nothing loads from the old site (`vishnuinternationaltours.com`) any more.

- Page photos: `assets/img/photos/`
- Home hero slider photos: `assets/img/hero/`
- Gallery video: `assets/video/`

To add a photo, put the file in `assets/img/photos/` and reference it as `assets/img/photos/your-file.jpg`.

## Preview locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and visit
http://localhost:8000.

## Languages (English / Hindi)

The pages are written in English. The flag buttons in the header switch to Hindi; the choice is remembered on the visitor's device.

- Hindi text lives in `js/lang-hi.js` as `"English text": "हिन्दी पाठ"` pairs.
- When you change or add English text on a page, add or update the matching line there. The English side must match the page text exactly — anything without a match simply stays in English.
- Phone, email, the office address and image descriptions are not translated.
