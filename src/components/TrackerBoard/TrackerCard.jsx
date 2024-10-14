import { useState } from "react";
import Error from "./common/Error";
import validateItem from "./common/validateItem";

/* eslint-disable react/prop-types */
export default function TrackerCard({
  category,
  onTrackerActive,
  active,
  onSaveTrack,
  editItem,
  onUpdateTrack,
  onCancelEdit,
}) {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newTrack, setNewTrack] = useState(
    createInitialState(editItem, category)
  );

  function createInitialState(item, categoryList) {
    if (item) {
      return item;
    }
    return {
      id: crypto.randomUUID(),
      category: categoryList.length > 0 ? categoryList[0] : "",
      amount: 0,
      date: "",
    };
  }

  const handleSaveNewTrack = (e) => {
    const { name, value } = e.target;
    if (isError) {
      setIsError(false);
      setErrorMessage("");
    }
    setNewTrack((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, message } = validateItem(newTrack);
    if (!isValid) {
      setIsError(true);
      setErrorMessage(message);
      return;
    }
    onSaveTrack(newTrack);
    resetForm();
  };

  const handleUpdateTrack = (e) => {
    e.preventDefault();
    const { isValid, message } = validateItem(newTrack);
    if (!isValid) {
      setIsError(true);
      setErrorMessage(message);
      return;
    }
    onUpdateTrack(newTrack);
    resetForm();
  };

  const resetForm = () => {
    setNewTrack({
      id: crypto.randomUUID(),
      category: category.length > 0 ? category[0] : "",
      amount: 0,
      date: "",
    });
  };

  const handleCancel = () => {
    onCancelEdit();
    resetForm();
  };

  const handleActiveChange = (newActive) => {
    onTrackerActive(newActive);
    setNewTrack((prevTrack) => ({
      ...prevTrack,
      category: category.length > 0 ? category[0] : "",
    }));
  };

  if (editItem && editItem.id !== newTrack.id) {
    setNewTrack(editItem);
  } else if (category.length > 0 && !category.includes(newTrack.category)) {
    setNewTrack((prevTrack) => ({
      ...prevTrack,
      category: category[0],
    }));
  }

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              active === "expense" ? "active" : ""
            }`}
            onClick={() => handleActiveChange("expense")}
          >
            Expense
          </div>
          <div
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              active === "income" ? "active" : ""
            }`}
            onClick={() => handleActiveChange("income")}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              autoComplete="category-name"
              value={newTrack.category}
              onChange={handleSaveNewTrack}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              {category.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              autoComplete="off"
              placeholder="12931"
              value={newTrack.amount === 0 ? "" : newTrack.amount}
              onChange={handleSaveNewTrack}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              autoComplete="off"
              placeholder="12931"
              value={newTrack.date}
              onChange={handleSaveNewTrack}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        {isError && <Error error={errorMessage} />}
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
            onClick={editItem ? handleUpdateTrack : handleSubmit}
          >
            {editItem ? "Update" : "Save"}
          </button>
          {editItem && (
            <button
              className="mt-6 rounded-md bg-red-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
