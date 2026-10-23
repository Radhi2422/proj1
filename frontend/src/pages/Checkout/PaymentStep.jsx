import React from "react";

const PaymentStep = ({
  paymentMethod,
  onPaymentMethodChange,
  quote,
  onBack,
  onPlaceOrder,
  loading,
}) => {
  return (
    <section className="checkout-section">

      <h2>Payment</h2>

      <div className="payment-options">

        <label className="payment-option">

          <input
            type="radio"
            name="paymentMethod"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={onPaymentMethodChange}
          />

          <div>
            <strong>Cash on Delivery</strong>

            <p>
              Pay when your order is delivered.
            </p>
          </div>

        </label>

        <label className="payment-option">

          <input
            type="radio"
            name="paymentMethod"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={onPaymentMethodChange}
          />

          <div>
            <strong>UPI</strong>

            <p>
              Pay using Google Pay, PhonePe, Paytm, etc.
            </p>
          </div>

        </label>

        <label className="payment-option">

          <input
            type="radio"
            name="paymentMethod"
            value="CARD"
            checked={paymentMethod === "CARD"}
            onChange={onPaymentMethodChange}
          />

          <div>
            <strong>Credit / Debit Card</strong>

            <p>
              Pay securely using your card.
            </p>
          </div>

        </label>

      </div>

      {/* Amount */}

      <div className="payment-total">

        <span>Amount to Pay</span>

        <strong>
          ₹{quote.pricing.total}
        </strong>

      </div>

      {/* Buttons */}

      <div className="checkout-actions">

        <button
          type="button"
          onClick={onBack}
          className="secondary-button"
          disabled={loading}
        >
          Back
        </button>

        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : paymentMethod === "COD"
              ? "Place Order"
              : `Pay ₹${quote.pricing.total}`}
        </button>

      </div>

    </section>
  );
};

export default PaymentStep;