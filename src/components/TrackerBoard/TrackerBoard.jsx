import { useState } from "react";
import BalanceCard from "./BalanceCard";
import ExpenseCard from "./expense/ExpenseCard";
import IncomeCard from "./income/IncomeCard";
import TrackerCard from "./TrackerCard";

export default function TrackerBoard() {
  const [incomes, setIncomes] = useState([
    {
      id: crypto.randomUUID(),
      amount: 10000,
      date: "2023-01-01",
      category: "Salary",
    },
  ]);

  const [expenses, setExpenses] = useState([
    {
      id: crypto.randomUUID(),
      amount: 5000,
      date: "2023-01-02",
      category: "Education",
    },
  ]);

  const [incomeCategories, setIncomeCategories] = useState([
    "Salary",
    "Outsourcing",
    "Bond",
    "Dividend",
  ]);
  const [expenseCategories, setExpenseCategories] = useState([
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ]);

  const [active, setActive] = useState("expense");
  const [editItem, setEditItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState({
    income: [],
    expense: [],
  });

  const handleTrackerActive = (nextActive) => {
    setActive(nextActive);
  };

  const handleNewTrack = (track) => {
    if (active === "expense") {
      setExpenses([...expenses, track]);
    } else {
      setIncomes([...incomes, track]);
    }
  };

  const handleEditIncome = (income) => {
    setEditItem(income);
    setActive("income");
  };

  const handleDeleteIncome = (incomeToDelete) => {
    const newIncomes = incomes.filter(
      (income) => income.id !== incomeToDelete.id
    );
    setIncomes(newIncomes);
  };

  const handleEditExpense = (expense) => {
    setEditItem(expense);
    setActive("expense");
  };

  const handleDeleteExpense = (expenseToDelete) => {
    const newExpenses = expenses.filter(
      (expense) => expense.id !== expenseToDelete.id
    );
    setExpenses(newExpenses);
  };

  const handleUpdateTrack = (track) => {
    if (active === "expense") {
      const newExpenses = expenses.map((expense) => {
        if (expense.id === track.id) {
          return track;
        }
        return expense;
      });
      setExpenses(newExpenses);
    } else {
      const newIncomes = incomes.map((income) => {
        if (income.id === track.id) {
          return track;
        }
        return income;
      });
      setIncomes(newIncomes);
    }
  };

  const handleIncomeSort = (sort) => {
    setIncomes((prevIncomes) => {
      const newIncomes = [...prevIncomes];
      if (sort === "low") {
        newIncomes.sort((a, b) => a.amount - b.amount);
      } else if (sort === "high") {
        newIncomes.sort((a, b) => b.amount - a.amount);
      }
      return newIncomes;
    });
  };

  const handleExpenseSort = (sort) => {
    setExpenses((prevExpenses) => {
      const newExpenses = [...prevExpenses];
      if (sort === "low") {
        newExpenses.sort((a, b) => a.amount - b.amount);
      } else if (sort === "high") {
        newExpenses.sort((a, b) => b.amount - a.amount);
      }
      return newExpenses;
    });
  };

  const handleFilterChange = (type, category) => {
    setFilterCategory((prevFilterCategory) => {
      return {
        ...prevFilterCategory,
        [type]: category,
      };
    });
  };

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <TrackerCard
          category={active === "expense" ? expenseCategories : incomeCategories}
          onTrackerActive={handleTrackerActive}
          active={active}
          onSaveTrack={handleNewTrack}
          editItem={editItem}
          onUpdateTrack={handleUpdateTrack}
          onCancelEdit={() => setEditItem(null)}
        />

        <div className="lg:col-span-2">
          <BalanceCard incomes={incomes} expenses={expenses} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <IncomeCard
              incomes={incomes}
              category={incomeCategories}
              filterCategory={filterCategory.income}
              onSort={handleIncomeSort}
              onFilter={handleFilterChange}
              onEdit={handleEditIncome}
              onDelete={handleDeleteIncome}
            />

            <ExpenseCard
              expenses={expenses}
              category={expenseCategories}
              filterCategory={filterCategory.expense}
              onSort={handleExpenseSort}
              onFilter={handleFilterChange}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
