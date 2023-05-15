import React from 'react';
import {useNavigate} from 'react-router-dom';

import FormElement from '../form/FormElement';
import FormButton from '../../FormButton';

import {productInputInfo} from "../../../data/data";
import {productValidationPattern} from "../../../validation/validation";
import { validateUserDetails } from '../../../validation/validation';

const AboutProduct = () => {

    const navigate = useNavigate();

    const handleFormSubmit = (event)=>{

        event.preventDefault();

        //const formElements = event.target.elements;

        // const {categoryId,location,imageFiles} = productObject;

        // const isValid = validateUserDetails(formElements,{categoryId,location,imageFiles},productValidationPattern);
        
        navigate("/product/add-product/product-details");     
    }

    const productInputs = productInputInfo.map(info=>{

        const isAboutProduct = info.inputName === "location" || info.inputName === "imageFiles" || info.inputName === "categoryId";
        if (isAboutProduct) {
            const {inputName,validationInfo,labelText} = info;

            if (inputName === "imageFiles") {
                return(
                    <div key={inputName} style={{gridColumn:"1/span 2"}}>
                        <FormElement name={inputName} labelText={labelText} validationText = {validationInfo}/>
                    </div>
                ) 
            }
            return(
               <div key={inputName}>
                    <FormElement name={inputName} labelText={labelText} validationText = {validationInfo}/>
               </div>
            ) 
        }
    })

  return (
    <form onSubmit={handleFormSubmit} className="productForm">
        <div style={{position:"relative",display:"grid",justifyContent:"space-between",width:"100%",gridTemplateColumns:"repeat(2,47%)"}}>
            {
                productInputs
            }
        </div>
        <div style={{display:"flex", justifyContent:"center",width:"100%"}}>
            <FormButton propsObject={{buttonText:"Next",buttonColor:"green",borderColor:"green", width: "60%"}}  />
        </div>
    </form>
  )
}

export default AboutProduct;