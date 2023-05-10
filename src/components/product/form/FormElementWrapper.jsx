import React from 'react';


const FormElementWrapper = (props) => {

    const {labelText, validationText,name} = props;

    const width = (name === "name")? "47%" : "100%";

    const height = (name === "description")? "150px":"56px";


  return (
    <div className="inputWrapper" style={{width}}>
        <label className="d-block formControls formLabels" 
        style={{position:"relative", paddingLeft:"0",height}}>                                            
            {
                props.children
            }
            {
                (name === "description")?
                <span className="labelSpan productLabelSpan textBox" >
                    <span style={{background:"white"}}>
                        {labelText}
                    </span>
                </span>
                :
                <span className="labelSpan productLabelSpan" >
                    <span style={{background:"white"}}>
                        {labelText}
                    </span>
                </span>
            }
        </label>
        <p className="validationTags text-center small">
            {validationText}
        </p> 
    </div>
  )
}

export default FormElementWrapper;
