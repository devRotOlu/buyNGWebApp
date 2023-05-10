import React from 'react'

const OffCanvas = (props) => {
  return (
    <div className="offcanvas" tabIndex="-1" id="offcanvas" >
        <div className="offcanvas-body bg-danger w-100">
          {
            props.children
          }
        </div>
    </div>
  )
}

export default OffCanvas