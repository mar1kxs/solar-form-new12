const switchLang = (lang) => {
  localStorage.setItem("selectedLang", lang);

  document.querySelectorAll(`[data-${lang}]`).forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((input) => {
    input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
  });
};

document
  .querySelectorAll(".lang-switch button, #languageSelect")
  .forEach((el) => {
    el.addEventListener("click", (e) => {
      const lang = e.target.value || el.getAttribute("data-lang");
      switchLang(lang);
    });

    el.addEventListener("change", (e) => {
      const lang = e.target.value;
      switchLang(lang);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("selectedLang") || "en";
  const langSelect = document.querySelector("#languageSelect");

  if (langSelect) {
    langSelect.value = savedLang;
  }

  switchLang(savedLang);
});
