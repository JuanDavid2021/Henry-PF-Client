import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../components/styles.css/CreationForm.css'
import {postProducts} from "../actions/index"




function error(input){

  let errors={}
 
 if(!input.nombre) {errors.nombre="se requiere ingresar un nombre de producto"}
 else if(!input.descripcion) {errors.descripcion="se requiere ingresar la descripcion del producto"}
 else if(!input.presentacion.length) {errors.presentacion="se requiere ingresar una presentacion del producto"}
 else if(!input.precio) errors.precio="se requiere ingresar un valor del producto" 
 else if(input.precio<0) errors.precio="el precio debe ser mayor a 0" 
 else if(!input.stock) errors.stock="se requiere ingresar un stock del producto" 
 else if(input.stock<0) errors.stock="el stock debe ser mayor a 0"
 else if(!input.categoria) errors.categoria="se requiere ingresar una categoria del producto"
 else if(!input.fotos.length) errors.fotos="se requiere ingresar una imagen del producto" 

 return errors
}



export const CreationForm = () => {

  
const dispatch=useDispatch()  
const [errors, setErrors] = useState({})
const [input, setInput] =useState({
     
  nombre:"",
  descripcion:"",
  presentacion:[],
  precio:"",
  stock:"",
  categoria:"",
  fotos:[] 
})    

 const handleChangeString=(e)=>{
     setInput({
         ...input,
         [e.target.name] : e.target.value
     })
     setErrors(error({
       ...input,
       [e.target.name] : e.target.value
     }))
    }


 const handleChangeArray=(e)=>{
  setInput({
    ...input,
    [e.target.name] : [e.target.value]
})
setErrors(error({
   ...input,
  [e.target.name] : [e.target.value]
}))
console.log(input)}

const handleSubmit=(e)=>{
e.preventDefault()

setInput({
  nombre:"",
  descripcion:"",
  presentacion:[],
  precio:"",
  stock:"",
  categoria:"",
  fotos:[] 
})
dispatch(postProducts(input))
}

  return (
    <div className='fondo'>
     <h1 className='h1'>CREACION DE PRODUCTOS BEEF SHOP</h1>
    <form className='form' onSubmit={e=>handleSubmit(e)}>

        <div >
       <label >Nombre del producto</label>
       <input  pattern="[a-zA-Z ]{2,254}" value={input.nombre} name="nombre"onChange={(e)=>handleChangeString(e)}></input>
       
       </div>
       
       <div >
       <label >Descripcion</label>
       <input  pattern="[a-zA-Z ]{2,254}" value={input.descripcion} name="descripcion"onChange={(e)=>handleChangeString(e)}></input>
       
       </div>

       <div >
       <label >Presentacion</label>
       <input  pattern="[a-zA-Z ]{2,254}" value={input.presentacion} name="presentacion"onChange={(e)=>handleChangeArray(e)}></input>
       
       </div>

       <div >
       <label className="form-label">Precio</label>
       <input id="0" value={input.precio} type="number" pattern="^[0-9]+" min="1" name="precio"onChange={(e)=>handleChangeString(e)}></input>
       
       </div>
     
       <div className="mb-3">
       <label>Stock</label>
       <input  type="number" min="0" value={input.stock} pattern="^[0-9]+" name="stock" onChange={(e)=>handleChangeString(e)}></input>
       
       </div>

       <div >
       <label>Categoria</label>
       <input type="text" min="0" value={input.categoria} name="categoria" onChange={(e)=>handleChangeString(e)}></input>
       
       </div>

       <div >
       <label >Imagen</label>
       <input  type="url" value={input.fotos} name="fotos" onChange={(e)=>handleChangeArray(e)}></input>    
       
       </div>
       {errors.nombre && (<p>{errors.nombre}</p>)}
       {errors.descripcion && (<p>{errors.descripcion}</p>)}
       {errors.presentacion && (<p>{errors.presentacion}</p>)}
       {errors.precio && (<p>{errors.precio}</p>)}
       {errors.stock && (<p>{errors.stock}</p>)}
       {errors.categoria && (<p>{errors.categoria}</p>)}
       {errors.fotos && (<p>{errors.fotos}</p>)}
       
       
       <button type="submit" disabled={input.nombre==="" || input.descripcion==="" || input.presentacion==="" || input.precio===""
                                      || input.stock==="" || input.categoria==="" || input.fotos==="" ||input.precio<0 || input.stock<0} className="btn btn-primary">CREAR PRODUCTO</button>
       <br/>

   </form>  
   </div>
  )
}
