import React,{useContext,useRef, useState, useEffect} from 'react';

import FormElementWrapper from '../FormElementWrapper';
import DropDown from './DropDown';

import { appContext } from '../../../../context/ContextWrapper';
import {styleListWrapper} from "../../../../helperFunctions/helperFunctions";


const FormSelect = (props) => {

  const {name,labelText, validationText} = props;

  const appStates = useContext(appContext);

  const {
          productObject,setProductObject,
          productCategory
        } = appStates;

  const {location,categoryId} = productObject;

  const [selectedState, setSelectedState] = useState("");

  const [inputFocus,setInputFocus] = useState(undefined);

  const [selectedRegion, setSelectedRegion] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef();
  const listRef = useRef();

  const handleInputChange = (event)=>{

    const inputValue = event.currentTarget?.firstElementChild.innerHTML || event.target?.innerHTML;

    inputRef.current.value = inputValue;

    let productDetail;
    
    if (name !=="location") {
      setSelectedCategory(inputValue);
      productDetail = productCategory.find(category=> category.name === inputValue).id;
    }else{
      setSelectedRegion(inputValue);
      productDetail = `${selectedState}, ${inputValue}`;  
    }
    setProductObject({...productObject,[name]:productDetail});
  }

  const focusInput = (event)=> {
    event.preventDefault();
    event.stopPropagation();
    if (selectedState && location) {
      setSelectedState("");
    }
    inputRef.current.focus();
    inputRef.current.value = "";
    setInputFocus(true);
    setSearchTerm("");
  };

  const handleOptionSearch = (event)=> setSearchTerm(event.target.value);

  const handleDocumentClick = (event)=>{
    const target = event.target;
    if (target.classList.contains("clearForm")) {
      setSelectedState("");
      setInputFocus(undefined);
      setSelectedRegion("");
      setSelectedCategory("");
    }
    else{
      styleListWrapper(undefined,listRef);
      setInputFocus(false);
      setSearchTerm("");
    }
  }

  useEffect(()=>{
    document.addEventListener("click",handleDocumentClick);
    return ()=>{
      document.removeEventListener("click",handleDocumentClick)
    }
  },[])

  useEffect(()=>{
    if (inputFocus) {
      styleListWrapper(name,listRef,selectedState,location);
    }
    else {
      inputRef.current.value = (name === "location")? selectedRegion : selectedCategory;
    }
  },[name,selectedState, location,inputFocus])

  return (
    <FormElementWrapper labelText={labelText} validationText={validationText}>       
      <input onChange={handleOptionSearch} ref={inputRef} className="formControls formInputs productFormInputs" list={name} name={name}required />
      <DropDown ref={listRef} propsObject={{focusInput,name, handleInputChange,productCategory,selectedState,setSelectedState,setProductObject,productObject,searchTerm,inputRef
      }}/>
    </FormElementWrapper>
  )
}

export default FormSelect;

