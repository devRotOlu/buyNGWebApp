import React,{useRef,useState,useEffect} from 'react';

import ProductCardInfo from "./ProductCardInfo";
import ProductCard from "./ProductCard";

import { commaSeparatePrice} from '../../helperFunctions/helperFunctions';

const ProductCardWrapper = (props) => {

  const {product,isPortrait} = props.propsObject;
  
  const cardInfoRef = useRef();

  const {
    description,id,
    location, name, 
    quantity,price,
    imageUrls
  } = product;

  const cardHeight = isPortrait? "fit-content" :"230px";

  const _price = commaSeparatePrice(price);
  const imageWidth = isPortrait? "100%" : "";

  const imageHeight = isPortrait? "" : "100%";

  const cardDisplay = isPortrait? "" :"flex";

  const cardDetailClass = isPortrait? "flexColumn" : "flexRow";

  const cardDetailDirection = isPortrait? "column" :"row-reverse"

  const cardInfoSpacing = isPortrait? "":"space-between";

  const imageClass = isPortrait? "imageTopRadius" : "imageLeftRadius";


  const handleImageLoad = ()=> cardInfoRef.current.style.display = "flex";

    return (
      <ProductCard  propsObject={{cardStyleObject:{ borderRadius:"5px",height:cardHeight,display:cardDisplay,width:"100%"},imageStyleObject:{width:imageWidth,height:imageHeight},imageClass, handleImageLoad,imageUrls,name}}>
        <ProductCardInfo ref={cardInfoRef} propsObject={{wrapperStyleObject:{flexDirection:"column",flexWrap:"wrap", padding:`${isPortrait? ".5rem" : "1.5rem"}`,justifyContent:cardInfoSpacing,flexGrow:"1"},detailsStyleObject:{display:"flex",flexDirection:cardDetailDirection,alignItems:`${isPortrait?"":"center"}`},cardDetailClass,_price,isPortrait,name,description,location}}/>
      </ProductCard>
  )
}

export default ProductCardWrapper;