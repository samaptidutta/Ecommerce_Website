import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './Components/Layout/User'
import Home from './Pages/Home'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* user layout */}
      <Route path='/' element={<User/>}>

        <Route index element={<Home/>}/>

      </Route>
      
      {/* Admin Layout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
