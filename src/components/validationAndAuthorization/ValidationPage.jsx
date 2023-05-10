import React from 'react'

const ValidationPage = (props) => {
  return (
    <div className="d-flex flex-column  justify-content-center align-items-center pages">
        {
            props.children
        }
    </div>
  )
}

export default ValidationPage;