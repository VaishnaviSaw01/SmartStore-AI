import { useState } from "react";
import type { Product } from "../types/product";
import API from "../services/api";

type Props = {
  products: Product[];
  onDelete: () => void;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

function ProductTable({
  products,
  onDelete,
  setEditingProduct,
}: Props) {
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    setDeletingId(id);
    try {
      await API.delete(`/products/${id}`);
      onDelete(); // Refresh catalogue in parent
    } catch (err) {
      console.error("Delete product error:", err);
      alert("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleRow = (id: string) => {
    if (expandedProductId === id) {
      setExpandedProductId(null);
    } else {
      setExpandedProductId(id);
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock >= 20) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {stock} in stock
        </span>
      );
    } else if (stock > 0) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Low: {stock} left
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          Out of Stock
        </span>
      );
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 mb-4 border border-dashed border-slate-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 17c2 0 4-1 4-4v-2" />
          </svg>
        </div>
        <h4 style={{ fontFamily: "'Sora', sans-serif" }} className="text-slate-700 font-bold text-sm">No Products Found</h4>
        <p className="text-slate-400 text-xs mt-1 max-w-xs">Your store catalogue is empty. Fill in the form on the left to add your first product.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <th className="py-5 px-8">Product</th>
            <th className="py-5 px-5">Price</th>
            <th className="py-5 px-5">Category</th>
            <th className="py-5 px-5">Stock Status</th>
            <th className="py-5 px-8 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((product) => {
            const idStr = (product._id || product.id || "").toString();
            const isExpanded = expandedProductId === idStr;
            const isDeleting = deletingId === idStr;

            return (
              <optgroup key={idStr} className="p-0 border-none">
                {/* Main Row */}
                <tr 
                  onClick={() => toggleRow(idStr)}
                  className={`hover:bg-slate-50/60 transition-colors cursor-pointer ${
                    isExpanded ? "bg-slate-50/40" : ""
                  }`}
                >
                  <td className="py-5 px-8 font-medium text-slate-900 text-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50/60 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                        {product.title.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate hover:text-indigo-600 transition-colors font-semibold">{product.title}</p>
                        {product.marketingCaption && (
                          <p className="text-[10px] text-slate-400 truncate italic mt-0.5 max-w-xs">
                            "{product.marketingCaption}"
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-5 text-slate-800 text-sm font-semibold">
                    ₹{product.price.toLocaleString("en-IN")}
                  </td>
                  <td className="py-5 px-5 text-slate-500 text-sm">
                    <span className="bg-slate-100/80 text-slate-600 px-2 py-0.5 rounded-lg text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-5 px-5">
                    {getStockBadge(product.stock)}
                  </td>
                  <td className="py-5 px-8 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-amber-600 bg-amber-50 hover:bg-amber-100 rounded-xl transition-colors"
                        title="Edit Product"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(idStr)}
                        disabled={isDeleting}
                        className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors disabled:opacity-50"
                        title="Delete Product"
                      >
                        {isDeleting ? (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-600/30 border-t-rose-600 animate-spin" />
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Details Row */}
                {isExpanded && (
                  <tr>
                    <td colSpan={5} className="bg-slate-50/50 p-8 border-b border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {/* Description */}
                        <div className="md:col-span-2 space-y-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                            AI-Generated Description
                          </span>
                          <p className="text-slate-600 text-sm leading-relaxed bg-white p-4.5 rounded-xl border border-slate-100 shadow-sm">
                            {product.description || "No description generated yet. Edit the product to generate one."}
                          </p>
                        </div>
                        
                        {/* Tags and Captions */}
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              SEO Keywords
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {product.tags && product.tags.length > 0 ? (
                                product.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-lg text-xs font-medium"
                                  >
                                    #{tag}
                                  </span>
                                ))
                              ) : (
                                <span className="text-slate-400 text-xs italic">No search tags saved.</span>
                              )}
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                              Marketing Banner Caption
                            </span>
                            <p className="text-slate-700 font-semibold text-xs border-l-2 border-indigo-500 pl-2">
                              {product.marketingCaption || "No slogan generated."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </optgroup>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;