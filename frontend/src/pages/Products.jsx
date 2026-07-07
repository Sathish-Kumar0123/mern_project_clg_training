import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { getProducts, deleteProduct } from "../services/product.service";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function fetchProducts() {
    try {
      const response = await getProducts();

      console.log("PRODUCT RESPONSE:", response.data);

      const productList = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setProducts(productList || []);
    } catch (error) {
      console.log("GET PRODUCTS ERROR:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteProduct(id);
      await fetchProducts();

      if (selectedProduct?._id === id) {
        setSelectedProduct(null);
      }
    } catch (error) {
      console.log("DELETE PRODUCT ERROR:", error.message);
    }
  }

  function handleEdit(product) {
    setSelectedProduct(product);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                📦 Product Management
              </h1>

              <p className="text-gray-500 mt-2">
                Add, edit and manage your products with ease.
              </p>
            </div>

            <div className="mt-5 md:mt-0 bg-indigo-100 text-indigo-700 px-6 py-4 rounded-2xl shadow text-center">
              <p className="text-sm font-semibold">
                Total Products
              </p>

              <h2 className="text-3xl font-bold">
                {products.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Product Form */}
        <ProductForm
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          fetchProducts={fetchProducts}
        />

        {/* Products List */}
        <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              🛍 Products List
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {products.length} Products
            </span>
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-7xl mb-4">
                📭
              </div>

              <h3 className="text-2xl font-bold text-gray-700">
                No Products Found
              </h3>

              <p className="text-gray-500 mt-2">
                Start by adding your first product above.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  data={product}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
