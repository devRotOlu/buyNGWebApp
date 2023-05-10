import React, { useState,useContext } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

import {productValidationPattern} from "../../../validation/validation";
import { validateUserDetails } from '../../../validation/validation';
import {buyNGAxios} from '../../../axios/axios';
import { removeExtraSpaces,createFormData } from '../../../helperFunctions/helperFunctions';
import { appContext } from '../../../context/ContextWrapper';


const AddProduct = () => {

  const appStates = useContext(appContext);
  const {productObject} = appStates;

  const [isProductCreated, setIsProductCreated] = useState(undefined);
  
  const handleFormSubmit = (event)=>{

    event.preventDefault();

    const formElements = event.target.elements;

    var product = productObject;

    product.name = removeExtraSpaces(product.name);
    product.description = removeExtraSpaces(product.description);
    product.location = removeExtraSpaces(product.location);

    //const isValid = validateUserDetails(formElements,product,productValidationPattern);

    const isValid = true;
    
    if (isValid) {

      const formData = createFormData(product);

      (
        async ()=>{
          try {
            
            await buyNGAxios.post("Product",formData,{
              headers:{
                'Content-Type':"multipart/form-data"
              }
            });

            setIsProductCreated(true);

          } catch (error) {
            setIsProductCreated(false);
          }
        }
      )();
    }
  }

  return (
    <div className="addProduct pages">
        <div className="productWrapper">
          <Header/>
          <div className="d-flex justify-content-center">
            <Outlet context={[handleFormSubmit]}/>
          </div>
        </div>
    </div>
  )
}

export default AddProduct;
