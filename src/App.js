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
import DetailCompra from './components/DetailCompra';
import DetailPedido from './components/DetailPedido';
import DetailProduct from './components/DetailProduct';
import Footer from './components/Footer';
import Landin from './components/Landin';
import { LoginForgot } from './components/LoginForgot';
import { LoginReset } from "./components/LoginReset";
import { LoginUser } from './components/LoginUser';
// import Login from './components/Login';
import NavBar from './components/Navbar';
import PagoDenied from "./components/PagoDenied";
import PagoSuccess from "./components/PagoSuccess";
import SobreNosotros from "./components/SobreNosotros";
import Pedidos from './components/Pedidos';
import { Register } from "./components/Register";
// import Profile from './components/Profile';
import Shop from './components/Shop';
import UserInterface from './components/UserInterface';
import ProtectedRoute from './Middleware/ProtectedRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import UserDetail from './Pages/Admin/Views/UserDetail';
import { LoginResetAdmin } from './components/LoginResetAdmin';
// import Wishlist from './components/Wishlist';
import PageNotFound from './components/PageNotFound';

const {REACT_APP_API_URL} = process.env


function App() {

  const location = useLocation();
  //console.log(location);
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
    
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [UpdatePassword, setUpdatePassword] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const setPass=(boolean)=>{
    setUpdatePassword(boolean)
  }
 
  const isAuth = async () => {
    try {
      if (!localStorage.token) {
        return setIsAuthenticated(false)
      }
        const response = await fetch(`${REACT_APP_API_URL}/user/is-verify`,
          {
            method: "GET",
            headers: { token: localStorage?.token }
          });     
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
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
        <Route exact path='/userPasswordUpdate' element={<LoginResetAdmin/>}/>


        <Route exact path='/about' element={<SobreNosotros />} />


        {/* <Route exact path='/login' element={<Login />} /> */}
        {/*nepundir: provisional. renderizar unicamente si el usuario es admin. */}
        <Route exact path='/dashboard' element={
          <ProtectedRoute isAllowed={currentUser.administrador}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route exact path='/shop' element={<Shop />} />
        {/* <Route exact path='/profile/:id' element={<Profile />} /> */}

        <Route exact path='/pedido/:id' element={<ProtectedRoute isAllowed={currentUser.administrador} >
            <DetailPedido />
          </ProtectedRoute>
        } />




        <Route exact path='/user/:id' element={
          <ProtectedRoute isAllowed={currentUser.administrador} >
            <UserDetail />
          </ProtectedRoute>
        } />
        <Route exact path='/product/:id' element={<DetailProduct />} />
        <Route exact path='/login/forgot' element={<LoginForgot />} />
        <Route path='/login/reset/:token' element={<LoginReset />} />       
        <Route exact path='/pedidos' element={<Pedidos />} />
        <Route exact path='/creationForm' element={<CreationForm />} />
        <Route exact path='/cartDetails' element={<CartDetails />} />
        <Route exact path='/cartDetailsCheckout' element={isAuthenticated ? <CartDetailsCheckout /> : <Navigate to="/cartDetails" /> } />
        <Route exact path='/cartDetailsCheckoutDelivery' element={isAuthenticated ? <CartDetailsCheckoutDelivery /> : <Navigate to="/cartDetails" /> } />
        <Route exact path='/cartDetailsCheckoutReview' element={isAuthenticated ? <CartDetailsCheckoutReview /> : <Navigate to="/cartDetails" /> } />
        <Route exact path='/cartDetailsCheckoutPaymentMethod' element={isAuthenticated ? <CartDetailCheckoutPaymentMethod /> : <Navigate to="/cartDetails" /> } />
        <Route exact path='/pagoaprobado' element={<PagoSuccess />} />
        <Route exact path='/pagorechazado' element={<PagoDenied />} />

        <Route exact path='/profile' element={isAuthenticated ? (<UserInterface />) : (<Navigate to="/loginuser" />)} />
        {/* <Route exact path='/wishlist' element={isAuthenticated ? (<Wishlist />) : (<Navigate to="/loginuser" />)} /> */}
        <Route exact path='/compra/:id' element={isAuthenticated ? (<DetailCompra />) : (<Navigate to="/loginuser" />)} /> 

        <Route path='*' element={<PageNotFound />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

