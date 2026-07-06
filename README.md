# GarrettPrep Static Site

Simple one-page static website for GarrettPrep, built with plain HTML, CSS, and JavaScript.

## Opening locally

Open `index.html` directly in a browser, or serve this folder with any basic static file server.

## Deploying as a static site

Upload the full folder contents to any static host, such as GitHub Pages, Netlify, Vercel static hosting, or a basic web server. No backend, database, build step, or package install is required.

## Replacing the hero image

Replace `assets/garrett-zaremba-sat-tutor.jpg` with a new optimized image using the same filename. To use a different filename, update the image path in `index.html`.

## Changing the contact email

Update the FormSubmit destination in `index.html`:

```html
<form action="https://formsubmit.co/garrettprep@gmail.com" method="POST">
```

Also update the visible email links in the contact section and footer.

FormSubmit may send a one-time confirmation email before the form begins delivering inquiries.

## Updating the price

Search `index.html` for `$55` and update the hero note, pricing card, and meta description as needed.
