import React from "react";

const ConfirmationStep = ({
  order,
  onViewOrder,
  onContinueShopping,
}) => {
  return (
    <section className="checkout-section confirmation">

      <div className="success-icon">
        ✓
      </div>

      <h2>
        Order Placed Successfully!
      </h2>

      <p>
        Thank you for your order.
      </p>

      <div className="confirmation-details">

        <div>
          <span>Order ID</span>

          <strong>
            {order.orderId || order.id}
          </strong>
        </div>

        <div>
          <span>Amount</span>

          <strong>
            ₹{order.total}
          </strong>
        </div>

        <div>
          <span>Payment Method</span>

          <strong>
            {order.paymentMethod}
          </strong>
        </div>

        <div>
          <span>Status</span>

          <strong>
            {order.status || "Confirmed"}
          </strong>
        </div>

      </div>

      <div className="checkout-actions">

        <button
          type="button"
          onClick={onViewOrder}
        >
          View Order
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>

      </div>

    </section>
  );
};

export default ConfirmationStep;