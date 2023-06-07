import React,{useState,useEffect} from 'react';
import {useCookies} from "react-cookie";

import { setAuthToken } from '../axios/authorizeSigninToken';
import {
        getStates,getRegions,
        getDataOnMount
      } from '../axios/axios';

export const appContext = React.createContext();


const ContextWrapper = (props) => {

    const [isSignedIn, setIsSignedIn] = useState(undefined);
    const [cookie,setCookie,removeCokie] = useCookies(["userDetails"])
    const [userDetails,setUserDetails] = useState({
      email:"",
      password:"",
      firstName:"",
      lastName:"",
      phoneNumber:"",
      confirmPassword:"",
      id:"",
    });

    const [productObject, setProductObject] = useState({
      name:"",
      description:"",
      price:"",
      quantity:"",
      categoryId:"",
      imageFiles:[],
      location:""
    });

    const [states, setStates] = useState([]);

    const [regions, setRegions] = useState([]);

    const [productCategory,setProductCategory] = useState([]);  

    const [categoryEmojies,setCategoryEmojies] = useState([]);

    const [user,setUser] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState("");

    const [isCanvasInView,setIsCanvasInView] = useState(false);

    const [screenSize,setScreenSize] = useState(window.innerWidth);

    const authenticateUser = (data)=>{
      if (data) {
        const {email,phoneNumber,firstName,lastName,id} = data
        setUserDetails({email,phoneNumber,firstName,lastName,id});
        setIsSignedIn(true);
      }
      else{
          setIsSignedIn(false);
      }
    }

    const initializeUserCookie = ()=>{
      setCookie("userDetails",JSON.stringify({
        token:"",
        id:""
      }),{path:"/"})
    }

    const addUserInfoToCookie = (cookieObject)=>
    {
      var currentCookie = cookie?.userDetails;
      if (!currentCookie) {
        initializeUserCookie();
        currentCookie = cookie.userDetails;
      }
      setCookie("userDetails",JSON.stringify({...currentCookie,...cookieObject}),{path:"/"})
    }

    useEffect(()=>{
     //var intervalId;
     (()=>{
       setInterval(() => {
         const _screenSize = window.innerWidth;
         if (_screenSize !== screenSize) {
           setScreenSize(_screenSize);
         }
       },200);
     })();
     //return clearInterval(intervalId);
    },[])

    useEffect(()=>{
      const userInfo = cookie.userDetails;
      
      var endPoints =  (userInfo?.id)? [`Account/get-user/${userInfo.id}`,"ProductCategory"] : ["ProductCategory"]

      getDataOnMount(endPoints,setUser,setProductCategory);
     
    },[])

    useEffect(()=>{
      const userInfo = cookie.userDetails;
      if (userInfo?.token && user?.id) {
        setAuthToken(userInfo.token);
        authenticateUser(user);
      }
      else if (!userInfo?.token) {
        initializeUserCookie();   
      }
    },[user])

    useEffect(()=>{
      console.log("getting states")
      getStates(setStates)
    },[])

    useEffect(()=>{
      if (states.length) {
        getRegions(setRegions,states)
      }
    },[states.length])

    const moveCanvasOffView = ()=>{
      const canvas = document.getElementById("canvas");
      canvas.setAttribute("aria-checked","false");
      setIsCanvasInView(false);
    }


    const styleValidationForm = (userDetailInput,labelSpan)=>{

      const currentInput = userDetailInput.current;
      const currentInputName = currentInput.name;
      const labelSpanStyle = labelSpan.current.style;
      const userDetailInputStyle = currentInput.style;
  
      if (userDetails[currentInputName]) {
        labelSpanStyle.bottom = "28px";
        labelSpanStyle.transform = "scale(90%)";
        labelSpanStyle.color = "brown";

        userDetailInputStyle.outline= "solid 2px brown";
      }else{
        labelSpanStyle.marginLeft= "12px";
        labelSpanStyle.bottom="0";
        labelSpanStyle.color = "black";
        labelSpanStyle.backgroundColor="red";

        userDetailInputStyle.outline = "solid 2px orangered";
      }
    }

    const [disableEmail,setDisableEmail] = useState(false);

    const displayEditButton = disableEmail?"block":"none";
    
  return (
    <appContext.Provider value={{isSignedIn,userDetails,setUserDetails,disableEmail,setDisableEmail, setIsSignedIn, displayEditButton, styleValidationForm,cookie,setCookie,removeCokie,addUserInfoToCookie, productCategory,setProductCategory,productObject, setProductObject,states,regions, selectedCategory, setSelectedCategory,moveCanvasOffView,isCanvasInView,setIsCanvasInView,screenSize}}>
      {props.children}
    </appContext.Provider>
  )
}

export default ContextWrapper
