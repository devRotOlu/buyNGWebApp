import React from 'react';

import CarouselItem from "./CarouselItem"

const Carousel = (props) => {

    const {
            images,imageStyles,
            activeImage,
            carouselStyles,
            handleClick
        } = props.propsObject;

    const imageList = images.map((image,index)=>{
        return <CarouselItem key={index + 1} propsObject={{image,index,activeImage}}/>
    })


  return (
    <div onClick={handleClick} id="appCarousel" className="carouselSlide bg-danger" style={{position:"relative",...carouselStyles,overflow:"hidden"}}>
        <div id="carouselInner" className="carouselInner" style={{...imageStyles}}>
            <div id="slider" style={{height:"100%"}}>
                {
                imageList
                }
            </div>
        </div>
        {
            props.children
        }
    </div>
  )
}

export default Carousel;