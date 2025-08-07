import React from 'react';
import weblogo from '../../assets/FinalLogoOJcopy.png';
import { NavLink, Link, useLocation, useLoaderData } from 'react-router-dom';
import { logoutUser } from '../../service/api';
const Header = () => {
  const location = useLocation();
  const loader = useLoaderData();
  const currentPath = location.pathname;
  const handleOnClick = () => {
    logoutUser();
  }
  return (
    <>
      <header className="grid grid-cols-9 grid-rows-[80px_80px] w-full gap-x-2 gap-y-2">
        <Link
          to="/"
          className="border border-black h-full w-full col-span-2"
        >
          <img src={weblogo} alt="Website Logo" className="border border-black h-full w-full col-span-2" /></Link>
        {/* <div className="col-start-8 col-span-2 flex items-center justify-end">
          <Link to='/enter' className='text-center text-2xl text-[#323754]'>Enter</Link>
          <span className='text-center text-2xl text-[#323754] mx-2'>|</span>
          <Link to='/register' className='text-center text-2xl text-[#323754]'>Register</Link>
          {if(location.path === "/enter"){
          <Link to='/register' className='text-center text-2xl text-[#323754]'>Register</Link>
        } else if(location.path === "/register"){
          <Link to='/enter' className='text-center text-2xl text-[#323754]'>Enter</Link>
        } else if(loader){
          <Link to='/' className='text-center text-2xl text-[#323754]'>loader.userId</Link>
        } else {
          <Link to='/enter' className='text-center text-2xl text-[#323754]'>Enter</Link>
          <span className='text-center text-2xl text-[#323754] mx-2'>|</span>
          <Link to='/register' className='text-center text-2xl text-[#323754]'>Register</Link>
        }}
        </div> */}
        <div className="col-start-8 col-span-2 flex items-center justify-end">
          {currentPath === "/enter" ? (
            <Link to="/register" className="text-center text-2xl text-[#323754] mr-10 font-semibold underline">Register</Link>
          ) : currentPath === "/register" ? (
            <Link to="/enter" className="text-center text-2xl text-[#323754] mr-10 font-semibold underline">Enter</Link>
          ) : loader?.id ? (
            <>
              <Link to="/" className="text-center text-2xl text-[#323754] font-semibold underline">{loader.id} </Link>
              <span className="text-center text-2xl text-[#323754] mx-2 font-semibold underline">|</span>
              <button onClick={handleOnClick} className="text-center text-2xl text-[#323754] font-semibold underline cursor-pointer">Logout</button>
            </>
          ) : (
            <>
              <Link to="/enter" className="text-center text-2xl text-[#323754] font-semibold underline">Enter</Link>
              <span className="text-center text-2xl text-[#323754] mx-2 font-semibold underline">|</span>
              <Link to="/register" className="text-center text-2xl text-[#323754] font-semibold underline">Register</Link>
            </>
          )}
        </div>
        <div className="col-span-9 flex items-center">
          <div className="border-2 border-[#323754] rounded-md w-full h-[70%] flex items-center justify-start p-3 px-6 gap-10">
            <Link to="/" className="text-2xl text-[#323754] font-semibold">Home</Link>
            <Link to="/problemSet" className="text-2xl text-[#323754] font-semibold">ProblemSet</Link>
            <Link to="/Submissions" className="text-2xl text-[#323754] font-semibold">Submissions</Link>
          </div>
        </div>



      </header>
    </>
  );
};

export default Header;


