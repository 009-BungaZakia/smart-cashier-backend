"use client";

import { useEffect, useState } from "react";


export default function TransactionsPage(){

  const [transactions,setTransactions] = useState([]);


  async function getTransactions(){

    const res = await fetch("/api/transactions");

    const data = await res.json();

    setTransactions(data.data);

  }


  useEffect(()=>{
    getTransactions();
  },[]);



  return(
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-5">
        Riwayat Transaksi
      </h1>


      {
        transactions.length === 0 ? (

          <p>
            Belum ada transaksi
          </p>

        ) : (

          transactions.map((trx)=>(

            <div
              key={trx.id}
              className="border rounded-lg p-4 mb-4"
            >

              <h2 className="font-bold">
                Transaksi #{trx.id}
              </h2>


              <p>
                Total:
                Rp {trx.total.toLocaleString("id-ID")}
              </p>


              <p>
                {
                  new Date(
                    trx.createdAt
                  ).toLocaleDateString("id-ID")
                }
              </p>


              <hr className="my-3"/>


              <h3 className="font-semibold">
                Produk:
              </h3>


              {
                trx.items.map((item)=>(

                  <p key={item.id}>
                    {item.product.name}
                    {" "}
                    x {item.quantity}
                  </p>

                ))
              }


            </div>

          ))

        )
      }


    </div>
  )
}