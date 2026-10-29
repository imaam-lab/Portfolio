# Mohamed Imaam Portfolio

Static site (HTML/CSS/JS). No build step.

## Structure
index.html, style.css, script.js, assets/img/ (compressed images), assets/ (put the PDF here)

## Run locally
Open index.html, or run `python3 -m http.server` and visit http://localhost:8000

## Deploy to Vercel
1. Push this folder to a GitHub repo (or run `npx vercel` inside it).
2. In Vercel: Add New > Project > import repo. Framework: Other. No build command. Deploy.

## Edit content
- Profile photo: replace assets/img/profile.webp (3:4 portrait, ~900px wide).
- New project: copy an `<article class="card proj">` block in #project-list, add image to assets/img/.
- Certificates: copy a `<figure class="card cert">` block; keep the title exactly as printed on the certificate.
- Testimonials: replace the placeholder `<blockquote>` in #testimonials with real, approved feedback; copy it for more.
- Experience: copy a `<li>` in the `.timeline`.
- PDF: save as assets/mohamed-imaam-portfolio.pdf. Until it exists, the button shows a message instead of a broken download.
- Instagram/Threads: handles are shown as text. Add links once you confirm the URLs. LinkedIn not added.
- Colors/fonts/spacing: CSS variables at the top of style.css.

## Contact form
1. Create a free form at formspree.io and copy the endpoint (https://formspree.io/f/xxxx).
2. Paste it into `data-endpoint=""` on `<form id="form">` in index.html.
Until then, submitting opens the visitor's email app with the message pre-filled.
