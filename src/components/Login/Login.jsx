import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


import './Login.css'



const Login = () => {
    const url = 'https://apimocha.com/lettproduct/clientes'
    const [clientes, setClientes] = useState([])

    useEffect(() => {

        fetch(url)
            .then((response) => response.json())
            .then((json) => setClientes(json))
    }
        , [])

    const validar = (e) => {
        e.preventDefault()
        const usuario = document.getElementById('usuario').value
        const password = parseInt(document.getElementById('password').value)



        const cliente = clientes.find(cliente => cliente.usuarios === usuario)
        if (cliente) {
            if (cliente.cuit === password) {
                alert('Bienvenido')
                window.location.href = `/Home/${cliente.id}`
            } else {
                alert('Contraseña incorrecta')
            }
        } else {
            alert('Usuario no registrado')
        }
    }







  return (
    <div className='login'>
    <div className='login-contenedor'>
        <div className='login-contenedor__titulo'>
            <h1>LOGIN</h1>

        </div>

        <div className='login-contenedor__formulario'>
            <form onSubmit={validar}>
                <div className='login-contenedor__formulario__email'>
                    <label >Email</label>
                    <input type='text' id='usuario' placeholder='Ingrese su email' required />
                </div>
                <div className='login-contenedor__formulario__contra'>
                    <label >Contraseña</label>
                    <input type='password' id='password' placeholder='Ingrese su contraseña' required />
                </div>
                <div className='login-contenedor__formulario__boton'>
                    <button type='submit'>Ingresar</button>
                </div>
            </form>



      </div>



    </div>
    </div>

 
  )
}

export default Login