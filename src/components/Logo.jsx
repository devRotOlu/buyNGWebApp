import React from 'react'

const Logo = ({logoSize}) => {

  const width= logoSize?.width || "50px";
  const height = logoSize?.height || "50px";
  const borderRadius= logoSize?.borderRadius || "50px";
  const fontSize = logoSize?.fontSize || "30px"; 

  return (
    <span style={{width, height, borderRadius, background:"orangered", display:"inline-flex", justifyContent:'center',alignItems:"center"}}>                   
        <i className="bi bi-bag" style={{fontSize, color:'white', height:'fit-content', width:'fit-content'}}/>                       
    </span>
  )
}

export default Logo;