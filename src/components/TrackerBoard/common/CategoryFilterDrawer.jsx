/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import FilterIcon from "../../../assets/svg/common/FilterIcon";

export default function CategoryFilterDrawer({
  categoryList,
  onFilterClick,
  filterFrom,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const drawerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [drawerRef]);

  const handleFilterChange = (category) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];

      return updatedCategories;
    });
  };

  useEffect(() => {
    onFilterClick(filterFrom, selectedCategories);
  }, [selectedCategories]);

  return (
    <div className="relative inline-block text-left" ref={drawerRef}>
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
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
          <div className="py-1">
            {categoryList.map((category) => (
              <label
                key={category}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleFilterChange(category)}
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
