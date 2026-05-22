import MainLayout from "../layouts/MainLayout";

import Navbar from "../components/Navbar";

function Products() {

  const products = [
    {
      name: "Wireless Headphones",
      sku: "AUD-99-PRO",
      category: "Electronics",
      price: "₹12,999",
      stock: 42,
      status: "Optimized",
    },

    {
      name: "Smart Watch",
      sku: "ACC-WATCH-02",
      category: "Accessories",
      price: "₹8,499",
      stock: 8,
      status: "Low Stock",
    },

    {
      name: "Bluetooth Speaker",
      sku: "AUD-LS-WAVE",
      category: "Electronics",
      price: "₹5,999",
      stock: 156,
      status: "Analyzing",
    },
  ];

  return (

    <MainLayout>

      <Navbar />

      <main className="p-10">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-4xl font-bold text-slate-800 mb-2">
              Product Inventory
            </h2>

            <p className="text-slate-500">
              Manage all ecommerce products
            </p>

          </div>

          <button className="bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">

            + Add Product

          </button>

        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50 border-b border-slate-200">

                <tr className="text-left">

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    Product
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    SKU
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    Category
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    Price
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    Stock
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase">
                    AI Status
                  </th>

                  <th className="px-6 py-4 text-sm text-slate-500 uppercase text-right">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map((product, index) => (

                  <tr
                    key={index}
                    className="border-b border-slate-100 hover:bg-slate-50 transition"
                  >

                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {product.name}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {product.sku}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {product.category}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {product.price}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`font-semibold ${
                          product.stock < 10
                            ? "text-red-600"
                            : "text-slate-700"
                        }`}
                      >
                        {product.stock}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          product.status === "Optimized"
                            ? "bg-green-100 text-green-700"
                            : product.status === "Low Stock"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >

                        {product.status}

                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-3">

                        <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition">

                          Edit

                        </button>

                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition">

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </MainLayout>

  );
}

export default Products;