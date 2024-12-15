import { useState } from "react";

export default function Register() {
  const [password, setPass] = useState("");
  const [password2, setPass2] = useState("");
  const [email, setEmail] = useState("");

  const validarInput = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      alert("El campo de correo electrónico no puede estar vacío");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Por favor ingresa un correo electrónico válido");
      return;
    }
    if (!password.trim() || password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== password2) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Formulario enviado correctamente");
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
          <div id="emailHelp" className="form-text">
            Contraseña debe tener al menos 6 caracteres.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword2"
            value={password2}
            onChange={(e) => setPass2(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar cuenta
        </button>
      </form>
    </div>
  );
}
