
import React,{useState,useContext,useEffect} from 'react';
import { useNavigate} from 'react-router';

import FormInput from '../form/FormInput';
import Form from '../form/Form';
import PrimaryPageFormWrapper from '../PrimaryPageFormWrapper';
import ValidationPage from "../ValidationPage"

import {inputInfo} from '../../../data/data';
import { appContext } from '../../../context/ContextWrapper';
import {buyNGAxios} from '../../../axios/axios';
import {userDetailsValidationPattern} from "../../../validation/validation"
import {validateUserDetails} from '../../../validation/validation';
import {defaultUserDetails} from "../../../helperFunctions/helperFunctions";


const IdentifyUser = () => {  

    const [isResponseLoading,setIsResponseLoading] = useState(false);

    const [isValidUser, setIsValidUser] = useState(undefined);

    const appStates = useContext(appContext);
    const {
            isSignedIn,
            userDetails,
            setUserDetails, 
            setDisableEmail
        } = appStates;

    const {email} = userDetails;

    const navigate = useNavigate();

    useEffect(()=>{
        if (isValidUser) {
            navigate('/signin')
        }else if(isValidUser === false){    
            navigate('/register')
        }
    },[isValidUser])

    useEffect(()=>{
        const userDetailsArray = Object.keys(userDetails);
        defaultUserDetails(userDetailsArray,setUserDetails,email);
    },[])

    const handleInputChange= (event)=>{
    
        const targetValue = event.target.value;

        setUserDetails(prevState=>({...prevState,email:targetValue}));
    }

    const handleFormSubmit = (event)=>{

        event.preventDefault()

        const formElements= event.target.elements;

        const isvalid = validateUserDetails(formElements,{email},userDetailsValidationPattern);
        
        if(isvalid){
            setIsResponseLoading(true);
           (
               async ()=>{
                    try {
                        await buyNGAxios.post("Account/valid-user",email);
                        setIsValidUser(true);
                    } catch (error) {
                        setIsValidUser(false);
                    }
                }
           )();   
        }
    }

    const formControls = inputInfo.map(input=>{
      if(input.inputName === "email"){
       return <FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={userDetails[input.inputName]}/>
      }
    });

    return (
        <ValidationPage>
            <PrimaryPageFormWrapper>
                <Form handleFormSubmit={handleFormSubmit} headerText="Welcome to BuyNG" isResponseLoading={isResponseLoading} formDescription={<p className="text-center small">Type your e-mail to log in or create a BuyNG account <br/>account.</p>} setDisableEmail={setDisableEmail} buttonText="Continue">
                    {
                        formControls
                    }
                </Form>
            </PrimaryPageFormWrapper>
        </ValidationPage>
    )
}

export default IdentifyUser;

