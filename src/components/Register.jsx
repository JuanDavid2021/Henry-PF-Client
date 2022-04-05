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

  const showPassword =()=>{
    var x = document.getElementById("show")
    var y = document.getElementById("icon")
    if(x.type==="password"){
      x.type="text"
      y.classList.remove("fa-eye-slash")
      y.classList.add("fa-eye")
    }else{
      x.type="password"
      y.classList.remove("fa-eye")
      y.classList.add("fa-eye-slash")
    }
  }

  return (
  <div className="py-3 bg-dark" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
    <div className="alert align-middle bg-dark text-light bg-opacity-75 mb-0 mx-1" style={{ display: "flex",flexDirection: "column", justifyContent: "center", minWidth: "300px", maxWidth: "300px" }}>
      <h2 className='text-center my-4'>Registro de usuario</h2>
      <form className="px-md-2 needs-validation" onSubmit={onSubmitForm}>
        <div>
          <label htmlFor="validationCustom01">Nombre</label>
          <input 
            id="validationCustom01"
            type="text" 
            name="nombre" 
            placeholder="Nombre..." 
            className="form-control form-control my-2" 
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
            className="form-control form-control my-2" 
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
            className="form-control form-control my-2" 
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
            className="form-control form-control my-2" 
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
            className="form-control form-control my-2" 
            value={correo} 
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="mb-3">
                <label htmlFor="validationCustom06" className="form-label">Contraseña</label>
                  <div style={{position:"relative"}}>
                   <input type="password" name="contraseña" style={{borderRadius:"5px", height:"42px", width:"250px"}} id="show" aria-describedby="emailHelp" value={contraseña} placeholder="contraseña..."  onChange={e=>onChange(e)} />
                   <span style={{position:"absolute", right:"10px", cursor:"pointer", top:"50%", transform:"translateY(-50%)", color:"grey"}} className="icon-eye" onClick={showPassword} id="eye">
                     <i class="fa-solid fa-eye-slash" id="icon"></i>
                   </span>               
                 </div>
              </div>
        <button 
          className="btn btn-success my-3" 
          disabled={inputs.nombre==="" || inputs.apellido==="" || inputs.celular==="" || inputs.direccion==="" || inputs.correo==="" || inputs.contraseña===""}
        >Registrate</button>
        <div className='d-flex justify-content-center align-items-center'>
          <h6  className='fs-5 align-self-center'>¿Ya estás registrado?</h6><Link to="/loginuser" className="fs-5 mb-2 ms-2 text-decoration-none fw-normal">Ingresa</Link>
        </div>
      </form> 
    </div>
  </div>
  )
}
