import React, { useContext, useState } from "react";
import exclamation from "../../src/assets/exclamation.png";
import { AppContext } from "../Context/AppProvider";



const DeleteExpense = ({ openDeletePopup, closeDeletePopup }) => {
  const {
    transactions,
    setTransactions,
    selectedTransaction,
    setSelectedTransaction,
  } = useContext(AppContext);


   const handleConfirmDelete = ()=>{
    const deletedTransaction = transactions.filter((expense)=>expense.id !== selectedTransaction.id)
    setTransactions(deletedTransaction);

    localStorage.setItem("transactions" , JSON.stringify(deletedTransaction));
    closeDeletePopup();

   }


  return (
    <>
      {openDeletePopup && (
        <>
          <div
            className="opacity fixed w-full h-full top-0 left-0 "
            onClick={closeDeletePopup}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          ></div>
          <div className="delete-popup-container fixed top-1/4 left-2/5 bg-white flex flex-col gap-2 rounded-xl p-5 justify-center items-center">
            <img src={exclamation} alt="" className="w-32 h-30 mb-4" />
            <div className="flex flex-col align-center text-center  gap-2 ">
              <h2 className="font-bold">Are you sure?</h2>
              <p className="font-bold">Your wont be able to revert this!</p>
              <div className="flex gap-2 content-center justify-center items-center">
                <button
                  className="bg-[#5c6aff] text-white flex items-center justify-center p-2.5 px-5 mt-8 gap-5  rounded-xl font-semibold border-none outline-none cursor-pointer"
                  onClick={() => {
                    handleConfirmDelete();
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-[#ff2146] text-white flex items-center justify-center p-2.5 px-5 mt-8 gap-5  rounded-xl font-semibold border-none outline-none cursor-pointer"
                  onClick={closeDeletePopup}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DeleteExpense;