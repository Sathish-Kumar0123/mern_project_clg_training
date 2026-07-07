import { useEffect, useState } from "react";
import { createOrder, updateOrder } from "../services/order.service";
import { getUsers } from "../services/user.service";
import { getProducts } from "../services/product.service";

const initialState = {
  user: "",
  product: "",
  quantity: "",
};

export default function OrderForm({
  selectedOrder,
  setSelectedOrder,
  fetchOrders,
}) {
  const [formData, setFormData] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  async function fetchUsersAndProducts() {
    try {
      const userResponse = await getUsers();
      const productResponse = await getProducts();

      const userList = Array.isArray(userResponse.data)
        ? userResponse.data
        : userResponse.data.data;

      const productList = Array.isArray(productResponse.data)
        ? productResponse.data
        : productResponse.data.data;

      setUsers(userList || []);
      setProducts(productList || []);
    } catch (error) {
      console.log("GET USERS OR PRODUCTS ERROR:", error.message);
    }
  }

  useEffect(() => {
    fetchUsersAndProducts();
  }, []);

  useEffect(() => {
    if (selectedOrder) {
      setFormData({
        user: selectedOrder.user?._id || selectedOrder.user || "",
        product:
          selectedOrder.products?.[0]?.product?._id ||
          selectedOrder.products?.[0]?.product ||
          "",
        quantity: selectedOrder.products?.[0]?.quantity || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [selectedOrder]);

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
      const orderData = {
        user: formData.user,
        products: [
          {
            product: formData.product,
            quantity: Number(formData.quantity),
          },
        ],
      };

      if (selectedOrder) {
        await updateOrder(selectedOrder._id, orderData);
      } else {
        await createOrder(orderData);
      }

      await fetchOrders();

      setFormData(initialState);
      setSelectedOrder(null);
    } catch (error) {
      console.log("SAVE ORDER ERROR:", error.message);
    }
  }

  function handleCancel() {
    setFormData(initialState);
    setSelectedOrder(null);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 shadow-xl rounded-3xl p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              {selectedOrder ? "✏️ Update Order" : "🛒 Create Order"}
            </h2>
            <p className="text-gray-500 mt-2">
              Fill in the order details below.
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              selectedOrder
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {selectedOrder ? "Editing" : "New Order"}
          </span>
        </div>

        {/* Form Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* User */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Customer
            </label>

            <select
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose Customer</option>

              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Product
            </label>

            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              <option value="">Choose Product</option>

              {products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.name} (₹{product.price})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quantity */}
        <div className="mt-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Quantity
          </label>

          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            min="1"
            required
            placeholder="Enter quantity"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Preview */}
        {formData.product && formData.quantity && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-5">
            <h3 className="font-bold text-blue-700 mb-2">
              📋 Order Preview
            </h3>

            <div className="grid grid-cols-2 gap-3 text-gray-700">
              <p>
                <span className="font-semibold">Customer:</span>{" "}
                {users.find((u) => u._id === formData.user)?.name || "-"}
              </p>

              <p>
                <span className="font-semibold">Product:</span>{" "}
                {products.find((p) => p._id === formData.product)?.name || "-"}
              </p>

              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {formData.quantity}
              </p>

              <p>
                <span className="font-semibold">Price:</span> ₹
                {products.find((p) => p._id === formData.product)?.price || 0}
              </p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105"
          >
            {selectedOrder ? "Update Order" : "Create Order"}
          </button>

          {selectedOrder && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
