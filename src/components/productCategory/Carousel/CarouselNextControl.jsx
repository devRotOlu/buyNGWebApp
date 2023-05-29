import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CarouselNextControl = (props) => {

  const {
          styleObject,nextButtonStyleObject,
          setDisplayImageIndex,imageCount
        } = props.propsObject;

  const handleNextClick = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    setDisplayImageIndex(previousIndex=> {
      return (previousIndex === imageCount)? 1 : ++previousIndex
    })
  }

  return (
    <div role="button" style={{height:"100%",...styleObject}} onClick={handleNextClick}  data-bs-target="#appCarousel" data-bs-slide="next">
        <FontAwesomeIcon style={{fontSize:"2.5rem",color:"white",...nextButtonStyleObject}} icon={faAngleRight}/>
        {
          props.children
        }
    </div>
  )
}

export default CarouselNextControl;