import React from 'react'

const CategoryHeader = ({length,name}) => {
  return (
    <div className="categoryHeaderWrapper small">
        <div className="categoryHeader">
            <span className="headerCategory"> BuyNG </span>
            <span style={{color:"grey"}}>/</span>
            <span className="headerLabel">
                {length} results for {name} in Nigeria
            </span>
        </div>
    </div>
  )
}

export default CategoryHeader;