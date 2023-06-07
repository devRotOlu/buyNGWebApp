import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import {carouselPrevious,imageSlider} from "../../../helperFunctions/helperFunctions"

const CarouselPreviousControl = (props) => {
 
  const {
          styleObject,previousButtonStyleObject,
          setActiveImage,imageCount,
          activeImage,minImageIndex
        } = props.propsObject;

  const handlePreviousClick = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    imageSlider(activeImage,imageCount,minImageIndex.current,carouselPrevious,minImageIndex)
    setActiveImage(previousIndex=> {
      return (previousIndex === minImageIndex.current)? imageCount : --previousIndex
    })
  }

  return (
    <div id="carouselPrevious"  role="button" onClick={handlePreviousClick} style={{height:"100%",paddingLeft:"1.5rem",...styleObject,position:"relative"}}  data-bs-target="#appCarousel" data-bs-slide="prev" >
        <FontAwesomeIcon style={{fontSize:"2.5rem",color:"white",...previousButtonStyleObject}} icon={faAngleLeft}/> 
        {
          props.children
        }  
    </div>
  )
}

export default CarouselPreviousControl;