import React,{useContext} from 'react';
import { useLocation} from 'react-router-dom';


import { appContext } from '../../context/ContextWrapper';

import AuthorizationIndicator from './AuthorizationIndicator';
import AccountUtility from './AccountUtility';


const AccountAccess = () => {

    const appStates = useContext(appContext);
    const {
        isSignedIn,setIsSignedIn,
        userDetails,removeCokie
    } = appStates

    const currentLocation = useLocation();
    const {pathname} = currentLocation;

    const handleLogOut= (event)=>{
        event.preventDefault();
        console.log("handling logout")
        removeCokie("userDetails");
        setIsSignedIn(false);
    }

    const logoutDisplay = isSignedIn? "flex":"none";
    const signinDisplay = isSignedIn? "none" : "block";

    const addProduct = isSignedIn? "/product/add-product/about-product":"/identification";

  return (
    <li className="nav-item dropdown">
        <AuthorizationIndicator userDetails={userDetails} isSignedIn={isSignedIn}/>
        <AccountUtility propsObject={{
            signinDisplay,pathname,
            addProduct,logoutDisplay,
            handleLogOut
        }}/>
    </li>
    )
}

export default AccountAccess