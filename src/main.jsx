import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./context/cartContext";
import { UserProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </CartProvider>
);
