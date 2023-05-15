import React from 'react';

import LocationIndicator from './LocationIndicator';

const CategoryDetails = ({name}) => {
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
                 <LocationIndicator categoryName={name}/>
            </div>
        </div>
    </div>
  )
}

export default CategoryDetails;