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

const answerDescriptions = {
  reading: "Answer B: harvest semicolon. Both sides are complete sentences. A semicolon connects them without a coordinating conjunction. Clue: If both halves can stand alone, a semicolon may connect them.",
  math: "Answer C: 25. Add the two equations: 2x plus 3y plus 3x minus y equals 17 plus 8, so 5x plus 2y equals 25."
};
document.querySelectorAll("[data-flip]").forEach(button => {
  const image = document.getElementById(button.getAttribute("aria-controls"));
  const questionAlt = image.alt;
  button.addEventListener("click", () => {
    const showAnswer = button.getAttribute("aria-pressed") !== "true";
    image.src = "assets/" + button.dataset.flip + (showAnswer ? "-back.webp" : "-front.webp");
    image.alt = showAnswer ? answerDescriptions[button.dataset.flip] : questionAlt;
    button.setAttribute("aria-pressed", String(showAnswer));
    button.textContent = showAnswer ? "Back to the question ↗" : "See the answer ↗";
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
