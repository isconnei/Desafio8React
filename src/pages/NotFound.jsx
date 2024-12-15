import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-3 text-secondary">Página no encontrada</h2>
      <p className="mb-4 text-muted">
        Lo sentimos, la página que buscas no existe.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
