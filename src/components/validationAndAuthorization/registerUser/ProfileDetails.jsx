import React,{useContext,useState,useEffect} from 'react';

import FormInput from '../form/FormInput';
import Form from "../form/Form";
import ValidationPage from '../ValidationPage';
import SecondaryPageFormWrapper from '../SecondaryPageFormWrapper';

import {inputInfo} from '../../../data/data';
import { appContext } from '../../../context/ContextWrapper';
import {buyNGAxios} from '../../../axios/axios';
import {userDetailsValidationPattern} from "../../../validation/validation";
import {validateUserDetails} from '../../../validation/validation';

const ProfileDetails = () => {

    const [isResponseLoading,setIsResponseLoading] = useState(false);

    const appStates = useContext(appContext);
    const {isSignedIn,
        setIsSignedIn,
        userDetails,
        setUserDetails,
        displayEditButton
    } = appStates;

    const {firstName,lastName,phoneNumber} = userDetails;

    const [isRegistered,setIsRegistered] = useState(undefined); 

    useEffect(()=> setIsResponseLoading(false),[isRegistered])

    const handleInputChange= (event)=>{

        const targetName = event.target.name;
        
        const targetValue = event.target.value;
    
        setUserDetails({...userDetails,[targetName]:targetValue})
    }

    const handleFormSubmit = (event)=>{

        event.preventDefault();
    
        const formElements= event.target.elements;
    
        const isvalid = validateUserDetails(formElements,{firstName, lastName,phoneNumber},userDetailsValidationPattern);
    
        if(isvalid){
            setIsResponseLoading(true);
            (
                async ()=>{
                    try {
                        await buyNGAxios.post("Account/register",{emailConfirmationPage:"register/confirm-email",...userDetails,roles:["User"]});
                        setIsRegistered(true);
                    } catch (error) {
                        setIsRegistered(false);            
                    }
                }
            )();
        }
    }

    const formInputs = inputInfo.map(input=>{ 

        const isValid = input.inputName === "firstName" || input.inputName === "lastName" || input.inputName === "phoneNumber";

        if (isValid) {
            return (<FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={userDetails[input.inputName]} displayEditButton={displayEditButton}/>)
        }
    });

  return (
    <ValidationPage>
        <SecondaryPageFormWrapper>
            <Form handleFormSubmit={handleFormSubmit} headerText="Personal details" formDescription={<p className="text-center">
                We just need you to fill in some details.
             </p> } buttonText="Continue" extraInfo={ <p className="text-center" style={{marginBottom:"0"}}>
                            For further support, you may visit the Help Center or <br/>contact our customer service team.
                        </p>} isResponseLoading={isResponseLoading}>        
                {formInputs}         
            </Form>
        </SecondaryPageFormWrapper>
    </ValidationPage>
  )
}

export default ProfileDetails;