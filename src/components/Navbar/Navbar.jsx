import React from 'react'
import './Navbar.module.css'
import logo from '../../Assets/Photos/png-clipart-shopping-cart-online-shopping-shopping-cart-text-logo.png'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid px-5">
    <Link to={''} className="navbar-brand">
      <img className='w-25' src={logo} alt=''/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <div className="socialmediaicons">
          <i className='fa-brands fa-facebook mx-2'></i>
          <i className='fa-brands fa-youtube  mx-2'></i>
          <i className='fa-brands fa-twitter  mx-2'></i>
          <i className='fa-brands fa-tiktok  mx-2'></i>

        </div>
        <li className="nav-item">
          <Link to={''} className="nav-link active" aria-current="page" >Login</Link>
        </li>
        <li className="nav-item">
          <Link to={'/register'} className="nav-link" aria-disabled="true">Register</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
