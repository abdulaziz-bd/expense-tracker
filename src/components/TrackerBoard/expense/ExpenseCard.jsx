/* eslint-disable react/prop-types */
import ExpenseHeader from "./ExpenseHeader";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseCard({
  expenses,
  category,
  filterCategory,
  onFilter,
  onSort,
  onEdit,
  onDelete,
}) {
  return (
    <div className="border rounded-md">
      <ExpenseHeader
        categoryList={category}
        onFilter={onFilter}
        onSort={onSort}
      />

      <div className="p-4 divide-y">
        {expenses.map((expense) => {
          if (filterCategory.length === 0) {
            return (
              <div key={expense.id}>
                <ExpenseItem
                  expense={expense}
                  onEditExpense={onEdit}
                  onDeleteExpense={onDelete}
                />
              </div>
            );
          } else {
            if (filterCategory.includes(expense.category)) {
              return (
                <div key={expense.id}>
                  <ExpenseItem
                    expense={expense}
                    onEditExpense={onEdit}
                    onDeleteExpense={onDelete}
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
