export default function ValidateItem(item) {
  console.log(item);
  // Check if item is an object
  if (!item || typeof item !== "object") {
    return { isValid: false, message: "Item must be an object." };
  }

  // Check id
  if (!item.id) {
    return { isValid: false, message: "ID is missing." };
  }
  if (typeof item.id !== "string") {
    return { isValid: false, message: "ID must be a string." };
  }
  if (item.id.trim() === "") {
    return { isValid: false, message: "ID cannot be an empty string." };
  }

  // Check category
  if (typeof item.category !== "string") {
    return { isValid: false, message: "Category must be a string." };
  }

  // Check amount
  if (item.amount === "" || item.amount === null || item.amount === 0) {
    return { isValid: false, message: "Amount cannot be empty or null." };
  }
  const numAmount = Number(item.amount);
  if (isNaN(numAmount)) {
    return { isValid: false, message: "Amount must be a valid number." };
  }

  // Check date
  if (item.date === "") {
    return { isValid: false, message: "Date is missing." };
  }
  if (typeof item.date !== "string") {
    return { isValid: false, message: "Date must be a string." };
  }
  if (item.date !== "") {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(item.date)) {
      return {
        isValid: false,
        message: "Date must be in the format YYYY-MM-DD.",
      };
    }
    const parsedDate = new Date(item.date);
    if (isNaN(parsedDate.getTime())) {
      return { isValid: false, message: "Invalid date." };
    }
  }

  // All checks passed
  return { isValid: true, message: "Item is valid." };
}
