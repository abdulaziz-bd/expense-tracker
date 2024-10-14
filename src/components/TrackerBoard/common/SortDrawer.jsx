import { useCallback, useState } from "react";
import SortIcon from "../../../assets/svg/common/SortIcon";

// eslint-disable-next-line react/prop-types
export default function SortDrawer({ onSortClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = useCallback((event) => {
    const isOutsideClick =
      !event.target.closest("#sort-dropdown") &&
      !event.target.closest("button");
    if (isOutsideClick) {
      setIsOpen(false);
      document.removeEventListener("click", handleClickOutside);
    }
  }, []);

  const handleToggleDrawer = () => {
    setIsOpen((prevIsOpen) => {
      if (!prevIsOpen) {
        setTimeout(() => {
          document.addEventListener("click", handleClickOutside);
        }, 0);
      } else {
        document.removeEventListener("click", handleClickOutside);
      }
      return !prevIsOpen;
    });
  };

  const handleSortClick = (sortType) => {
    onSortClick(sortType);
    setIsOpen(false);
    document.removeEventListener("click", handleClickOutside);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={handleToggleDrawer}
          aria-expanded={isOpen}
        >
          <SortIcon />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="sort-button"
          tabIndex="-1"
          id="sort-dropdown"
        >
          <div className="py-1" role="none">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSortClick("low")}
            >
              Low to High
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSortClick("high")}
            >
              High to Low
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
