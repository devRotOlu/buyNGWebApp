
import React,{useContext,useEffect,useState} from 'react';

import ProductionLocation from "./ProductLocation";
import OffCanvas from './OffCanvas';

import { appContext } from '../../context/ContextWrapper';


const readProductLocations = (states,regions,selectedCategory,productCategory)=>{

    const areValid = states.length && regions.length && selectedCategory && productCategory.length

    if (areValid) {

        const category = productCategory.find(category=> category.name === selectedCategory);

        const productRegions = []

        category.products.forEach(product=>productRegions.push(product.location));

        return states.map((state,index)=>{
            const stateRegions = regions[index].filter(region=>{
                return productRegions.some(productRegion=> productRegion.includes(region.name))
            })
            const stateFirstLetter = state.name[0];
            const firstIndex = states.findIndex(state=> state.name[0] === stateFirstLetter);
            return <ProductionLocation key={state.id} state={state} stateRegions={stateRegions} stateFirstLetter = {(firstIndex === index)? stateFirstLetter : undefined}/>
        });
    }
}

const CategoryLocations = () => {

    const appSates = useContext(appContext);

    const {
        states, regions,
        selectedCategory,productCategory
    } = appSates;
    
  return ( 
    <OffCanvas>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%"}}>
            <div className="productLocationWrapper">
                {
                    readProductLocations(states,regions,selectedCategory,productCategory)
                }
            </div>
        </div>
    </OffCanvas>    
  )
}

export default CategoryLocations;
