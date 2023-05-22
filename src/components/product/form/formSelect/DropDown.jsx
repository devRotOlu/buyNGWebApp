import React,{useState, useEffect,useContext} from 'react';

import SelectOptions from './SelectOptions';
import DropDownIndicator from "../../../DropDownIndicator"; 
import SelectList from './SelectList';

import { appContext } from '../../../../context/ContextWrapper';


const DropDown = React.forwardRef((props,ref)=> {

  const {
          focusInput,name,
          handleInputChange,
          productCategory, selectedState,
          setSelectedState,setProductObject,
          productObject,searchTerm,inputRef
        } = props.propsObject;
    
  const appStates = useContext(appContext);

  const {states,regions} = appStates;

  const [stateRegions,setStateRegions] = useState([]);

  const [matchedStates,setMatchedStates] = useState([]);

  const [matchedRegions,setMatchedRegions] = useState([]);

  const [matchedCategory,setMatchedCategory] = useState([]);

  const modifyLocation = (state)=> {
    setSelectedState(state);
    inputRef.current.value = "";
    inputRef.current.focus();
    setProductObject({...productObject,location:""});
  }

  const handleSelectedState = (event)=>{

    const state = event.currentTarget?.firstElementChild.innerHTML || event.target?.innerHTML;

    modifyLocation(state)
  }

  const removeSelectedState = (event)=> {
    event.preventDefault();
    event.stopPropagation();
    setSelectedState("")
  };
  
  useEffect(()=>{
    if (selectedState && regions.length) {
      const stateIndex = states.findIndex(state=> state.name === selectedState);
      setStateRegions(regions[stateIndex]);
    }
  },[selectedState])

  const stateLength = states.length;
  const productLength = productCategory.length;
  const regionLength = stateRegions.length;

  useEffect(()=>{
    if (searchTerm) {
      if (name !=="location") {
        setMatchedCategory(filterStateRef(productCategory,searchTerm));
      }
      else{
        if (selectedState) {
          setMatchedRegions(filterStateRef(stateRegions,searchTerm));
        }
        else{
          setMatchedStates(filterStateRef(states,searchTerm));
        }
      }
    }else{
      if (name !== "location") {
        setMatchedCategory(productCategory);
      }
      else{
        if (selectedState) {
          setMatchedRegions(stateRegions);
        }
        else{
          setMatchedStates(states);
        }
      }
    }
  },[searchTerm])

  useEffect(()=>{
    if (stateLength) 
      setMatchedStates(states);
      
    if (regionLength)
      setMatchedRegions(stateRegions);
      
    if (productLength) 
      setMatchedCategory(productCategory);
      
  },[stateLength,productLength,regionLength])

  const handleListClick = (event)=>{
    if (name === "location") {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  let selectOptions;

  if (name === "location") {
    if (selectedState) {
      selectOptions = <SelectOptions propsObject={{options:matchedRegions,name, handleInputChange,selectedState,modifyLocation,handleSelectedState,inputRef}}/>
    }else{
      selectOptions = <SelectOptions propsObject={{options:matchedStates,name, handleInputChange,selectedState,modifyLocation,handleSelectedState,inputRef}}/>
    }
  }
  else{
    selectOptions = <SelectOptions propsObject={{options:matchedCategory,name, handleInputChange}}/>
  }

  return (
    <div> 
        <DropDownIndicator handleIndicatorClick={focusInput} paddingRight="15px">
          <p className="dropdown-toggle"  style={{marginLeft:"auto"}}/> 
        </DropDownIndicator>
        <SelectList propsObject={{handleListClick,removeSelectedState,listRef:ref,
            selectedState}}>
              {
                  selectOptions
              }
        </SelectList>
    </div>
  )
})

export default DropDown;

const filterStateRef = (state, searchTerm)=>
{
  return state.filter(category =>
  {
    return category.name.toUpperCase().includes(searchTerm.toUpperCase());
  });
}