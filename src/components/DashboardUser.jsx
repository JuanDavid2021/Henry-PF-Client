import React,{Fragment, useState, useEffect} from 'react'
import { getDropdownMenuPlacement } from 'react-bootstrap/esm/DropdownMenu'
import swal from "sweetalert"

export const DashboardUser = ({setAuth}) => {


 const [name, setName] = useState("")

 async function  getName(){
     try {
         
      const response = await fetch("http://localhost:3001/api/user/dashboarduser",
      {method:"GET",
      headers:{token: localStorage.token},
      });

      const parseRes = await response.json()
     
      setName(parseRes)

     } catch (error) {
        console.error(error.message)  
     }
 }

 const logout=(e)=>{
 e.preventDefault()
 localStorage.removeItem("token")
 setAuth(false)
 swal({
    text:"has cerrado la sesion",
    icon: "success",
    timer:"2000",
 })
 }

 useEffect(()=>{
   getName()
 },[])


  return (
    <Fragment>
       <h1>Hola!!!  {name}</h1> 
       <button className="btn btn-primary" onClick={e=>logout(e)}>LogOut</button>   
    </Fragment>
  )
}
