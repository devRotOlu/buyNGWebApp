import React,{useContext} from 'react';

import { appContext } from '../../context/ContextWrapper';

const OffCanvas = (props) => {

  const {
          alignItems,justifyContent,
          bodyWidth,bodyHeight
        } = props;

  const appSates = useContext(appContext);

  const {moveCanvasOffView,isCanvasInView} = appSates;

  const handleClick = (event)=>{
    event.preventDefault();
    event.stopPropagation();
  }

  const handleCanvasClick = (event)=>{
    moveCanvasOffView();
  }

  return (
    <div onClick={handleCanvasClick} aria-checked="false" role="checkbox" className="canvas" id="canvas" style={{alignItems,justifyContent}}>
       <div onClick={handleClick} tabIndex="0" style={{height:bodyHeight,width:bodyWidth,display:"grid",gridTemplateColumns:"100%",gridTemplateRows:"100%"}}>
          {
            (isCanvasInView)?
            props.children
            :
            ""
          }
        </div>
    </div>
  )
}

export default OffCanvas
