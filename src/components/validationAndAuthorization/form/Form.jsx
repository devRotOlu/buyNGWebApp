import React from 'react';

import Logo from '../../Logo';
import ProgressBar from '../../ProgressBar';
import FormButton from '../../FormButton';
import RequestLoadCover from '../RequestLoadCover';

const Form= (props) => {

  const {handleFormSubmit,headerText,isResponseLoading,setDisableEmail,buttonText,formDescription,extraInfo} = props;

  return (  
    <form className="d-flex flex-column align-items-center forms"  onSubmit={handleFormSubmit} >
      <Logo/>
      <h5  style={{fontWeight:"bold"}}>{headerText}</h5>
      <ProgressBar isResponseLoading={isResponseLoading}/>
      {
        formDescription
      }
      {
        props.children
      }
      <FormButton propsObject={{setDisableEmail,isResponseLoading,buttonText,buttonColor:"orangered",borderColor:"orangered", width: "100%"}} />
      {
        extraInfo
      }
      <RequestLoadCover isResponseLoading={isResponseLoading}/>  

      <div style={{marginTop:"15px",display:"flex",alignItems:"center"}}>
        <span style={{fontSize:"25px",fontWeight:"bold"}}>BuyNG</span>
        <Logo logoSize={{width:"30px",height:"30px",borderRadius:"30px",fontSize:"15px"}}/>
      </div>                
    </form>
  )
}

export default Form;