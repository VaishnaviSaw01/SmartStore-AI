import { useEffect, useState } from "react";
import type { Product } from "../types/product";

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<
    React.SetStateAction<Product | null>
  >;
};

function ProductForm({
  products,
  setProducts,
  editingProduct,
  setEditingProduct,
}: Props) {

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price.toString());
      setCategory(editingProduct.category);
      setStock(editingProduct.stock.toString());
    }
  }, [editingProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {

      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              title,
              price: Number(price),
              category,
              stock: Number(stock),
            }
          : product
      );

      setProducts(updatedProducts);
      setEditingProduct(null);

    } else {

      const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
        category,
        stock: Number(stock),
      };

      setProducts([...products, newProduct]);
    }

    setTitle("");
    setPrice("");
    setCategory("");
    setStock("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">

        {editingProduct
          ? "Edit Product"
          : "Add Product"}

      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          placeholder="Product Name"
          className="border border-gray-200 p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border border-gray-200 p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border border-gray-200 p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border border-gray-200 p-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-blue-400"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-2xl hover:scale-105 transition"
        >
          {editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>

      </form>

    </div>
  );
}

export default ProductForm;