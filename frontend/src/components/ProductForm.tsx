/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import API from "../services/api";

type Props = {
  onSave: () => void;
  editingProduct: Product | null;
  setEditingProduct: React.Dispatch<React.SetStateAction<Product | null>>;
};

function ProductForm({
  onSave,
  editingProduct,
  setEditingProduct,
}: Props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  
  // AI-generated fields
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [marketingCaption, setMarketingCaption] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function clearForm() {
    setTitle("");
    setPrice("");
    setCategory("");
    setStock("");
    setDescription("");
    setTags("");
    setMarketingCaption("");
    setErrorMessage("");
  }

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setPrice(editingProduct.price.toString());
      setCategory(editingProduct.category);
      setStock(editingProduct.stock.toString());
      setDescription(editingProduct.description || "");
      setTags(editingProduct.tags ? editingProduct.tags.join(", ") : "");
      setMarketingCaption(editingProduct.marketingCaption || "");
      setErrorMessage("");
    } else {
      clearForm();
    }
  }, [editingProduct]);

  const handleGenerateAI = async () => {
    if (!title || !category) {
      setErrorMessage("Please enter Product Name and Category first to generate AI content.");
      return;
    }
    
    setErrorMessage("");
    setIsGeneratingAI(true);
    try {
      const response = await API.post("/ai/generate-description", {
        title,
        category,
      });
      
      const { description: aiDesc, tags: aiTags, marketingCaption: aiSlogan } = response.data;
      
      setDescription(aiDesc || "");
      setTags(Array.isArray(aiTags) ? aiTags.join(", ") : "");
      setMarketingCaption(aiSlogan || "");
    } catch (err) {
      console.error("AI Generation error:", err);
      setErrorMessage("Failed to connect to AI engine. Using default local completion.");
      
      // Fallback local completion
      setDescription(`The ${title} is an excellent product in the ${category} category, crafted for style and premium utility.`);
      setTags(`${title.toLowerCase()}, ${category.toLowerCase()}, quality-${category.toLowerCase()}`);
      setMarketingCaption(`Discover the difference with ${title} — quality you can trust.`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category || !stock) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage("");
    setLoading(true);

    const parsedTags = tags
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const productData = {
      title,
      price: Number(price),
      category,
      stock: Number(stock),
      description,
      tags: parsedTags,
      marketingCaption,
    };

    try {
      if (editingProduct) {
        // Edit flow
        const prodId = editingProduct._id || editingProduct.id;
        await API.put(`/products/${prodId}`, productData);
        setEditingProduct(null);
      } else {
        // Add flow
        await API.post("/products", productData);
      }
      clearForm();
      onSave(); // Reload products catalog in parent
    } catch (err: any) {
      console.error("Submit product error:", err);
      setErrorMessage(err.response?.data?.message || "Failed to save product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="bg-red-50 text-red-600 text-xs px-5 py-3 rounded-xl border border-red-100">
          {errorMessage}
        </div>
      )}

      {/* Basic product fields */}
      <div className="space-y-5">
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
            Product Title
          </label>
          <input
            type="text"
            placeholder="e.g. Wireless Headphone MX"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
          />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Price (₹)
            </label>
            <input
              type="number"
              placeholder="999"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
            />
          </div>
          <div>
            <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
              Stock Quantity
            </label>
            <input
              type="number"
              placeholder="50"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
            />
          </div>
        </div>

        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Electronics"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
          />
        </div>
      </div>

      {/* Divider with AI Prompt Trigger */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          AI Generated Assets
        </span>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={isGeneratingAI || !title || !category}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:bg-slate-100 disabled:text-slate-400 px-3 py-1.5 rounded-lg transition-all"
        >
          {isGeneratingAI ? (
            <>
              <div className="w-3 h-3 rounded-full border-2 border-indigo-600/30 border-t-indigo-600 animate-spin" />
              Writing...
            </>
          ) : (
            <>✨ Write with AI</>
          )}
        </button>
      </div>

      {/* AI Fields */}
      <div className="space-y-5">
        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
            Description
          </label>
          <textarea
            placeholder="AI description details will show here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800 resize-none"
          />
        </div>

        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
            SEO Keywords (Comma Separated)
          </label>
          <input
            type="text"
            placeholder="headphones, wireless, audio"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
          />
        </div>

        <div>
          <label className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2 block">
            Marketing Caption / Slogan
          </label>
          <input
            type="text"
            placeholder="Catchy tagline for banners..."
            value={marketingCaption}
            onChange={(e) => setMarketingCaption(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-5 py-3 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-400 transition-all text-sm text-slate-800"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl text-white font-semibold transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-75 disabled:cursor-not-allowed"
        style={{
          background: "linear-gradient(135deg, #6366f1, #7c3aed)",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Saving...
          </div>
        ) : editingProduct ? (
          "Save Product Changes"
        ) : (
          "Add Product to Store"
        )}
      </button>
    </form>
  );
}

export default ProductForm;