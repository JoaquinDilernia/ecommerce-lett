
import React, { useState, useEffect } from 'react'
import './Header.css'
import { BsCartCheck } from 'react-icons/bs'
import { Link } from 'react-router-dom'


const Header = (props) => {

    const url = 'https://apimocha.com/lettproduct/clientes'
    const [clientes, setClientes] = useState([])

    useEffect(() => {

        fetch(url)
            .then((response) => response.json())
            .then((json) => setClientes(json))
    }
        , [])




  return (


<div className='header'>
    <div className='contenedor-usuario'>
        <p>{
            clientes.filter(cliente => cliente.id === parseInt(props.id)).map((cliente) => (
                cliente.usuarios
            ))
        }</p>

        <Link className='cerrar-sesion' to='/'>Cerrar Sesión</Link>

    </div>

    <div className='conteendor-carrito'>
        <Link to='/carrito'><BsCartCheck /></Link>
    </div>




</div>
 )
}

export default Header