import React from 'react'
import { useState } from 'react'
import '../components/styles.css/CreationForm.css'


function error(input){
  let errors={}
 if(!input.name & !input.name & !input.name & !input.name) errors.form="se require llenar los espacios en blanco" 
 else if(!input.name) errors.name="se requiere ingresar un nombre de producto"
 else if(!input.precio) errors.precio="se requiere ingresar un valor del producto" 
 else if(!input.stock) errors.stock="se requiere ingresar un stock del producto" 
 else if(!input.imagen) errors.imagen="se requiere ingresar una imagen del producto" 
}




export const CreationForm = () => {
const [errors, setErrors] = useState({})
const [input, setInput] =useState({
     
  nombre:"",
  precio:"",
  presentacion:"",
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


  return (
    <div className='fondo'>
     <h1 className='h1'>CREACION DE PRODUCTOS BEEF SHOP</h1>
    <form className='form'>
        <div class="mb-3">
       <label for="exampleInputEmail1" class="form-label">Nombre del producto</label>
       <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" pattern="[a-zA-Z ]{2,254}" value={input.nombre} name="nombre"onChange={(e)=>handleChange(e)}></input>
       </div>

       <div class="mb-3">
       <label for="exampleInputEmail1" class="form-label">Precio</label>
       <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.precio} name="precio"onChange={(e)=>handleChange(e)}></input>
       </div>

       <div class="mb-3">
       <label for="exampleInputEmail1" class="form-label">Presentacion</label>
       <select>
           <option value={input.presentacion}>Kg</option>
           <option value={input.presentacion}>Unidad</option>
       </select>
       </div>
     
       <div class="mb-3">
       <label>Stock</label>
       <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="number" min="0" value={input.stock} name="stock" onChange={(e)=>handleChange(e)}></input>
       </div>

       <div class="mb-3">
       <label for="exampleInputEmail1" class="form-label">Imagen</label>
       <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" type="url" value={input.imagen} name="imagen" onChange={(e)=>handleChange(e)}></input>
       </div>
        {errors.name && (<p>{errors.name}</p>)}
        {errors.precio && (<p>{errors.precio}</p>)}
        {errors.stock && (<p>{errors.stock}</p>)}
        {errors.imagen && (<p>{errors.imagen}</p>)}
        {errors.form && (<p>{errors.form}</p>)}
        
   
       <button class="btn btn-primary">CREAR PRODUCTO</button>
     
   </form>
   </div>
  )
}
