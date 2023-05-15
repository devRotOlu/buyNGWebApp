
export const styleValidationText=(validationText,isvalid)=>{
    if (isvalid !== true) 
    {  
        validationText.style.color='red';
        validationText.style.display='block';
    }
    else{
        validationText.style.display='block';
        validationText.style.color='green';
    }
}

export const userDetailsValidationPattern = {
    firstName :()=> /^[a-zA-Z]{1,50}$/,
    lastName : ()=> /^[a-zA-Z]{1,50}$/,
    password : ()=> /^(?=(?:\D*\d))(?=(?:[^a-z]*[a-z]))(?=[^A-Z]*[A-Z])(?=(?:\w*(\W|_)))/,
    email : ()=> /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
    phoneNumber : ()=> /^\d{11}$/,
    confirmPassword :function () {
        return this.password()
    },
}

// price improved regEX = /^[\d]+(((?<=[0]+)(\.[1-9]+[\d]+?))|(((?<![0]+)(\.[\d]+))))?$/
export const productValidationPattern ={
    name:()=>/^[\w\s\W]{1,50}$/,
    description:()=>/^[\w\s\W]{10,150}$/,
    price:()=>/^[\d]{1,}(\.[\d]{1,})?$/,
    quantity:()=>/^([0]+[1-9]{1}|[1-9]+)([\d]+)?$/,
    categoryId:()=>/^[1-9]([\d]{1,})?$/,
    imageFiles:()=> /^[\w\s\W]{1,}$/,  
    location:()=> /^[^\d]{1,}$/ 
}

export const validateUserDetails=(formElements,userDetails,validationPattern)=>{

    const userDetailsArray = Object.keys(userDetails);

    let validationStatus = [];

    userDetailsArray.forEach(detail=>{

        const detailValue = userDetails[detail];
        var isValid;

        if (detail === "imageFiles") {
            let count = detailValue.length;
            console.log(detailValue,"detailValue");
            let isFiles = detailValue.every(element=>{
                return typeof(element) === "object";
            })
            isValid = count && isFiles;
        }
        else{
            isValid = validationPattern[detail]().test(detailValue);
        }

        validationStatus.push(isValid);
        let validationText = formElements[detail].parentElement.nextElementSibling;

        styleValidationText(validationText,isValid);
    })

    return validationStatus.every(status=> status === true);
}

export const validateInput = (validationText,inputValue, inputName)=>{

    const isValid = userDetailsValidationPattern[inputName]().test(inputValue);

    styleValidationText(validationText,isValid);
}




