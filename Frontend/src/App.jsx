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
import AllProductslink from './Components/Products/AllProductslink';
import Chekout from './Components/Cart/Chekout';
import OrderConfirmation from './Pages/OrderConfirmation';
import OrderDetailsPage from './Pages/OrderDetailsPage';
import YourOrders from './Pages/YourOrders';
import AdminLayout from './Components/Admin/AdminLayout';
import AdminHomepage from './Pages/AdminHomepage';
import UserManagement from './Components/Admin/UserManagement';
import ProductManagement from './Components/Admin/ProductManagement';
import ProductEdit from './Components/Admin/ProductEdit';
import OrderManagement from './Components/Admin/OrderManagement';


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
        <Route path='product/:id' element={<AllProductslink/>} />
        <Route path="checkout" element={<Chekout/>} />
        <Route path="order-confirmation" element={<OrderConfirmation/>}/>
        <Route path="order/:id" element={<OrderDetailsPage/>}/>
        <Route path="/my-orders" element={<YourOrders/>}/>
      

      </Route>
      
        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout/>}>
        
          <Route index element ={<AdminHomepage/>}/>
          <Route path="users" element={<UserManagement/>}/>
          <Route path="products" element={<ProductManagement/>}/>
          <Route path="products/:id/edit" element={<ProductEdit/>}/>
          <Route path="orders" element={<OrderManagement/>}/>

        </Route>
        
    </Routes>
    
    <ToastContainer position='top-right'/>
    </BrowserRouter>
  )
}

export default App
