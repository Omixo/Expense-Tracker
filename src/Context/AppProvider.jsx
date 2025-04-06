import React, { createContext, useEffect, useState } from 'react'
export const AppContext = createContext()

// const AppProvider = (props) => {
const AppProvider = ({children}) => {

    const [budget , setBudget] = useState(0);
    const [expense,setExpense] = useState(null);
    const [transactions,setTransactions] = useState([]);
    const [selectedTransaction,setSelectedTransaction] = useState(null);

    //popups states
    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
      const savedBudget = localStorage.getItem('budget');
      if (savedBudget) {
        try {
          setBudget(JSON.parse(savedBudget));
        } catch (error) {
          console.error('Error parsing budget from localStorage', error);
        }
      }
    }, []);
  
    useEffect(() => {
      const savedTransactions = localStorage.getItem('transactions');
      if (savedTransactions) {
        try {
          setTransactions(JSON.parse(savedTransactions));
        } catch (error) {
          console.error('Error parsing transactions from localStorage', error);
        }
      }
    }, []);
    

   useEffect(()=>{
    const calculateExpense=()=>{
      const totalExpense = transactions.reduce((acc , transaction)=>{
        return acc + parseInt(transaction.amount)
      },0);
      setExpense(totalExpense);
    };
    calculateExpense();
   },[transactions]);
    //edit and delete popups 



  return (
    <AppContext.Provider
        value={{
            budget,
            setBudget,
            expense,
            transactions,
            setTransactions,
            selectedTransaction ,
            setSelectedTransaction ,
            activeButton , 
            setActiveButton

          //  handleExpensePopupClick,//have to remove this
          //  handleExpensedataChange , //addinh expense
        }}
    >
        {children}
    </AppContext.Provider>

  )
}

export default AppProvider