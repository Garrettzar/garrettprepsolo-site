# Product launch handoff

## Review and baseline
- Work branch: `product-launch`; draft PR #2. Never merge without owner approval.
- Recoverable original: `3afbcc0e19a3c829cc1c286a35878e08c1aeb75d` on main. Original production deploy: `6a4d6387ef4b920008ceb531`.
- Preview: https://deploy-preview-2--garrettpreptutoring.netlify.app/
- Responsive review: `/responsive-review` embeds the actual page at 390px and 320px widths; noindex. Remove this internal review file before production.
- Existing homepage anchors retained; old #pricing and #contact map to #launch. Repository had no other service page routes.

## Content and assets
Packaging supplied by the owner is labeled as a concept. WebP assets derive from the provided packaging board and approved RW005, Math004 and gameplay proofs. No generated product images or questions. Existing founder photograph and repository logo icon retained.

Only Chloe's published quote and 1000-to-1200 score change were present in the original homepage. They remain labeled as tutoring feedback, not deck reviews. Gavin, April, Akshara and David are clearly marked Review pending.

To add an approved testimonial, edit #testimonials in index.html: replace that person's pending article with a figure using class quote, blockquote with exact approved wording, and figcaption with approved attribution. Record consent and source privately; do not commit private messages. Keep the tutoring label unless the person has actually reviewed the deck. Do not convert a pending name into a quote without approval.

## Launch email operations
Netlify Forms detection is enabled. Static form `deck-launch` includes email, explicit required consent and honeypot; no external email service or checkout. Submissions are available in Netlify > Forms > deck-launch. Connect notifications/export to a mailing platform before sending launch emails, with unsubscribe support. No campaign emails have been sent.

Test signup `garrettprep+preview-test@gmail.com` was submitted from the deployed preview on 2026-11-08 and independently confirmed in Netlify with consent and preview referrer. Exclude test addresses from any campaign. Preview and production use the same site-level form dataset.

Native email and consent validation precede AJAX POST. A successful response resets fields and announces success via aria-live. Network/non-2xx failures retain input and display a retry/email message. Without JavaScript, Netlify handles the POST and redirects to /thank-you.

## Configuration and Stripe later
Public display configuration lives in product-config.js: CTA label/link, availability, fulfillment, price, currency and purchaseEnabled=false. These settings do not process payments. No Stripe keys are included.

Before enabling preorders:
1. Approve product price, tax, shipping regions/costs, launch timing, refund/cancellation terms, and realistic fulfillment schedule.
2. Create a Stripe product/price and a server-side Netlify Checkout Session endpoint. Keep secret keys in Netlify environment variables; server validates allowed price/quantity. Do not trust browser price values.
3. Verify signed webhooks, idempotent order handling, confirmations, refunds, and fulfillment records. Test successful/failed/canceled payments in Stripe test mode.
4. Add checkout success/cancel pages and clear preorder terms; update public configuration and purchase CTA only after approval.
5. Owner approves merge/production release separately. Verify signup and checkout on production after the approved release.

## Validation scope
JavaScript syntax checked with node --check. WebP hero is approximately 65 KB; other card examples 12–28 KB, full concept board approximately 140 KB. No framework, external fonts or third-party analytics. Images have explicit dimensions; below-fold images load lazily. No Lighthouse or real-device performance score is claimed.

Semantic headings, labeled form fields, required consent, skip link, keyboard focus styles, expanded native FAQ controls, text alternatives for sample questions/answers, and reduced-motion support are implemented. Browser and responsive review outcomes are reported in the task handoff; this is not a formal WCAG certification.
