import { useState, useEffect } from "react";
import CardPizza from "../component/CardPizza/CardPizza";
import Header from "../component/Home/Header";
import Footer from "../component/Footer/Footer";

export default function Home() {
  const [listPizza, setListPizza] = useState([]);

  useEffect(() => {
    pizzaRequest();
  }, []);

  const pizzaRequest = async () => {
    const URL = "http://localhost:5289/api/pizzas";
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const pizzas = await response.json();
      setListPizza(pizzas);
    } catch (error) {
      console.error("Error al obtener las pizzas:", error.message);
    }
  };

  return (
    <div id="home">
      <Header />
      <div className="row">
        {listPizza.map((pizza, index) => (
          <CardPizza key={index} pizza={pizza} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
