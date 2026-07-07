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
    <div className="bg-gray-200 flex justify-center items-start p-10 font-mono">
      <div className="bg-gray-100 w-full max-w-xl p-5 rounded-lg shadow-lg">
        <h1 className="text-center underline text-2xl font-bold mb-5">
          Orders List
        </h1>

        <OrderForm
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          fetchOrders={fetchOrders}
        />

        <div className="pt-5">
          {orders.length === 0 ? (
            <p className="text-center text-gray-500">No orders found</p>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order._id}
                data={order}
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