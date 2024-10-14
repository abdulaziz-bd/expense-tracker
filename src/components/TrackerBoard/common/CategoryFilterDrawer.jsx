/* eslint-disable react/prop-types */
import { useState } from "react";
import FilterIcon from "../../../assets/svg/common/FilterIcon";

export default function CategoryFilterDrawer({
  categoryList,
  selectedCategories,
  onFilterClick: onFilterChange,
  filterFrom,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onFilterChange(filterFrom, updatedCategories);
  };

  const handleToggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (event) => {
    if (isOpen) {
      const isOutsideClick =
        !event.target.closest("#filter-dropdown") &&
        !event.target.closest("button");
      if (isOutsideClick) {
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative inline-block text-left" onClick={handleClick}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={handleToggleDrawer}
        aria-expanded={isOpen}
      >
        <FilterIcon />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-button"
          tabIndex="-1"
          id="filter-dropdown"
        >
          <div className="py-1" role="none">
            {categoryList.map((category, idx) => (
              <div key={category} className="px-4 py-2">
                <label className="flex items-center text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                    id={`filter-option-${idx}`}
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleFilterChange(category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
