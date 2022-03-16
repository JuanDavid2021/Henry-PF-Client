import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import Shop from './components/Shop';



function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/profile/:id' element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
