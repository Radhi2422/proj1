import  { useState } from "react";
import axios from "axios";
import {logFrontendError}  from "../../utils/errorLogger"
import "./Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
  };

  const handlePlaceOrder =async (e) => {
try {

    e.preventDefault();

    const orderData = {
      orderDetails:{
        orderId: Date.now().toString(),
      },
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      totalAmount: getTotal(),
    };

    // console.log("Order Data:", orderData);

    // Later:
    // axios.post("http://localhost:8000/api/orders/checkout", orderData)
      const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

      const token = localStorage.getItem("token");

      await axios.post(
        `${VITE_BASE_URL}/orders/checkout`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setCustomers(res.data.customerData);

      // logInfo("Customer list fetched successfully", res.data.customerData);
    } catch (err) {
      logFrontendError(err, {
        component: "ProductList",
        method: "fetchProducts"
    });
    }

  };

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <h2>Checkout</h2>

        <form onSubmit={handlePlaceOrder}>
          <section className="checkout-section">
            <h3>Customer Details</h3>

            <div className="input-row">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <section className="checkout-section">
            <h3>Shipping Address</h3>

            <div className="input-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>PIN Code</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          <section className="checkout-section">
            <h3>Payment Method</h3>

            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={formData.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={formData.paymentMethod === "CARD"}
                  onChange={handleChange}
                />
                Card
              </label>

              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={formData.paymentMethod === "UPI"}
                  onChange={handleChange}
                />
                UPI
              </label>
            </div>
          </section>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      </div>

      <div className="checkout-right">
        <div className="order-summary">
          <h3>Order Summary</h3>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div className="summary-item" key={item.id}>
                  <div>
                    <p>{item.title}</p>
                    <span>
                      ₹{item.price.toLocaleString()} × {item.qty}
                    </span>
                  </div>

                  <strong>
                    ₹{(item.price * item.qty).toLocaleString()}
                  </strong>
                </div>
              ))}

              <div className="summary-divider"></div>

              <div className="summary-total">
                <span>Total</span>
                <strong>₹{getTotal().toLocaleString()}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;