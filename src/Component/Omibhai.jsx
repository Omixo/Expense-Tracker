import React, { useContext, useState} from 'react'
import CategoryCards from "./Common/CategoryCards";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Correct usage
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { AppContext } from '../Context/AppProvider';
// Toast for download success
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Omibhai = () => {
     const {activeButton , transactions , budget} = useContext(AppContext)
    // ✅ PDF Export
  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor("#2c3e50");
    doc.text(" Expense Report", 14, 20);
    doc.setFontSize(12);
    doc.setTextColor("#555");
  
    const tableColumn = ["Date", "Description", "Amount", "Category", "Remaining Budget"];
    const tableRows = [];
  
    let runningBudget = budget;
  
    data.forEach((item) => {
      const amount = parseFloat(item.amount) || 0;
      runningBudget -= amount;
  

      const row = [
        item.date || "N/A",
        item.description || "N/A",
        `Rs.${amount.toFixed(2)}`,
        item.category || "N/A",
        `Rs.${runningBudget.toFixed(2)}`
      ];
      tableRows.push(row);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        cellPadding: 4,
        textColor: "#333",
      },
      headStyles: {
        fillColor: [52, 152, 219], // blue header
        textColor: "#fff",
        fontSize: 11,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
      theme: "grid",
    });
  
    doc.save("all_Expense_Report.pdf");
    toast.success("all PDF Downloaded Successfully! 💃🕺");
  };
   const [filteredTransaction, setFilteredTransaction] = useState(transactions);
   
   

  return (
    <>
    
        <CategoryCards
            category="Downloads"
            icon={<MdOutlinePictureAsPdf className="text-2xl" />}
            index={5}
            activeButton={activeButton}
            handleCategoryChange={() => {
              console.log("Downloading PDF...");
              generatePDF(filteredTransaction);
            }}
          />

      
    </>
  )
}

export default Omibhai
