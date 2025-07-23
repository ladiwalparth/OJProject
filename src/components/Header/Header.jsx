import React from 'react';
import weblogo from '../../assets/FinalLogoOJcopy.png';
import { NavLink, Link } from 'react-router-dom';
const Header = () => {
  return (
    <>
      <header className="grid grid-cols-9 grid-rows-2 w-full h-[175px] gap-x-2 gap-y-2">
        <Link
          to="/"
          className="border border-black h-full w-full col-span-2"
        >
          <img src={weblogo} alt="Website Logo" className="border border-black h-full w-full col-span-2" /></Link>
        <div className="col-start-8 col-span-2 flex items-center justify-end">
          <Link to='/enter' className='text-center text-2xl text-[#323754]'>Enter</Link>
          <span className='text-center text-2xl text-[#323754] mx-2'>|</span>
          <Link to='/register' className='text-center text-2xl text-[#323754]'>Register</Link>
        </div>
        <div className="col-span-9 flex justify-left items-center">
          <div className="border-2 border-[#323754] rounded-md w-full h-[90%]"></div>
        </div>



      </header>
    </>
  );
};

export default Header;


