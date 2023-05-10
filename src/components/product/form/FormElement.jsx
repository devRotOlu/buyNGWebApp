import React from 'react';

import FormFile from './FormFile';
import FormTextArea from './FormTextArea';
import FormSelect from './formSelect/FormSelect';
import FormInput from './FormInput';

const FormElement = (props) => {

    const {labelText,name, validationText} = props;

    let formElement; 
    const isInput = name === "name" || name ==="price" || name ==="quantity";
    const isTextArea =  name == "description";
    const isFile = name == "imageFiles";

    if (isInput) {
      formElement = <FormInput name = {name} labelText={labelText} validationText={validationText}/>    
    }
    else if(isTextArea){
      formElement = <FormTextArea name={name} labelText={labelText}  validationText={validationText}/>  
    }
    else if(isFile){
      formElement= <FormFile name={name} labelText={labelText} validationText={validationText} />
    }else{
      formElement = <FormSelect name={name} labelText={labelText} validationText={validationText} />
    }
    
  return formElement;
}

export default FormElement;