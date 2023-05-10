import React from 'react'

const RequestLoadCover = ({isResponseLoading}) => {

    const display = isResponseLoading? "block":"none";

  return (
    <div style={{position:"absolute", width:"100%",height:"100%",opacity:"0.5",display,backgroundColor:"white"}}>
      
    </div>
  )
}

export default RequestLoadCover