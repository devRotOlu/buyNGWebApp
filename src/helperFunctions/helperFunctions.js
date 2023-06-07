import { passwordStrength } from 'check-password-strength';

export const defaultUserDetails = (userDetailsArray, setUserDetails,email)=>{
    var newUserDetails = {email};
    userDetailsArray.forEach(userDetail => {
        if (userDetail !== "email") {
            newUserDetails = {...newUserDetails, [userDetail]: "" };
        }
    });
    setUserDetails(newUserDetails);
}

export const verifyPasswordStrength = (passwordIndicator, password, setPasswordStrengthIndex,isValidUserDetails)=> {
    const passwordIndicatorClassList = passwordIndicator.current.classList;

    if (password && isValidUserDetails) {

        if (passwordIndicatorClassList.contains("passwordIndicatorDisplay") === false) {

            passwordIndicatorClassList.add("passwordIndicatorDisplay");
        }

        const value = passwordStrength(password).value;

        const index = (value.toUpperCase().includes("WEAK")) ? 1 : ((value === "Medium") ? 2 : 3);

        setPasswordStrengthIndex(index);
    }
    else if (passwordIndicatorClassList.contains("passwordIndicatorDisplay")) {
        passwordIndicatorClassList.remove("passwordIndicatorDisplay");
        setPasswordStrengthIndex(0);
    }
}

export const removeExtraSpaces = (value)=>{
    var regexPattern = /\s+/g;
    return value.trim().replace(regexPattern," ");
}

export const createFormData = (data)=>{

    const formData = new FormData();

    Object.keys(data).forEach(key=>{
      if (Array.isArray(data[key])) {
        data[key].forEach(element=>{
          formData.append(key,element);
        });
      }else{
        formData.append(key,data[key])
      }
    });

    return formData;
}

export const styleListWrapper= (name, listRef, selectedState, location)=>
{
  if (!name) {
    listRef.current.style.display="none";
  }
  else if(name !== "location"){
    listRef.current.style.display = "block";
  }
  else {
    if (!selectedState || !location) {
      listRef.current.style.display = "block";
    } else {
      listRef.current.style.display = "none";
    }
  }
}

export const commaSeparatePrice= (price)=>{
  const _price = String(price);
  if (_price.length > 3) {
      return _price.split("").reverse().map((digit,index)=>{
          var digitIndex = index + 1;
          const isMultiple = digitIndex % 3 === 0
          if (isMultiple && digitIndex !== _price.length) {
              return `,${digit}`; 
          }
          return digit;
      }).reverse().join("")
  }
  return _price;
}

export const carouselPrevious=(activeImage,imageCount,slider,markerIndex=1)=>{
  if (activeImage===markerIndex) {
    autoNext(imageCount,markerIndex,imageCount)
  }else{
    slider.style.left=`-${activeImage - 2}00%`;
  }
}

export const autoPrevious = (imageCount,markerIndex,minIndex,minImageIndex)=>{
  const slider = document.getElementById("slider");
  for (let index = markerIndex; index > minIndex; index--) {
      if (index > minImageIndex) {
          if (index < markerIndex) {
            setTimeout(() =>carouselPrevious(index,imageCount,slider),300);
          }else{
            carouselPrevious(index,imageCount,slider);
          }
      }else{
        setTimeout(() =>slider.style.left = "0",300);
     }
  }
}

export const autoNext = (imageCount,markerIndex,maxIndex)=>{
  const slider = document.getElementById("slider");
  for (let index = markerIndex; index < maxIndex; index++) {
      if (index > markerIndex) {
        setTimeout(() =>carouselNext(index,imageCount,slider,imageCount),300);
      }else{
        carouselNext(index,imageCount,slider,imageCount);
     }
  }
}

export const carouselNext=(activeImage,imageCount,slider,markerIndex)=>{
  if (activeImage===markerIndex) {
    autoPrevious(imageCount,markerIndex,0)
  }else{
    slider.style.left=`-${activeImage}00%`;
  }
}

export const imageSlider = (activeImage,imageCount,markerIndex,sliderFunction,minImageIndex)=>{
  const slider = document.getElementById("slider");
  sliderFunction(activeImage,imageCount,slider,markerIndex,minImageIndex)
}

