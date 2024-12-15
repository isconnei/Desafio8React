import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addPizza = (pizza) => {
    setCart((prevCart) => {
      const pizzaExists = prevCart.find((item) => item.id === pizza.id);
      if (pizzaExists) {
        return prevCart.map((item) =>
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...pizza, quantity: 1 }];
      }
    });

    setTotal((prevTotal) => prevTotal + pizza.price);
  };

  const removePizza = (pizzaToRemove) => {
    setCart((prevCart) =>
      prevCart
        .map((pizza) =>
          pizza.id === pizzaToRemove.id
            ? { ...pizza, quantity: pizza.quantity - 1 }
            : pizza
        )
        .filter((pizza) => pizza.quantity > 0)
    );

    // Actualizamos el total
    setTotal((prevTotal) =>
      prevTotal - pizzaToRemove.price > 0 ? prevTotal - pizzaToRemove.price : 0
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, total, setTotal, addPizza, removePizza }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
