import React,{Fragment, useState} from 'react'
import {Link} from "react-router-dom"
import swal from "sweetalert"

export const Register = ({setAuth}) => {
   

  const [inputs, setInputs] = useState({
      nombre:"",
      apellido:"",
      celular:"",
      direccion:"",
      correo:"",
      contraseña:""
  })

  const {nombre, apellido, celular, direccion, correo, contraseña} = inputs

  const onChange = (e)=>{
      setInputs({...inputs, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e)=>{
   e.preventDefault() 
   
   try {
     const body = {nombre, apellido, celular, direccion, correo, contraseña}  
     const response = await fetch("http://localhost:3001/api/user/registro",
     {method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(body) });
    
     const parseRes = await response.json() 
      
    if(parseRes.token){
        localStorage.setItem("token", parseRes.token)
        setAuth(true)
        swal({
            text:"login exitoso",
            icon: "success",
            timer:"2000",
         })
    } 
     
   
    } catch (error) {
        swal({
            text:"usuario ya existe",
            icon: "alert",
            timer:"2000",
         })
   }
  }

  return (
      <Fragment>
    <h1 className='text-center my-2'>Registro</h1>
    <form onSubmit={onSubmitForm}>
    <input type="text" name="nombre" placeholder="nombre..." className="form-control my-3" value={nombre} onChange={e=>onChange(e)} />
    <input type="text" name="apellido" placeholder="apellido..." className="form-control my-3" value={apellido} onChange={e=>onChange(e)}/>
    <input type="number" name="celular" placeholder="celular.." className="form-control my-3" value={celular} onChange={e=>onChange(e)}/>    
    <input type="text" name="direccion" placeholder="direccion.."className="form-control my-3" value={direccion} onChange={e=>onChange(e)}/>
    <input type="email" name="correo" placeholder="correo..."className="form-control my-3" value={correo} onChange={e=>onChange(e)}/>
    <input type="password" name="contraseña" placeholder="contraseña.."className="form-control my-3"value={contraseña} onChange={e=>onChange(e)}/>
    <button className="btn btn-success btn-block">Submit</button>
    </form>
    <Link to="/loginuser">Login</Link>
    </Fragment>
  )
}