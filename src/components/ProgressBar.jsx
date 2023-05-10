import React,{useRef,useEffect} from 'react'

const ProgressBar = ({isResponseLoading}) => {

    const divRef = useRef();

    useEffect(()=>{    
      const divRefTarget = divRef.current;
      if (isResponseLoading) {
        divRefTarget.style.display = "block";
        divRefTarget.firstElementChild.style.animationPlayState = "running";
      }else{
        divRefTarget.style.display = "none";
        divRefTarget.firstElementChild.style.animationPlayState = "pause";
      }
    },[isResponseLoading])

  return (
    <div className="progressBarParent" ref={divRef}>
        <div className="progressBar">                
        </div>
    </div>
  )
}

export default ProgressBar