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
    <div className="bg-gray-200 flex justify-center items-start p-10 font-mono">
      <div className="bg-gray-100 w-full max-w-xl p-5 rounded-lg shadow-lg">
        <h1 className="text-center underline text-2xl font-bold mb-5">
          Products List
        </h1>

        <ProductForm
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          fetchProducts={fetchProducts}
        />

        <div className="pt-5">
          {products.length === 0 ? (
            <p className="text-center text-gray-500">No products found</p>
          ) : (
            products.map((product) => (
              <ProductCard
                key={product._id}
                data={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}