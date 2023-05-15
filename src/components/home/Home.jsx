import React,{useEffect,useContext, useState} from 'react';
import { Link } from 'react-router-dom';

import SearchBar from '../SearchBar';

import { appContext } from '../../context/ContextWrapper';
import avatar1 from "../../data/result_1.png";
import avatar2 from "../../data/result_2.png"


const Home = () => {

  const appStates = useContext(appContext);
  const {productCategory} = appStates;

  const [searchTerm, setSearchTerm] = useState("");

  const categories= productCategory.map(category=>{
    return (
    <li className="categories" key={category.id}>
      <Link to={`/${category.name}`} state={{category}}>{category.name}</Link>
    </li>
    )
  })

  const handleSearch = (event)=> setSearchTerm(event.target.value);

  useEffect(()=>{
    console.log(searchTerm,"searchTerm")
  },[searchTerm])

  return (
    <div className="home ">
    
      <div className="searchBarWrapper componentWrappers">
        <div style={{minWidth:"30%"}}>
            <img src={avatar2} style={{width:"100%"}}/>
        </div>

        <div style={{minWidth:"40%",display:"flex",alignItems:"center",flexDirection:"column",gap:"80px"}}>
          <span style={{color:"white"}}>
             {"Find anything in "} 
              <span className="small" style={{backgroundColor:"black",padding:"3px 5px",borderRadius:"4px",display:'inline-flex',alignItems:"center"}}>
               <i className="bi bi-geo-alt-fill" style={{fontSize:"10px",marginRight:"10px"}}/>
                All Nigeria
             </span>
          </span>
          <SearchBar propsObject={{height:"60px",width:"100%",placeholder:"I am looking for ...",handleSearch, searchTerm,searchButtonColor:"rgb(11, 206, 11)",borderRadius: "10px",searchButtonPosition:"right",placeholderMargin:"20px",searchButtonMargin:"20px"}}/>
        </div>

        <div style={{minWidth:"30%",alignSelf:"flex-end"}}>
            <img src={avatar1} style={{width:"100%"}}/>
        </div>
      </div>

      <div className="componentWrappers produtsContainer">

        <ul className="categoriesWrapper">
          {
            categories
          }
        </ul>

        <div className="topProducts">

        </div>

      </div>

    </div>
  )
}

export default Home