import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const CarouselPreviousControl = (props) => {
 
  const {
          styleObject,previousButtonStyleObject,
        } = props.propsObject;

  const handlePreviousClick = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    setDisplayImageIndex(previousIndex=> {
      return (previousIndex === 1)? imageCount : --previousIndex
    })
  }

  return (
    <div  role="button" onClick={handlePreviousClick} style={{height:"100%",paddingLeft:"1.5rem",...styleObject}}  data-bs-target="#appCarousel" data-bs-slide="prev" >
        <FontAwesomeIcon style={{fontSize:"2.5rem",color:"white",...previousButtonStyleObject}} icon={faAngleLeft}/> 
        {
          props.children
        }  
    </div>
  )
}

export default CarouselPreviousControl;