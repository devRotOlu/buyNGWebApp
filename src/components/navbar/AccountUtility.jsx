import React from 'react';
import { Link } from 'react-router-dom';

import DropDown from '../DropDown';

const AccountUtility = (props) => {

    const {
            signinDisplay,pathname,
            addProduct,logoutDisplay,
            handleLogOut
        } = props.propsObject;

  return (
    <DropDown styleObject={{minWidth:"210px"}}>
        <li className={`accountAccess signInLink d-${signinDisplay}` }>
            <Link className="text-white signIn"  to="/identification" state={{previousPath:pathname}}>
                SIGN IN
            </Link>
        </li>
        <li className="resourceLinks userLinks">
            <i className="bi bi-person-fill icons" style={{fontSize:'23px'}}/>  
            <Link className="text-muted" to="/">
                My Account
            </Link>
        </li>
        <li className="resourceLinks userLinks">
            <i className="bi bi-bag-fill icons" style={{fontSize:'23px'}}/>
            <Link className="text-muted"  to={addProduct}>
                Add Product
            </Link>
        </li>
        <li className="logOutLink" style={{display:logoutDisplay}}>
            <Link onClick={handleLogOut}  to="/">
                LOGOUT
            </Link>
        </li>
    </DropDown>
  )
}

export default AccountUtility