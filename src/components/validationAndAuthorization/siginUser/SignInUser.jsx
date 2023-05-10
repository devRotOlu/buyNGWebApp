
import React,{useEffect,useContext,useState} from 'react';
import { Link,useNavigate} from 'react-router-dom';

import FormInput from '../form/FormInput';
import Form from '../form/Form';
import PrimaryPageFormWrapper from '../PrimaryPageFormWrapper';
import ValidationPage from '../ValidationPage';

import {validateUserDetails} from '../../../validation/validation';
import {userDetailsValidationPattern} from "../../../validation/validation";
import {buyNGAxios} from '../../../axios/axios';
import {inputInfo} from '../../../data/data';
import { appContext } from '../../../context/ContextWrapper';
import { setAuthToken } from '../../../axios/authorizeSigninToken';
import {swalCall} from '../sweetAlert';


const SignInUser = () => {

    const appStates = useContext(appContext);

    const {
           isSignedIn,setIsSignedIn,
           userDetails, setUserDetails,
            displayEditButton,addUserInfoToCookie
          } = appStates;

    const [isResponseLoading,setIsResponseLoading] = useState(false);
    
    const {email,password} = userDetails;

    const navigate = useNavigate();

    const authenticateUser = (data)=>{   
        if (data) {
            const {userDetails:{phoneNumber,firstName,lastName,id},token} = data;
            setUserDetails(prevUserDetails=>({...prevUserDetails,phoneNumber,firstName,lastName,id}));
            setAuthToken(token);
            setIsSignedIn(true);
            addUserInfoToCookie({token,id});
        }else{
            setIsSignedIn(false);
        }
    }

    const handleInputChange= (event)=>{

        const targetName = event.target.name;
    
        const targetValue = event.target.value;

        setUserDetails({...userDetails,[targetName]:targetValue})
    }

    useEffect(()=>{
        setIsResponseLoading(false);
        if (isSignedIn) {
            navigate("/");
        }
    },[isSignedIn])

    const handleFormSubmit = (event)=>{

        event.preventDefault()

        const formElements= event.target.elements;

        const isvalid = validateUserDetails(formElements,{email,password},userDetailsValidationPattern);
    
        if(isvalid){ 
            setIsResponseLoading(true);
            (async ()=>{
                    try {
                        const result = await buyNGAxios.post("Account/login",{email,password});
                        authenticateUser(result.data)
                    } 
                    catch (error) {
                        authenticateUser();
                    }
                }
            )();
        }

    }

    const formInputs = inputInfo.map(input=>{
      if(input.inputName === "password" || input.inputName === "email" ){
       return <FormInput key={input.inputName} handleInputChange={handleInputChange} labelText={input.labelText} validationInfo={input.validationInfo} inputName={input.inputName} inputValue={userDetails[input.inputName]} displayEditButton={displayEditButton}/>
      }
    });

    return (
        <ValidationPage>
            <PrimaryPageFormWrapper>
                <Form handleFormSubmit={handleFormSubmit} headerText="Welcome back!" formDescription={<p className="text-center">
                        Log back into your BuyNG account.
                    </p> } extraInfo={
                    <div style={{width:"65%",marginTop:"15px"}}>
                        <Link to="/reset-password" className="passwordResetLink">
                        Forgot your password?
                        </Link>
                        <p className="text-center" style={{marginBottom:"0"}}>
                            For further support, you may visit the Help Center or <br/>contact our customer service team.
                        </p>
                    </div>} buttonText="Login" isResponseLoading={isResponseLoading}>
                    {formInputs}
                        
                </Form>
            </PrimaryPageFormWrapper>
        </ValidationPage>
    )
}

export default SignInUser;

