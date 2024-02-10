import React from 'react'
import './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
export default function Layout() {
  return (<>
  <Navbar/>
  <Outlet></Outlet>
  <Footer/>
  </>
)
}
