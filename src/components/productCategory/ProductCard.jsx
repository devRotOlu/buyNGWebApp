import React,{useRef,useState,useEffect} from 'react';

import { commaSeparatePrice } from '../../helperFunctions/helperFunctions';

const ProductCard = (props) => {

  const {product,isPortrait,initialRowHeight} = props.propsObject

  const {
    description,id,
    location, name, 
    quantity,price,
    imageUrls
  } = product;

  const cardInfoRef = useRef();

  const productCardRef = useRef()

  const [rowSpan,setRowSpan] = useState(0);

  const [isImageLoaded,setIsImageLoaded] = useState(false)

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
    if (isImageLoaded) {
      modifyRowSize();
    }
  },[isPortrait,isImageLoaded])
  
  const modifyRowSize= ()=>{
    let marginBottom = 20;
    var _rowSpan;
    if (isPortrait) {
      let targetHeight = getComputedStyle(productCardRef.current).height;
      targetHeight = Number(targetHeight.replace("px",""));
      const remainder = targetHeight%initialRowHeight;
      marginBottom = marginBottom - (initialRowHeight - remainder);
      _rowSpan = targetHeight/initialRowHeight;
      _rowSpan = _rowSpan + (marginBottom/initialRowHeight);
      setRowSpan(Math.ceil(_rowSpan));
    }else{
      _rowSpan = ((Number(cardHeight.replace("px","")) + marginBottom)/initialRowHeight)
      setRowSpan(Math.ceil(_rowSpan));
    }
  }


  return (
    <div ref={productCardRef} style={{ borderRadius:"5px",height:cardHeight,gridRow:`span ${rowSpan}`,display:cardDisplay}}>
        <img className={imageClass} onLoad={handleImageLoad} src={imageUrls[0].url} alt={name} style={{width:imageWidth,height:imageHeight}}/>
        <div ref={cardInfoRef} className="cardInfo" style={{flexDirection:"column",flexWrap:"wrap", padding:`${isPortrait? ".5rem" : "1.5rem"}`,justifyContent:cardInfoSpacing,flexGrow:"1"}} >
            <div style={{display:"flex",gap:"7px",flexDirection:"column"}}>
              <div className={`${cardDetailClass}`} style={{display:"flex",flexDirection:cardDetailDirection,alignItems:`${isPortrait?"":"center"}`}}>
                <span className="lead" style={{color:"green",fontWeight:"bold"}}> 
                  &#x20A6; {
                    _price
                  }
                </span>
                <span className={`text-dark ${isPortrait? "small": "lead"}`} style={{fontWeight:"bolder",flexGrow:"1"}}>
                  {name}
                </span>
              </div>
              <span className="instructions cardDetails">{description}</span>
            </div>
            <span className="instructions cardDetails">
              <i className="bi bi-geo-alt-fill" style={{fontSize:"14px"}}/>
              {
                ` ${location}`
              }
            </span>
        </div>
    </div>
  )
}

export default ProductCard;