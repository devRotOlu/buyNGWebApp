import React,{useContext} from 'react';
import {useLocation,useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

import { appContext } from '../../../context/ContextWrapper';


const Header = () => {

  const location = useLocation();

  const {pathname} = location;

  const appStates = useContext(appContext);
  const {productObject,setProductObject} = appStates;

  const isProductDetails = (pathname.includes("product-details"))? true : false;

  const visibility = isProductDetails? "visible" :"hidden";

  const pageIndicatorBg = isProductDetails? "lightslategray" :"green";

  const pageIndicator_DivBg = isProductDetails? "green":"lightslategray";

  const navigate = useNavigate();

  const handleClick = ()=> navigate("/product/add-product/about-product");

  const handleClearForm = ()=>{

    const product = {};

    Object.keys(productObject).forEach(productDetails=>{
      if (productDetails === "imageFiles") {
        product[productDetails] = [];
      }
      else{
        product[productDetails] = "";
      }
    })
    
    setProductObject(product);
    
    if (isProductDetails) {
      navigate("/product/add-product/about-product");
    }
  }

  return (
    <div className="w-100" style={{margin:"0"}}>
        <div className="headings inputWrapper">
            <div onClick={handleClick} style={{height:"fit-content", display:"flex", alignItems:"center",cursor:"pointer",visibility}}>
              <FontAwesomeIcon icon={faChevronLeft} style={{fontSize:"20px"}}/>
              <p className="small"  style={{color:"green",fontWeight:"bolder", display:"inline", marginLeft:"5px",marginTop:"0"}}>
                Back
              </p>
            </div>
            <h2 style={{fontWeight:"bolder"}}>Post Product</h2>
            <p onClick={handleClearForm} className="small text-danger clearForm" style={{fontWeight:"bolder", cursor:"pointer"}} >Clear</p>
        </div>
        <div className="pageIndicator" style={{backgroundColor:pageIndicatorBg}}>
            <p className="d-inline small" style={{lineHeight:"50px",color:"white",width:"fit-content"}}> Step 1: About Product</p>
            <div style={{backgroundColor: pageIndicator_DivBg}}>
                <p className="d-inline small" style={{lineHeight:"50px",color:"white"}}> Step 2: Product Details</p>
            </div>
        </div>
    </div>
  )
}

export default Header