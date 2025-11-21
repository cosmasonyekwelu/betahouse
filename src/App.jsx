import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Properties from './pages/Properties/Properties'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'
import './styles/reset.css'

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Properties/>} />
        <Route path='/properties' element={<Properties/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}
