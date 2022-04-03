import React from 'react'

export const SearchBarList = (props) => {
  
  const {producto, foto} = props
  
  return (
    <div style={{width:"100%", height:"2em", display:"flex", borderBottom:"1px solid d8d8d878", padding:"6px 8px",}}>
         <div style={{width:"auto", height:"100%", display:"flex", flex:"1"}}>
           <span style={{fontSize:"20px", color:"#000", marginLeft:"10px", flex:"2", fontSize:"16px" }}>{producto}</span>
           <img src={foto[0]} style={{width:"50px", height:"50px"}}></img>
        </div>  
    </div>
  )
}
