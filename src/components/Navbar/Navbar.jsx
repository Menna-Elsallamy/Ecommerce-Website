import React, { useContext } from 'react'
import './Navbar.module.css'
import logo from '../../Assets/Photos/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../Context/UserContext'
import { cartContext } from '../Context/CartContext'
export default function Navbar() {
  let {userToken,setUserToken}=useContext(userContext);
  let {numOfCartItems}=useContext(cartContext);

  let navigate=useNavigate();
  function logout(){
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login")
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid px-5">
    <Link to={''} className="navbar-brand">
      <img className='' src={logo} alt=''/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    {userToken&&(<ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
    <li className="nav-item">
        <Link to={'/'} className="nav-link" >Home</Link>
      </li>
      {/* <li className="nav-item">
        <Link to={'/products'} className="nav-link" >Products</Link>
      </li> */}
      <li className="nav-item">
        <Link to={'/cateogeries'} className="nav-link" >Cateogeries</Link>
      </li>
      <li className="nav-item">
        <Link to={'/wishlist'} className="nav-link" >Wishlist</Link>
      </li>
      <li className="nav-item">
        <Link to={'/cart'} className="nav-link position-relative" >cart
        <i className='fa-solid fa-shopping-cart'></i>
        <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>{numOfCartItems}</span>
        </Link>
      </li>
      </ul>)}
  
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <div className="socialmediaicons">
          <i className='fa-brands fa-facebook mx-2'></i>
          <i className='fa-brands fa-youtube  mx-2'></i>
          <i className='fa-brands fa-twitter  mx-2'></i>
          <i className='fa-brands fa-tiktok  mx-2'></i>

        </div>
        {userToken?(
           <li className="nav-item">
           <span onClick={()=>logout()} className="nav-link active cursor-pointer" aria-current="page" >Logout</span>
         </li>
        ):(<><li className="nav-item">
        <Link to={'/login'} className="nav-link active" aria-current="page" >Login</Link>
      </li>
      <li className="nav-item">
        <Link to={'/register'} className="nav-link" aria-disabled="true">Register</Link>
      </li></>)}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
