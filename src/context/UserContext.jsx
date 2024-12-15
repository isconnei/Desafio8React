import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [mail, setMail] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    const savedMail = localStorage.getItem("mail");
    if (savedMail) {
      setMail(savedMail);
    }
  }, []);

  // Función de login
  const login = async (userEmail, password) => {
    try {
      const url = "http://localhost:5221/api/auth/login";
      const payload = {
        email: userEmail,
        password: password,
      };

      const response = await axios.post(url, payload);
      const { email, token } = response.data;

      setToken(token);
      setMail(email);
      localStorage.setItem("token", token);
      localStorage.setItem("mail", email);

      alert("Autenticación exitosa!");
    } catch (error) {
      alert(error.message || "Error al intentar iniciar sesión.");
    }
  };

  // Función de logout
  const logout = () => {
    setToken(null);
    setMail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("mail");
  };

  // Función de Registro de  Usuario

  const register = async (mail, pass) => {
    try {
      const url = "http://localhost:5221/api/auth/register";
      const payload = {
        email: mail,
        password: pass,
      };

      const response = await axios.post(url, payload);

      console.log("Registro exitoso:", response.data);
    } catch (error) {
      if (error.response) {
        // Errores retornados por el servidor
        console.error("Error del servidor:", error.response.data.error);
      } else {
        // Otros errores (problemas de red, etc.)
        console.error("Error:", error.message);
      }
    }
  };

  // Función de Datos Usuario

  const datosUsuario = async (token) => {
    try {
      const url = "http://localhost:5221/api/auth/me";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, null, { headers });

      console.log(response);

      alert("Autenticación exitosa!");
    } catch (error) {
      alert(error.message || "Error al intentar iniciar sesión.");
    }
  };

  return (
    <UserContext.Provider
      value={{ token, mail, login, logout, datosUsuario, register }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
