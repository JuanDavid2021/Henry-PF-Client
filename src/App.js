import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartDetailCheckoutPaymentMethod from './components/CartDetailCheckoutPaymentMethod';
import CartDetails from './components/CartDetails';
import CartDetailsCheckout from './components/CartDetailsCheckout';
import CartDetailsCheckoutDelivery from './components/CartDetailsCheckoutDelivery';
import CartDetailsCheckoutReview from './components/CartDetailsCheckoutReview';
import { CreationForm } from './components/CreationForm';
import { DashboardUser } from './components/DashboardUser';
import DetailPedido from './components/DetailPedido';
import DetailProduct from './components/DetailProduct';
import Footer from './components/Footer';
import Landin from './components/Landin';
import { LoginUser } from './components/LoginUser';
// import Login from './components/Login';
import NavBar from './components/Navbar';
import PagoDenied from "./components/PagoDenied";
import PagoSuccess from "./components/PagoSuccess";
import Pedidos from './components/Pedidos';
import Products from "./components/Products";
import { Register } from "./components/Register";
// import Profile from './components/Profile';
import Shop from './components/Shop';
import UserInterface from './components/UserInterface';
import ProtectedRoute from './Middleware/ProtectedRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';

function App() {

  const location = useLocation();
  //console.log(location);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
 
  const isAuth = async () => {
    try {
      
      const response = await fetch("http://localhost:3001/api/user/is-verify",
        {
          method: "GET",
          headers: { token: localStorage.token }
        });
     
      const parseRes = await response.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div >
      <NavBar setAuth={setAuth} />
      <Routes>
        <Route exact path='/' element={<Landin />} />


        <Route exact path='/loginuser' element={!isAuthenticated ? (<LoginUser setAuth={setAuth} />) : (<Navigate to="/shop" />)} />
        <Route exact path='/dashboarduser' element={isAuthenticated ? (<DashboardUser setAuth={setAuth} />) : (<Navigate to="/loginuser" />)} /> 
        <Route exact path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth} />) : (<Navigate to="/shop" />)} />
        <Route exact path='/shop' element={<Shop />} /> 
        <Route exact path='/product/:id' element={<DetailProduct />} /> 


        {/* <Route exact path='/login' element={<Login />} /> */}
        {/*nepundir: provisional. renderizar unicamente si el usuario es admin. */}
        <Route exact path='/dashboard' element={
          <ProtectedRoute isAllowed={currentUser.administrador}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route exact path='/shop' element={<Shop />} />
        {/* <Route exact path='/profile/:id' element={<Profile />} /> */}

        <Route exact path='/product/:id' element={<DetailProduct />} />

        // <Route exact path='/products' element={<Products />} />
        // <Route exact path='/pedidos' element={<Pedidos />} />
        <Route exact path='/pedido/:id' element={<DetailPedido />} /> 
        <Route exact path='/creationForm' element={<CreationForm />} />
        <Route exact path='/cartDetails' element={<CartDetails />} />
        <Route path='/cartDetailsCheckout' element={<CartDetailsCheckout />} />
        <Route path='/cartDetailsCheckoutDelivery' element={<CartDetailsCheckoutDelivery />} />
        <Route path='/cartDetailsCheckoutReview' element={<CartDetailsCheckoutReview />} />
        <Route path='/cartDetailsCheckoutPaymentMethod' element={<CartDetailCheckoutPaymentMethod />} />
        <Route exact path='/pagoaprobado' element={<PagoSuccess />} />
        <Route exact path='/pagorechazado' element={<PagoDenied />} />

        <Route exact path='/profile' element={<UserInterface />} />


      </Routes>
      <Footer />
    </div>
  );
}

export default App;

