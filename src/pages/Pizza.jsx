import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Pizza() {
  const [datosPizza, setDatosPizza] = useState(null);
  const { id } = useParams();
  const baseURL = "http://localhost:5289/api/pizzas";

  useEffect(() => {
    pizzaRequest();
  }, []);

  const pizzaRequest = async () => {
    const URL = `${baseURL}/${id}`;
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const pizza = await response.json();
      setDatosPizza(pizza);
    } catch (error) {
      console.error("Error al obtener la pizza:", error.message);
    }
  };

  return (
    <div id="home">
      {datosPizza ? (
        <>
          <h1>{datosPizza.name}</h1>
          <p>
            <strong>Descripción:</strong> {datosPizza.desc}
          </p>
          <p>
            <strong>Precio:</strong> ${datosPizza.price}
          </p>
          <p>
            <strong>Ingredientes:</strong> {datosPizza.ingredients.join(", ")}
          </p>
          <img
            src={datosPizza.img}
            alt={datosPizza.name}
            style={{ width: "200px", height: "200px", borderRadius: "10px" }}
          />
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
