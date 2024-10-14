// Utility function to toggle the filter dropdown
function toggleDropdown(button, dropdown) {
  const expanded = button.getAttribute("aria-expanded") === "true";
  button.setAttribute("aria-expanded", !expanded);
  dropdown.classList.toggle("hidden", expanded);
}

// Initialize a filter dropdown
export function initFilterDropdown(buttonId, dropdownId) {
  const button = document.getElementById(buttonId);
  const dropdown = document.getElementById(dropdownId);
  const filterOptions = dropdown.querySelectorAll('input[type="checkbox"]');

  // Set dropdown to be off by default
  toggleDropdown(button, dropdown);

  // Add click event listener to the button
  button.addEventListener("click", () => toggleDropdown(button, dropdown));

  // Handle checkbox changes
  filterOptions.forEach((option) => {
    option.addEventListener("change", (event) => {
      console.log(
        `${event.target.id} is ${
          event.target.checked ? "checked" : "unchecked"
        }`
      );
      // Add logic to handle the filter change here
    });
  });

  // Close the dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (!button.contains(event.target) && !dropdown.contains(event.target)) {
      button.setAttribute("aria-expanded", "false");
      dropdown.classList.add("hidden");
    }
  });
}
