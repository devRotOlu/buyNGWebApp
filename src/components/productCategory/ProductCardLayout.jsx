import React,{useRef,useState,useEffect} from 'react';

import ProductCardInfo from "./ProductCardInfo";
import ProductCard from "./ProductCard";

import { commaSeparatePrice,getPortraitHeight,getGridRowStart } from '../../helperFunctions/helperFunctions';

const ProductCardLayout = (props) => {

  const {
          product,isPortrait,
          rowHeight,productIndex,
          products,columnCount
        } = props.propsObject;
  
  const portraitColumnStart = isPortrait? (productIndex + 1)% columnCount || columnCount : columnCount;
  let gridColumnStart = portraitColumnStart;

  const gridRowStart = useRef(0);
  const cardInfoRef = useRef();
  const productCardRef = useRef()

  const {
    description,id,
    location, name, 
    quantity,price,
    imageUrls
  } = product;

  const [gridRowEnd,setGridRowEnd] = useState(0);

  const [isImageLoaded,setIsImageLoaded] = useState(false)

  const [shouldDisplay,setShouldDisplay] = useState(false);

  useEffect(()=>{
    setTimeout(() => {
      setShouldDisplay(true)
    }, (1000 * (productIndex + 1)) );
    if (shouldDisplay) {
      setShouldDisplay(false)
    }
  },[products.length])

  const cardHeight = isPortrait? "fit-content" :"230px";

  const _price = commaSeparatePrice(price);

  const imageWidth = isPortrait? "100%" : "";

  const imageHeight = isPortrait? "" : "100%";

  const cardDisplay = isPortrait? "" :"flex";

  const cardDetailClass = isPortrait? "flexColumn" : "flexRow";

  const cardDetailDirection = isPortrait? "column" :"row-reverse"

  const cardInfoSpacing = isPortrait? "":"space-between";

  const imageClass = isPortrait? "imageTopRadius" : "imageLeftRadius";

  const handleImageLoad = ()=> {
    cardInfoRef.current.style.display = "flex";
    setIsImageLoaded(true);
  }

  useEffect(()=>{
    if (shouldDisplay && isImageLoaded) {
      console.log("reading grid start")
      gridRowStart.current = getGridRowStart(isPortrait,products,productIndex,productCardRef.current.parentElement,gridColumnStart,columnCount)
      modifyRowSize(productCardRef.current);
    }
  })

  const modifyRowSize= (productCard)=>{
    let marginBottom = 20;
    var rowSpan;
    var _gridRowEnd;
    if (isPortrait) {
      rowSpan = getPortraitHeight(productCard,marginBottom,rowHeight)
    }else{
      const _cardHeight = Number(cardHeight.replace("px",""));
      rowSpan = Math.ceil((_cardHeight + marginBottom)/rowHeight);
    }
    _gridRowEnd = gridRowStart.current + rowSpan
    setGridRowEnd(_gridRowEnd);
  }

  if (shouldDisplay) {
    return (
      <ProductCard ref={productCardRef} propsObject={{cardStyleObject:{ borderRadius:"5px",height:cardHeight,display:cardDisplay,gridColumnStart,gridRowStart:gridRowStart.current,gridRowEnd},imageStyleObject:{width:imageWidth,height:imageHeight},imageClass, handleImageLoad,imageUrls,name}}>
        <ProductCardInfo ref={cardInfoRef} propsObject={{wrapperStyleObject:{flexDirection:"column",flexWrap:"wrap", padding:`${isPortrait? ".5rem" : "1.5rem"}`,justifyContent:cardInfoSpacing,flexGrow:"1"},detailsStyleObject:{display:"flex",flexDirection:cardDetailDirection,alignItems:`${isPortrait?"":"center"}`},cardDetailClass,_price,isPortrait,name,description,location}}/>
      </ProductCard>
    )
  }
}

export default ProductCardLayout;