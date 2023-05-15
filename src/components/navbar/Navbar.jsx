import React from 'react';
import { NavLink,Link} from 'react-router-dom';

import AccountAccess from './AccountAccess';

const Navbar = () => {

  const StyleLogo = ({isActive, isPending})=>{
    return{
      textDecoration: "none",
      padding:"0 5px",
      color:"black",
      borderBottom: isActive? "10px solid black ":"none",
    }
  }

  return (    
  <nav className="navbar navbar-expand-lg componentWrappers">
    <div className="navbarWrapper w-100 d-lg-flex">
      <div className="d-flex justify-content-between" style={{minWidth:"fit-content"}}>
        <NavLink to="/" style={StyleLogo}>
          <h1 className="fs-3">
            BuyNG<i className="bi bi-bag"></i>
          </h1>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 accessWrapper d-lg-flex w-100">
          <AccountAccess/>
          <li className="nav-item">
            <i className="bi bi-cart3" style={{fontSize:'23px'}}/>            
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Help</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar