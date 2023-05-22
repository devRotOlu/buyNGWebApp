import React from 'react'

const ProductLayoutToggle = (props) => {
    const {
        portraitToggle,landScapeToggle,
        potraitBlocks,landScapeBlocks
    } = props.propsObject
    
  return (
    <div style={{display:"flex",gap:"10px",alignItems:"center"}}>
        <div onClick={portraitToggle} style={{display:"grid",gridTemplateColumns:"repeat(3,4px)",gridTemplateRows:"repeat(3,4px)",gap:"2px",cursor:"pointer"}}>
            {
                potraitBlocks
            }
        </div>
        <div onClick={landScapeToggle} style={{display:"grid",gridTemplateColumns:"4px 16px",gridTemplateRows:"repeat(3,4px)",gap:"2px",cursor:"pointer"}}>
            {
                landScapeBlocks
            }
        </div>
    </div>
  )
}

export default ProductLayoutToggle