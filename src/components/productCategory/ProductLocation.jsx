import React,{useEffect,useRef,useContext} from 'react';

import DropDownIndicator from '../DropDownIndicator';

import { appContext } from '../../context/ContextWrapper';


const ProductLocation = (props) => {
  
  const {
          location, productLocation,
          locationIndentifier,gridRows,
          locationArray,index,
          setSelectedState,selectedState,
          setSelectedLocation,previousRegion,
          previousState,setSearchTerm,
          searchTerm
        } = props.propsObject;

        const appStates = useContext(appContext);
        const {moveCanvasOffView} = appStates;

  const divRef = useRef();

  const isPreviousLocation = location.name === previousState || location.name === previousRegion;

  const color = isPreviousLocation? "rgb(11, 206, 11)": "";
  const fontWeight = isPreviousLocation? "bold" :"";

  useEffect(()=>{
    if (gridRows && locationArray.length) {
      const itemIndex = index + 1;
      const noRemainder = (itemIndex % gridRows) === 0;
      const isColumnLastItem = (noRemainder || itemIndex === locationArray.length);
      if (isColumnLastItem) {
        divRef.current.style.borderBottom = "none";
      } 
    }
  },[gridRows,locationArray.length])

  const handleClick = ()=>{
    const _selectedLocation = location.name
    
    if (searchTerm) {
      setSearchTerm("");
    }

    if (!selectedState) {
      setSelectedState(_selectedLocation);
    }
    else{
      const isState = _selectedLocation.includes(selectedState)
      if (!isState) {
        setSelectedLocation(`${selectedState},${_selectedLocation}`);
      }
      else{
        setSelectedLocation(_selectedLocation);
      }
      moveCanvasOffView();
    }
  }

  return (
    <div style={{display:"flex",alignItems:"center"}}>
        <span style={{fontWeight:"bold",width:"30px",textAlign:"center"}}>
          {locationIndentifier? locationIndentifier : " "}
        </span>
        <div onClick={handleClick} className="locationWrapper" ref={divRef}>
          <span>
              <span className="location" style={{color,fontWeight}}>
                {
                  `${location.name} ${selectedState? "":" State"}  `
                }
              </span>
              <span style={{color:"rgb(133, 132, 132)"}}>
                <span style={{fontSize:"18px",fontWeight:"bold"}}>
                  &#x002E; 
                </span>
                 {` ${productLocation.length} ads`}
              </span>
          </span>
          
          <DropDownIndicator paddingRight="2rem">
            <i className="bi bi-chevron-right"/>
          </DropDownIndicator>
        </div>
    </div>
  )
}

export default ProductLocation;