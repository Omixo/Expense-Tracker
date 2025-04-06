import React, { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../Context/AppProvider";

const AddExpense = ({ openExpensePopup, closeAddExpensePopup }) => {
  const [newExpenseTitle, setNewExpenseTitle] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [errors, setErrors] = useState({});

  const { transactions, setTransactions, setActiveButton } = useContext(AppContext);

  useEffect(() => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    setInitialDate(`${year}-${month}-${day}`);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!newExpenseTitle) newErrors.newExpenseTitle = "Please enter a title.";
    if (!date) newErrors.date = "Please select a date.";
    if (!category) newErrors.category = "Please choose a category.";
    if (!newExpenseAmount) newErrors.newExpenseAmount = "Please enter amount.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newExpense = {
      id: uuidv4(),
      description: newExpenseTitle,
      category,
      date,
      amount: newExpenseAmount,
    };

    const updatedExpenses = [...transactions, newExpense];
    setTransactions(updatedExpenses);
    setActiveButton(0);
    localStorage.setItem("transactions", JSON.stringify(updatedExpenses));

    // Reset form
    setNewExpenseTitle("");
    setDate("");
    setCategory("");
    setNewExpenseAmount("");
    closeAddExpensePopup();
  };

  if (!openExpensePopup) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={closeAddExpensePopup}
      ></div>

      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg z-20 w-[90%] max-w-md">
        <div className="relative border-b border-gray-300 p-4">
          <h2 className="text-2xl font-bold">Add Expense</h2>
          <span
            className="absolute top-3 right-4 text-2xl cursor-pointer"
            onClick={closeAddExpensePopup}
          >
            &times;
          </span>
        </div>

        <form onSubmit={handleExpenseSubmit} className="p-6 flex flex-col gap-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="text-lg font-medium">
              Expense Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Lunch, Uber"
              value={newExpenseTitle}
              onChange={(e) => setNewExpenseTitle(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-400 rounded-md"
            />
            {errors.newExpenseTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.newExpenseTitle}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="text-lg font-medium">
              Date
            </label>
            <input
              id="date"
              type="date"
              max={initialDate}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-400 rounded-md"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-lg font-medium">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-400 rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Food and Drinks">Food and Drinks</option>
              <option value="Groceries">Groceries</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="text-lg font-medium">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              min={0}
              placeholder="e.g. 500"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-400 rounded-md"
            />
            {errors.newExpenseAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.newExpenseAmount}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mt-2"
          >
            Add Expense
          </button>
        </form>
      </div>
    </>
  );
};

export default AddExpense;
