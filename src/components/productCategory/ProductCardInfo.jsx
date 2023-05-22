import React from 'react'

const ProductCardInfo = React.forwardRef((props,ref) => {

    const {
            wrapperStyleObject,detailsStyleObject,
            _price,name,
            location,isPortrait,
            cardDetailClass,description
        } = props.propsObject
  return (
    <div ref={ref} className="cardInfo" style={wrapperStyleObject} >
            <div className="cardInfoHeader">
              <div className={`${cardDetailClass}`} style={detailsStyleObject}>
                <span className="lead productPriceContainer"> 
                  &#x20A6; {
                    _price
                  }
                </span>
                <span className={`text-dark ${isPortrait? "small": "lead"} productNameContainer`}>
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
     )
})

export default ProductCardInfo