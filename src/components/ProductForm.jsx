"use client";

import { useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        stock,
      }),
    });

    if (res.ok) {
      alert("Produk berhasil disimpan");

      setName("");
      setPrice("");
      setStock("");

      window.location.reload();
    } else {
      alert("Gagal menyimpan produk");
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      style={{ marginBottom: "20px" }}
    >
      <h2>Tambah Produk</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Nama Produk</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Harga</label>
        <br />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Stok</label>
        <br />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      <button type="submit">
        Simpan Produk
      </button>
    </form>
  );
}