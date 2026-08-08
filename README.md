# Bloom On Consulting — Website

Static site (HTML/CSS/JS) for GitHub Pages. No build step required.

## Files
- `index.html` — Home (hero, method, testimonial, FAQ, CTA)
- `about.html` — About Malak + values + method
- `services.html` — Pricing + capabilities
- `styles.css` — All styling (design tokens at the top under `:root`)
- `script.js` — Nav menu, FAQ accordion, scroll reveal, hero parallax
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
