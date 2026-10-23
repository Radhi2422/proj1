import React from "react";

const ReviewStep = ({
  address,
  quote,
  onBack,
  onContinue,
}) => {
  console.log("Quote",quote)
  return (
    <section className="checkout-section">

      <h2>Review Your Order</h2>

      {/* Address */}

      <div className="review-address">

        <h3>Delivery Address</h3>

        <p>
          <strong>{address.name}</strong>
        </p>

        <p>{address.phone}</p>

        <p>{address.addressLine}</p>

        <p>
          {address.city}, {address.state} -{" "}
          {address.pincode}
        </p>

      </div>

      {/* Order Summary */}

      <div className="order-summary">

        <h3>Order Summary</h3>

        <div className="summary-row">
          <span>Subtotal</span>
          <strong>₹{quote.pricing.subtotal}</strong>
        </div>

        <div className="summary-row">
          <span>Discount</span>
          <strong>-₹{quote.pricing.discount}</strong>
        </div>

        <div className="summary-row">
          <span>Tax</span>
          <strong>₹{quote.pricing.tax}</strong>
        </div>

        <div className="summary-row">
          <span>Shipping</span>
          <strong>₹{quote.pricing.shipping}</strong>
        </div>

        <hr />

        <div className="summary-row total">
          <span>Total</span>
          <strong>₹{quote.pricing.total}</strong>
        </div>

      </div>

      {/* Buttons */}

      <div className="checkout-actions">

        <button
          type="button"
          onClick={onBack}
          className="secondary-button"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onContinue}
        >
          Continue to Payment
        </button>

      </div>

    </section>
  );
};

export default ReviewStep;