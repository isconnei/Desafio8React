import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../context/cartContext";
import UserContext from "../context/UserContext";

export default function Cart() {
  const { cart, total, addPizza, removePizza } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [successMessage, setSuccessMessage] = useState("");
  setTimeout(() => setSuccessMessage(""), 3000);

  const handleIncrement = (pizza) => addPizza(pizza);

  const handleDecrement = (pizza) => removePizza(pizza);

  const createCheckout = async () => {
    try {
      const url = "http://localhost:5221/api/checkouts";

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(url, cart, { headers });
      console.log("Respuesta del servidor:", response.data);
      setSuccessMessage("¡El checkout se realizó correctamente!");
    } catch (error) {
      if (error.response) {
        console.error("Error del servidor:", error.response.data.error);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      {cart.length > 0 ? (
        cart.map((pizza, index) => (
          <div
            key={index}
            className="d-flex align-items-center mb-2 p-2 border rounded justify-content-between ms-4"
          >
            <img
              src={pizza.img}
              alt={pizza.name}
              className="rounded"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div className="flex-grow-1 me-2">
              <p className="mb-0 fw-bold">{pizza.name}</p>
              <p className="mb-0 text-muted" style={{ fontSize: "0.9rem" }}>
                Precio unitario: ${pizza.price.toLocaleString()}
              </p>
              <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                Ingredientes: {pizza.ingredients.join(", ")}
              </p>
            </div>
            <div
              className="d-flex align-items-center justify-content-left"
              style={{ width: "50%" }}
            >
              <button
                className="btn btn-outline-danger btn-sm px-2 py-1"
                onClick={() => handleDecrement(pizza)}
              >
                -
              </button>
              <span className="mx-1">{pizza.quantity}</span>
              <button
                className="btn btn-outline-primary btn-sm px-2 py-1"
                onClick={() => handleIncrement(pizza)}
              >
                +
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-3">No hay pizzas en el carrito.</p>
      )}
      <div className="mt-3">
        <h4>Total: ${total.toLocaleString()}</h4>
      </div>

      {/* Mostrar mensaje de éxito si existe */}
      {successMessage && (
        <div className="alert alert-success text-center mt-3" role="alert">
          {successMessage}
        </div>
      )}

      {token && (
        <button className="btn btn-danger m-5 mt-2" onClick={createCheckout}>
          Pagar
        </button>
      )}
    </div>
  );
}
