# Angkor Indian Trip

A lightweight travel website for showcasing Angkor Wat and nearby experiences in Cambodia. The project is built as a static website using HTML, CSS, and JavaScript, with a simple structure that is easy to maintain and deploy.

## Project overview

This site is designed to help visitors:

- explore the destination and key attractions
- understand the tour itinerary and travel details
- find useful traveller information
- contact the tour operator through the website

The project keeps content simple and fast-loading, with no database or server-side application required for the public website.

## Main pages

- `index.html` — Home page
- `about-us.html` — About the company and destination story
- `tour.html` — Tour details, itinerary, inclusions, and policies
- `attractions.html` — Attractions and transport information
- `traveller-zone.html` — Visitor guidance and planning information
- `contact-us.html` — Contact details, enquiry form, and FAQ

## Project structure

- `css/style.css` — main styling, layout, colors, and responsive design
- `js/config.js` — contact details, social links, and site-wide configuration
- `js/menu.js` — navigation items and reusable menu content
- `js/i18n.js` — language switching logic
- `js/lang-hi.js` — Hindi translations
- `assets/img/` — images and brand assets
- `assets/video/` — video assets if used on the site

## How to edit content

### Navigation and menu items

Update the menu labels and links in `js/menu.js`.

### Contact and business details

Edit the public contact information in `js/config.js`.

### Styling and branding

Adjust colors, spacing, fonts, and layout in `css/style.css`.

### Page text

Update each page directly in its matching HTML file.

### Images

Add new images to `assets/img/photos/` and reference them from the relevant page.

## Local preview

You can preview the site locally by either:

1. opening `index.html` directly in a browser, or
2. running this in the project folder:

```bash
python -m http.server
```

Then visit:

```text
http://localhost:8000
```

## Deployment

This project is set up for static hosting and can be deployed to any static site host, including GitHub Pages.

## Languages

The site supports bilingual content with English and Hindi. Translation text is managed in `js/lang-hi.js`, while the main page content remains in English.

## Notes

- This is a static front-end project.
- It is designed to be easy to maintain without a CMS or backend.
- The content and branding can be updated directly in the existing HTML, CSS, and JavaScript files.
