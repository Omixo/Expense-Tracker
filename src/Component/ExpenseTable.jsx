
import React, { useContext, useEffect, useState } from "react";
import editImage from "../../src/assets/edit.svg";
import deleteImage from "../../src/assets/delete.svg";

import { AppContext } from "../Context/AppProvider";
import EditExpense from "./EditExpense";
import DeleteExpense from "./DeletExpense";
import PieChart from "./PieChart";
import LineChart from "./LineChart";

const ExpenseTable = ({filteredTransaction , setFilteredTransaction}) => {
     const { transactions , setTransactions,selectedTransaction , setSelectedTransaction} = useContext(AppContext);
     

  // const [filteredTransaction, setFilteredTransaction] = useState(transactions); passed from expenseMain to child expense table
  const [openEditExpensePopup , setOpenEditExpensePopup] =  useState(false);
  const [openDeletePopup , setOpenDeletePopup] = useState(false)


  useEffect(()=>{
    setFilteredTransaction(transactions)
  },[transactions]);

  // edit handelling 
  const handleEditPopupClick  = (transaction) =>{
    setSelectedTransaction(transaction);// set previous values
    setOpenEditExpensePopup(true)
  };
  const closeEditPopup = ()=>{
    setOpenEditExpensePopup(false);
  }
 

  // delete handeling 
  const handleDeletePopupClick = (expense) =>{
  setSelectedTransaction(expense)
    setOpenDeletePopup (true);
  }
  const closeDeletePopup = ()=>{
    setOpenDeletePopup(false);
  }


  return (
    <>
      {filteredTransaction?.length > 0 ? (
      <>
        <div className="graph-container flex flex-row m-20">
          <PieChart className="graph-container-content flex-grow" filteredTransaction={filteredTransaction} setFilteredTransaction={setFilteredTransaction} />
          <LineChart className="graph-container-content flex-grow" />
        </div>  

        <div className="expense-table border-2 border-gray-300 rounded-2xl mt-8 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-center py-2 px-4 text-lg font-medium">
                  Sr.no
                </th>
                <th className="text-center py-2 px-4 text-lg font-medium">
                  Expense
                </th>
                <th className="text-center py-2 px-4 text-lg font-medium">
                  Amount
                </th>
                <th className="text-center py-2 px-4 text-lg font-medium">
                  Edit/Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransaction.map((item, index) => {
                return (
                  <tr key={index} className="border-b hover:bg-gray-100">
                    <td className="text-center px-2 py-4">{index + 1}</td>
                    <td className="text-center px-2 py-4">
                      {item.description}
                    </td>
                    <td className="text-center px-2 py-4">{Number(item.amount).toLocaleString()}</td>
                    <td className="text-center px-2 py-4">
                      <div className="table-buttons flex justify-center gap-4">
                        <button
                          type="button"
                          className="table-button gap-2 py-2 px-4 bg-purple-200 text-gray-700 rounded-lg hover:shadow-md"
                          onClick={() => handleEditPopupClick(item)}
                        >
                          <img
                            src={editImage}
                            alt=""
                            srcset=""
                            className="w-5 h-5"
                          />
                        </button>
                        <button
                          type="button"
                          className="table-button gap-2 py-2 px-4 bg-red-400 text-gray-700 rounded-lg hover:shadow-md"
                          onClick={() => handleDeletePopupClick(item)}
                        >
                          <img
                            src={deleteImage}
                            alt=""
                            srcset=""
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
     ):(
      <h2 className="Alert flex justify-center text-center text-red-500 text-2xl font-bold m-25 ">No Expenses Added !!</h2>
    )} 

    <DeleteExpense openDeletePopup={openDeletePopup} closeDeletePopup={closeDeletePopup} />
    <EditExpense openEditExpensePopup={openEditExpensePopup} closeEditPopup={closeEditPopup} />
    </>
  );
};

export default ExpenseTable;