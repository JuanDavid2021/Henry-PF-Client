import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createDispatchHook } from 'react-redux'
import '../components/styles.css/CreationForm.css'
import {postProducts} from "../actions/index"


function error(input){

  let errors={}
 if(!input.nombre & !input.precio & !input.stock & !input.imagen) errors.form="se require llenar los espacios en blanco" 
 else if(!input.nombre) errors.nombre="se requiere ingresar un nombre de producto"
 else if(!input.precio) errors.precio="se requiere ingresar un valor del producto" 
 else if(!input.stock) errors.stock="se requiere ingresar un stock del producto" 
 else if(!input.imagen) errors.imagen="se requiere ingresar una imagen del producto" 

 return errors
}



export const CreationForm = () => {

const dispatch=useDispatch()  
const [errors, setErrors] = useState({})
const [input, setInput] =useState({
     
  nombre:"",
  precio:"",
  stock:"",
  imagen:"" 

})    

 const handleChange=(e)=>{
   
  setInput({
      ...input,
      [e.target.name] : e.target.value
  })
  setErrors(error({
    [e.target.name] : e.target.value
  }))
 }

const handleSubmit=(e)=>{
e.preventDefault()
setInput({
  nombre:"",
  precio:"",
  stock:"",
  imagen:"" 
})
dispatch(postProducts(input))
}
  return (
    <div className='fondo'>
     <h1 className='h1'>CREACION DE PRODUCTOS BEEF SHOP</h1>
    <form className='form'>
        <div className="mb-3">
       <label className="form-label">Nombre del producto</label>
       <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" pattern="[a-zA-Z ]{2,254}" value={input.nombre} name="nombre"onChange={(e)=>handleChange(e)}></input>
       </div>

       <div className="mb-3">
       <label className="form-label">Precio</label>
       <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.precio} name="precio"onChange={(e)=>handleChange(e)}></input>
       </div>
     
       <div className="mb-3">
       <label>Stock</label>
       <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="number" min="0" value={input.stock} name="stock" onChange={(e)=>handleChange(e)}></input>
       </div>

       <div className="mb-3">
       <label className="form-label">Imagen</label>
       <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="url" value={input.imagen} name="imagen" onChange={(e)=>handleChange(e)}></input>    
       </div>
        {errors.nombre && (<p>{errors.nombre}</p>)}
        {errors.precio && (<p>{errors.precio}</p>)}
        {errors.stock && (<p>{errors.stock}</p>)}
        {errors.imagen && (<p>{errors.imagen}</p>)}
        {errors.form && (<p>{errors.form}</p>)}  
       <button onSubmit={handleSubmit}className="btn btn-primary">CREAR PRODUCTO</button>
     
   </form>  
   </div>
  )
}
