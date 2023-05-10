import React from 'react'

const ImageList = ({provided,images}) => {
  return (
    <ul className="imageDisplay" {...provided.droppableProps} ref ={provided.innerRef}>
    {
      images
    }
    {
      provided.placeholder
    }
  </ul>
  )
}

export default ImageList