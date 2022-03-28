import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import swal from "sweetalert"
import {login} from "../actions/index"

export const Register = ({setAuth}) => {
   
  const dispatch=useDispatch()
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
        localStorage.setItem("mail", correo)
        setAuth(true)
        swal({
            text:"Registro exitoso",
            icon: "success",
            timer:"2000",
         })
       dispatch(login({state: "user_ok", mail: correo}))
    } 
     
   
    } catch (error) {
        swal({
            text:"usuario ya existe",
            icon: "warning",
            timer:"2000",
         })
   }
  }

  return (
  <section className="py-3 bg-dark">
    <div className="container">
      <div className="row gy-5 d-flex justify-content-center align-items-center">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3 px-5 py-1">
            <h1 className='text-center my-4'>Registro de usuario</h1>
            <form className="px-md-2 needs-validation" onSubmit={onSubmitForm}>
              <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre..." 
                className="form-control form-control-lg" 
                value={nombre} onChange={e=>onChange(e)} 
              />
              <input 
                type="text" 
                name="apellido" 
                placeholder="Apellido..." 
                className="form-control form-control-lg my-3" 
                value={apellido} onChange={e=>onChange(e)}
              />
              <input 
                type="number" 
                name="celular" 
                placeholder="Celular..." 
                className="form-control form-control-lg my-3" 
                value={celular} 
                onChange={e=>onChange(e)}
              />    
              <input 
                type="text" 
                name="direccion" 
                placeholder="Dirección..."
                className="form-control form-control-lg my-3" 
                value={direccion} 
                onChange={e=>onChange(e)}
              />
              <input 
                type="email" 
                name="correo" 
                placeholder="Correo..."
                className="form-control form-control-lg my-3" 
                value={correo} 
                onChange={e=>onChange(e)}
              />
              <input 
                type="password" 
                name="contraseña" 
                placeholder="Contraseña..."
                className="form-control form-control-lg my-3"
                value={contraseña} 
                onChange={e=>onChange(e)}
              />
              <button 
                className="btn btn-success my-3" 
                disabled={inputs.nombre==="" || inputs.apellido==="" || inputs.celular==="" || inputs.direccion==="" || inputs.correo==="" || inputs.contraseña===""}
              >
                Registrate
              </button>
              <h5>¿Ya estás registrado? <Link to="/loginuser" style={{textDecoration:"none"}}>Ingresa aquí</Link></h5>
            </form> 
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
