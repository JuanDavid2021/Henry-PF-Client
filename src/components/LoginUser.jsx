import React, { Fragment, useState } from 'react'
import { Link } from "react-router-dom"
import swal from "sweetalert"
import GoogleLogin from "react-google-login";
import { login } from "../actions/index"
import { useDispatch } from "react-redux"

export const userok = () => {
  let user = true
  return user
}

export const userf = () => {
  let user = false
  return user
}


export const LoginUser = ({ setAuth }) => {

  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    correo: "",
    contraseña: ""
  })

  var [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem(loginData)) : null
  )

  const { correo, contraseña } = inputs

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()

    try {
      const body = { correo, contraseña }
      const response = await fetch("http://localhost:3001/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });

      const parseRes = await response.json()

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token)
        localStorage.setItem("mail", correo)
        setAuth(true)
        swal({
          text: "login exitoso",
          icon: "success",
          timer: "2000",
        })
        dispatch(login({ state: "user_ok", mail: correo }))
      } else {
        setAuth(false)
        swal({
          text: parseRes,
          icon: "warning",
          timer: "2000",
        })

      }


    } catch (error) {
      console.log(error.message)
    }
  }

  const handleFailure = (result) => {
    alert(result)
  }

  const handleLogin = async (googleData) => {
    
     const res = await fetch("/api/user/google-login", {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    setLoginData(data)
    localStorage.setItem('loginData', JSON.stringify(data)) 
  }

  const handleLogout = () => {
    localStorage.removeItem('loginData')
    setLoginData(null)
  }

  const loginGoogle =()=>{
      setAuth(true)
      swal({
        text: "login exitoso",
        icon: "success",
        timer: "2000",
      })
  }
  return (
    <Fragment>
      <h1 className='text-center my-2'>LoginUser</h1>
      <div className=" d-flex justify-content-center">
        <div className='' style={{width: "30%"}}>

          <div>
            {
              loginData ? (
               <div>
                    <div>
                      <h3> Hola {loginData.email}</h3>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  {loginGoogle()}
                </div>
              ) :(
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Log In"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
              )}
          </div>
          <form onSubmit={onSubmitForm}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">Correo</label>
              <input type="email" name="correo" id="exampleInputEmail1" aria-describedby="emailHelp" value={correo} placeholder="correo..." className='form-control' onChange={e => onChange(e)} />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label" >Contraseña</label>
              <input type="password" name="contraseña" value={contraseña} placeholder="contraseña..." id="exampleInputPassword1" className='form-control' onChange={e => onChange(e)} />
            </div>
            <div className="mb-3">
              <button className="btn btn-success btn-block" disabled={inputs.correo === "" || inputs.contraseña === ""}>Submit</button>
            </div>
          </form>

          <h6>¿No estás registrado?</h6><Link to="/register">Registrate</Link>
        </div>
      </div>

    </Fragment>
  )
}
