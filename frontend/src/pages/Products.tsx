import MainLayout from "../layouts/MainLayout";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

function Products() {
  return (
    <MainLayout>

      <Navbar />

      <ProductForm />

      <ProductTable />

    </MainLayout>
  );
}

export default Products;