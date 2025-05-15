const phoneInput = document.querySelector("#phone");
const iti = intlTelInput(phoneInput, {
  initialCountry: "cy",
  nationalMode: true,
  strictMode: true,
  separateDialCode: true,
  loadUtils: () =>
    import(
      "https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"
    ),
});

document
  .querySelector("#solarForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const installYearInput = form.installYear;
    const installYear = parseInt(installYearInput.value, 10);
    const currentYear = new Date().getFullYear();
    const errorMsg = document.getElementById("installYearError");

    installYearInput.classList.remove(
      "ring-2",
      "ring-red-500",
      "border-red-500"
    );
    errorMsg.classList.add("hidden");

    if (isNaN(installYear) || installYear < 1980 || installYear > currentYear) {
      installYearInput.classList.add(
        "ring-2",
        "ring-red-500",
        "border-red-500"
      );
      errorMsg.classList.remove("hidden");
      return;
    }
    const formData = new FormData(form);
    const inverters = Array.from(
      form.querySelectorAll('input[name="inverter"]:checked')
    ).map((el) => el.value);

    const connections = Array.from(
      form.querySelectorAll('input[name="connection"]:checked')
    ).map((el) => el.value);

    const monitoring = Array.from(
      form.querySelectorAll('input[name="monitoring"]:checked')
    ).map((el) => el.value);
    formData.set("inverter", inverters.join(", "));
    formData.set("connection", connections.join(", "));
    formData.set("monitoring", monitoring.join(", "));

    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    data.phone = iti.getNumber();

    try {
      const response = await fetch(
        "https://hook.eu2.make.com/pepzb5f2iix6nnru8u61hoco5s4b2xgp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.url) {
          window.location.href = result.url; // Редирект на оплату
        } else {
          throw new Error("No payment URL returned");
        }
      }
    } catch (err) {
      console.error(err);
      document.getElementById("errorMessage").classList.remove("hidden");
    }
  });
