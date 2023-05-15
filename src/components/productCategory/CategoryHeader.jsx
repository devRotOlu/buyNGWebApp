import React from 'react'

const CategoryHeader = ({length,name}) => {
  return (
    <div className="categoryLabelWrapper small">
        <div className="categoryLabel">
            <span> BuyNG </span>
            <span style={{color:"grey"}}>/</span>
            <span>
                {length} results for {name} in Nigeria
            </span>
        </div>
    </div>
  )
}

export default CategoryHeader;