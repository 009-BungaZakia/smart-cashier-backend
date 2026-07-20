"use client";

import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

export default function Cart() {
  const { cart, setCart } = useContext(CartContext);

  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);


  function increaseQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }

      return item;
    });

    setCart(updatedCart);
  }


  function decreaseQuantity(id) {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);


    setCart(updatedCart);
  }


  async function handleCheckout() {
    if (cart.length === 0) {
      alert("Keranjang masih kosong");
      return;
    }


    try {
      setLoading(true);


      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: cart,
        }),
      });


      const data = await res.json();


      if (!res.ok) {
        throw new Error(
          data.message || "Checkout gagal"
        );
      }


      alert(
        data.message || "Checkout berhasil"
      );


      // kosongkan keranjang
      setCart([]);


    } catch (error) {

      console.error(
        "Checkout error:",
        error
      );

      alert(
        error.message || "Checkout gagal"
      );


    } finally {

      setLoading(false);

    }
  }



  return (
    <div>

      <h2>
        Keranjang
      </h2>


      {
        cart.length === 0 ? (

          <p>
            Belum ada produk.
          </p>

        ) : (


          cart.map((item) => (

            <div
              key={item.id}
              style={{
                marginBottom: "15px",
                borderBottom:
                  "1px solid #ddd",
                paddingBottom:
                  "10px",
              }}
            >


              <strong>
                {item.name}
              </strong>



              <div
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"10px",
                  margin:"10px 0",
                }}
              >

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>



                <span>
                  {item.quantity}
                </span>



                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>


              </div>



              <p>
                Rp{" "}
                {
                  (
                    item.price *
                    item.quantity
                  )
                  .toLocaleString("id-ID")
                }
              </p>


            </div>

          ))

        )
      }



      <hr
        style={{
          margin:"20px 0"
        }}
      />



      <h3>
        Total:
        {" "}
        Rp{" "}
        {
          total.toLocaleString("id-ID")
        }
      </h3>




      <button
        disabled={
          cart.length === 0 ||
          loading
        }

        onClick={handleCheckout}

        style={{
          padding:"10px 20px",
          cursor:
            cart.length === 0 || loading
            ? "not-allowed"
            : "pointer",
        }}
      >

        {
          loading
          ? "Memproses..."
          : "Checkout"
        }

      </button>


    </div>
  );
}