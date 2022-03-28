import React,{Fragment, useState} from 'react'
import {Link} from "react-router-dom"
import swal from "sweetalert"
import GoogleLogin from "react-google-login";

export const LoginUser = ({setAuth}) => {

    const [inputs, setInputs] = useState({
        correo:"",
        contraseña:""
    })

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem(loginData)) : null
    )

    const {correo, contraseña} = inputs

    const onChange = (e)=>{
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async (e)=>{
        e.preventDefault() 
        
        try {
          const body = {correo, contraseña}    
          const response = await fetch("http://localhost:3001/api/user/login",
          {method:"POST",
           headers:{"Content-Type":"application/json"},
           body: JSON.stringify(body) });
     
          const parseRes = await response.json()
        
         if (parseRes.token){
             localStorage.setItem("token", parseRes.token)
             setAuth(true)
             swal({
                text:"login exitoso",
                icon: "success",
                timer:"2000",
             })
         }else{
             setAuth(false)
             swal({
                text: parseRes,
                icon: "alert",
                timer:"2000",
             })
         }
          
         
         } catch (error) {
           console.log(error.message) 
        }
       }

       const handleFailure=(result)=>{
        alert(result)
       }

       const handleLogin= async(googleData)=>{
        const res = await fetch('/api/google-login',{
          method:'POST',
          body: JSON.stringify({
            token: googleData.tokenId  
          }),
          headers:{
              'Content-Type': 'application/json'
          }  
        })

        const data = await res.json();
        
        setLoginData(data)
        localStorage.setItem('loginData', JSON.stringify(data))
       }

       const handleLogout=()=>{
           localStorage.removeItem('loginData')
           setLoginData(null)
       }

       
    return (
    <Fragment> 
    <h1 className='text-center my-2'>LoginUser</h1>

    <div>
      {
        loginData? (
           <div>
             <h3> Hola {loginData.email}</h3>
             <button onClick={handleLogout}>Logout</button>  
           </div> 
        ):
     <GoogleLogin
     clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
     buttonText="Log In"
     onSuccess={handleLogin}
     onFailure={handleFailure}
     cookiePolicy={'single_host_origin'}
     >
     </GoogleLogin> 
      }  
    </div>
    <form onSubmit={onSubmitForm}>
        <input type="email" name="correo" value={correo} placeholder="correo..." className='form-control my-3' onChange={e=>onChange(e)}/>
        <input type="password" name="contraseña" value={contraseña} placeholder="contraseña..." className='form-control my-3'onChange={e=>onChange(e)}/>
        <button className="btn btn-success btn-block">Submit</button>

    </form>
    
    <Link to="/register">Registro</Link>

    </Fragment> 
  )
}