import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductoDetail.css";
import NavBar from "../NavBar/NavBar";
import Header from "../Header/Header";
import ItemCount from "../ItemCount/ItemCount";
import { useContext } from "react";
import { CartContext } from "../../context/ShoppingCartContext";

const ProductoDetail = () => {
    let precio = 0;
  const url = "https://apimocha.com/lettproduct/products";
  const url_cliente = "https://apimocha.com/lettproduct/clientes";
  const [products, setProducts] = useState([]);
  const [cliente, setCliente] = useState([]);
  const params = useParams();
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    fetch(url_cliente)
      .then((response) => response.json())
      .then((json) => setCliente(json));
  }, []);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }, []);

  const onAdd = (cantidad, id, precio) => {
    addItem(cantidad, id, precio);
  };

  const tipocliente = () => {
    let tipo = 0;
    cliente
      .filter((cliente) => cliente.id === parseInt(params.idcliente))
      .map((cliente) => (tipo = cliente.tipo));
    return tipo;
  };

  const guardarprecio = (comercio, walmart, grandes, morph, prestigio) => {
    if (tipocliente() === 1) {
      precio = comercio;
    }
    if (tipocliente() === 2) {
      precio = walmart;
    }
    if (tipocliente() === 3) {
      precio = grandes;
    }
    if (tipocliente() === 4) {
      precio = morph;
    }
    if (tipocliente() === 5) {
      precio = prestigio;
    }
    if (tipocliente() === 0) {
      precio = 0;
    }
    return precio;
  };

  return (
    <>
      <Header id={params.idcliente} />
      <NavBar id={params.idcliente} />
      <div className="Producto-detail">
        {products
          .filter((product) => product.id === parseInt(params.idproducto))
          .map((product) => (
            <div className="Producto-detail-contenedor" key={product.id}>
              <div className="Producto-detail-contenedor-img">
                <img src={product.image} alt={product.nombre} />
                {params.idcliente === "0" ? (
                  <p className="detail-p"></p>
                ) : (
                  <div className="Producto-detail-contenedor-boton">
                    <ItemCount onAdd={onAdd} id={product.id} precio={parseInt(precio)} />
                  </div>
                )}
              </div>

              <div className="Producto-detail-contenedor-caracteristicas">
                <h3>{product.nombre}</h3>
                {guardarprecio(
                  product.comercio,
                  product.walmart,
                  product.grandes,
                  product.morph,
                  product.prestigio
                )}
                {precio === 0 ? (
                  <p className="precio"></p>
                ) : (
                  <p className="precio">${precio}</p>
                )}

                <p className="detail-p"> {product.descripcion}</p>
                <p className="detail-p"> UxB: {product.uxb}</p>
                <p className="detail-p"> UxV: {product.uxv}</p>
                <p className="detail-p"> Peso KG: {product.peso}</p>
                <p className="detail-p"> Alto CM: {product.alto}</p>
                <p className="detail-p"> Ancho CM: {product.ancho}</p>
                <p className="detail-p">
                  {" "}
                  Profundidad CM: {product.profundidad}
                </p>
                <p className="detail-p"> Diametro CM: {product.diametro}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default ProductoDetail;
