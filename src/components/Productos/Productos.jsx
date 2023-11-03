import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/ShoppingCartContext";
import "./Productos.css";

import { motion } from "framer-motion";

const Productos = (props) => {
  let precio = 0;
  const url = "https://apimocha.com/lettproduct/products";
  const url_cliente = "https://apimocha.com/lettproduct/clientes";
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(false);

  const { addItem } = useContext(CartContext);

  const onAdd = (cantidad, id, precio) => {
    addItem(cantidad, id, precio);
  };

  const idcliente = props.id;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setProducts(json));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value !== "") {
      const filteredProducts = products.filter((product) => {
        return product.nombre
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      if (filteredProducts.length === 0) {
        setError(true);
      } else {
        setError(false);
      }
      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const [cliente, setCliente] = useState([]);

  useEffect(() => {
    fetch(url_cliente)
      .then((response) => response.json())
      .then((json) => setCliente(json));
  }, []);

  // funcion para guar el atributo tipo en una varaible
  const tipocliente = () => {
    let tipo = 0;
    cliente
      .filter((cliente) => cliente.id === parseInt(idcliente))
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

  const params = useParams();

  return (
    <div className="home-contenedor">
      <motion.div className="home-contenedor__buscador" 
      initial={{y: -50}}
      animate={{y:0}}
      transition={{duration:0.5}}
      exit={{y:-50}}
      >
        <input
          type="text"
          placeholder="Buscar Producto"
          value={search}
          onChange={handleSearch}
        />
      </motion.div>

      <div className="home-contenedor__productos">

        {filteredProducts.length === 0 &&
          products
            .filter(
              (product) =>
                product.estado === 1 &&
                product.categoria === parseInt(params.idcategoria)
            )
            .map((product) => (
              <motion.div className="home-contenedor__productos__item" key={product.id}
              initial={{y: 50}}
              whileInView={{y:0}}
              transition={{duration:0.5}}
              >
                <div className="home-contenedor__productos__item__header"></div>

                <Link to={`/Productos/${idcliente}/${product.id}`}>
                  <div className="home-contenedor__productos__item__img">
                    <img src={product.image} alt={product.name} />
                  </div>
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

                  <div className="home-contenedor__productos__item__footer">
                    <p> UxB: {product.uxb}</p>
                    <p> UxV: {product.uxv}</p>
                  </div>
                 
                </Link>
                {idcliente === "0" ? (
                  <p></p>
                ) : (
                  <ItemCount onAdd={onAdd} id={product.id} precio={precio} />
                )}
              </motion.div>
            ))}
        {filteredProducts
          .filter(
            (product) =>
              product.estado === 1 &&
              product.categoria === parseInt(params.idcategoria)
          )
          .map((product) => (
            <motion.div className="home-contenedor__productos__item" key={product.id} 
             initial={{y: 50}}
             whileInView={{y:0}}
              transition={{duration:0.5}}
            >
              <div className="home-contenedor__productos__item__header"></div>

              <Link to={`/Productos/${idcliente}/${product.id}`}>
                <div className="home-contenedor__productos__item__img">
                  <img src={product.image} alt={product.name} />
                </div>
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

                <div className="home-contenedor__productos__item__footer">
                  <p> UxB: {product.uxb}</p>
                  <p> UxV: {product.uxv}</p>
                </div>
               
              </Link>
              {idcliente === "0" ? (
                <p></p>
              ) : (
                <ItemCount onAdd={onAdd} id={product.id} precio={precio} />
              )}
            </motion.div>
          ))}
      </div>
      {error && <p className="error">Producto no encontrado</p>}
    </div>
  );
};

export default Productos;
