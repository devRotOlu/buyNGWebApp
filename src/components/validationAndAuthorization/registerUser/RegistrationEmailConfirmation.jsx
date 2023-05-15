
import React,{useState, useEffect} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

import Form from '../form/Form';
import ValidationPage from '../ValidationPage';

import {buyNGAxios} from '../../../axios/axios';

const RegistrationEmailConfirmation = (props) => {
  
  const [isEmailConfirmed,setIsEmailConfirmed] = useState(undefined);
  const [isResponseLoading,setIsResponseLoading] = useState(false);

  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const token = new URLSearchParams(search).get("token");

  const navigate = useNavigate();

  useEffect(()=>{
    setIsResponseLoading(false);
    if (isEmailConfirmed) {
      navigate("/");
    }
  },[isEmailConfirmed])

  const handleFormSubmit = (event)=>{
    event.preventDefault();
    setIsResponseLoading(true);
    (async ()=>{
      try {
        await buyNGAxios.post(`Account/confirm-email?uid=${id}&token=${token}`);
        setIsEmailConfirmed(true);
      } catch (error) {
        setIsEmailConfirmed(false);
      }
    })();
  }

  return (
    <ValidationPage>
      <div className="primaryPage">
        <Form handleFormSubmit={handleFormSubmit} formDescription={<p>
            Click the button to confirm reception of the registration email.
          </p>} isResponseLoading={isResponseLoading}/>
      </div>
    </ValidationPage>
  )
}

export default RegistrationEmailConfirmation;