import React,{useRef,useEffect} from 'react'

const OffCanvas = (props) => {

  const {
          alignItems,justifyContent,
          bodyWidth,bodyHeight
        } = props;

  const handleFocus = (event)=>{
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <div tabIndex="0" className="canvas" id="canvas" style={{alignItems,justifyContent}}>
       <div onFocus={handleFocus} tabIndex="0" style={{height:bodyHeight,width:bodyWidth,display:"grid",gridTemplateColumns:"100%",gridTemplateRows:"100%"}}>
          {
            props.children
          }
        </div>
    </div>
  )
}

export default OffCanvas

{/* <div ref={divRef} className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-body" style={{backgroundColor:"inherit"}}>
        <div  onClick={handleChildClick}  className="offcanvasWrapper" data-bs-dismiss="offcanvas" style={{alignItems,justifyContent}}>
            <div  onClick={handleClick} style={{height:bodyHeight,width:bodyWidth,display:"grid",gridTemplateColumns:"100%",gridTemplateRows:"100%"}}>
              {
                props.children
              }
            </div>
        </div>
      </div>
</div> */}