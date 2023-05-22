import React from 'react'

const ProductCard = React.forwardRef((props,ref) => {
    const {
        cardStyleObject, imageStyleObject,
        imageClass, handleImageLoad,
        imageUrls, name
    } = props.propsObject
  return (
    <div ref={ref} style={cardStyleObject}>
      <img className={imageClass} onLoad={handleImageLoad} src={imageUrls[0].url} alt={name} style={imageStyleObject}/>
      {
          props.children
      }
    </div>
  )
})

export default ProductCard