import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const validarInput = (event) => {
    event.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }
    if (!password.trim() || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
  };

  return (
    <div className="border border-dark-subtle m-3 p-1">
      <form onSubmit={validarInput} noValidate>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Inicias sesión
        </button>
      </form>
    </div>
  );
}
