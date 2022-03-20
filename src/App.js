import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import Shop from './components/Shop';
import { CreationForm } from './components/CreationForm';
import CartDetails from './components/CartDetails';
import CartDetailsCheckout from './components/CartDetailsCheckout';
import CartDetailsCheckoutDelibery from './components/CartDetailsCheckoutDelibery';
import CartDetailCheckoutPaymentMethod from './components/CartDetailCheckoutPaymentMethod';

import DetailProduct from './components/DetailProduct';

import Landin from './components/Landin';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Landin />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/product/:id' element={<DetailProduct/>} /> 
        <Route exact path='/creationForm' element={<CreationForm/>}/>
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
