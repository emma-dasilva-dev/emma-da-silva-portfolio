/* ================================
   Emma DA SILVA Portfolio Website
   File: script.js
================================ */

const languageToggle = document.getElementById("languageToggle");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

const savedLanguage = localStorage.getItem("portfolioLanguage") || "en";

function setLanguage(language) {
  const translatableElements = document.querySelectorAll("[data-en][data-fr]");

  translatableElements.forEach((element) => {
    const translatedText = element.getAttribute(`data-${language}`);

    if (translatedText) {
      element.textContent = translatedText;
    }
  });

  document.documentElement.setAttribute("lang", language);
  document.documentElement.setAttribute("data-lang", language);

  localStorage.setItem("portfolioLanguage", language);

  if (languageToggle) {
    languageToggle.textContent = language === "en" ? "FR" : "EN";
    languageToggle.setAttribute(
      "aria-label",
      language === "en" ? "Switch to French" : "Passer en anglais"
    );
  }
}

function toggleMobileNavigation() {
  if (!navMenu || !navToggle) return;

  navMenu.classList.toggle("open");
  document.body.classList.toggle("nav-open");

  const isOpen = navMenu.classList.contains("open");

  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

function closeMobileNavigation() {
  if (!navMenu || !navToggle) return;

  navMenu.classList.remove("open");
  document.body.classList.remove("nav-open");
  navToggle.setAttribute("aria-label", "Open navigation menu");
  navToggle.setAttribute("aria-expanded", "false");
}

function setActiveNavigationLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

if (languageToggle) {
  languageToggle.addEventListener("click", () => {
    const currentLanguage = localStorage.getItem("portfolioLanguage") || "en";
    const nextLanguage = currentLanguage === "en" ? "fr" : "en";

    setLanguage(nextLanguage);
  });
}

if (navToggle) {
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.addEventListener("click", toggleMobileNavigation);
}

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMobileNavigation);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    closeMobileNavigation();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMobileNavigation();
  }
});

setLanguage(savedLanguage);
setActiveNavigationLink();
