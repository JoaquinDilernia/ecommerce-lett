import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './ProductoDetail.css'
import NavBar from '../NavBar/NavBar'
import Header from '../Header/Header'


const ProductoDetail = () => {

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
    <>
    <Header id={params.idcliente}/>
    <NavBar />
    <div className='Producto-detail' >{
        products.filter(product => product.id === parseInt(params.idproducto)).map((product) => (
            <div className='Producto-detail-contenedor' key={product.id}>
                <div className='Producto-detail-contenedor-img'>
                    <img src={product.image} alt={product.nombre} />
                </div>
                
                <div className='Producto-detail-contenedor-caracteristicas'>
                <h3>{product.nombre}</h3>
                <p>${product.comercio}</p>
                    <p className='detail-p'> {product.descripcion}</p>
                    <p className='detail-p'> UxB: {product.uxb}</p>
                    <p className='detail-p'>  UxV: {product.uxv}</p>
                    <p className='detail-p'> Peso KG: {product.peso}</p>
                    <p className='detail-p'> Alto CM: {product.alto}</p>
                    <p className='detail-p'> Ancho CM: {product.ancho}</p>
                    <p className='detail-p'> Profundidad CM: {product.profundidad}</p>
                    <p className='detail-p'> Diametro CM: {product.diametro}</p>

                </div>
 
            </div>


        ))}
    </div>

    </>
   
    
  )
}

export default ProductoDetail