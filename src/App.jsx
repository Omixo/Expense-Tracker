import React from 'react'
import Header from './component/Header'
import AppProvider from './Context/AppProvider'
import ExpenseMainApp from './Component/ExpenseMainApp'

const App = () => {
  return (
    <>
      <Header/>
     <AppProvider>
<ExpenseMainApp/>
     </AppProvider>
    </>
  )
}

export default App

