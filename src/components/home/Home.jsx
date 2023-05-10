import React,{useEffect,useContext} from 'react';
import { Link } from 'react-router-dom';

import {buyNGAxios} from '../../axios/axios';
import { appContext } from '../../context/ContextWrapper';


const Home = () => {

  const appStates = useContext(appContext);
  const {productCategory} = appStates;

  const categories= productCategory.map(category=>{
    return (
    <li className="categories" key={category.id}>
      <Link to={`/${category.name}`} state={{category}}>{category.name}</Link>
    </li>
    )
  })


  return (
    <div className="home">
      <ul className="categoriesWrapper">
        {
          categories
        }
      </ul>
      <div className="topProducts">

      </div>
    </div>
  )
}

export default Home