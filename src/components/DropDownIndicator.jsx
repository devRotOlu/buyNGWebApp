import React from 'react'

const DropDownIndicator = (props) => {
  const {handleIndicatorClick,dropEnd,paddingRight} = props;
  return (
    <div className={`${dropEnd}`} onClick={handleIndicatorClick} aria-expanded="false" style={{position:"absolute",top:"0",width:"100%",height:"100%",display:"flex",justifyContent:"right",alignItems:"center",paddingRight, cursor:"pointer"}}>
        {
          props.children
        }
    </div> 
  )
}

export default DropDownIndicator;