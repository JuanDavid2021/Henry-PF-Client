import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { login, setPlatformUser,loginreset } from "../actions/index"
import { useDispatch } from "react-redux"
import axios from "axios"



export const LoginReset = () => {

const url = window.location.href;    
const dispatch=useDispatch()
const navigate = useNavigate()
const [input, setInput] = useState({
    contraseña:"",
    nuevaContraseña:""

})


const handleChange = (e)=>{
setInput({
 ...input,   
[e.target.name] : e.target.value
}
)}

const handleSubmit = async (e)=>{
e.preventDefault()
const urlTokenUser = window.location.href.slice(34).toString() 
const reset = await axios.post("http://localhost:3001/api/user/reset", input, {headers:{reset: urlTokenUser}} )
console.log(reset)
if(reset){
  swal({
    text: "contraseña cambiada con éxito, ya puedes iniciar sesion",
    icon: "success",
    timer: "2000",
  })  
  navigate("/loginuser")
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

const showPassword2 =()=>{
  var x = document.getElementById("show2")
  var y = document.getElementById("icon2")
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
    <div className="bg-dark" style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className='alert align-middle bg-dark text-light bg-opacity-75' style={{ display: "flex", height: "330px", width:"20%", flexDirection: "column", alignItems: "center" }}>
        <div className=" d-flex justify-content-center">
          <div className='' style={{ width: "100%" }}>
          
            <form  className="mt-3">
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Nueva Contraseña</label>
                  <div style={{position:"relative"}}>
                   <input type="password" name="contraseña" style={{borderRadius:"5px", height:"40px", width:"265px"}} id="show" aria-describedby="emailHelp" value={input.contraseña} placeholder="contraseña..."  onChange={e => handleChange(e)} />
                   <span style={{position:"absolute", right:"10px", cursor:"pointer", top:"50%", transform:"translateY(-50%)", color:"grey"}} className="icon-eye" onClick={showPassword} id="eye">
                     <i class="fa-solid fa-eye-slash" id="icon"></i>
                   </span>               
                 </div>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Confirmar Nueva Contraseña</label>
                  <div style={{position:"relative"}}>
                   <input type="password" name="nuevaContraseña" style={{borderRadius:"5px", height:"40px", width:"265px"}} id="show2" aria-describedby="emailHelp" value={input.nuevaContraseña} placeholder="Confirmar contraseña..."  onChange={e => handleChange(e)} />
                   <span style={{position:"absolute", right:"10px", cursor:"pointer", top:"50%", transform:"translateY(-50%)", color:"grey"}} className="icon-eye" onClick={showPassword2} id="eye">
                     <i class="fa-solid fa-eye-slash" id="icon2"></i>
                   </span>               
                 </div>
              </div>

            </form>
              <div className="mb-3">
                <button onClick={(e)=>handleSubmit(e)} className="btn btn-success btn-block" disabled={input.contraseña === "" || input.nuevaContraseña===""}>Cambiar Contraseña</button>
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
