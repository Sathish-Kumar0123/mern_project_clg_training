import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../services/product.service";

const initialState = {
  name: "",
  idx: "",
  price: "",
};

export default function ProductForm({
  selectedProduct,
  setSelectedProduct,
  fetchProducts,
}) {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        idx: selectedProduct.idx || "",
        price: selectedProduct.price || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedProduct]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const productData = {
        name: formData.name,
        idx: Number(formData.idx),
        price: Number(formData.price),
      };

      if (selectedProduct) {
        await updateProduct(selectedProduct._id, productData);
      } else {
        await createProduct(productData);
      }

      await fetchProducts();

      setFormData(initialState);
      setSelectedProduct(null);
    } catch (error) {
      console.log("SAVE PRODUCT ERROR:", error.message);
    }
  }

  function handleCancel() {
    setFormData(initialState);
    setSelectedProduct(null);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow mb-5"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedProduct ? "product update cheyyu" : "product add cheyyu"}
      </h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Product Idx</label>
        <input
          type="number"
          name="idx"
          value={formData.idx}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Price</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          {selectedProduct ? "Update Product" : "Create Product"}
        </button>

        {selectedProduct && (
          <button
            type="button"
            onClick={handleCancel}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}