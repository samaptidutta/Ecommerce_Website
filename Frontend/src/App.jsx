import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import User from './Components/Layout/User'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      {/* user layout */}
      <Route path='/' element={<User/>}></Route>
      {/* Admin Layout */}
    </Routes>
    </BrowserRouter>
  )
}

export default App
