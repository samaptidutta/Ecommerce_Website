import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './Components/Layout/User'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';

const App = () => {
  return (
    <BrowserRouter>
    
    <Routes>
      {/* user layout */}
      <Route path='/' element={<User/>}>

        <Route index element={<Home/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="profile" element={<Profile/>}/>

      </Route>
      
      {/* Admin Layout */}
    </Routes>
    <ToastContainer position='top-right'/>
    </BrowserRouter>
  )
}

export default App
