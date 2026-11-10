"use strict";
const config = window.GARRETTPREP_PRODUCT;
document.querySelectorAll("[data-launch-cta]").forEach(link => {
  link.textContent = config.ctaLabel;
  link.href = config.ctaHref;
});
document.querySelectorAll("[data-availability]").forEach(el => el.textContent = config.availability);
document.querySelectorAll("[data-fulfillment]").forEach(el => el.textContent = config.fulfillment);

// Preserve useful entry points from the former tutoring homepage.
const legacyAnchors = { "#pricing": "#launch", "#contact": "#launch" };
if (legacyAnchors[location.hash]) location.replace(legacyAnchors[location.hash]);

// The card is the control: tap, click, Enter, or Space to turn it over.
const cardLabels = {
  reading: {
    question: "Reading and Writing sample. The school garden doubled its tomato blank the gardeners used no additional water. Choices: A harvest comma, B harvest semicolon, C harvest comma however comma, D harvest semicolon and comma. Flip to see the answer.",
    answer: "Reading and Writing answer: B, harvest semicolon. Both sides are complete sentences; a semicolon connects them without a coordinating conjunction. Clue: If both halves stand alone, a semicolon may connect them. Flip to return to the question."
  },
  math: {
    question: "Math sample. If 2x plus 3y equals 17, and 3x minus y equals 8, what is 5x plus 2y? A 9, B 17, C 25, D 34. Flip to see the answer.",
    answer: "Math answer: C, 25. Add the two equations to get 5x plus 2y equals 25. Flip to return to the question."
  },
  game: {
    question: "BACK AT YOU! gameplay card with a reversal arrow. Flip to see the GarrettPrep logo.",
    answer: "GarrettPrep logo on the back of the BACK AT YOU! card. Flip to return to the front."
  }
};
document.querySelectorAll(".card-flip[data-flip]").forEach(button => {
  const labels = cardLabels[button.dataset.flip];
  if (!labels) return;
  button.addEventListener("click", () => {
    const flipped = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(flipped));
    button.setAttribute("aria-label", flipped ? labels.answer : labels.question);
    button.classList.toggle("is-flipped", flipped);
  });
});

const form = document.getElementById("launch-form");
if (form) form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector("button");
  const status = document.getElementById("form-status");
  button.disabled = true;
  status.textContent = "Submitting…";
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString()
    });
    if (!response.ok) throw new Error("Submission failed");
    form.reset();
    status.textContent = "You’re on the list. Thank you for being part of GarrettPrep!";
  } catch {
    status.textContent = "We couldn’t save your signup. Please try again, or email garrettprep@gmail.com.";
  } finally {
    button.disabled = false;
  }
});
