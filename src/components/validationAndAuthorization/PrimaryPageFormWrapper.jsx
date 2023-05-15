import React from 'react'

const PrimaryPageFormWrapper = (props) => {
  return (    
    <div className="primaryPage">
        {
          props.children
        }
    </div>
  )
}

export default PrimaryPageFormWrapper;