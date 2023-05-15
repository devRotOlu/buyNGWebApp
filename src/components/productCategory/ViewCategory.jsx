import React from 'react';
import { useLocation } from 'react-router-dom';

import CategoryProducts from './CategoryProducts';
import CategoryHeader from './CategoryHeader';
import CategoryDetails from './CategoryDetails';
import CategoryLocations from './CategoryLocations';

const ViewCategory = () => {

  const location = useLocation();
  const {category} = location.state;
  const {id,name,products} = category;

  return (
    <div>
      <div className="categoryWrapper" >
        <div style={{width:"fit-content"}}>
          <CategoryHeader length={products.length} name={name}/>
          <CategoryDetails name={name}/>
        </div>
        <CategoryProducts name={name} products={products}/>
      </div>
      <CategoryLocations/>
    </div>
  )
}

export default ViewCategory