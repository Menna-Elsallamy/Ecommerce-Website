import React, { useContext, useEffect} from 'react'
import './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { userContext } from '../../components/Context/UserContext'
export default function Layout() {
  const {setUserToken}=useContext(userContext)
  useEffect(() => {
    const token=localStorage.getItem("userToken")
  if(localStorage.getItem("userToken")){
    setUserToken(localStorage.getItem("userToken"))
  }
  }, [])
  
  return (<>
  <Navbar/>
  <Outlet></Outlet>
  <Footer/>
  </>
)
}
