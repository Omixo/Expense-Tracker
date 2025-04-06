import React from 'react'
import PropTypes from 'prop-types'; // Import PropTypes

const ButtonCards = ({icon , buttonname , handleModalChange}) => {
  return (
    <button className='category-card bg-[#5c6aff] text-white flex items-center justify-center p-2.5 px-5 mt-8 gap-5  rounded-xl font-semibold border-none outline-none cursor-pointer' 
    onClick={handleModalChange}>
        {icon}
        {buttonname}
    </button>
  )
}

ButtonCards.propTypes = {
  icon: PropTypes.element.isRequired, // icon should be a React element
  buttonname: PropTypes.string.isRequired, // buttonname should be a string
  handleModalChange: PropTypes.func.isRequired, // handleModalChange should be a function
};
export default ButtonCards