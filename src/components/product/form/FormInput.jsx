import React,{useContext} from 'react';

import FormElementWrapper from './FormElementWrapper';

import { appContext } from '../../../context/ContextWrapper';

const FormInput = (props) => {

  const {name, validationText,labelText} = props;

  const appStates = useContext(appContext);
  const {productObject,setProductObject} = appStates;
  
  const inputValue = productObject[name];
  const inputType = (name == "quantity" || name == "price")? "number" : "text";

  const handleInputChange = (event)=>{

    const targetValue = event.target.value;

    setProductObject({...productObject,[name]:targetValue});
  }
  
  return (
    <FormElementWrapper labelText={labelText} validationText={validationText} name={name}>
        <input className="formControls formInputs productFormInputs" onChange={handleInputChange}  type={inputType} name={name}  id={name} value={inputValue} required/>
    </FormElementWrapper>
  )
}

export default FormInput;

