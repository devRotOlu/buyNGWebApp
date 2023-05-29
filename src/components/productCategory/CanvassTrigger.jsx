import React,{useContext} from 'react';

import { appContext } from '../../context/ContextWrapper';


const CanvassTrigger = (props) => {

    const {handleClick,styleObject} = props;

    const appStates = useContext(appContext);
    const {setIsCanvasInView} = appStates;

    const handleKeyPress = (event)=>{
      event.preventDefault();
      if (event.key === "Enter" || event.key === " ") {
        handleClick();
      }
    }

    const handleCanvasTriggerClick = ()=>{
      console.log("triggered")
      const canvas = document.getElementById("canvas");
      canvas.setAttribute("aria-checked","true");
      if (handleClick) {
        handleClick();
      }
      setIsCanvasInView(true);
    }

  return (
    <div  onClick={handleCanvasTriggerClick} role="button" tabIndex="0" onKeyDown={handleKeyPress} className="canvasTrigger"  style={{position:"relative",...styleObject,cursor:"pointer"}}>
        {
            props.children
        }
    </div>
  )
}

export default CanvassTrigger;
