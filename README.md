# Bloom On Consulting — Website

Static site (HTML/CSS/JS) for GitHub Pages. No build step required.

## Files
- `index.html` — Home (hero, method, testimonial, FAQ, CTA)
- `about.html` — About Malak + values + method
- `services.html` — Pricing + capabilities
- `privacy.html` — Privacy Policy (bookings, email, free resource signups, Google Analytics)
- `terms.html` — Terms of Use
- `404.html` — Branded page for broken links (GitHub Pages uses it automatically)
- `tips.html` + `tip-*.html` — Tips section, one page per tip (matches the Instagram posts)
- `client-stories.html` — Client stories (Candidly Speaking and a solo therapy practice). `case-study-candidly-speaking.html` forwards there
- `styles.css` — All styling (design tokens at the top under `:root`)
- `script.js` — Nav menu, FAQ accordion, scroll reveal, hero parallax, footer year, cookie choice notice
- `about-header-bg.jpg` — Hero background (optimized)
- `bio-photo.jpg` — Bio photo (optimized)
- `logo.png`, `favicon.png`, `og-image.jpg` — Brand assets
- `sitemap.xml`, `robots.txt`, `CNAME` — Hosting/SEO config

## Deploy
Replace the files in your repo with these and push. GitHub Pages serves them as-is.
The old `bio photo.jpeg` and `about-header-bg.png` are no longer used and can be deleted.

## To update later
- **Add more testimonials:** in `index.html`, copy the `<figure class="feature-quote">`
  block in the testimonials section and update the quote, initials (`av`), name (`b`),
  and role (`small`).
- **Booking link:** the Google Calendar URL appears in each page. Search for
  `calendar.google.com` to update it everywhere.
- **Colors/fonts:** edit the variables under `:root` in `styles.css`.

## SEO included
Unique titles/descriptions, canonical URLs, Open Graph + Twitter cards,
JSON-LD structured data (ProfessionalService, Person, FAQPage, Review, Breadcrumbs),
favicon, social share image, sitemap, and robots.

## Cookie choice and analytics
Google Analytics (G-SK0PJZ48W1) loads on every page with Google consent mode.
A notice at the bottom of the page lets visitors accept or decline analytics
cookies. The choice is saved in the visitor's browser (`bloomConsent`).
The Privacy Policy has a button to change the choice later.

## When you change something
- **New page:** copy `terms.html`, swap the content inside `<main>`, update the
  title, description and canonical URL, then add it to `sitemap.xml`.
- **New tip:** copy any `tip-*.html` page, update it, and add a card for it in `tips.html`.
- **Links:** link to pages without `.html` (for example `about`, not `about.html`).
  GitHub Pages serves the clean address automatically.
- **CSS or JS changes:** bump the `?v=` date on `styles.css` and `script.js` in
  every page so visitors get the new version instead of a cached one.
- **Policy updates:** change the "Effective" date at the top of `privacy.html` or `terms.html`.
- **Undo a bad update:** in GitHub, open the commit and choose Revert. The site
  updates within a few minutes.

## Domain
The site is served at https://www.bloomonconsulting.com (see `CNAME`).
Canonical URLs, the sitemap and structured data all use the www address.
