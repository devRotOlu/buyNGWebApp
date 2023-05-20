import React from 'react';

import LocationIndicator from './LocationIndicator';

const CategoryDetails = (props) => {
    
    const {
            name,setSelectedState,
            selectedLocation,getRequiredSelectedLocation
        } = props.propsObject

  return (
    <div style={{width:"100%"}}>      
        <div style={{padding:"0.5rem 1rem",backgroundColor:"green",borderRadius:"5px 5px 0 0"}}>
            <span style={{color:"white"}}>
                Categories
            </span>     
        </div>
        <div className="productDetails">
            <div>
                <span>
                    {name}
                </span>
            </div> 
            <div>
                 <LocationIndicator propsObject={{categoryName:name,selectedLocation,setSelectedState,getRequiredSelectedLocation}}/>
            </div>
        </div>
    </div>
  )
}

export default CategoryDetails;