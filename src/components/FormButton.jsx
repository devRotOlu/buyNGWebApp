import React from 'react'

const FormButton = (props) => {

  let {setDisableEmail,buttonText,isResponseLoading,buttonColor,borderColor,width} = props.propsObject;

  const handleButtonClick=()=>{
    if (setDisableEmail) {
      setDisableEmail(true); 
    }
  }

  isResponseLoading = isResponseLoading? true : false;

  return (
    <div className="formControlDiv buttonWrapper">
        <button disabled={isResponseLoading} onClick={handleButtonClick}  className="submitButton" type="submit" style={{backgroundColor:buttonColor,borderColor:borderColor, width,fontWeight:"bolder"}}>
            { buttonText? buttonText: "Submit"}
        </button>
    </div>
  )
}

export default FormButton;