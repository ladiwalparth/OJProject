import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
const Layout = () => {
  return (
    <div className="min-h-screen w-full px-[30px] py-[50px]">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
