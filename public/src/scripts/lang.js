document.getElementById("languageSelect").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-ru]").forEach((el) => {
    if ("placeholder" in el) {
      el.placeholder = el.getAttribute(`data-${lang}`) || el.placeholder;
    }
    if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") {
      el.innerHTML = el.getAttribute(`data-${lang}`) || el.innerHTML;
    }
  });
});
