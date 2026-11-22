# GarrettPrep

A static HTML, CSS, and JavaScript site hosted on Netlify.

## Preview locally

Serve the repository root with a static HTTP server. For example, run `python -m http.server 8000` from the root and open [the homepage](http://localhost:8000/) or [the SAT Challenge](http://localhost:8000/challenge.html). Use the Netlify Deploy Preview to verify hosted form handling.

## SAT Challenge

`challenge-questions.js` holds the question pool. Math cards 001–005 and 007 and Reading & Writing cards 001–004 and 006 were transcribed from the GarrettPrep print master. Keep card IDs stable and preserve the printed wording. Each attempt uses five distinct cards with either two or three from each subject. The homepage preview uses Math 004 and carries that card into the first round. If that preview card changes, update both the markup in `index.html` and `introQuestion` in `challenge.js`.

Progress is stored in the current browser tab. No account or email address is required for the challenge.

## Waitlist and checkout

The homepage uses the existing `deck-launch` Netlify form, including its consent field, honeypot, and privacy link. Preview and production share the site's form dataset.

With `purchaseEnabled` off in `product-config.js`, the results CTA links to the waitlist. When checkout is ready, set `ctaHref` to the real HTTPS checkout destination, set the desired `ctaLabel`, and then enable purchasing. Purchase and fulfillment details are managed separately.

## Measurement

There are no analytics requests. A configured first-party listener can subscribe to the document events `garrettprep:challenge-start`, `garrettprep:challenge-complete`, `garrettprep:results-product-click`, and `garrettprep:waitlist-conversion`. These events carry no personal information. Netlify Forms already records waitlist submissions. Purchase confirmation would come from the future checkout integration.
