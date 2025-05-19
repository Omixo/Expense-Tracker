import React, { useContext, useEffect, useState } from 'react'
import ReactECharts from "echarts-for-react";
import  {AppContext} from '../Context/AppProvider';


const PieChart = ({filteredTransaction , setFilteredTransaction}) => {

  const {transactions} = useContext(AppContext);

  const [foodTotalAmount , setFoodTotalAmount] = useState(null);
  const [groceriesTotalAmount , setGroceriesTotalAmount] = useState(null);
  const [travelTotalAmount , setTravelTotalAmount] = useState(null);
  const [healthTotalAmount , setHealthTotalAmount] = useState(null);

  useEffect(() => {
    setFilteredTransaction(transactions);
  }, [transactions]);
  

  useEffect(() => {
    const foodCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Food and Drinks")
      .reduce((acc, item) => {  
        return parseInt(acc) + parseInt(item.amount);
      }, 0);

    const groceriesCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Groceries")
      .reduce((acc, item) => {
        return parseInt(acc) + parseInt(item.amount);
      }, 0);

    const travelCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Travel")
      .reduce((acc, item) => {
        return parseInt(acc) + parseInt(item.amount);

      }, 0);

    const healthCategory = filteredTransaction
      .filter((transaction) => transaction.category === "Health")
      .reduce((acc, item) => {
        return parseInt(acc) + parseInt(item.amount);
      }, 0);

    setFoodTotalAmount(foodCategory);
    setGroceriesTotalAmount(groceriesCategory);
    setTravelTotalAmount(travelCategory);
    setHealthTotalAmount(healthCategory);
  }, [filteredTransaction]);



  const data1 = [
    { label: "Food and Drinks", value: foodTotalAmount },
    { label: "Groceries", value: groceriesTotalAmount },
    { label: "Health", value: healthTotalAmount },
    { label: "Travel", value: travelTotalAmount, color: "#73c0de" },
  ];


  const option = {
    title: {
      text: "Expenses by Category",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      orient: "vertical",
      left: "left",
      data: data1.map((item) => item.label),
    },
    
    series: [
      {
        name: "Expense",
        type: "pie",
        radius: ["50%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data1.map((item) => ({
          value: item.value,
          name: item.label,
          itemStyle: { color: item.color },
        })),
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%" }}
        opts={{ renderer: "canvas" }} // Optional: to use canvas for rendering (better performance in many cases)
      />
      
    </div>
  );
}

export default PieChart


