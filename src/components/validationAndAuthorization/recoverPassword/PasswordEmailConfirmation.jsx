
import React,{useState,useEffect,useContext} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import Form from "../form/Form";
import ValidationPage from '../ValidationPage';
import FormInput from '../form/FormInput';

import {inputInfo} from '../../../data/data';
import {userDetailsValidationPattern} from "../../../validation/validation";
import {validateUserDetails} from '../../../validation/validation';
import {buyNGAxios} from '../../../axios/axios';

const PasswordEmailConfirmation = () => {

    const [isEmailConfirmed,setIsEmailConfirmed] = useState(undefined);
    const [userDetails,setUserDetails] = useState({
        password:"",
        confirmPassword:""
    })

    const [isResponseLoading,setIsResponseLoading] = useState(false);


    const {password,confirmPassword} = userDetails;
    
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");
    const token = new URLSearchParams(search).get("token");
  
    const navigate = useNavigate();
  
    useEffect(()=>{
      setIsResponseLoading(false);
      if (isEmailConfirmed) {
        navigate("/login");
      }
    },[isEmailConfirmed])

    const handleInputChange= (event)=>{

      const targetName = event.target.name;
        
      const targetValue = event.target.value;
    
      setUserDetails({...userDetails,[targetName]:targetValue})
    }
  
    const handleFormSubmit = (event)=>{

      event.preventDefault();
      
      const formElements= event.target.elements;

      const isvalid = validateUserDetails(formElements,{password,confirmPassword},userDetailsValidationPattern);

      if (isvalid) {
        setIsResponseLoading(true);
        (async ()=>{
              try {
                await buyNGAxios.post("Account/reset-password",{userId:id,token,newPassword:password,confirmPassword});
                setIsEmailConfirmed(true);
              } catch (error) {
                setIsEmailConfirmed(false);
              }
        })();
      }
    }

    const formControls = inputInfo.map(input=>{
        const isValid = input.inputName === "password" || input.inputName === "confirmPassword";

        if(isValid){
         return <FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={(userDetails[input.inputName])}/>
        }
    });
  
    return (
      <ValidationPage>
        <div className="primaryPage">
          <Form handleFormSubmit={handleFormSubmit} formDescription={<p className="text-center">
              Provide your new password for password change confirmation.
          </p>} buttonText="Confirm email" isResponseLoading={isResponseLoading}>
            {formControls}
          </Form>
        </div>
      </ValidationPage>
    )
}

export default PasswordEmailConfirmation;