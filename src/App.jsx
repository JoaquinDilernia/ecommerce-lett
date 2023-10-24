import { useState, useEffect} from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import Error404 from './components/Error404/Error404'
import Login from './components/Login/Login'
import './App.css'
import ProductoDetail from './components/ProductoDetail/ProductoDetail'


function App() {
 


  return (

    <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home/:idcliente' element={<Home />} />
          <Route path='/Home/:idcliente' element={<Home />} />
          <Route path='/Productos/:idcliente/:idproducto' element={<ProductoDetail />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
       

     
    </>
  )
}

export default App