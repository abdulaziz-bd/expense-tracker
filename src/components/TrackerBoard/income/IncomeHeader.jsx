/* eslint-disable react/prop-types */
import IncomeIcon from "../../../assets/svg/income/IncomeIcon";
import CategoryFilterDrawer from "../common/CategoryFilterDrawer";
import SortDrawer from "../common/SortDrawer";

export default function IncomeHeader({
  categoryList,
  filterCategory,
  onFilter,
  onSort,
}) {
  return (
    <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
      {/* icon */}
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
          <IncomeIcon />
        </div>

        <div>
          <h3 className="text-xl font-semibold leading-7 text-gray-800">
            Income
          </h3>
        </div>
      </div>

      {/* Sorting and Filtering */}
      <div className="flex items-center gap-2">
        <SortDrawer onSortClick={onSort} />

        <CategoryFilterDrawer
          categoryList={categoryList}
          selectedCategories={filterCategory}
          onFilterClick={onFilter}
          filterFrom={"income"}
        />
      </div>
    </div>
  );
}
