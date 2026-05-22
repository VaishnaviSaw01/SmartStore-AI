import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import type { Product } from "../types/product";

function Products() {

  const [products, setProducts] = useState<Product[]>([]);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // LOAD PRODUCTS FROM LOCALSTORAGE
  useEffect(() => {

    const savedProducts =
      localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

  }, []);

  // SAVE PRODUCTS TO LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );

  }, [products]);

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