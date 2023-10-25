import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Productos.css'


const Productos = (props) => {


  const url = 'https://apimocha.com/lettproduct/products'
  const url_cliente = 'https://apimocha.com/lettproduct/clientes'
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [error, setError] = useState(false)


  const idcliente = props.id




  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json))
  }
  , [])

  

  const handleSearch = (e) => {
    setSearch(e.target.value)
    if (e.target.value !== '') {
      const filteredProducts = products.filter(product => {
        return product.nombre.toLowerCase().includes(e.target.value.toLowerCase())
      })
      if (filteredProducts.length === 0) {
        setError(true)
      } else {
        setError(false)
      }
      setFilteredProducts(filteredProducts)
    } else {
      setFilteredProducts(products)
    }
  }



 

  const [cliente, setCliente] = useState([])

  useEffect(() => {
    fetch(url_cliente)
      .then((response) => response.json())
      .then((json) => setCliente(json))
  }

  , [])

  // funcion para guar el atributo tipo en una varaible 
  const tipocliente = () => {
    let tipo = 0
    cliente.filter(cliente => cliente.id === parseInt(idcliente)).map((cliente) => (
      tipo = cliente.tipo
    ))
    return tipo
   
  }


  const params = useParams()

  return (
    <div className='home-contenedor'>
    <div className='home-contenedor__buscador'>
      <input type='text' placeholder='Buscar Producto' value={search} onChange={handleSearch} />
    </div>
    
    
    <div className='home-contenedor__productos'>
   
      {filteredProducts.filter(product => product.estado === 1 && parseInt(params.idcategoria) === 0).map((product) => (
        <Link className='link' to={`/Productos/${params.idcliente}/${product.id}`} >
        { product.oferta === 1 ? <div className='contenedor-oferta'> <p className='oferta'>CONSULTAR DESCUENTO</p>  </div>:  <div className='contenedor-oferta'><p className='sin-oferta'>-----------</p></div>}

        <div className='home-contenedor__productos__item' key={product.id}>
          <div className='home-contenedor__productos__item__img'>
          <img src={product.image} alt={product.name} />
          </div>
          <h3>{product.nombre}</h3>
          {  tipocliente() === 0 ? <p></p> : null}
          {  tipocliente() === 1 ? <p>${product.comercio}</p> : null}
          {  tipocliente() === 2 ? <p>${product.walmart}</p> : null}
          {  tipocliente() === 3 ? <p>${product.grandes}</p> : null}
          {  tipocliente() === 3 ? <p>${product.morph}</p> : null}
          {  tipocliente() === 3 ? <p>${product.prestigio}</p> : null}

          <div className='home-contenedor__productos__item__footer'>
          <p> UxB: {product.uxb}</p>
          <p> UxV: {product.uxv}</p>
          </div>
        </div>
        </Link>
      ))}
    </div>
    {error && <p className='error'>Producto no encontrado</p>}
  </div>
  )
}

export default Productos