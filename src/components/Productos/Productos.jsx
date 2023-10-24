import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Productos.css'


const Productos = () => {

  const url = 'https://apimocha.com/lettproduct/products'
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json))
  }
  , [])

  const params = useParams()

  return (
    <div className='home-contenedor'>
    <div className='home-contenedor__titulo'>
      <h1>PRODUCTOS</h1>
    </div>
    
    <div className='home-contenedor__productos'>
      {products.filter(product => product.estado === 1).map((product) => (
        <Link className='link' to={`/Productos/${params.idcliente}/${product.id}`} >
        <div className='home-contenedor__productos__item' key={product.id}>
          <div className='home-contenedor__productos__item__img'>
          <img src={product.image} alt={product.name} />
          </div>
          <h3>{product.nombre}</h3>
          <p>${product.comercio}</p>
          <div className='home-contenedor__productos__item__footer'>
          <p> UxB: {product.uxb}</p>
          <p> UxV: {product.uxv}</p>
          </div>

        </div>
        </Link>
      ))}
    </div>
    
  </div>
  )
}

export default Productos