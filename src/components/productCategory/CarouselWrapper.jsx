import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import Carousel from "./Carousel/Carousel";
import CarouselPreviousControl from './Carousel/CarouselPreviousControl';
import CarouselNextControl from './Carousel/CarouselNextControl';
import CanvassTrigger from './CanvassTrigger';

const CarouselWrapper = (props) => {

    const {
        imageUrls,name,
        displayImageIndex,setDisplayImageIndex
    } = props.propsObject;

    const images = imageUrls.map((imageUrl,index)=>{
        const {url,id} = imageUrl
        return (
           <img key={id} style={{width:"100%",objectFit:"contain",height:"100%"}}  src={url} alt={`${name}-${index + 1}`} />
        )
    })
    
    const imageCount = images.length;

  return (
    <Carousel propsObject={{images,imageStyles:{maxHeight:"500px"},displayImageIndex,setDisplayImageIndex}}>
        <div style={{position:"absolute",top:"0",width:"100%",backgroundColor:"rgba(0,0,1,0.2)",display:"flex",height:"100%",zIndex:"1000"}}>
            <CarouselPreviousControl propsObject={{setDisplayImageIndex,imageCount,styleObject:{display:"flex", alignItems:"end",position:"relative"},previousButtonStyleObject:{position:"absolute",top:"50%", transform:"translateY(-50%)"}}} >   
                <span style={{backgroundColor:"black",fontSize:"15px",color:"white",padding:"0.2rem 0.7rem", display:"flex",gap:"12px",alignItems:"center",borderRadius:"3px",fontWeight:"bold",opacity:"0.5",marginBottom:"20px"}}>
                    <FontAwesomeIcon icon={faCamera}/>
                    <span className="small">{displayImageIndex}/{imageCount}</span>
                </span>
            </CarouselPreviousControl>
            <CanvassTrigger styleObject={{flexGrow:"1",height:"100%"}}/>
            <CarouselNextControl propsObject={{styleObject:{display:"flex",alignItems:"center",paddingRight:"1.5rem"},setDisplayImageIndex,imageCount}}/>
        </div>
    </Carousel>
  )
}

export default CarouselWrapper