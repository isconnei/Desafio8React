import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cartContext";

export default function CardPizza({ pizza }) {
  const { addPizza } = useContext(CartContext);

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <img src={pizza.img} alt={pizza.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{pizza.name}</h5>
          <p className="card-text">Precio: ${pizza.price}</p>
          <p className="card-text">Ingredientes:</p>
          <ul>{pizza.ingredients.join(", ")}</ul>
          <div className="d-flex justify-content-between">
            <Link to={`/pizza/${pizza.id}`} className="btn btn-primary">
              Ver más
            </Link>
            <button className="btn btn-success" onClick={() => addPizza(pizza)}>
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
