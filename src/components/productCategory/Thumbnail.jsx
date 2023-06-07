import React,{useEffect,useRef} from 'react';

import {autoPrevious,autoNext} from "../../helperFunctions/helperFunctions";

const Thumbnail = (props) => {

  const {
          imageIndex,name,
          url,imageUrls,
          id,activeImage,
          setActiveImage,minImageIndex
        } = props.propsObject;

  const isDisplayed = useRef(undefined);
  isDisplayed.current = activeImage === (imageIndex + 1)
  const thumbnailRef = useRef();
  const isSetActiveImage = useRef(false);
  const targetCarouselButton = useRef(undefined);

  const imageCount = imageUrls.length;

    const slideCarousel=() =>{
      setTimeout(() => targetCarouselButton.current.click(),450);
    }
    
    useEffect(()=>{
      const isImageIndexSet = isSetActiveImage.current;
      const shouldDisplay = isDisplayed.current === false;
      if (isImageIndexSet && shouldDisplay) {
       slideCarousel();
      }else{
        isSetActiveImage.current = false;
      }
    },[activeImage])

    const handleClick = ()=> {
      const shouldAutoPrevious = activeImage > (imageIndex + 1)
      if (shouldAutoPrevious) {
         autoPrevious(imageCount,activeImage,(imageIndex + 1),minImageIndex.current);
      }
      else if(shouldAutoPrevious === false)
      {
        autoNext(imageCount,activeImage,(imageIndex + 1));
      }
      setActiveImage((imageIndex + 1));
    }

    if (imageIndex < 5) {
         const isActive = (imageIndex + 1) === activeImage;
        if (imageIndex === 4) {
            const remainder = imageUrls.length - (imageIndex + 1);
            return(
              <div role="button" data-bs-target="#appCarousel" data-bs-slide-to={`${imageIndex}`} aria-current={`${isActive}`} aria-label={`Slide ${imageIndex + 1}`}  onClick={handleClick} ref={thumbnailRef} key={id} style={{width:"100%",height:"100%",position:"relative",cursor:"pointer"}}>
                <img style={{width:"100%",objectFit:"cover",height:"100%"}} src={url} alt={`${name}-${imageIndex + 1}`} />
                <div style={{position:"absolute",top:"0",left:"0",height:"100%",width:"100%", display:"flex", alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,1,0.4)"}}>
                      <p style={{color:"white",fontSize:"bold"}}>
                        + {remainder}<br/>images
                      </p>
                </div>
                <a className="">

                </a>
              </div>
            )
        }
        return(
          <div data-bs-target="#appCarousel" data-bs-slide-to={`${imageIndex}`} aria-current={`${isActive}`} aria-label={`Slide ${imageIndex + 1}`} onClick={handleClick} ref={thumbnailRef} key={id} style={{width:"100%",height:"100%",cursor:"pointer"}}>
            <img style={{width:"100%",objectFit:"cover",height:"100%"}} src={url} alt={`${name}-${imageIndex + 1}`} />
            <a className="">

            </a>
          </div>
        )    
    }
}

export default Thumbnail;