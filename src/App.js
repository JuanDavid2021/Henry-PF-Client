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

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Landin />} />
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
