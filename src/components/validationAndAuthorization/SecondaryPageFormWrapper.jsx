import React from 'react'

const SecondaryPageFormWrapper = (props) => {
  return (    
    <div className="secondaryPage">
        {
          props.children
        }
    </div>
  )
}

export default SecondaryPageFormWrapper;