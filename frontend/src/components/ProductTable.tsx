const products = [
  {
    id: 1,
    title: "Wireless Mouse",
    price: 999,
    category: "Electronics",
    stock: 20,
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 2999,
    category: "Wearables",
    stock: 15,
  },
];

function ProductTable() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-bold mb-4">
        Product List
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b">

            <th className="py-3">Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>

          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b"
            >

              <td className="py-3">
                {product.title}
              </td>

              <td>
                ₹{product.price}
              </td>

              <td>
                {product.category}
              </td>

              <td>
                {product.stock}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;