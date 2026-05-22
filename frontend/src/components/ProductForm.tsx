function ProductForm() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow mb-6">

      <h2 className="text-2xl font-bold mb-4">
        Add Product
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Product Name"
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-3 rounded-lg"
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-3 rounded-lg"
        />

        <textarea
          placeholder="Description"
          className="border p-3 rounded-lg md:col-span-2"
        />

        <button
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          Add Product
        </button>

      </form>

    </div>
  );
}

export default ProductForm;