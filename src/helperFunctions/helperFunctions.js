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