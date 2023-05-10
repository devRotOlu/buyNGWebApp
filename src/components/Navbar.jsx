import React,{useState,useEffect, useContext} from 'react';
import { NavLink,Link,useLocation } from 'react-router-dom';

import {buyNGAxios} from '../axios/axios';
import { appContext } from '../context/ContextWrapper';

const Navbar = () => {

  const currentLocation = useLocation();
  const {pathname} = currentLocation;

  const appStates = useContext(appContext);
  const {
          isSignedIn,setIsSignedIn,
          userDetails,removeCokie,
        } = appStates;

  const logoutDisplay = isSignedIn? "block":"none";
  const signinDisplay = isSignedIn? "none" : "block"; 

  const addProduct = isSignedIn? "/product/add-product/about-product":"/identification";

  const handleLogOut= ()=>{
    removeCokie("userDetails");
    setIsSignedIn(false);
  }

  const StyleLogo = ({isActive, isPending})=>{
    return{
      textDecoration: "none",
      padding:"0 5px",
      color:"black",
      borderBottom: isActive? "10px solid black ":"none",
    }
  }

  return (    
  <nav className="navbar navbar-expand-lg">
    <div className="container-lg">
      <NavLink to="/" style={StyleLogo}>
        <h1>
          BuyNG<i className="bi bi-bag"></i>
        </h1>
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
          </li> */}
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle accountTab" href="#" data-bs-toggle="dropdown" aria-expanded="false">
               {
                isSignedIn?
                <span style={{fontWeight:"bold"}}>
                  <i className="bi bi-person-check" style={{fontSize:"20px"}}/>
                  <span> Hi, {userDetails.firstName}</span>
                </span>:
                "Account"
               }
             </a>
             <ul className="dropdown-menu py-0">
                <li className={`accountLinks signInLink d-${signinDisplay}`}>
                  <Link className="text-white py-2" style={{textDecoration:'none',backgroundColor: "orange",display:"block",
                  borderRadius: "5px", boxShadow:"2px 2px grey"}}  to="/identification" state={{previousPath:pathname}}>
                    SIGN IN
                  </Link>
                </li>
                <li className="accountLinks userLinks">
                  <i className="bi bi-person-fill icons" style={{fontSize:'23px'}}/>  
                  <Link className="aTag" to="/">
                    My Account
                  </Link>
                </li>
                <li className="accountLinks userLinks">
                  <i className="bi bi-bag-fill icons" style={{fontSize:'23px'}}/>
                  <Link className="aTag" to={addProduct}>
                    Add Product
                  </Link>
                </li>
                <li className={`accountLinks userLinks logOutLink d-${logoutDisplay}`}>
                  <Link onClick={handleLogOut} className="logOutTag" to="/" style={{textDecoration:'none',color:'orange'}}>
                    LOGOUT
                  </Link>
                </li>
             </ul>
          </li>
          <li className="nav-item">
            <i className="bi bi-cart3" style={{fontSize:'23px'}}/>            
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
  )
}

export default Navbar