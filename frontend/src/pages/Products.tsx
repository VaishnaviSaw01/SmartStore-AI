import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import type { Product } from "../types/product";


function Products() {

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      title: "Wireless Mouse",
      price: 999,
      category: "Electronics",
      stock: 20,
    },
  ]);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  return (
    <MainLayout>

      <Navbar />

      <ProductForm
        products={products}
        setProducts={setProducts}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      <ProductTable
        products={products}
        setProducts={setProducts}
        setEditingProduct={setEditingProduct}
      />

    </MainLayout>
  );
}

export default Products;