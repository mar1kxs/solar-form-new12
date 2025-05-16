function lockScroll() {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

// Приклад: запускаємо блокування скролу, коли завантажується форма
window.addEventListener("DOMContentLoaded", () => {
  lockScroll();
});
