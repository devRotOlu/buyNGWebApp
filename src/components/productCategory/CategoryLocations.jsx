import React,{useContext,useEffect,useState,useRef} from 'react';

import ProductLocation from './ProductLocation';
import SearchBar from "../SearchBar";

import { appContext } from '../../context/ContextWrapper';
import {removeExtraSpaces} from '../../helperFunctions/helperFunctions';

const readProductLocations = (locationArray,regions,category,gridRows,setSelectedState,selectedState,setSelectedLocation,previousRegion,previousState,setSearchTerm,searchTerm)=>{

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
            return <ProductLocation propsObject={{location,productLocation,gridRows,locationIndentifier,locationArray,index,setSelectedState,selectedState,setSelectedLocation,previousRegion,previousState,setSearchTerm,searchTerm}} key={location.id} />
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
        selectedCategory,productCategory,
        moveCanvasOffView
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

    if (searchTerm) {
        locationArray = selectedState? findStateRegions(states,regions,selectedState) : states;
        locationArray = locationArray.filter(location=> location.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    else if(selectedState){
        locationArray = findStateRegions(states,regions,selectedState);
    }

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
            setSelectedLocation("");
        }
    },[])

    const handleClick = ()=>{
        if (selectedState) {
            setSelectedState("");
        }else{
            moveCanvasOffView()
        }
    }
    
  return ( 
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
            <div style={{flexGrow:"1",borderBottomLeftRadius:"inherit",borderBottomRightRadius:"inherit",overflowY:"hidden"}}>
                <div className="productLocationContainer" style={{gridTemplateRows:_rowsTemplate,borderBottomLeftRadius:"inherit",borderBottomRightRadius:"inherit"}}>
                    {
                        readProductLocations(locationArray,regions,category,_gridRows,setSelectedState,selectedState,setSelectedLocation,previousRegion.current,previousState.current,setSearchTerm,searchTerm)
                    }
                </div>
            </div>
        </div>   
    )

}

export default CategoryLocations;

const findStateRegions = (states,regions,selectedState)=>
 {
    const selectedStateIndex = states.findIndex(state => selectedState.includes(state.name));
    return regions[selectedStateIndex];
}