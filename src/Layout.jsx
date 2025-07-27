import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
const Layout = () => {
  return (
    <div className="w-full min-h-screen px-[30px] py-[50px]">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
