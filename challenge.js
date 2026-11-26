"use strict";

const questions = window.GARRETTPREP_QUESTIONS;
const byId = new Map(questions.map(question => [question.id, question]));
const letters = ["A", "B", "C", "D"];
const size = 5;
const storageKey = "garrettprep-challenge-v1";
const resultMessages = [
  "Good thing you already graduated.",
  "Good thing you already graduated.",
  "Your teen wasn’t being dramatic. This thing is hard.",
  "Your teenager should be mildly concerned.",
  "Someone’s been doing their homework.",
  "The SAT fears you."
];
const get = id => document.getElementById(id);
const round = get("round");
const results = get("results");
const prompt = get("prompt");
const answers = get("answers");
const form = get("answer-form");
const check = get("check-answer");
const card = get("quiz-card");
const flip = get("quiz-flip");
const feedback = get("feedback");
const outcome = get("answer-outcome");
const next = get("next");
const fromHome = new URLSearchParams(location.search).get("from") === "home";
let attempt;

// Optional integration point for first-party analytics. No requests are made here.
function track(name) {
  document.dispatchEvent(new Event(name));
}

function shuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Keep the last two rounds' question IDs so replays favor cards not seen recently.
// This stores only question IDs, never answers, scores, or personal information.
const recentQuestionsKey = "garrettprep-recent-questions-v1";
function readRecentQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem(recentQuestionsKey));
    return Array.isArray(saved) ? saved.filter(id => byId.has(id)).slice(-10) : [];
  } catch {
    return [];
  }
}

function rememberQuestions(ids) {
  try {
    localStorage.setItem(recentQuestionsKey, JSON.stringify([...readRecentQuestions(), ...ids].slice(-10)));
  } catch {
    // The quiz works without browser storage, with ordinary random selection.
  }
}

function newAttempt() {
  const mathCount = Math.random() < 0.5 ? 2 : 3;
  const recentlySeen = new Set(readRecentQuestions());
  const pick = (subject, count) => {
    const pool = shuffle(questions.filter(q => q.subject === subject));
    // Recently seen questions come after unseen ones, with randomness within each group.
    pool.sort((a, b) => Number(recentlySeen.has(a.id)) - Number(recentlySeen.has(b.id)));
    const chosen = pool.slice(0, count);
    // Show a broader Reading & Writing mix instead of an all-punctuation round.
    if (subject === "Reading & Writing" && chosen.every(q => q.topic === "Punctuation")) {
      const alternate = pool.find(q => q.topic !== "Punctuation" && !chosen.some(selected => selected.id === q.id));
      if (alternate) chosen[chosen.length - 1] = alternate;
    }
    return chosen.map(q => q.id);
  };
  const selected = shuffle([
    ...pick("Math", mathCount),
    ...pick("Reading & Writing", size - mathCount)
  ]);
  attempt = { ids: selected, index: 0, submitted: [], selected: null, preview: false };
  save();
  rememberQuestions(selected);
}

function restore() {
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey));
    if (!stored || !Array.isArray(stored.ids) || !Array.isArray(stored.submitted)) return null;
    const { ids, index, submitted, selected, preview } = stored;
    if (ids.length !== size || new Set(ids).size !== size || ids.some(id => !byId.has(id))) return null;
    if (!Number.isInteger(index) || index < 0 || index > size) return null;
    if (submitted.length < index || submitted.length > Math.min(index + 1, size)) return null;
    if (!submitted.every(choice => letters[choice] && Number.isInteger(choice))) return null;
    if (selected !== null && (!Number.isInteger(selected) || !letters[selected])) return null;
    if (fromHome && index === size) return null;
    return stored;
  } catch {
    return null;
  }
}

function save() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(attempt));
  } catch {
    // The current round still works when storage is unavailable.
  }
}

function renderQuestion(moveFocus) {
  const question = byId.get(attempt.ids[attempt.index]);
  const submitted = attempt.submitted.length > attempt.index;
  round.hidden = false;
  results.hidden = true;
  get("question-count").textContent = `Question ${attempt.index + 1} of ${size}`;
  get("progress").value = attempt.submitted.length;
  card.classList.toggle("is-reading", question.subject === "Reading & Writing");
  feedback.hidden = true;
  flip.hidden = true;
  get("subject").textContent = question.subject;
  const topic = get("topic");
  topic.textContent = question.topic;
  topic.classList.toggle("is-long", question.topic.length > 20);
  get("card-number").textContent = `No. ${question.id.split("-").at(-1)}`;
  prompt.textContent = question.prompt;
  answers.replaceChildren(...question.choices.map((choice, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "answer";
    input.value = index;
    input.checked = index === attempt.selected;
    const letter = document.createElement("span");
    letter.className = "answer-letter";
    letter.textContent = letters[index];
    const text = document.createElement("span");
    text.textContent = choice;
    label.append(input, letter, text);
    return label;
  }));
  showCardSide(false);
  check.hidden = submitted;
  check.disabled = attempt.selected === null;
  outcome.hidden = !submitted;
  next.hidden = !submitted;
  if (submitted) reveal(question, false);
  if (moveFocus) prompt.focus();
}

