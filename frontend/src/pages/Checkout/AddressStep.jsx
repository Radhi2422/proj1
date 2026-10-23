import React from "react";

const AddressStep = ({
  address,
  onAddressChange,
  onContinue,
  loading,
  error,
}) => {
  return (
    <section className="checkout-section">
      <h2>Delivery Address</h2>

      {error && (
        <div className="checkout-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label>Full Name</label>

        <input
          type="text"
          name="name"
          value={address.name}
          onChange={onAddressChange}
          placeholder="Enter your full name"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>

        <input
          type="text"
          name="phone"
          value={address.phone}
          onChange={onAddressChange}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="form-group">
        <label>Address</label>

        <textarea
          name="addressLine"
          value={address.addressLine}
          onChange={onAddressChange}
          placeholder="House number, street, area"
        />
      </div>

      <div className="form-row">

        <div className="form-group">
          <label>City</label>

          <input
            type="text"
            name="city"
            value={address.city}
            onChange={onAddressChange}
            placeholder="City"
          />
        </div>

        <div className="form-group">
          <label>State</label>

          <input
            type="text"
            name="state"
            value={address.state}
            onChange={onAddressChange}
            placeholder="State"
          />
        </div>

      </div>

      <div className="form-group">
        <label>Pincode</label>

        <input
          type="text"
          name="pincode"
          value={address.pincode}
          onChange={onAddressChange}
          placeholder="6-digit pincode"
        />
      </div>

      <div className="form-group">
        <label>Country</label>

        <input
          type="text"
          name="country"
          value={address.country}
          onChange={onAddressChange}
          placeholder="Country Name"
        />
      </div>
      <button
        type="button"
        onClick={onContinue}
        disabled={loading}
      >
        {loading ? "Checking..." : "Continue"}
      </button>
    </section>
  );
};

export default AddressStep;