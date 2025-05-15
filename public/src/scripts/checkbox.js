document.querySelectorAll("fieldset").forEach((fieldset) => {
  const checkboxes = fieldset.querySelectorAll("input.custom-checkbox");

  // Add required logic
  const isRequired = checkboxes.length > 0;
  if (isRequired) {
    checkboxes[0].setAttribute("required", "required");
  }

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        checkboxes.forEach((cb) => {
          if (cb !== checkbox) cb.checked = false;
        });
      }

      // Re-validate: make at least one required again
      if (isRequired) {
        const anyChecked = Array.from(checkboxes).some((cb) => cb.checked);
        checkboxes.forEach((cb) => {
          if (anyChecked) {
            cb.removeAttribute("required");
          } else {
            checkboxes[0].setAttribute("required", "required");
          }
        });
      }
    });
  });
});
