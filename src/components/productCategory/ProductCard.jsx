import React from 'react'

const ProductCard = (props) => {
    const {
        cardStyleObject, imageStyleObject,
        imageClass, handleImageLoad,
        imageUrls, name
    } = props.propsObject
  return (
    <div style={cardStyleObject}>
      <img className={imageClass} onLoad={handleImageLoad} src={imageUrls[0].url} alt={name} style={imageStyleObject}/>
      {
          props.children
      }
    </div>
  )
}

export default ProductCard