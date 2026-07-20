"use client";

import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function ProductCard({ product }) {
    const { cart, setCart } = useContext(CartContext);

function addToCart() {
  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
    return;
  }

  setCart([
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ]);
}
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
      }}
    >
      <h3>{product.name}</h3>

      <p>Harga: Rp {product.price.toLocaleString("id-ID")}</p>

      <p>Stok: {product.stock}</p>

      <button onClick={addToCart}>
  Tambah
</button>
    </div>
  );
}