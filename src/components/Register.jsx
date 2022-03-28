import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import {Link} from "react-router-dom"
import swal from "sweetalert"
import {login,setPlatformUser} from "../actions/index"

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
      dispatch(setPlatformUser(parseRes))
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
  <section className="py-3 bg-dark" style={{ height: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
    <div className="container">
      <div className="row gy-5 d-flex justify-content-center align-items-center">
        <div className="col-lg-8 col-xl-6">
          <div className="alert align-middle bg-dark text-light bg-opacity-75">
            <h2 className='text-center my-4'>Registro de usuario</h2>
            <form className="px-md-2 needs-validation" onSubmit={onSubmitForm}>
              <div>
                <label htmlFor="validationCustom01">Nombre</label>
                <input 
                  id="validationCustom01"
                  type="text" 
                  name="nombre" 
                  placeholder="Nombre..." 
                  className="form-control form-control" 
                  value={nombre} onChange={e=>onChange(e)} 
                />
              </div>
              <div className="mt-2">
                <label htmlFor="validationCustom02">Apellido</label>
                <input 
                  id="validationCustom02"
                  type="text" 
                  name="apellido" 
                  placeholder="Apellido..." 
                  className="form-control form-control mb-3" 
                  value={apellido} onChange={e=>onChange(e)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="validationCustom03">Teléfono</label>
                <input 
                  id="validationCustom03"
                  type="number" 
                  name="celular" 
                  placeholder="Celular..." 
                  className="form-control form-control mb-3" 
                  value={celular} 
                  onChange={e=>onChange(e)}
                />    
              </div>
              <div className="mt-2">
                <label htmlFor="validationCustom04">Dirección</label>
                <input 
                  id="validationCustom04"
                  type="text" 
                  name="direccion" 
                  placeholder="Dirección..."
                  className="form-control form-control mb-3" 
                  value={direccion} 
                  onChange={e=>onChange(e)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="validationCustom05">Email</label>
                <input 
                  id="validationCustom05"
                  type="email" 
                  name="correo" 
                  placeholder="Correo..."
                  className="form-control form-control mb-3" 
                  value={correo} 
                  onChange={e=>onChange(e)}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="validationCustom06">Contraseña</label>
              </div>
              <input 
                id="validationCustom06"
                type="password" 
                name="contraseña" 
                placeholder="Contraseña..."
                className="form-control form-control mb-3"
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
