import { useEffect, useState } from "react";
import axios from "axios";
import "./OrderDetails.css";
import { logFrontendError } from "../../../utils/errorLogger";

export default function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${VITE_BASE_URL}/orders/view`,{
        headers: {
            Authorization: `Bearer ${token}`
        }}
      );

      setOrders(res.data.orderData);
    } catch (err) {
      logFrontendError(err, {
                        component: "ProductList",
                        method: "fetchProducts"
                    });
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "delivered";
      case "pending":
        return "pending";
      case "cancelled":
        return "cancelled";
      case "shipped":
        return "shipped";
      default:
        return "default";
    }
  };

  return (
    <div className="orders-page">

      <div className="orders-header">
        <h1>My Orders</h1>
        <p>
          Track all your purchases and monitor their current status.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>Your placed orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-container">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              <div className="order-top">
                <div>
                  <h3>{order.productName}</h3>
                  <p className="customer">
                    Ordered By : {order.customerName}
                  </p>
                </div>

                <span
                  className={`status ${getStatusClass(order.status)}`}
                >
                  {order.status}
                </span>
              </div>

              <hr />

              <div className="order-details">

                <div>
                  <span>Quantity</span>
                  <h4>{order.quantity}</h4>
                </div>

                <div>
                  <span>Total Amount</span>
                  <h4>₹{order.totalAmount}</h4>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}