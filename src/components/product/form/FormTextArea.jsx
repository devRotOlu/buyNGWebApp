import React,{useContext} from 'react';

import FormElementWrapper from './FormElementWrapper';

import { appContext } from '../../../context/ContextWrapper';


const FormTextArea = ({name,labelText,validationText}) => {

  const appStates = useContext(appContext);
  const {productObject,setProductObject} = appStates;

  const {description} = productObject;

  const handleInputChange = (event)=>{

    const targetValue = event.target.value;

    setProductObject({...productObject,[name]:targetValue});
  }
  
  return (
    <FormElementWrapper name={name} labelText={labelText} validationText={validationText}>
      <textarea className="formTextArea formInputs productFormInputs" onChange={handleInputChange} name= {name} id={name} maxLength="150" value={description} required/>
    </FormElementWrapper>
  )
}

export default FormTextArea;
