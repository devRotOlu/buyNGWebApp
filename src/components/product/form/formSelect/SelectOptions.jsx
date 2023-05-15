import React from 'react'

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

const SelectOptions =(props) => {

  const {
          options,handleInputChange,
          name,handleSelectedState,
          selectedState,modifyLocation,
          inputRef 
        } = props.propsObject;

  const handleState = (event)=>{
    const spanTag =  event.currentTarget?.previousElementSibling || event.target?.parentElement.previousElementSibling ;
    const state = spanTag.firstElementChild.innerHTML;
    inputRef.current.value = "";
    inputRef.current.focus();
    modifyLocation(state);
  }

  return options.map(option=>{
    
    if (name === "location") {
      return (
        <li className="selectList" key={option.id}>
            <span className="flex-grow-1" style={{height:"100%",display:"flex", alignItems:"center"}} 
            onClick={selectedState? handleInputChange:handleSelectedState}>
              <a className="dropdown-item" style={{marginLeft:"0",paddingLeft:"1rem"}} > 
                {option.name}
              </a>
            </span>
            {
              (name === "location" && !selectedState)?
              <span onClick={handleState} style={{height:"100%", display:"flex", alignItems:"center"}}>
                <FontAwesomeIcon icon={faAngleRight} style={{color: "rgb(245, 245, 250)", fontSize:"20px",marginRight:"1rem"}}/>
              </span>
              :
              ""
            }
        </li>
    );
  }
  else{
    return(
      <li className="selectList" key={option.id}>
        <span className="flex-grow-1" style={{height:"100%",paddingLeft:"1rem",display:"flex",alignItems:"center"}} onClick={handleInputChange}>
          <a className="dropdown-item" >{option.name}</a>
        </span>
      </li>
    )
  }
  });
}

export default SelectOptions;