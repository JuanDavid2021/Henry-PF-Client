import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import swal from "sweetalert"
import { login, setPlatformUser,loginreset } from "../actions/index"
import { useDispatch } from "react-redux"
import axios from "axios"



export const LoginResetAdmin = () => {


const dispatch=useDispatch()
const navigate = useNavigate()
const [input, setInput] = useState({
    contraseña:"",
    confirmarContraseña:"",
    contraseñaAnterior:""
})


const handleChange = (e)=>{
setInput({
 ...input,   
[e.target.name] : e.target.value
}
)}

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

const showPassword3 =()=>{
  var x = document.getElementById("show3")
  var y = document.getElementById("icon3")
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

const handleSubmit = async (e)=>{
e.preventDefault()
const update = await axios.post("http://localhost:3001/api/user/updatepassword", input)
if(update){
  swal({
    text: "contraseña cambiada con éxito, ya puedes iniciar sesion",
    icon: "success",
    timer: "2000",
  })  
  navigate("/loginuser")
}
}

  return (
    <div className="bg-dark" style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className='alert align-middle bg-dark text-light bg-opacity-75' style={{ display: "flex", height: "400px", width:"20%", flexDirection: "column", alignItems: "center", minWidth: "300px", maxWidth: "300px" }}>
        <div className=" d-flex justify-content-center">
          <div className='' style={{ width: "100%" }}>
          
            <form  className="mt-3">

            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">correo electronico</label>
                  <div style={{position:"relative"}}>
                   <input type="text" name="contraseñaAnterior" style={{borderRadius:"5px", height:"40px", width:"230px"}} id="show" aria-describedby="emailHelp" value={input.contraseñaAnterior} placeholder="correo electronico..." onChange={e => handleChange(e)} />          
                 </div>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Nueva contraseña</label>
                  <div style={{position:"relative"}}>
                   <input type="password" name="contraseña" style={{borderRadius:"5px", height:"40px", width:"230px"}} id="show2" aria-describedby="emailHelp" value={input.contraseña} placeholder="nueva contraseña" onChange={e => handleChange(e)} />
                   <span style={{position:"absolute", right:"10px", cursor:"pointer", top:"50%", transform:"translateY(-50%)", color:"grey"}} className="icon-eye" onClick={showPassword2} id="eye">
                     <i class="fa-solid fa-eye-slash" id="icon2"></i>
                   </span>               
                 </div>
              </div>

              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Confirmar Nueva Contraseña</label>
                  <div style={{position:"relative"}}>
                   <input type="password" name="confirmarContraseña" style={{borderRadius:"5px", height:"40px", width:"230px"}} id="show3" aria-describedby="emailHelp" value={input.confirmarContraseña} placeholder="confirmar contraseña..." onChange={e => handleChange(e)} />
                   <span style={{position:"absolute", right:"10px", cursor:"pointer", top:"50%", transform:"translateY(-50%)", color:"grey"}} className="icon-eye" onClick={showPassword3} id="eye">
                     <i class="fa-solid fa-eye-slash" id="icon3"></i>
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
