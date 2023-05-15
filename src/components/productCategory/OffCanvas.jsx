import React from 'react'

const OffCanvas = (props) => {
  return (
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-body">
          {
            props.children
          }
      </div>
    </div>
  )
}

export default OffCanvas


{/* <div className="offcanvas" tabIndex="-1" id="offcanvas" >
        <div className="offcanvas-body bg-danger" >
          {
            props.children
          }
        </div>
</div> */}