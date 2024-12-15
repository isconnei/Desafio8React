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
      console.log(email);
      console.log(token);
      setToken(token);
      setMail(email);
      localStorage.setItem("token", token);

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
  };

  return (
    <UserContext.Provider value={{ token, mail, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
