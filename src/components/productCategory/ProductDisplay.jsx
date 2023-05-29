import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';

import CarouselWrapper from "./CarouselWrapper";
import OffCanvasWrapper from './OffCanvasWrapper';

const ProductDisplay = () => {

  const routeLocation = useLocation();
  const {state:{product},pathname} = routeLocation;

  const [displayImageIndex,setDisplayImageIndex] = useState(1);

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
    if (index < 5) {
      if (index === 4) {
        const remainder = imageUrls.length - (index + 1);
        return(
          <div key={id} style={{width:"100%",height:"100%",position:"relative"}}>
            <img style={{width:"100%",objectFit:"contain",height:"100%"}} src={url} alt={`${name}-${index + 1}`} />
            <div style={{position:"absolute",top:"0",left:"0",height:"100%",width:"100%", display:"flex", alignItems:"center",justifyContent:"center",backgroundColor:"rgba(0,0,1,0.4)"}}>
                  <p style={{color:"white",fontSize:"bold"}}>
                    + {remainder}<br/>images
                  </p>
            </div>
          </div>
        )
      }
      return(
        <div key={id} style={{width:"100%",height:"100%"}}>
          <img style={{width:"100%",objectFit:"cover",height:"100%"}} src={url} alt={`${name}-${index + 1}`} />
        </div>
      )
    }
  }) 


  return (
    <div className="categoryWrapper productMainWrapper" style={{paddingBottom:"20px"}}>
      <div style={{paddingTop:"20px",marginBottom:"50px",width:"100%"}}>
          <div className="categoryHeader productHeader">
            <span className="headerCategory">All ads</span>
            {
              productHierachy
            }
          </div>
          <OffCanvasWrapper propsObject={{displayImageIndex, setDisplayImageIndex,
        imageUrls,name}}/>
      </div>
      <div style={{display:"flex",gap:"10px"}}>
        <div style={{width:"70%",backgroundColor:"white"}}>
          <CarouselWrapper propsObject={{imageUrls,name,
        displayImageIndex,setDisplayImageIndex}}/>
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