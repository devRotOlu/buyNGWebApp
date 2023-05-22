import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowDown,faLongArrowUp } from '@fortawesome/free-solid-svg-icons';

import DropDown from "../../DropDown"
import DropDownTrigger from "../../DropDownTrigger"

const ProductSorter = ({sortProductBy,setSortProductsBy}) => {

  const handleProductSorting = (index)=>{
    if (sortProductBy !== index) {
      setSortProductsBy(index) 
    }
  }

  const sortingList = ["Recommended first","Lowest price first","Highest price first"].map((item,index)=><li onClick={()=>handleProductSorting(index)}  key={index}>{item}</li>)

  return (
    <div style={{display:'flex',alignItems:"center"}}>
        <span className="small text-dark">
            Sort by 
        </span>
        <div style={{position:"relative",padding:"0 5px"}}>
            <DropDownTrigger styleObject={{color:"rgb(11, 206, 11)"}}>
                <FontAwesomeIcon icon={faLongArrowDown}/>
                <FontAwesomeIcon icon={faLongArrowUp}/>
            </DropDownTrigger>
            <DropDown dropDownClass="productSorter" styleObject={{width:"180px"}}>
              {
                sortingList
              }
           </DropDown>
        </div>
        <span className="small text-dark">{sortProductBy}</span>  
    </div>
  )
}

export default ProductSorter