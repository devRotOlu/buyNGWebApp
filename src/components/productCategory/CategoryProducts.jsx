import React,{useRef,useState} from 'react';

import ProductCard from './ProductCard';

const CategoryProducts = ({name,products}) => {

    const productGalleryRef = useRef();

    const [isPortrait,setIsPortrait] = useState(true);

    const potraitBgColor = isPortrait? "rgb(11, 206, 11)":"grey";
    const landScapeBgColor = isPortrait? "grey":"rgb(11, 206, 11)";

    const gridTemplateColumns = isPortrait? "repeat(3,32%)" :"100%";
    const initialRowHeight = 2 ;

    const  potraitBlocks = [1,2,3,4,5,6,7,8,9].map(digit=>{
        return (<span key={digit}  style={{backgroundColor:potraitBgColor,width:"100%",height:"100%"}}></span>)
    })

    const  landScapeBlocks= [10,11,12,13,14,15].map(digit=>{
        return (<span key={digit} style={{backgroundColor:landScapeBgColor,width:"100%",height:"100%"}}></span>)
    })

    const portraitToggle = ()=>{
        if (!isPortrait) {
            setIsPortrait(true);
        }
    };

    const landScapeToggle = ()=>{
        if (isPortrait) {
            setIsPortrait(false);
        }
    }

    const productList = products.map(product=>{
        return <ProductCard key={product.id} propsObject={{isPortrait,product,initialRowHeight}} />   
    });
    
  return (
    <div style={{paddingTop:"50px", flexGrow:"1"}}>
        <div>
             <h3 style={{fontWeight:"bold"}}>{name} in Nigeria</h3>
             <div style={{display:"flex",gap:"10px"}}>
                 <div onClick={portraitToggle} style={{display:"grid",gridTemplateColumns:"repeat(3,4px)",gridTemplateRows:"repeat(3,4px)",gap:"2px",cursor:"pointer"}}>
                        {
                            potraitBlocks
                        }
                 </div>
                 <div onClick={landScapeToggle} style={{display:"grid",gridTemplateColumns:"4px 16px",gridTemplateRows:"repeat(3,4px)",gap:"2px",cursor:"pointer"}}>
                     {
                         landScapeBlocks
                     }
                 </div>
             </div>
        </div>
        <div className={`productGallery ${isPortrait?"" : "productGalleryLandScape"}`} ref={productGalleryRef} style={{gridTemplateColumns,gridAutoRows:`${initialRowHeight}px`}}>
            {
                productList
            }
        </div>
    </div>
  )
}

export default CategoryProducts;
