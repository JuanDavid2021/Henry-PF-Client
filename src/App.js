import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import { useState, useEffect } from 'react';

import Shop from './components/Shop';
import { CreationForm } from './components/CreationForm';
import CartDetails from './components/CartDetails';
import CartDetailsCheckout from './components/CartDetailsCheckout';
import CartDetailsCheckoutDelibery from './components/CartDetailsCheckoutDelibery';
import CartDetailCheckoutPaymentMethod from './components/CartDetailCheckoutPaymentMethod';
import DetailProduct from './components/DetailProduct';
import Products from "./components/Products"
import { DashboardUser } from './components/DashboardUser';
import { Register} from "./components/Register"
import { LoginUser } from './components/LoginUser';

import Landin from './components/Landin';
import Footer from './components/Footer';



export function App() {
  
  const [isAuthenticated, setIsAuthenticated]= useState(false)

  const setAuth = (boolean)=>{
    setIsAuthenticated(boolean)
  }
 
   const isAuth = async ()=>{
    try {
      
     const response = await fetch("http://localhost:3001/api/user/is-verify",
     {method:"GET",
      headers:{token: localStorage.token}})
     
     const parseRes= await response.json()
     parseRes===true ? setIsAuthenticated(true):setIsAuthenticated(false)
    } catch (error) {
      console.error(error.message)
    }
  }
  
  useEffect(()=>{
   isAuth()
  },[])
  return (
    <div className="App">
      <NavBar setAuth={setAuth} />
      <Routes>
        <Route exact path='/' element={<Landin />} />

        <Route exact path='/loginuser' element={!isAuthenticated? (<LoginUser  setAuth={setAuth}/>) : (<Navigate to="/shop"/>)} />
        <Route exact path='/dashboarduser' element={ isAuthenticated? (<DashboardUser  setAuth={setAuth}/>): (<Navigate to="/loginuser"/>)} /> 
        <Route exact path='/register' element={ !isAuthenticated? (<Register  setAuth={setAuth}/>): (<Navigate to="/shop"/>)} />
        <Route exact path='/shop' element={<Shop />} /> 
        <Route exact path='/product/:id' element={<DetailProduct />} /> 
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/creationForm' element={<CreationForm />} />
        <Route exact path='/cartDetails' element={<CartDetails/>}/>
        <Route path='/cartDetailsCheckout' element={<CartDetailsCheckout/>}/>
        <Route path='/cartDetailsCheckoutDelibery' element={<CartDetailsCheckoutDelibery/>}/>
        <Route path='/cartDetailCheckoutPaymentMethod' element={<CartDetailCheckoutPaymentMethod/>}/>
      </Routes>
      <Footer style={{zIndex:"0"}}/>
    </div>
  );
}

export default App;
