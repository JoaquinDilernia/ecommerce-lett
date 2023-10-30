import { useState, useEffect} from 'react'
import { Routes, Route,BrowserRouter  } from 'react-router-dom'
import Home from './components/Home/Home'
import Error404 from './components/Error404/Error404'
import Login from './components/Login/Login'
import Checkout from './components/Checkout/Checkout'
import Wpp from './components/Wpp/Wpp'
import Cart from './components/Cart/Cart'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import { ChakraProvider } from "@chakra-ui/react"
import './App.css'
import ProductoDetail from './components/ProductoDetail/ProductoDetail'


function App() {
 


  return (

    <>
    <ChakraProvider>
    <ShoppingCartProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home/:idcliente/:idcategoria' element={<Home />} />
          <Route path='/Productos/:idcliente/:idproducto' element={<ProductoDetail />} />
          <Route path='/Checkout/:idcliente' element={<Checkout />} />
          <Route exact path="/carrito" element={<Cart />} />

          <Route path='*' element={<Error404 />} />
        </Routes>
        <Wpp />
      </ShoppingCartProvider>
        </ChakraProvider>

     
    </>
  )
}

export default App
