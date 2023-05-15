import React,{useContext,useEffect,useState,useRef} from 'react';

import ProductLocation from './ProductLocation';
import OffCanvas from './OffCanvas';
import SearchBar from "../SearchBar";

import { appContext } from '../../context/ContextWrapper';


const readProductLocations = (locationArray,regions,category,gridRows,setSelectedState,selectedState)=>{

    const areValid = regions.length && category;

    if (areValid) {

        let productLocation = []

        category.products.forEach(product=>productLocation.push(product.location));

        return locationArray.map((location,index)=>{

            if (selectedState) {
                productLocation = productLocation.filter(address=>       address.includes(location.name))
            }
            else{
                productLocation = regions[index].filter(region=>{
                    return productLocation.some(address=> address.includes(region.name))
                })
            }
            const locationFirstLetter = location.name[0];
            const firstIndex = locationArray.findIndex(location=> location.name[0] === locationFirstLetter);
            const locationIndentifier = (firstIndex === index)? locationFirstLetter : undefined;
            return <ProductLocation propsObject={{location,productLocation,gridRows,locationIndentifier,locationArray,index,setSelectedState,selectedState}} key={location.id} />
        });
    }
}

const CategoryLocations = () => {

    const appSates = useContext(appContext);

    const {
        states, regions,
        selectedCategory,productCategory
    } = appSates;

    const [searchTerm,setSearchTerm] = useState("")

    const [category,setCategory] = useState(null);

    const [selectedState, setSelectedState] = useState("");

    const handleSearch = (event)=> setSearchTerm(event.target.value);

    const rowsTemplateRef = useRef("");

    const gridRows = useRef("");

    let selectedStateIndex;

    let locationArray = states;

    if (selectedState) {
        console.log(selectedState,"selectedState")
        selectedStateIndex = states.findIndex(state=> selectedState.includes(state.name))
        console.log(states,"states")
        console.log(selectedStateIndex,"selectedStateIndex")
        locationArray = regions[selectedStateIndex];
        console.log(locationArray,"locationArray")
    }

    useEffect(()=>{
        if (productCategory.length && selectedCategory) {
            const category = productCategory.find(category=> category.name === selectedCategory);
            gridRows.current = Math.ceil(states.length/3);
            rowsTemplateRef.current = `repeat(${gridRows.current},50px)`;
            setCategory(category);
        }
    },[productCategory.length,selectedCategory,states.length]) 

    
  return ( 
    <OffCanvas>
        <div className="offcanvasWrapper">
            <div className="productLocationWrapper">
                <div style={{display:"grid",padding:"20px 50px 20px 0",alignItems:"center",gridTemplateColumns:"repeat(3,1fr)",width:"100%",lineHeight:"40px"}}>
                        <div style={{paddingLeft:"30px", display:"flex",alignItems:"center"}}>
                            <span>
                                {"All Nigeria  "}
                                <span style={{color:"rgb(133, 132, 132)"}}>
                                    <span
                                     style={{fontWeight:"bold",fontSize:"20px"}}
                                     >
                                        &#x002E; 
                                    </span>
                                    {
                                        ` ${category?category.products.length: "0"} Ads`
                                    }
                                </span>
                            </span>
                            
                        </div>
                        <div></div>
                        <div style={{paddingLeft:"30px"}}>
                            <div>
                             <SearchBar propsObject={{height:"40px", width:"100%",placeholder:"Find state, city or district",handleSearch,searchTerm,searchButtonColor:"rgb(133, 132, 132)",borderRadius: "5px",searchButtonPosition:"left",placeholderMargin:"10px",searchButtonMargin:"10px"}}/> 
                            </div>
                        </div>
                </div>
                <div className="productLocationContainer" style={{gridTemplateRows:rowsTemplateRef.current}}>
                    {
                        readProductLocations(locationArray,regions,category,gridRows.current,setSelectedState,selectedState)
                    }
                </div>
            </div>
        </div>
    </OffCanvas>    
  )
}

export default CategoryLocations;

