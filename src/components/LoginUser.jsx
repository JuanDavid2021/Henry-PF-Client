import React, { useState } from 'react'
import { Link } from "react-router-dom"
import swal from "sweetalert"
import GoogleLogin from "react-google-login";
import { actCart, addCartItem, flushCart, login, setPlatformUser } from "../actions/index"
import { useDispatch, useSelector } from "react-redux"

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

  const currentUser = useSelector(state => state.user)
  const cart = useSelector(state => state.cart)



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
      const finalRes = { ...parseRes, email: correo }

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token)
        localStorage.setItem("mail", correo)
        dispatch(setPlatformUser(finalRes))
        if (finalRes.shoppingCart) {
            const carrito = parseRes.shoppingCart.map((p)=>JSON.parse(p))
            dispatch(actCart(carrito))
        }

        setAuth(true)
        swal({
          text: "login exitoso",
          icon: "success",
          timer: "2000",
        })
        dispatch(login({ state: "user_ok", mail: correo }))
        if (correo === "beefshophenry@gmail.com") {
          currentUser.administrador = true;
        } else {
          currentUser.administrador = false;
        }
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

  const loginGoogle = () => {
    setAuth(true)
    swal({
      text: "login exitoso",
      icon: "success",
      timer: "2000",
    })
  }

  return (
    <div className="bg-dark" style={{ height: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundSize: "cover", backgroundImage: "url(https://estaticos.muyinteresante.es/uploads/images/article/5a37f7435cafe848e93c9869/carne-roja_0.jpg)" }}>
      <div className='alert align-middle bg-dark text-light bg-opacity-75 mb-0 mx-3' style={{ display: "flex", height: "450px", flexDirection: "column", justifyContent: "center" }}>
        <h1 className='text-center mb-3'>Ingresar</h1>
        <div className=" d-flex justify-content-center">
          <div className='' style={{ width: "100%" }}>
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
                ) : (
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Continuar con Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                  />
                )}
            </div>
            <form className="mt-3">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                <input type="email" name="correo" id="exampleInputEmail1" aria-describedby="emailHelp" value={correo} placeholder="correo..." className='form-control' onChange={e => onChange(e)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" >Contraseña</label>
                <input type="password" name="contraseña" value={contraseña} placeholder="contraseña..." id="exampleInputPassword1" className='form-control' onChange={e => onChange(e)} />
              </div>
            </form>
            <div className="mb-3">
              <button onClick={onSubmitForm} className="btn btn-success btn-block" disabled={inputs.correo === "" || inputs.contraseña === ""}>Submit</button>
            </div>
            <div className='d-flex justify-content-center align-items-center'>

              <h6 className='fs-5 align-self-center'>¿No estás registrado?</h6><Link className="fs-5 mb-2 ms-2 text-decoration-none fw-normal" to="/register">Registrate</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
