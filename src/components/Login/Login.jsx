import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./Login.css";
import { Button } from "@chakra-ui/react";

const Login = () => {
  const url = "https://apimocha.com/lettproduct/clientes";
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => setClientes(json));
  }, []);

  const validar = (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const password = parseInt(document.getElementById("password").value);

    const cliente = clientes.find((cliente) => cliente.usuarios === usuario);
    if (cliente) {
      if (cliente.cuit === password) {
        window.location.href = `/Home/${cliente.id}/0`;
      } else {
        alert("Contraseña incorrecta");
      }
    } else {
      alert("Usuario no registrado");
    }
  };

  const invitado = () => {
    window.location.href = `/Home/0/0`;
  };

  const detallesreg = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: <p>REGISTRO</p>,
      text: "Para registrarse como cliente, envie un mail a info@lettcomercial.com",
      icon: "info",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#000",
    });
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img src={logo} alt="logo" />
      </div>

      <div className="login-contenedor">
        <div className="login-contenedor__titulo">
          <h1>LOGIN</h1>
        </div>

        <div className="login-contenedor__formulario">
          <form onSubmit={validar}>
            <div className="login-contenedor__formulario__email">
              <label>Email</label>
              <input
                type="text"
                id="usuario"
                placeholder="Ingrese su email"
                required
              />
            </div>
            <div className="login-contenedor__formulario__contra">
              <label>Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
            <div className="login-contenedor__formulario__boton">
              <button type="submit">Ingresar</button>
            </div>
          </form>
          <button className="btn-invitado" type="submit" onClick={invitado}>
            Ingresar como invitado
          </button>
          <button className="btn-registro" type="submit" onClick={detallesreg}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
