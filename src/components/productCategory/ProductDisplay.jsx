import React,{useState,useRef} from 'react';
import { useLocation} from 'react-router-dom';

import CarouselWrapper from "./CarouselWrapper";
import OffCanvasWrapper from './OffCanvasWrapper';
import Thumbnail from './Thumbnail';

const ProductDisplay = () => {

  const routeLocation = useLocation();
  const {state:{product},pathname} = routeLocation;

  const [activeImage,setActiveImage] = useState(1);
  const minImageIndex = useRef(activeImage);

  const {
    description,location, 
    name,price,
    imageUrls
  } = product;
  
  let productHierachy = pathname.split("/");
  productHierachy = productHierachy.map((level,index)=>{
    if (level) {
      return (
        <React.Fragment key={index}>
          <span> / </span>
          <span className={(index + 1 === productHierachy.length)?"headerLabel":"headerCategory"}>{level}</span>
        </React.Fragment>
      )
    }
  })


  const thumbnails = imageUrls.map((imageUrl,index)=>{
    const {url,id} = imageUrl
    return <Thumbnail key={id} propsObject={{imageIndex:index,name,
    url,imageUrls,id,activeImage,setActiveImage, minImageIndex}}/>
  }) 

  return (
    <div className="categoryWrapper productMainWrapper" style={{paddingBottom:"20px"}}>
      <div style={{paddingTop:"20px",marginBottom:"50px",width:"100%"}}>
          <div  className="categoryHeader productHeader">
            <span className="headerCategory">All ads</span>
            {
              productHierachy
            }
          </div>
          <OffCanvasWrapper propsObject={{activeImage, setActiveImage,
        imageUrls,name,minImageIndex}}/>
      </div>
      <div style={{display:"flex",gap:"10px"}}>
        <div style={{width:"70%",backgroundColor:"white"}}>
          <CarouselWrapper propsObject={{imageUrls,name,
        activeImage,setActiveImage,minImageIndex}}/>
          <div style={{marginTop:"10px",display:"grid",justifyContent:"space-between",gridTemplateRows:"150px",gridTemplateColumns:"repeat(5,19%)"}}>
              {
                thumbnails
              }
          </div>
        </div>
        <div style={{width:"30%"}}>

        </div>
      </div>
    </div>
  )
}

export default ProductDisplay;