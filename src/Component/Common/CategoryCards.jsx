import React from 'react';

const CategoryCards = ({
    icon ,
    category ,
    handleCategoryChange , 
    activeButton ,
    index,
  }) => {
    return (
      <>
        <button className={`category-btn  flex p-2.5 px-5 mt-8 gap-5 bg-gray-100 rounded-full cursor-pointer hover:shadow-md
         ${activeButton === index ? "bg-indigo-400":""}`}
        onClick={()=>{handleCategoryChange(category,index)}} > 
        {icon}
        {category}
        
        </button>
      </>
    )
  }
  
  export default CategoryCards