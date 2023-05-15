import React,{useEffect,useRef} from 'react';

import DropDownTrigger from '../DropDownTrigger';

const ProductLocation = (props) => {

  const {
          location, productLocation,
          locationIndentifier,gridRows,
          locationArray,index,
          setSelectedState,selectedState
        } = props.propsObject;

  const divRef = useRef();
  const spanRef = useRef();

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
    if (!selectedState) {
      const state = spanRef.current.innerHTML;
      setSelectedState(state.replace(" State",""));
    }
    else{

    }
  }

  return (
    <div style={{display:"flex",alignItems:"center"}}>
        <span style={{fontWeight:"bold",width:"30px",textAlign:"center"}}>
          {locationIndentifier? locationIndentifier : " "}
        </span>
        <div onClick={handleClick} className="locationWrapper" ref={divRef}>
          <span>
             <span ref={spanRef} className="location">
                {
                  `${location.name} ${selectedState? "":"State"}  `
                }
             </span>
              <span style={{color:"rgb(133, 132, 132)"}}>
                <span style={{fontSize:"18px",fontWeight:"bold"}}>
                  &#x002E; 
                </span>
                 {` ${productLocation.length} ads`}
              </span>
          </span>
          
          <DropDownTrigger paddingRight="2rem">
            <i className="bi bi-chevron-right"/>
          </DropDownTrigger>
        </div>
    </div>
  )
}

export default ProductLocation;