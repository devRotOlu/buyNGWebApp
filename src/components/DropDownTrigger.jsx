import React from 'react'

const DropDownTrigger = (props) => {
  const {focusInput,dropEnd,paddingRight} = props;
  return (
    <div className={`${dropEnd}`} onClick={focusInput} aria-expanded="false" style={{position:"absolute",top:"0",width:"100%",height:"100%",display:"flex",justifyContent:"right",alignItems:"center",paddingRight, cursor:"pointer"}}>
        {
          props.children
        }
    </div> 
  )
}

export default DropDownTrigger;