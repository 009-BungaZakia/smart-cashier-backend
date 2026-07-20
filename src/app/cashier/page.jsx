import ProductCard from "@/components/cashier/ProductCard";
import Cart from "@/components/cashier/Cart";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data produk.");
  }

  return res.json();
}

export default async function CashierPage() {
  const products = await getProducts();

  return (
    <main style={{ padding: "30px" }}>
      <h1>Smart Cashier</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Daftar Produk */}
        <section
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2>Daftar Produk</h2>

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </section>

        {/* Keranjang */}
       <section
  style={{
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
  }}
>
  <Cart />
</section>
      </div>
    </main>
  );
}