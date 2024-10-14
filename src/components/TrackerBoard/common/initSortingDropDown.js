// Utility function to toggle the dropdown
function toggleDropdown(menuButton, dropdown) {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !expanded);
  dropdown.classList.toggle("hidden", expanded);
}

// Initializing dropdowns
export function initDropdown(menuButtonId, dropdownSelector) {
  const menuButton = document.getElementById(menuButtonId);
  const dropdown = document.querySelector(dropdownSelector);

  // Set dropdown to be off by default
  toggleDropdown(menuButton, dropdown);

  // Add click event listener to the button
  menuButton.addEventListener("click", () =>
    toggleDropdown(menuButton, dropdown)
  );

  // Close the dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      !menuButton.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      menuButton.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
    }
  });
}
