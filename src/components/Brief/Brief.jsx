import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";
import { BsTrash3 } from 'react-icons/bs';
import { useState, useEffect } from "react";
import "./Brief.css";
import { Link, useParams } from "react-router-dom";


const Brief = () => {

  const url_cliente = 'https://apimocha.com/lettproduct/clientes'
  const [cliente, setCliente] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(url_cliente)
      .then((response) => response.json())
      .then((json) => setCliente(json))
  }
  , [])


  const params = useParams()

  const tipocliente = () => {
    let tipo = 0
    cliente.filter(cliente => cliente.id === parseInt(params.idcliente)).map((cliente) => (
      tipo = cliente.tipo
    ))
    return tipo
   
  }


  const { cart, totalAmount, removeProduct } = useContext(CartContext);

  return (
    <>
    <div className="contenedor">
      <div className="contenedor-productos">
        {cart.map((product) => (
          <div className="producto" key={product.id}>
            <div className="imagen">
              <img src={product.image} alt={product.nombre} />
            </div>
            <div className="informacion">
              <p className="titulo">{product.nombre}</p>
                  
          {  tipocliente() === 1 ? <p>${product.comercio}</p> : null}
          {  tipocliente() === 2 ? <p>${product.walmart}</p> : null}
          {  tipocliente() === 3 ? <p>${product.grandes}</p> : null}
          {  tipocliente() === 4 ? <p>${product.morph}</p> : null}
          {  tipocliente() === 5 ? <p>${product.prestigio}</p> : null}
              <p className="cantidad"> x {product.quantity} </p>             
          {  tipocliente() === 1 ? <p>${product.comercio * product.quantity}</p> : null}
          {  tipocliente() === 2 ? <p>${product.walmart * product.quantity}</p> : null}
          {  tipocliente() === 3 ? <p>${product.grandes * product.quantity}</p> : null}
          {  tipocliente() === 4 ? <p>${product.morph * product.quantity}</p> : null}
          {  tipocliente() === 5 ? <p>${product.prestigio * product.quantity}</p> : null}

              <p className="eliminar">
                <button onClick={() => removeProduct(product.id)}>
                <BsTrash3 color= "red" />
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="contenedor-total">
        <div className="total">
          <p className="titulo">Total:</p>

          <p className="monto">{parseInt(totalAmount)}</p>
        </div>
      
      </div>
    </div>
    </>


  )
}

export default Brief