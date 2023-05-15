import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

const AuthorizationIndicator = ({userDetails,isSignedIn}) => {
    
  return (
    <a className="nav-link accountTab" href="#" data-bs-toggle="dropdown" aria-expanded="false">
        {
            isSignedIn?
            <span className="userProfile">
                <i className="bi bi-person-check" style={{fontSize:"25px"}}/>
                <span> Hi, {userDetails.firstName}</span>
            </span>:
            <span className="userProfile">
                <i className="bi bi-person" style={{fontSize:"25px"}}/>
                <span> Account </span>
            </span>
        }
        <FontAwesomeIcon icon={faAngleUp} className="angleUp"/>
        <FontAwesomeIcon icon={faAngleDown} className="angleDown"/>
    </a>
  )
}

export default AuthorizationIndicator