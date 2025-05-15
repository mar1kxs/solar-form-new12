const switchLang = (lang) => {
  // Текстовые элементы
  document.querySelectorAll(`[data-${lang}]`).forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  // Плейсхолдеры
  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach((input) => {
    input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
  });
};

document.querySelectorAll(".lang-switch button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    switchLang(lang);
  });
});
