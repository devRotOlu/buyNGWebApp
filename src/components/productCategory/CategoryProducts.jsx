import React from 'react';

import ProductCard from './ProductCard';

const CategoryProducts = ({name,products}) => {

    const productList = products.map(product=>{
        return <ProductCard key={product.id} product={product}/>   
    });
    
  return (
    <div style={{paddingTop:"50px", flexGrow:"1"}}>
        <h3 style={{fontWeight:"bold"}}>{name} in Nigeria</h3>
        <div className="productGallery" >
            {
                productList
            }
        </div>
    </div>
  )
}

export default CategoryProducts