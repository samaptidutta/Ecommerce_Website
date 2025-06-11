import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './Components/Layout/User'
import Home from './Pages/Home'
import { ToastContainer } from 'react-toastify';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import SmartPhone from './Pages/Collections/SmartPhone';
import Cameras from './Pages/Collections/Cameras';
import Headphones from './Pages/Collections/Headphones';
import SmartWatch from './Pages/Collections/SmartWatch';
import Laptop from './Pages/Collections/Laptop';

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
        <Route path="smartphone" element={<SmartPhone/>}/>
        <Route path="camera" element={<Cameras/>} />
        <Route path='headphone' element={<Headphones/>} />
        <Route path='watch' element={<SmartWatch/>} />
        <Route path='tv' element={<Laptop/>} />

      </Route>
      
      {/* Admin Layout */}
    </Routes>
    <ToastContainer position='top-right'/>
    </BrowserRouter>
  )
}

export default App
