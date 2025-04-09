import React, { useContext, useEffect, useState } from "react";
import budgetImage from "../assets/budget.svg";
import expenseImage from "../assets/expense.svg";
import coinstack from "../assets/coin-stack.svg";
import { AppContext } from "../Context/AppProvider";

// Toast for download success
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Icons
import { CiEdit, CiPizza, CiSearch } from "react-icons/ci";
import { MdDelete, MdHealthAndSafety, MdOutlinePictureAsPdf } from "react-icons/md";
import { BsSuitcase } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { IoMdAdd } from "react-icons/io";

import AddBudget from "./AddBudget";
import AddExpence from "./AddExpense";
import ExpenseTable from "./ExpenseTable";
import Footer from "./Footer";
import CategoryCards from "./Common/CategoryCards";
import ButtonCards from "./Common/ButtonCards";
import BudgetCards from "./Common/Budgetcard";
import Omibhai from "./Omibhai";


// <Omibhai
//   filteredTransaction={filteredTransaction}
//   activeButton={activeButton}
//   budget={budget}
// />


const ExpenseMainApp = () => {
  const { budget, expense, transactions, activeButton, setActiveButton } = useContext(AppContext);

  const [openBudgetPopup, setOpenBudgetPopup] = useState(false);
  const [openExpensePopup, setOpenExpensePopup] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTransaction, setFilteredTransaction] = useState(transactions);

  // Budget
  const handleBudgetPopupClick = () => setOpenBudgetPopup(true);
  const closeBudgetPopup = () => setOpenBudgetPopup(false);

  // Expense
  const handleExpensePopupClick = () => setOpenExpensePopup(true);
  const closeAddExpensePopup = () => setOpenExpensePopup(false);

  // Filter - All
  const handleAllExpense = () => {
    setActiveButton(0);
    setFilteredTransaction(transactions);
  };

  // Filter - Category
  const handleCategoryChange = (category, index) => {
    setActiveButton(index);
    const filteredData = transactions.filter((item) => item.category === category);
    applySearchFilter(filteredData);
  };

  // Search
  const applySearchFilter = (data) => {
    if (!searchInput.trim()) {
      setFilteredTransaction(data);
      return;
    }

    const filteredData = data.filter((item) =>
      item.description.toLowerCase().includes(searchInput.toLowerCase().trim())
    );
    setFilteredTransaction(filteredData);
  };

  useEffect(() => {
    applySearchFilter(transactions);
  }, [transactions]);

  useEffect(() => {
    applySearchFilter(transactions);
  }, [searchInput]);



  return (
    <>
      <div className="main-container">
        <div className="flex flex-row">
        <h1 className="user text-gray-900 font-bold text-5xl px-5 py-8">
          Hello Omkar Swami,
        </h1>
        <div>
          <Omibhai />
        </div>

        </div>

        {/* Budget Cards */}
        <div className="budget-container flex flex-row gap-5 px-10">
          <BudgetCards title="Total Budget" budget={budget} image={budgetImage} />
          <BudgetCards title="Total Expense" budget={expense} image={expenseImage} />
          <BudgetCards title="Remaining Budget" budget={budget - expense} image={coinstack} />
        </div>

        {/* Category Filters + Buttons */}
        <div className="category-container flex flex-row gap-2.5 flex-wrap">
          {/* Search Input */}
          <div className="search-container flex p-2.5 px-5 mx-12 mt-8 gap-2 bg-gray-100 cursor-pointer rounded-full">
            <input
              className="border-0 outline-0 bg-gray-100 text-base"
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Filter Buttons */}
          <CategoryCards
            category="All Expense"
            icon={<FontAwesomeIcon icon={faFileInvoiceDollar} className="text-1xl" />}
            index={0}
            activeButton={activeButton}
            handleCategoryChange={handleAllExpense}
          />
          <CategoryCards
            category="Food and Drinks"
            icon={<CiPizza className="text-1xl" />}
            index={1}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            category="Groceries"
            icon={<HiOutlineShoppingBag className="text-2xl" />}
            index={2}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            category="Travel"
            icon={<BsSuitcase className="text-2xl" />}
            index={3}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />
          <CategoryCards
            category="Health"
            icon={<MdHealthAndSafety className="text-2xl" />}
            index={4}
            activeButton={activeButton}
            handleCategoryChange={handleCategoryChange}
          />

          
          {/* <CategoryCards
            category="Downloads"
            icon={<MdOutlinePictureAsPdf className="text-2xl" />}
            index={5}
            activeButton={activeButton}
            handleCategoryChange={() => {
              console.log("Downloading PDF...");
              generatePDF(filteredTransaction);
            }}
          /> */}

          {/* Add Buttons */}
          <ButtonCards
            icon={<IoMdAdd />}
            buttonname="Add Budget"
            handleModalChange={handleBudgetPopupClick}
          />
          <ButtonCards
            icon={<IoMdAdd />}
            buttonname="Add Expense"
            handleModalChange={handleExpensePopupClick}
          />
        </div>

        {/* Popups & Table */}
        <AddBudget
          openBudgetPopup={openBudgetPopup}
          closeBudgetPopup={closeBudgetPopup}
        />
        <AddExpence
          openExpensePopup={openExpensePopup}
          closeAddExpensePopup={closeAddExpensePopup}
        />
        <ExpenseTable
          filteredTransaction={filteredTransaction}
          setFilteredTransaction={setFilteredTransaction}
        />

        <Footer />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </>
  );
};

export default ExpenseMainApp;
