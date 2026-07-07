import { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import OrderForm from "../components/OrderForm";
import { getOrders, deleteOrder } from "../services/order.service";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function fetchOrders() {
    try {
      const response = await getOrders();

      console.log("FULL ORDER RESPONSE:", response.data);

      const orderList = Array.isArray(response.data)
        ? response.data
        : response.data.data;

      setOrders(orderList || []);
    } catch (error) {
      console.log("GET ORDERS ERROR:", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteOrder(id);
      await fetchOrders();

      if (selectedOrder?._id === id) {
        setSelectedOrder(null);
      }
    } catch (error) {
      console.log("DELETE ORDER ERROR:", error.message);
    }
  }

  function handleEdit(order) {
    setSelectedOrder(order);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                📦 Orders Management
              </h1>

              <p className="text-gray-500 mt-2">
                Create, update and manage customer orders.
              </p>
            </div>

            <div className="mt-5 md:mt-0 bg-blue-100 text-blue-700 px-6 py-4 rounded-2xl text-center shadow">
              <p className="text-sm font-semibold">
                Total Orders
              </p>

              <h2 className="text-3xl font-bold">
                {orders.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Order Form */}
        <OrderForm
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          fetchOrders={fetchOrders}
        />

        {/* Orders List */}
        <div className="mt-10 bg-white rounded-3xl shadow-xl border border-gray-200 p-8">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              📋 Orders List
            </h2>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="py-20 text-center">
              <div className="text-7xl mb-5">📭</div>

              <h3 className="text-2xl font-bold text-gray-700">
                No Orders Found
              </h3>

              <p className="text-gray-500 mt-2">
                Create your first order using the form above.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <OrderCard
                  key={order._id}
                  data={order}
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
