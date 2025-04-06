import React, { useContext, useState } from "react";
import { AppContext } from "../Context/AppProvider";

const AddBudget = ({ openBudgetPopup, closeBudgetPopup }) => {
  const { setBudget } = useContext(AppContext);

  const [inputBudget, setInputBudget] = useState("");
  const [errors, setErrors] = useState({});

  if (!openBudgetPopup) return null;

  const validate = () => {
    const error = {};
    if (!inputBudget || Number(inputBudget) <= 0) {
      error.inputBudget = "Please enter a valid amount!";
    }
    setErrors(error);
    return Object.keys(error).length === 0;
  };

  const handleChangeBudget = (newBudget) => {
    setBudget(newBudget);
    localStorage.setItem("budget", JSON.stringify(newBudget));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    handleChangeBudget(inputBudget);
    setInputBudget("");
    closeBudgetPopup();
  };

  return (
    <>
      <div
        className="fixed w-full h-full top-0 left-0 bg-black bg-opacity-50 z-10"
        onClick={closeBudgetPopup}
      ></div>

      <div className="fixed top-1/4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg z-20 w-[90%] max-w-md">
        <div className="relative p-4 border-b border-gray-300">
          <span
            className="absolute top-3 right-4 text-2xl cursor-pointer"
            onClick={closeBudgetPopup}
          >
            &times;
          </span>
          <h2 className="text-2xl font-bold">Add Budget</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-lg">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              min={0}
              placeholder="Enter your budget"
              value={inputBudget}
              onChange={(e) => setInputBudget(e.target.value)}
              className="border border-gray-400 rounded-md p-2 text-lg"
            />
            {errors.inputBudget && (
              <span className="text-red-500 text-sm">{errors.inputBudget}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit Budget
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBudget;
