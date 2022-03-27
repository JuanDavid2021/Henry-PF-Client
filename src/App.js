
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import { useState, useEffect } from 'react';

import Shop from './components/Shop';
import { CreationForm } from './components/CreationForm';

import React, { useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import { Route, Routes } from 'react-router-dom';
import CartDetailCheckoutPaymentMethod from './components/CartDetailCheckoutPaymentMethod';

import CartDetails from './components/CartDetails';
import CartDetailsCheckout from './components/CartDetailsCheckout';
import CartDetailsCheckoutDelivery from './components/CartDetailsCheckoutDelivery';
import CartDetailsCheckoutReview from './components/CartDetailsCheckoutReview';
import { CreationForm } from './components/CreationForm';
import DetailProduct from './components/DetailProduct';

import Products from "./components/Products"
import { DashboardUser } from './components/DashboardUser';
import { Register} from "./components/Register"
import { LoginUser } from './components/LoginUser';

import Landin from './components/Landin';

import Footer from './components/Footer';
import Landin from './components/Landin';
import Login from './components/Login';
import NavBar from './components/Navbar';
import PagoDenied from "./components/PagoDenied";
import PagoSuccess from "./components/PagoSuccess";
import Products from "./components/Products";
import Profile from './components/Profile';
import Shop from './components/Shop';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Pedidos from './components/Pedidos';



  function App() {

  const location = useLocation();
  //console.log(location);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
    
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

        <Route exact path='/login' element={<Login />} />
        {/*nepundir: provisional. renderizar unicamente si el usuario es admin. */}
        <Route exact path='/dashboard' element={<AdminDashboard />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/product/:id' element={<DetailProduct />} />

        <Route exact path='/products' element={<Products />} />
        <Route exact path='/pedidos' element={<Pedidos />} />
        <Route exact path='/creationForm' element={<CreationForm />} />
        <Route exact path='/cartDetails' element={<CartDetails />} />
        <Route path='/cartDetailsCheckout' element={<CartDetailsCheckout />} />
        <Route path='/cartDetailsCheckoutDelivery' element={<CartDetailsCheckoutDelivery />} />
        <Route path='/cartDetailsCheckoutReview' element={<CartDetailsCheckoutReview />} />
        <Route path='/cartDetailsCheckoutPaymentMethod' element={<CartDetailCheckoutPaymentMethod />} />
        <Route exact path='/pagoaprobado' element={<PagoSuccess />} />
        <Route exact path='/pagorechazado' element={<PagoDenied />} />

      </Routes>
      <Footer style={{ zIndex: "0" }} />
    </div>
  );
}

export default App;

