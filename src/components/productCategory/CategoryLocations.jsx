import React,{useContext,useEffect,useState,useRef} from 'react';

import ProductLocation from './ProductLocation';
import OffCanvas from './OffCanvas';
import SearchBar from "../SearchBar";

import { appContext } from '../../context/ContextWrapper';
import {removeExtraSpaces} from '../../helperFunctions/helperFunctions';

const readProductLocations = (locationArray,regions,category,gridRows,setSelectedState,selectedState,setSelectedLocation,previousRegion,previousState)=>{

    const areValid = regions.length && category;

    if (areValid) {

        let productLocation = []

        category.products.forEach(product=>productLocation.push(product.location));

        return locationArray.map((location,index)=>{

            if (selectedState) {
                productLocation = productLocation.filter(address=> address.includes(location.name))
            }
            else{
                productLocation = regions[index].filter(region=>{
                    return productLocation.some(address=> address.includes(region.name))
                })
            }
            const locationFirstLetter = location.name[0];
            const firstIndex = locationArray.findIndex(location=> location.name[0] === locationFirstLetter);
            const locationIndentifier = (firstIndex === index)? locationFirstLetter : undefined;
            return <ProductLocation propsObject={{location,productLocation,gridRows,locationIndentifier,locationArray,index,setSelectedState,selectedState,setSelectedLocation,previousRegion,previousState}} key={location.id} />
        });
    }
}

const readCategoryHeader = (selectedState,category)=>{

    if (!selectedState) {
        return(
            <React.Fragment>
                <span style={{cursor:"pointer"}}> { "All Nigeria  "} </span>
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
            </React.Fragment>
        )
    }
    else{
        return(
            <React.Fragment>
                <span style={{cursor:"pointer"}}>
                    <i className="bi bi-chevron-left"/>
                    {
                        " Back"
                    }
                </span>
            </React.Fragment>
        )
    }
}

const CategoryLocations = (props) => {

    const appSates = useContext(appContext);

    const {
        states, regions,
        selectedCategory,productCategory
    } = appSates;

    const {
            selectedState, setSelectedState,
            selectedLocation,setSelectedLocation
        } = props.propsObject;

    const [searchTerm,setSearchTerm] = useState("")

    const [category,setCategory] = useState(null);

    const previousState = useRef("");

    const previousRegion = useRef("");

    const handleSearch = (event)=> setSearchTerm(event.target.value);

    let locationArray = states;

    if (selectedState) {
        const selectedStateIndex = states.findIndex(state=> selectedState.includes(state.name));
        locationArray = regions[selectedStateIndex];
    }

    console.log(locationArray,"locationArray");

    const _gridRows = Math.ceil(locationArray.length/3);
    const _rowsTemplate = `repeat(${_gridRows},50px)`;

    useEffect(()=>{
        if (productCategory.length && selectedCategory) {
            const category = productCategory.find(category=> category.name === selectedCategory);
            setCategory(category);
        }
    },[productCategory.length,selectedCategory])

    useEffect(()=>{
        if (selectedLocation) {
            const locationArray = selectedLocation.split(",")
            previousRegion.current = removeExtraSpaces(locationArray[1]);
            previousState.current = removeExtraSpaces(locationArray[0]);
            selectedLocation("");
        }
    },[])

    const handleClick = ()=>{
        if (selectedState) {
            setSelectedState("");    
        }
        else{
            document.getElementById("canvas").focus();
        }
    }

    
  return ( 
    <OffCanvas alignItems="center" justifyContent="center" bodyWidth="70%"
    bodyHeight="80%">
            <div className="productLocationWrapper">
                <div style={{display:"grid",padding:"20px 50px 20px 0",alignItems:"center",gridTemplateColumns:"repeat(3,1fr)",width:"100%",lineHeight:"40px"}}>
                        <div onClick={handleClick} style={{paddingLeft:"30px", display:"flex",alignItems:"center"}}>
                            <span> 
                                {
                                    readCategoryHeader(selectedState,category)
                                }
                            </span>                       
                        </div>
                        <div></div>
                        <div style={{paddingLeft:"30px"}}>
                            <div>
                             <SearchBar propsObject={{height:"40px", width:"100%",placeholder:"Find state, city or district",handleSearch,searchTerm,searchButtonColor:"rgb(133, 132, 132)",borderRadius: "5px",searchButtonPosition:"left",placeholderMargin:"10px",searchButtonMargin:"10px"}}/> 
                            </div>
                        </div>
                </div>
                <div className="productLocationContainer" style={{gridTemplateRows:_rowsTemplate}}>
                    {
                        readProductLocations(locationArray,regions,category,_gridRows,setSelectedState,selectedState,setSelectedLocation,previousRegion,previousState)
                    }
                </div>
            </div>
    </OffCanvas>    
  )
}

export default CategoryLocations;

