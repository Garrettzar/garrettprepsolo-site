"use strict";
(() => {
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  const incoming = new URLSearchParams(location.search);
  let tags = new URLSearchParams();
  try {
    tags = new URLSearchParams(sessionStorage.getItem("gp-campaign") || "");
  } catch { /* Links still carry campaign tags when storage is unavailable. */ }
  if (keys.some(key => incoming.has(key))) {
    tags = new URLSearchParams();
    for (const key of keys) {
      if (incoming.get(key)) tags.set(key, incoming.get(key).slice(0, 200));
    }
    try { sessionStorage.setItem("gp-campaign", tags.toString()); } catch {}
  }
  for (const link of document.querySelectorAll('a[href*="challenge.html"]')) {
    const url = new URL(link.href);
    for (const [key, value] of tags) url.searchParams.set(key, value);
    link.href = url.href;
  }
  const signup = document.getElementById("launch-form");
  for (const key of keys) signup.elements[key].value = tags.get(key) || "";
  // First-party integration hooks. No identifiers or email enter the event layer.
  for (const name of ["visit", "challenge-start", "challenge-complete", "product-interest", "form-start", "waitlist-conversion"]) {
    document.addEventListener("garrettprep:" + name, () => {
      (window.dataLayer ||= []).push({event: "gp_" + name.replaceAll("-", "_"), ...Object.fromEntries(tags)});
    });
  }
  const emit = name => document.dispatchEvent(new Event("garrettprep:" + name));
  emit("visit");
  signup.addEventListener("focusin", () => emit("form-start"), {once: true});
  document.querySelectorAll('.card-flip, a[href$="#inside"], a[href="#launch"], #product-cta').forEach(control => {
    control.addEventListener("click", () => emit("product-interest"));
  });
  const form = document.getElementById("launch-form");
  if (form) form.addEventListener("submit", async event => {
    event.preventDefault();
    if (form.dataset.state || !form.reportValidity()) return;
    form.dataset.state = "pending";
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
      form.dataset.state = "accepted";
      button.textContent = "You’re on the list";
      status.textContent = "Thanks for joining! We’ll email you when pricing and ordering details are ready.";
      document.dispatchEvent(new Event("garrettprep:waitlist-conversion"));
    } catch {
      delete form.dataset.state;
      status.textContent = "We couldn’t save your signup. Please try again, or email garrettprep@gmail.com.";
    } finally {
      button.disabled = form.dataset.state === "accepted";
    }
  });
})();
