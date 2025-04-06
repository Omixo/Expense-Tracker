import React from 'react';

const Footer = () => {
    return (
      <div className="w-full text-center text-xl py-5 font-[Satisfy] shadow-lg rounded-t-3xl ">
        Made with <span className="text-red-500">❤</span> by{" "}
        <a
          href="https://github.com/Omixo/Expanse-Budget"
          target="_blank"
          rel="noopener noreferrer"
          className="font-[Satisfy]"
        >
         Omkar Swami
        </a>
      </div>
    );
  };
  
  export default Footer;