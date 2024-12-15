import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/cartContext";
import UserContext from "../context/UserContext";

export default function Navbar() {
  const { total } = useContext(CartContext);
  const { token, logout } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi Pizzería
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Perfil
                  </Link>
                </li>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => logout()}
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrarse
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Iniciar Sesión
                  </Link>
                </li>
              </>
            )}
          </ul>

          <Link to="/cart" className="btn btn-outline-primary">
            Total: ${total}
          </Link>
        </div>
      </div>
    </nav>
  );
}
