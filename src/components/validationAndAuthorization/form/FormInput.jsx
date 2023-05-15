import React,{useEffect,useContext,useRef, useState} from 'react';

import PasswordStrengthGuage from "./PasswordStrengthGuage";

import { appContext } from '../../../context/ContextWrapper';
import {validateInput} from "../../../validation/validation"


const FormInput = ({handleInputChange,inputValue,labelText,validationInfo,inputName, displayEditButton, component, isValidUserDetails}) => {


    const appStates = useContext(appContext);
    const {
            disableEmail,
            setDisableEmail,
            styleValidationForm,
            userDetails:{password}
        } = appStates;

    const inputRef = useRef();
    const labelSpanRef = useRef();
    const passwordToggle = useRef();
    
    const displayPasswordText = (password && isValidUserDetails)? "none" : "block";

    const inputType = (inputName === "confirmPassword"|| inputName === "password") ? "password": "text";

    const disabled = (inputName === "email" && displayEditButton)? disableEmail : false;

    const hideValidationText=(event)=>{

        if (inputName !== "password" || component == undefined) {

            const paragraphTag =event.target.parentElement.nextElementSibling;

            paragraphTag.style.display='none'
        }
    }

    const showValidationText = (event)=>{
        
        if (inputName !== "password" || component == undefined) {
            
            const paragraphTag = event.target.parentElement.nextElementSibling; 

            validateInput(paragraphTag,inputValue,inputName)
        }
    }

    const showPassword = ()=>{
        const inputType = (inputRef.current.getAttribute("type") === "password")? "text":"password";
        inputRef.current.setAttribute("type",inputType);
        passwordToggle.current.firstElementChild.classList.toggle("eyeSlashFillToggle");
        passwordToggle.current.lastElementChild.classList.toggle("eyeFillToggle");
    }
    
  return (
    <div className="formControlDiv inputWrapper" style={{marginBottom:"20px"}}>
        
        <label className="d-block formControls formLabels" style={{position:"relative", paddingLeft:"0"}}>                                                
           {
               (inputName === "email" && displayEditButton)? 
               <span onClick={()=>setDisableEmail(false)} className={`labelSpan editSpan d-${displayEditButton}`}>
                Edit
               </span> :""
           }

           {
               (inputName ==="password" || inputName ==="confirmPassword")?
               <span ref={passwordToggle}  onClick={showPassword} className= "labelSpan editSpan">
                    <i className="bi bi-eye-slash-fill text-dark eyeSlashFill"/>
                    <i className="bi bi-eye-fill text-dark eyeFill"/>
               </span> :""
           }                    

            <input ref={inputRef} onChange={handleInputChange} type="text" required className="formControls formInputs" disabled={disabled} name={inputName} type={inputType} value={inputValue} onFocus={hideValidationText} onBlur={showValidationText}/>

            <span ref={labelSpanRef}  className="labelSpan">
                <span style={{background:"white",}}>
                    {labelText}
                </span>
            </span>

        </label>

        {(inputName === "password" && component)?
            <PasswordStrengthGuage isValidUserDetails={isValidUserDetails}/>:""
        }
        
        {
            (inputName == "password" && component)?
            <p className={`validationTags text-center small d-${displayPasswordText}`}>
                {validationInfo}
            </p>:""
        }

        {
            (inputName !== "password" || component == undefined)?
            <p className="validationTags text-center small">
            {validationInfo}
           </p> : ""
        }
    </div>
  )
}

export default FormInput;