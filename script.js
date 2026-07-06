const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const navLinks = Array.from(document.querySelectorAll("[data-nav-link]"));
const form = document.querySelector("#inquiry-form");
const formError = document.querySelector("#form-error");

const getHeaderOffset = () => {
  const height = header ? header.offsetHeight : 0;
  return height + 16;
};

const closeMenu = () => {
  if (!header || !navToggle) return;
  header.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
};

if (navToggle && header && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMenu();

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - getHeaderOffset(),
      behavior: "smooth"
    });

    history.replaceState(null, "", targetId);
    window.setTimeout(setActiveLink, 500);
  });
});

const watchedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = () => {
  let currentId = "";
  const offset = getHeaderOffset() + 24;

  watchedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= offset) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${currentId}`);
  });
};

let activeTicking = false;

const requestActiveUpdate = () => {
  if (activeTicking) return;
  activeTicking = true;

  window.requestAnimationFrame(() => {
    setActiveLink();
    activeTicking = false;
  });
};

if (watchedSections.length) {
  setActiveLink();
  window.addEventListener("scroll", requestActiveUpdate, { passive: true });
  window.addEventListener("resize", requestActiveUpdate);
}

const setFieldValidity = (field, isValid) => {
  if (!field) return;
  if (isValid) {
    field.removeAttribute("aria-invalid");
  } else {
    field.setAttribute("aria-invalid", "true");
  }
};

const showError = (message) => {
  if (!formError) return;
  formError.textContent = message;
  formError.hidden = false;
};

const clearError = () => {
  if (!formError) return;
  formError.textContent = "";
  formError.hidden = true;
};

if (form) {
  form.addEventListener("submit", (event) => {
    clearError();

    const email = form.elements.email;
    const phone = form.elements.phone;
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
    const phoneDigits = phoneValue.replace(/\D/g, "");
    const phoneIsValid = !phoneValue || phoneDigits.length >= 7;

    setFieldValidity(email, emailIsValid);
    setFieldValidity(phone, phoneIsValid);

    if (!emailIsValid || !phoneIsValid) {
      event.preventDefault();
      showError(!emailIsValid
        ? "Please enter a valid email address."
        : "Please enter a phone number with at least 7 digits, or leave it blank.");

      const firstInvalid = !emailIsValid ? email : phone;
      firstInvalid.focus();
    }
  });
}
