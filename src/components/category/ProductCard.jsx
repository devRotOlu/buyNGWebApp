import React,{useRef} from 'react'

const ProductCard = ({product}) => {

  const productRef = useRef();

  const handleImageLoad = ()=> productRef.current.style.display = "flex";

    const {
            description,id,
            location, name, 
            quantity,price,
            imageUrls
        } = product;

  return (
    <div style={{ borderRadius:"5px"}}>
        <img onLoad={handleImageLoad} src={imageUrls[0].url} alt={name} style={{width:"100%",borderTopLeftRadius:"inherit",borderTopRightRadius:"inherit"}}/>
        <div ref={productRef} className="cardInfo" >
            <span className="lead" style={{color:"green",fontWeight:"bold"}}> 
              &#x20A6; {
                price
              }
            </span>
            <span className="small text-dark" style={{fontWeight:"bolder"}}>
              {name}
            </span>
            <span className="instructions cardDetails">{description}</span>
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
