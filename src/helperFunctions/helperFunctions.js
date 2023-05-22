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

export const getPortraitHeight = (productCard,marginBottom,rowHeight)=>{
  let targetHeight = getComputedStyle(productCard).height;
      targetHeight = Number(targetHeight.replace("px",""));
      const remainder = targetHeight%rowHeight;
  const _marginBottom = marginBottom - (rowHeight - remainder);
  return Math.ceil((targetHeight/rowHeight) + (_marginBottom/rowHeight));
}

export const getGridRowStart=(isPortrait,products,productIndex,parent,gridColumnStart,columnCount)=>{  
  let preCardColumnIndex= products.findIndex((product,index)=>{ 
    const columnStart = isPortrait? (index + 1)%columnCount || columnCount : columnCount;
    const isColumnMate = isPortrait? (productIndex - index) === columnCount : (productIndex - index) === 1;
    return (index < productIndex) && (columnStart === gridColumnStart) && isColumnMate ; 
  })
  if (preCardColumnIndex >= 0) {
    const preColumnCard = parent.children[preCardColumnIndex];
    return Number(getComputedStyle(preColumnCard).gridRowEnd); 
  }else{
    return 1;
  }
}
