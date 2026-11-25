"use strict";
const config = window.GARRETTPREP_PRODUCT;
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
    question: "White BACK AT YOU! gameplay card with a black reversal arrow and border. Flip to see the GarrettPrep logo.",
    answer: "Large GarrettPrep logo on a subtle off-white circle on the white back of the BACK AT YOU! card. Flip to return to the front."
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
