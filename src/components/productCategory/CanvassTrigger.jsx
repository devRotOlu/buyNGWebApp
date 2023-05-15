
import React from 'react'

const CanvassTrigger = (props) => {

    const {handleClick} = props;
  return (
    <div onClick={handleClick} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" style={{position:"relative"}}>
        {
            props.children
        }
    </div>
  )
}

export default CanvassTrigger;