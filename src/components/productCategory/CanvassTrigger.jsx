import React,{useEffect,useContext} from 'react'

const CanvassTrigger = (props) => {

    const {handleClick} = props;

    const handleKeyPress = (event)=>{
      event.preventDefault();
      if (event.key === "Enter" || event.key === " ") {
        handleClick();
      }
    }

    const handleCanvasTriggerClick = ()=>{
      const canvas = document.getElementById("canvas");
      canvas.style.right="0"
      handleClick();
    }

  return (
    <div onClick={handleCanvasTriggerClick} role="button" tabIndex="0" onKeyDown={handleKeyPress} className="canvasTrigger"  style={{position:"relative"}}>
        {
            props.children
        }
    </div>
  )
}

export default CanvassTrigger;
