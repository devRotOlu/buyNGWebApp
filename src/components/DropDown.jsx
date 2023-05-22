import React from 'react'

const DropDown = (props) => {
    const {styleObject,dropDownClass} = props
  return (
    <ul className={`dropdown-menu ${dropDownClass} py-0`} style={styleObject}>
        {
            props.children
        }
    </ul>
  )
}

export default DropDown