import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = (props) => {

  const {
          height, width, 
          placeholder,handleSearch, 
          searchTerm,searchButtonColor,
          borderRadius,searchButtonPosition,
          placeholderMargin,searchButtonMargin
        } = props.propsObject

  const searchButtonSize = Number(height.replaceAll(/[^0-9]/g,""))/2;

  let right, left,paddingLeft;

  if (searchButtonPosition === "right") {
    right = searchButtonMargin;
    paddingLeft = placeholderMargin;
  }
  else{
    left = searchButtonMargin;
    paddingLeft = Number(left.replaceAll(/[^0-9]/g,"")) + searchButtonSize +  Number(placeholderMargin.replaceAll(/[^0-9]/g,""));
    paddingLeft = `${paddingLeft}px`;
  }

  return (
    <form style={{height,width,borderRadius,position:"relative"}}>
        <input onChange={handleSearch} className="searchBar" style={{paddingLeft}} placeholder={placeholder} value={searchTerm}/>
        <span style={{position:'absolute',top:"50%",transform:"translateY(-50%)",right,left,color:searchButtonColor}}>
           <FontAwesomeIcon icon={faSearch} fontSize={`${searchButtonSize}px`}/>
        </span>
    </form> 
  )
}

export default SearchBar
