import React from 'react'

const CarouselOverlay = (props) => {
  return (
    <div style={{position:"absolute",top:"0",width:"100%",backgroundColor:"rgba(0,0,1,0.2)",display:"flex",justifyContent,height:"100%"}}>
        {
            props.children
        }
    </div>
  )
}

export default CarouselOverlay