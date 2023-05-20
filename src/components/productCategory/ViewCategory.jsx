import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';

import CategoryProducts from './CategoryProducts';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import CategoryLocations from './CategoryLocations';
import OffCanvas from './OffCanvas';

const ViewCategory = () => {

  const location = useLocation();
  const {category} = location.state;
  const {id,name,products} = category;
  const [selectedLocation,setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const getRequiredSelectedLocation = (selectedLocation)=>{
    if (selectedLocation.includes(",")) {
      return selectedLocation.split(",")[1];
    }
    else{
      return selectedLocation;
    }
  }

  var _categroryProducts = products;

  if (selectedLocation) {
    const _selectedLocation = getRequiredSelectedLocation(selectedLocation);
    _categroryProducts = products.filter(product=>product.location.includes(_selectedLocation));
  }

  return (
    <div>
      <div className="categoryWrapper" >
        <div style={{width:"fit-content"}}>
          <CategoryHeader length={_categroryProducts.length} name={name}/>
          <CategoryDetails propsObject={{name,setSelectedState,selectedLocation,getRequiredSelectedLocation}}/>
        </div>
        <CategoryProducts name={name} products={_categroryProducts}/>
      </div>
      <OffCanvas alignItems="center" justifyContent="center" bodyWidth="70%"
    bodyHeight="80%">
        <CategoryLocations propsObject={{selectedLocation,selectedState,setSelectedState,setSelectedLocation}}/>
      </OffCanvas>
    </div>
  )
}

export default ViewCategory;