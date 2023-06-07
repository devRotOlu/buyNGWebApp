import React,{useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes,faCamera } from '@fortawesome/free-solid-svg-icons';

import OffCanvas from "./OffCanvas";
import Carousel from "./Carousel/Carousel";
import CarouselNextControl from './Carousel/CarouselNextControl';
import CarouselPreviousControl from './Carousel/CarouselPreviousControl';

import { appContext } from '../../context/ContextWrapper';

const OffCanvasWrapper = (props) => {

    const {
        activeImage, setActiveImage,
        imageUrls,name,minImageIndex
    } = props.propsObject

    const appSates = useContext(appContext);
    const {moveCanvasOffView} = appSates;

    const images = imageUrls.map((imageUrl,index)=>{
        const {url,id} = imageUrl
        return (
            <img key={id} style={{width:"100%",objectFit:"contain",maxHeight:"100%"}}  src={url} alt={`${name}-${index + 1}`} />
        )
    })

    const imageCount = images.length;

    const handleClick = (event)=>{
        event.preventDefault();
        event.stopPropagation()
        moveCanvasOffView()
    };

  return (
    <OffCanvas alignItems="center" justifyContent="center"
          bodyStyles={{width:"100%",height:"100%"}}>
        <Carousel propsObject={{images,imageStyles:{maxHeight:"100%",maxWidth:"60%"},activeImage,setActiveImage,carouselStyles:{display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"},handleClick}}>
            <div style={{position:"absolute",width:"fit-content",top:"0",left:"0",height:"100%"}}>
                <CarouselPreviousControl propsObject={{setActiveImage,imageCount,styleObject:{display:"flex", alignItems:"end",position:"relative"},previousButtonStyleObject:{position:"absolute",top:"50%", transform:"translateY(-50%)"}}} > 
                    <span style={{backgroundColor:"black",fontSize:"15px",color:"white",padding:"0.2rem 0.7rem", display:"flex",gap:"12px",alignItems:"center",borderRadius:"3px",fontWeight:"bold",opacity:"0.5",marginBottom:"20px"}}>
                        <FontAwesomeIcon icon={faCamera}/>
                        <span className="small">{activeImage}/{imageCount}</span>
                    </span>
                </CarouselPreviousControl>
            </div>
            <div style={{position:"absolute",width:"fit-content",top:"0",right:"0",height:"100%"}}>
                <CarouselNextControl propsObject={{styleObject:{display:"flex",alignItems:"center",paddingRight:"1.5rem",position:"relative"},setActiveImage,imageCount,float:"right"}}>
                    <FontAwesomeIcon onClick={handleClick} style={{color:"white",position:"absolute",top:"10px",fontSize:"30px"}} icon={faTimes}/>
                </CarouselNextControl>
            </div>
        </Carousel>
    </OffCanvas>
  )
}

export default OffCanvasWrapper