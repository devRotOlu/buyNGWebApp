import React,{useRef,useEffect,useContext} from 'react';

import { appContext } from '../../../context/ContextWrapper';

const CarouselItem = (props) => {
    const {
            image,index,
            activeImage
        } = props.propsObject
    
    const appState = useContext(appContext);

    const {screenSize} = appState;

    const isActive = ((index + 1) === activeImage)? "active" : "";
    const itemRef = useRef();

    // useEffect(()=>{
    //     console.log("screen changed");
    //     let parentWidth = getComputedStyle(document.getElementById("carouselInner")).width;
    //     itemRef.current.style.width = parentWidth;
    // },[screenSize])

  return (
    <div ref={itemRef} id={`slide-${index + 1}`} className={`${isActive}`} style={{flexShrink:"0",height:"100%",width:"100%"}}>
        {
            image
        }
    </div>
  )
}

export default CarouselItem