function showCardSide(showAnswer, animate = false) {
  card.classList.toggle("is-animated", animate);
  card.classList.toggle("is-revealed", showAnswer);
  form.inert = showAnswer;
  feedback.inert = !showAnswer;
  flip.setAttribute("aria-label", showAnswer ? "Flip to the question" : "Flip to the answer");
}

function reveal(question, moveFocus) {
  const choice = attempt.submitted[attempt.index];
  const correct = choice === question.answer;
  answers.querySelectorAll("input").forEach(input => { input.disabled = true; });
  get("progress").value = attempt.submitted.length;
  get("answer-announcement").textContent = correct
    ? "Correct. The answer is "
    : `Incorrect. You chose ${letters[choice]}. The answer is `;
  const answer = get("correct-answer");
  answer.textContent = `${letters[question.answer]}. ${question.choices[question.answer]}`;
  answer.classList.toggle("is-short", answer.textContent.length <= 10);
  get("explanation").textContent = question.explanation;
  get("clue").textContent = question.clue;
  next.textContent = attempt.index === size - 1 ? "See Results" : "Next Question";
  outcome.textContent = correct ? "Correct!" : `Incorrect · You chose ${letters[choice]}`;
  outcome.classList.toggle("is-correct", correct);
  feedback.hidden = false;
  showCardSide(true, moveFocus);
  flip.hidden = false;
  check.hidden = true;
  outcome.hidden = false;
  next.hidden = false;
  if (moveFocus) get("feedback-title").focus();
}

flip.addEventListener("click", () => {
  showCardSide(!card.classList.contains("is-revealed"), true);
});

function renderResults(moveFocus) {
  round.hidden = true;
  results.hidden = false;
  const score = attempt.submitted.filter((choice, index) => choice === byId.get(attempt.ids[index]).answer).length;
  get("result-score").textContent = `${score} out of ${size} correct`;
  const title = get("result-title");
  title.textContent = resultMessages[score];
  const missed = attempt.ids.map(id => byId.get(id)).find((q, i) => q.answer !== attempt.submitted[i]);
  get("takeaway").textContent = score === size
    ? "Try explaining a clue in your own words. Teaching the shortcut helps you remember it."
    : `One to remember for round two: ${missed.clue}`;
  get("share-status").textContent = "";
  get("share-fallback").hidden = true;
  if (moveFocus) title.focus();
}

answers.addEventListener("change", event => {
  if (attempt.index === 0 && attempt.selected === null) track("garrettprep:challenge-start");
  attempt.selected = Number(event.target.value);
  check.disabled = false;
  save();
});

form.addEventListener("submit", event => {
  event.preventDefault();
  if (attempt.selected === null || attempt.submitted.length > attempt.index) return;
  attempt.submitted.push(attempt.selected);
  save();
  reveal(byId.get(attempt.ids[attempt.index]), true);
});

next.addEventListener("click", () => {
  if (attempt.submitted.length !== attempt.index + 1) return;
  attempt.index++;
  attempt.selected = null;
  save();
  if (attempt.index === size) {
    renderResults(true);
    track("garrettprep:challenge-complete");
  } else {
    renderQuestion(true);
  }
});

get("replay").addEventListener("click", () => {
  history.replaceState(null, "", location.pathname);
  newAttempt();
  renderQuestion(true);
});

get("share").addEventListener("click", async () => {
  const url = new URL("challenge.html", location.href).href;
  const status = get("share-status");
  if (navigator.share) {
    try {
      await navigator.share({ title: "GarrettPrep SAT Challenge", text: "Can you beat my score on the GarrettPrep SAT Challenge?", url });
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = "Challenge link copied.";
  } catch {
    const input = get("share-url");
    input.value = url;
    get("share-fallback").hidden = false;
    input.focus();
    input.select();
  }
});

const productCta = get("product-cta");
const product = window.GARRETTPREP_PRODUCT;
if (product?.purchaseEnabled && product.ctaHref) {
  try {
    const checkout = new URL(product.ctaHref, new URL("./", location.href));
    if (checkout.protocol === "https:" && checkout.href !== productCta.href && !product.ctaHref.trim().startsWith("#")) {
      productCta.hidden = false;
      productCta.href = checkout.href;
      productCta.textContent = product.ctaLabel;
    }
  } catch {
    // Keep the waitlist link if the checkout URL is invalid.
  }
}
productCta.addEventListener("click", () => track("garrettprep:results-product-click"));

attempt = restore();
if (!attempt) newAttempt();
if (attempt.index === size) renderResults(false);
else renderQuestion(false);
