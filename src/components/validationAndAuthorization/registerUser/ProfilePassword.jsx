import React,{useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form/FormInput';
import Form from '../form/Form';
import ValidationPage from '../ValidationPage';
import PrimaryPageFormWrapper from '../PrimaryPageFormWrapper';

import {inputInfo} from '../../../data/data';
import { appContext } from '../../../context/ContextWrapper';
import {validateUserDetails} from '../../../validation/validation';
import {userDetailsValidationPattern} from "../../../validation/validation";


const ProfilePassword = () => {

    const [isValidUserDetails, setIsValidUserDetails] = useState(true)

    const appStates = useContext(appContext);
    const {isSignedIn,
        setIsSignedIn,
        userDetails,
        setUserDetails,
        displayEditButton
    } = appStates;
    const navigate = useNavigate();

    const handleInputChange= (event)=>{

        const targetName = event.target.name;
        
        const targetValue = event.target.value;
    
        setUserDetails({...userDetails,[targetName]:targetValue})
    }

    const handleFormSubmit = (event)=>{

        event.preventDefault()
    
        const formElements= event.target.elements;
    
        const isValid = validateUserDetails(formElements,{email:userDetails.email,password:userDetails.password,confirmPassword:userDetails.confirmPassword},userDetailsValidationPattern);

        setIsValidUserDetails(isValid);
    
        if(isValid){
           navigate("profile-details");
        }
    }

    const formInputs = inputInfo.map(input=>{ 
        
        const isValid = input.inputName === "password" || input.inputName === "email" || input.inputName === "confirmPassword";

        if (isValid) {
            return (<FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={userDetails[input.inputName]} displayEditButton={displayEditButton} component="profilePassword" isValidUserDetails={(input.inputName === "password")? isValidUserDetails : undefined}/>)
        }
    });

  return (
    <ValidationPage>
        <PrimaryPageFormWrapper>
            <Form handleFormSubmit={handleFormSubmit} headerText="Create your account" formDescription={<p className="text-center">
                        Let's get started by creating your account.<br/>
                        To keep your account safe, we need a strong password
                </p>} extraInfo={ <p className="text-center" style={{marginBottom:"0"}}>
                            For further support, you may visit the Help Center or <br/>contact our customer service team.
                        </p>}> 
                {formInputs}
            </Form>
        </PrimaryPageFormWrapper>
    </ValidationPage>
  )
}

export default ProfilePassword