import { prisma } from "@/lib/prisma";
import ProductList from "@/components/ProductList";
import ProductForm from "@/components/ProductForm";
import DashboardCard from "@/components/dashboard/DashboardCard";

async function getProducts() {
  return await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export default async function Home() {
  const products = await getProducts();

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  return (
    <main style={{ padding: "30px" }}>
      <h1>Daftar Produk</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <DashboardCard title="Total Produk" value={products.length} />
        <DashboardCard title="Total Stok" value={totalStock} />
        <DashboardCard title="Produk Habis" value={outOfStock} />
      </div>

      <ProductForm />
      <ProductList products={products} />
    </main>
  );
}