type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
};

type Props = {
  products: Product[];
};

function ProductTable({ products }: Props) {
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