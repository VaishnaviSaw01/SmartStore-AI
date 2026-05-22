import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

function Products() {

  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Wireless Mouse",
      price: 999,
      category: "Electronics",
      stock: 20,
    },
  ]);

  return (
    <MainLayout>

      <Navbar />

      <ProductForm
        products={products}
        setProducts={setProducts}
      />

      <ProductTable
        products={products}
      />

    </MainLayout>
  );
}

export default Products;