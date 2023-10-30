
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../Header/Header'
import NavBar from '../NavBar/NavBar'
import Productos from '../Productos/Productos'
import { ShoppingCartProvider } from '../../context/ShoppingCartContext'



const Home = () => {

  const params = useParams()

  return (
    <>
    <ShoppingCartProvider id={params.idcliente}>
    <Header id={params.idcliente} />
    <NavBar id={params.idcliente}/>
    <Productos id={params.idcliente}/>
    </ShoppingCartProvider>
    
      </>
  )
}

export default Home