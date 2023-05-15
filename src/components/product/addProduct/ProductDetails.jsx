import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

import FormElement from '../form/FormElement';
import FormButton from '../../FormButton';

import {productInputInfo} from "../../../data/data";


const ProductDetails = () => {

    const [handleFormSubmit] = useOutletContext();

    const productInputs = productInputInfo.map(info=>{

        const isAboutProduct = info.inputName !== "location" && info.inputName !== "imageFiles" && info.inputName !== "categoryId";
        const {inputName,validationInfo,labelText} = info;
        if (isAboutProduct) {
            if (inputName === "name" || inputName === "description") {
                return(
                    <div key={inputName} style={{gridColumn:"1/span 2"}}>
                        <FormElement name={inputName} labelText={labelText} validationText = {validationInfo}/>
                    </div>
                ) 
            }
            else{
                return(
                    <div key={inputName}>
                        <FormElement name={inputName} labelText={labelText} validationText = {validationInfo}/>
                    </div>
                ) 
            }
        }
    })

  return (
    <form onSubmit={handleFormSubmit} className="productForm">
        <div  style={{position:"relative",display:"grid",justifyContent:"space-between",width:"100%",gridTemplateColumns:"repeat(2,47%)"}}>
            {
                productInputs
            }
        </div>
        <div style={{display:"flex", justifyContent:"center",width:"100%"}}>
            <FormButton propsObject={{buttonText:"Post Product",buttonColor:"green",borderColor:"green", width: "60%"}}  />
        </div>
    </form>
  )
}

export default ProductDetails;