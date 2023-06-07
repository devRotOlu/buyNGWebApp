import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { carouselNext,imageSlider } from '../../../helperFunctions/helperFunctions';

const CarouselNextControl = (props) => {

  const {
          styleObject,nextButtonStyleObject,
          setActiveImage,imageCount,
          activeImage,minImageIndex
        } = props.propsObject;

  const handleNextClick = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    imageSlider(activeImage,imageCount,imageCount,carouselNext)
    setActiveImage(previousIndex=> {
      return (previousIndex === imageCount)? minImageIndex.current : ++previousIndex
    })
  }

  return (
    <div onClick={handleNextClick} id="carouselNext" role="button" style={{height:"100%",...styleObject,position:"relative"}}>
        <FontAwesomeIcon style={{fontSize:"2.5rem",color:"white",...nextButtonStyleObject}} icon={faAngleRight}/>
        {
          props.children
        }
    </div>
  )
}

export default CarouselNextControl;