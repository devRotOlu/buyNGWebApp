import React from 'react'

const DropDownTrigger = (props) => {
    const {triggerClass, styleObject} = props;
  return (
    <a style={styleObject} className={`dropDownTrigger ${triggerClass}`} href="#" data-bs-toggle="dropdown" aria-expanded="false">
        {
            props.children
        }
    </a>
  )
}

export default DropDownTrigger