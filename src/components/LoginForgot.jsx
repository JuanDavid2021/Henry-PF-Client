import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import GoogleLogin from "react-google-login";
import { login, setPlatformUser,loginforgot } from "../actions/index"
import { useDispatch } from "react-redux"
import axios from "axios"
const {REACT_APP_API_URL} = process.env


export const LoginForgot = () => {

const dispatch=useDispatch()
const [input, setInput] = useState({
  correo: ""
})
const navigate = useNavigate()

const handleChange = (e)=>{
e.preventDefault()  
setInput({...input, [e.target.name]: e.target.value})
 
}

const handleSubmit =async(e)=>{
e.preventDefault()
const forgot = await axios.post(`${REACT_APP_API_URL}/user/forgot`, input)

if(forgot.data.linkUser){
  swal({
    text: "revisa la bandeja de entrada de tu correo",
    icon: "success",
    timer: "2000",
  })  
  navigate("/shop") 
} else{
  swal({
    text: "usuario no se encuentra registrado",
    icon: "warning",
    timer: "2000",
  }) 
  navigate("/login/forgot") 
}  
}

  return (
    <div className="bg-dark" style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className='alert align-middle bg-dark text-light bg-opacity-75 mb-0 mx-3' style={{ display: "flex",flexDirection: "column", justifyContent: "center", minWidth: "300px", maxWidth: "300px" }}>
        <h1 className='text-center mb-3'>Recuperación</h1>
        <div className=" d-flex justify-content-center">
          <div className='' style={{ width: "100%" }}>
          
            <form  className="mt-3">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico</label>
                <input type="email" name="correo" id="exampleInputEmail1" aria-describedby="emailHelp" value={input.correo} placeholder="correo..." className='form-control' onChange={e => handleChange(e)} />
              </div>
            </form>
              <div className="mb-3">
                <button onClick={(e)=>handleSubmit(e)} className="btn btn-success btn-block w-100" disabled={input.correo === ""}>Solicitar Nueva Contraseña</button>
              </div>
            <div className='d-flex justify-content-center align-items-center'>

             <Link className="fs-5 mb-2 ms-2 text-decoration-none fw-normal" to="/loginUser">Volver</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
