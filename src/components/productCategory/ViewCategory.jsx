import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';

import CategoryProducts from './CategoryProducts';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import CategoryLocations from './CategoryLocations';

const ViewCategory = () => {

  const location = useLocation();
  const {category} = location.state;
  const {id,name,products} = category;
  const [selectedLocation,setSelectedLocation] = useState("");
  const [selectedState, setSelectedState] = useState("");

  return (
    <div>
      <div className="categoryWrapper" >
        <div style={{width:"fit-content"}}>
          <CategoryHeader length={products.length} name={name}/>
          <CategoryDetails propsObject={{name,setSelectedState,setSelectedLocation}}/>
        </div>
        <CategoryProducts name={name} products={products}/>
      </div>
      <CategoryLocations propsObject={{selectedLocation,selectedState,setSelectedState,setSelectedLocation}}/>
    </div>
  )
}

export default ViewCategory;