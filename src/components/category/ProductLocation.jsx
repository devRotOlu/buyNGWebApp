import React from 'react';

import DropDownTrigger from '../DropDownTrigger';

const ProductLocation = ({state, stateRegions,stateFirstLetter}) => {
  return (
    <div  style={{display:"flex"}}>
        <span style={{fontWeight:"bold"}}>{stateFirstLetter}</span>
        <div style={{borderBottom:"solid",padding:"10px 0", paddingLeft:"1rem", paddingRight:"30px",position:"relative"}}>
          <span>{state.name} State</span>
          <span>.{stateRegions.length} ads</span>
          <DropDownTrigger paddingRight="1rem">
            <i className="bi bi-chevron-right"/>
          </DropDownTrigger>
        </div>
    </div>
  )
}

export default ProductLocation;