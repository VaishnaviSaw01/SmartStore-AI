/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import { Skeleton } from "../components/Loader";
import API from "../services/api";
import type { Product } from "../types/product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.error("Fetch products error:", err);
      setErrorMessage("Could not load catalogue products. Please check server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <MainLayout>
      <Navbar />

      {/* Summary info bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-2xl p-8 border border-slate-100 shadow-sm gap-6 mb-8">
        <div className="flex items-center gap-4">
          <div>
            <p className="text-slate-400 text-xs font-medium">Total Products</p>
            <p
              style={{ fontFamily: "'Sora', sans-serif" }}
              className="text-2xl font-bold text-slate-900 mt-0.5"
            >
              {loading ? "..." : products.length}
            </p>
          </div>
          <div className="w-px h-10 bg-slate-100" />
          <div>
            <p className="text-slate-400 text-xs font-medium">Currently Editing</p>
            <p className="text-sm font-semibold text-slate-700 mt-1 max-w-[200px] truncate">
              {editingProduct ? editingProduct.title : "—"}
            </p>
          </div>
        </div>

        {editingProduct && (
          <button
            onClick={() => setEditingProduct(null)}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-all"
          >
            Cancel Editing
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 border border-red-100 rounded-2xl px-8 py-5 mb-8 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Two-column layout: form + table */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        {/* Form panel */}
        <div className="xl:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50">
              <h3
                style={{ fontFamily: "'Sora', sans-serif" }}
                className="font-bold text-slate-900 text-base"
              >
                {editingProduct ? "Edit Product" : "Add Product"}
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">
                {editingProduct ? "Modify the product details" : "Create a new catalog item"}
              </p>
            </div>
            <div className="p-8">
              <ProductForm
                onSave={fetchProducts}
                editingProduct={editingProduct}
                setEditingProduct={setEditingProduct}
              />
            </div>
          </div>
        </div>

        {/* Table panel */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
              <div>
                <h3
                  style={{ fontFamily: "'Sora', sans-serif" }}
                  className="font-bold text-slate-900 text-base"
                >
                  Product Catalogue
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  {loading ? "Counting items..." : `${products.length} products listed`}
                </p>
              </div>
            </div>
            
            {loading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            ) : (
              <ProductTable
                products={products}
                onDelete={fetchProducts}
                setEditingProduct={setEditingProduct}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Products;
