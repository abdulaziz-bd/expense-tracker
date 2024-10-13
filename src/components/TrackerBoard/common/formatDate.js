export function formatDate(dateInput) {
  let date;

  if (typeof dateInput === "string") {
    // Parse the date string
    date = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    date = dateInput;
  } else {
    throw new Error(
      "Invalid date input. Please provide a valid date string or Date object."
    );
  }

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date input");
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
