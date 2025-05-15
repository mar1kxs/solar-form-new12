function initAutocomplete() {
  const streetInput = document.getElementById("street");
  const cityInput = document.getElementById("city");
  const zipInput = document.getElementById("zip");

  const autocomplete = new google.maps.places.Autocomplete(streetInput, {
    types: ["address"],
    componentRestrictions: { country: "cy" },
    fields: ["address_components", "geometry", "formatted_address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    const components = place.address_components;

    if (!components) return;

    // Очищення перед заповненням
    cityInput.value = "";
    zipInput.value = "";

    for (const comp of components) {
      const types = comp.types;

      if (types.includes("locality")) {
        cityInput.value = comp.long_name;
      } else if (
        types.includes("administrative_area_level_1") &&
        !cityInput.value
      ) {
        cityInput.value = comp.long_name; // fallback
      } else if (types.includes("postal_code")) {
        zipInput.value = comp.long_name;
      }
    }
  });
}

window.initAutocomplete = initAutocomplete;
