import React,{useState} from 'react';

import ProductLayoutToggle from './ProductLayoutToggle';
import ProductCardWrapper from '../ProductCardWrapper';
import ProductSorter from './ProductSorter';

const CategoryProducts = (props) => {

    const {
            name,products,
            setSortProductsBy,sortProductsBy
        } = props.propsObject

    const _sortProductsBy = !sortProductsBy? " Recommended":(sortProductsBy === 1)? " Lowest price" : " Highest price";

    const [isPortrait,setIsPortrait] = useState(true);

    const columnCount = isPortrait? 3 : 1;
    const potraitBgColor = isPortrait? "rgb(11, 206, 11)":"grey";
    const landScapeBgColor = isPortrait? "grey":"rgb(11, 206, 11)";

    const gridTemplateColumns = isPortrait? `repeat(${columnCount},32%)` :"100%";

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

    const list = (()=>{
        const parentList = [];
        for (let index = 1; index <= columnCount; index++){
            parentList.push(index)
        }
        return parentList.map((parentDiv,index)=>{
            let _products=  products.filter((product,productIndex)=>{
                const isChild = ((productIndex + 1)%columnCount) === ((index+1)%columnCount);
                return isPortrait? isChild : true;
            })
            _products = _products.map((product,productIndex)=>{
               return <ProductCardWrapper key={product.id} propsObject={{isPortrait,product}} />   
            })

            return (
                <div key={index} style={{display:"flex",flexDirection:"column",gap:"20px",marginBottom:"20px"}}>
                    {
                        _products
                    }
                </div>
            )
        })
    })();
    
  return (
    <div style={{paddingTop:"50px", flexGrow:"1"}}>
        <div style={{marginBottom:"20px"}}>
             <h3 style={{fontWeight:"bold"}}>{name} in Nigeria</h3>
             <div style={{display:"flex", justifyContent:"space-between",alignItems:"center",marginTop:'30px'}}>
                 <ProductLayoutToggle propsObject={{portraitToggle,landScapeToggle,potraitBlocks,landScapeBlocks}}/>
                 <ProductSorter setSortProductsBy={setSortProductsBy} sortProductBy={_sortProductsBy}/>
             </div>
        </div>
        <div  className="productGallery" style={{gridTemplateColumns}}>
            {
                list
            }
        </div>
    </div>
  )
}

export default CategoryProducts;
