
import React,{useRef,useEffect,useState,useContext} from "react";

import { appContext } from '../../../context/ContextWrapper';
import {verifyPasswordStrength} from "../../../helperFunctions/helperFunctions"


const PasswordStrengthGuage = ({isValidUserDetails})=>{

    console.log(isValidUserDetails,"userDeals")

    const passwordIndicator = useRef();

    const [passwordStrengthIndex,setPasswordStrengthIndex] = useState(0)

    const appStates = useContext(appContext);
    const{userDetails:{password}} = appStates;

    const backgroundColor = (passwordStrengthIndex === 1)? "brown":(passwordStrengthIndex === 2)?"orangered":"green";

    useEffect(()=>{
        verifyPasswordStrength(passwordIndicator, password, setPasswordStrengthIndex,isValidUserDetails);
    },[password, isValidUserDetails])

    return(
        <div ref={passwordIndicator} className="passwordIndicatorWrapper">
                <div className="d-flex justify-content-between">
                    <div className="passwordStrengthIndicator" style={{visibility:`${(passwordStrengthIndex > 0)?"visible":"hidden" }`,backgroundColor}}></div>
                    <div className="passwordStrengthIndicator"  style={{visibility:`${(passwordStrengthIndex > 1)?"visible":"hidden" }`,backgroundColor}}></div>
                    <div className="passwordStrengthIndicator" style={{visibility:`${(passwordStrengthIndex > 2)?"visible":"hidden" }`,backgroundColor}}></div>
                </div>
                <p style={{marginLeft:"auto",width:"fit-content",color:`${backgroundColor}`}}>
                    {
                        (passwordStrengthIndex === 1)? "Weak":(passwordStrengthIndex === 2)? "Medium":(passwordStrengthIndex === 3)? "Strong":""
                    }
                </p>
        </div>

    )
}

export default PasswordStrengthGuage;

