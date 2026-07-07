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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-5 rounded-lg shadow mb-5"
    >
      <h2 className="text-xl font-bold mb-4">
        {selectedOrder ? "order update cheyyu" : "order add cheyyu"}
      </h2>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Select User</label>
        <select
          name="user"
          value={formData.user}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Select user</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-semibold">Select Product</label>
        <select
          name="product"
          value={formData.product}
          onChange={handleChange}
          className="border w-full p-2 rounded"
          required
        >
          <option value="">Select product</option>

          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} - ₹{product.price}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          
          className="border w-full p-2 rounded"
          min="1"
          required
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="border px-4 py-2 rounded hover:bg-gray-100"
        >
          {selectedOrder ? "Update Order" : "Create Order"}
        </button>

        {selectedOrder && (
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