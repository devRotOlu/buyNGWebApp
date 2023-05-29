import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';

import CategoryProducts from './categoryProducts/CategoryProducts';
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
  
  // 0 means don't sort. 1 indicates sort by lowest and 2 indicates sort by highest.
  const [sortProductsBy,setSortProductsBy] = useState(0);

  const getRequiredSelectedLocation = (selectedLocation)=>{
    if (selectedLocation.includes(",")) {
      return selectedLocation.split(",")[1];
    }
    else{
      return selectedLocation;
    }
  }

  var _categroryProducts = [...products];

  if (selectedLocation) {
    const _selectedLocation = getRequiredSelectedLocation(selectedLocation);
    _categroryProducts = products.filter(product=>product.location.includes(_selectedLocation));
  }

  if (sortProductsBy) {
    if (sortProductsBy === 1) {
      _categroryProducts.sort((a,b)=> a.price - b.price);
    }else{
      _categroryProducts.sort((a,b)=> b.price - a.price);
    }
  }

  return (
    <div>
      <div className="categoryWrapper" >
        <div style={{width:"fit-content"}}>
          <CategoryHeader length={_categroryProducts.length} name={name}/>
          <CategoryDetails propsObject={{name,setSelectedState,selectedLocation,getRequiredSelectedLocation}}/>
        </div>
        <CategoryProducts propsObject={{name,products:_categroryProducts,setSortProductsBy,sortProductsBy}}/>
      </div>
      <OffCanvas alignItems="center" justifyContent="center" bodyStyles={{width:"70%",height:"80%"}}>
        <CategoryLocations propsObject={{selectedLocation,selectedState,setSelectedState,setSelectedLocation}}/>
      </OffCanvas>
    </div>
  )
}

export default ViewCategory;