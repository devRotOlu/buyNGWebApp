import React,{useState} from 'react';

const Carousel = (props) => {

    const {
            images,imageStyles,
            displayImageIndex,
            carouselStyles,
            handleClick
        } = props.propsObject;

    const imageList = images.map((image,index)=>{

        const isActive = (index + 1) === displayImageIndex;
        return (
            <div key={index} className={`carousel-item ${isActive?"active":""}`}>
                {
                    image
                }
            </div>
        )
    })

  return (
    <div onClick={handleClick} id="appCarousel" className="carousel slide" style={{position:"relative",...carouselStyles}}>
        <div className="carousel-inner" style={{marginRight:"auto",marginLeft:"auto",...imageStyles}}>
            {
                imageList
            }
        </div>
        {
            props.children
        }
    </div>
  )
}

export default Carousel