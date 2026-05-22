import type { Product } from "../types/product";
type Props = {
  products: Product[];
  setProducts: React.Dispatch<
    React.SetStateAction<Product[]>
  >;
  setEditingProduct: React.Dispatch<
    React.SetStateAction<Product | null>
  >;
};

function ProductTable({
  products,
  setProducts,
  setEditingProduct,
}: Props) {

  const handleDelete = (id: number) => {

    const updatedProducts = products.filter(
      (product) => product.id !== id
    );

    setProducts(updatedProducts);
  };

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
            <th>Actions</th>

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

              <td className="flex gap-2 py-2">

                <button
                  onClick={() =>
                    setEditingProduct(product)
                  }
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(product.id)
                  }
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;