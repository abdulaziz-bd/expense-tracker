/* eslint-disable react/prop-types */
import ExpenseIcon from "../../../assets/svg/expense/ExpenseIcon";
import CategoryFilterDrawer from "../common/CategoryFilterDrawer";
import SortDrawer from "../common/SortDrawer";

export default function ExpenseHeader({ categoryList, onFilter, onSort }) {
  return (
    <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
          <ExpenseIcon />
        </div>

        <div>
          <h3 className="text-xl font-semibold leading-7 text-gray-800">
            Expense
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <SortDrawer onSortClick={onSort} />

        <CategoryFilterDrawer
          categoryList={categoryList}
          onFilterClick={onFilter}
          filterFrom={"expense"}
        />
      </div>
    </div>
  );
}
