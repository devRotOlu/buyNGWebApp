import React from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

const SelectList = (props) => {
    const {
            handleListClick,removeSelectedState,
            listRef,selectedState
        } = props.propsObject;
    
  return (
    <ul onClick={handleListClick} ref={listRef} className="dropdown-menu" style={{width:"100%", maxHeight:"300px", overflow:"scroll", padding:"0"}}>
        {
            (selectedState)?
            <span className="listHeader" >
                <span onClick={removeSelectedState} style={{cursor:"pointer"}}>
                 <FontAwesomeIcon icon={faAngleLeft} style={{marginRight:"10px"}}/>
                 {selectedState}
                </span>
            </span>
            :
            ""
        }
        {
            props.children
        }
    </ul>
  )
}

export default SelectList