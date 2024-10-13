/* eslint-disable react/prop-types */
import IncomeHeader from "./IncomeHeader";
import IncomeItem from "./IncomeItem";

export default function IncomeCard({
  incomes,
  category,
  filterCategory,
  onFilter,
  onSort,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border rounded-md relative">
      <IncomeHeader
        categoryList={category}
        onFilter={onFilter}
        onSort={onSort}
      />

      <div className="p-4 divide-y">
        {incomes.map((income) => {
          if (filterCategory.length === 0) {
            return (
              <div key={income.id}>
                <IncomeItem
                  income={income}
                  onEditIncome={onEdit}
                  onDeleteIncome={onDelete}
                />
              </div>
            );
          } else {
            if (filterCategory.includes(income.category)) {
              return (
                <div key={income.id}>
                  <IncomeItem
                    income={income}
                    onEditIncome={onEdit}
                    onDeleteIncome={onDelete}
                  />
                </div>
              );
            }
          }
        })}
      </div>
    </div>
  );
}
