import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import Shop from './components/Shop';
import { CreationForm } from './components/CreationForm';




function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/shop' element={<Shop />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/creationForm' element={<CreationForm/>}/>
      </Routes>
    </div>
  );
}

export default App;
