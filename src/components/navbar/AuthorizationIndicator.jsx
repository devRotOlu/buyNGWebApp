import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleUp} from "@fortawesome/free-solid-svg-icons";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";

import DropDownTrigger from '../DropDownTrigger';

const AuthorizationIndicator = ({userDetails,isSignedIn}) => {
    
  return (
    <DropDownTrigger triggerClass="accountTab">
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
    </DropDownTrigger>
  )
}

export default AuthorizationIndicator