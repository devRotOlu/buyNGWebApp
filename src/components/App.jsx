import React from 'react';
import { Routes,Route } from 'react-router-dom';

import Home from './home/Home';
import Navbar from './Navbar';
import IdentifyUser from './validationAndAuthorization/identifyUser/IdentifyUser'
import RegisterUser from './validationAndAuthorization/registerUser/RegisterUser';
import SignInUser from './validationAndAuthorization/siginUser/SignInUser';
import ContextWrapper from '../context/ContextWrapper';
import ProfilePassword from './validationAndAuthorization/registerUser/ProfilePassword';
import ProfileDetails from './validationAndAuthorization/registerUser/ProfileDetails';
import RegistrationEmailConfirmation from './validationAndAuthorization/registerUser/RegistrationEmailConfirmation';
import RecoverPassword from './validationAndAuthorization/recoverPassword/RecoverPassword';
import PasswordEmailConfirmation from './validationAndAuthorization/recoverPassword/PasswordEmailConfirmation';
import Product from './product/Product';
import AddProduct from "./product/addProduct/AddProduct";
import AboutProduct from './product/addProduct/AboutProduct';
import ProductDetails from './product/addProduct/ProductDetails';
import ViewCategory from './category/ViewCategory';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./validationAndAuthorization/style.css";
import "./product/style.css";
import "./home/style.css";
import "./category/style.css"


const App = () => {

  return (
    <ContextWrapper>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='register' element={<RegisterUser/>}>
            <Route index element={<ProfilePassword/>}/>
            <Route path="password" element={<ProfilePassword/>}/>
            <Route path="profile-details" element={<ProfileDetails/>}/>
            <Route path='confirm-email' element={<RegistrationEmailConfirmation/>}/>
        </Route>
        <Route path='identification' element={<IdentifyUser/>}/>
        <Route path='signin' element={<SignInUser/>}/>
        <Route path='reset-password' element={<RecoverPassword/>}/>
        <Route path="reset-password/confirm-email" element={<PasswordEmailConfirmation/>}/>
        <Route path='product' element={<Product/>}>
          <Route  path="add-product" element={<AddProduct/>}>
                <Route path="product-details" element={<ProductDetails/>}/>
                <Route path="about-product" element={<AboutProduct/>}/>
          </Route>
        </Route>
        <Route path=":category" element={<ViewCategory/>}/>
      </Routes>
    </ContextWrapper>
  )
}

export default App