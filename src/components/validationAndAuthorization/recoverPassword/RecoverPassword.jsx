import React,{useContext,useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form/FormInput';
import Form from "../form/Form";
import ValidationPage from '../ValidationPage';

import {inputInfo} from '../../../data/data';
import { appContext } from '../../../context/ContextWrapper';
import {buyNGAxios} from '../../../axios/axios';


const RecoverPassword = () => {

    const [isEmailSent, setIsEmailSent] = useState(undefined);

    const [isResponseLoading,setIsResponseLoading] = useState(false);

    const appStates = useContext(appContext);
    const {isSignedIn,
        setIsSignedIn,
        userDetails,
        setUserDetails,
        displayEditButton
        } = appStates;

    const {email} = userDetails;
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        setIsResponseLoading(false);
        if (isEmailSent) {
            navigate("/signin") 
        }
    },[isEmailSent])
    
    const handleInputChange= (event)=>{

        const targetName = event.target.name;
            
        const targetValue = event.target.value;
        
        setUserDetails({...userDetails,[targetName]:targetValue})
    }

    const handleFormSubmit = (event)=>{

        event.preventDefault()
        
        (async ()=>{
            setIsResponseLoading(true);
            try {
                await buyNGAxios.post("Account/password-reset-email",{email,passwordRecoveryPage:"reset-password/confirm-email"});
                setIsEmailSent(true);
            } catch (error) {
                setIsEmailSent(false);
            }
        })();
    }

    const formControls = inputInfo.map(input=>{
        if(input.inputName === "email"){
         return <FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={userDetails[input.inputName]} displayEditButton={displayEditButton}/>
        }
    });

  return (
    <ValidationPage>
        <div className="primaryPage">
            <Form handleFormSubmit={handleFormSubmit} headerText="Recover your password" formDescription ={<p className="text-center">You can request a password reset below. We will send an identification link to your email.Click it to change your password.</p>} buttonText="Request password reset" isResponseLoading={isResponseLoading}>
                {formControls}
            </Form>
        </div>
    </ValidationPage>
  )
}

export default RecoverPassword;