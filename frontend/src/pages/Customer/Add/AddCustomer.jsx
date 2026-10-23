import { useState } from "react";
import "../../Product/Add/AddProduct.css";
import useAdd from "../../../hooks/useAdd";

export default function AddCustomer() {
  const initialState = {
    name: "",
    email: "",
    Address: "",
    ContactNumber: "",
  };

  const [formData, setFormData] = useState(initialState);

  const { add } = useAdd();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add({
      endpoint: "/customers/add-customer",
      data: formData,
      successMessage: "Customer Added Successfully!",
      errorMessage: "Failed to add customer",
      resetForm: () => setFormData(initialState),
    });
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <div className="form-header">
          <h1>Add New Customer</h1>
          <p>
            Store customer information and
            manage customer records efficiently.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="product-form"
        >
          <label>Customer Name</label>
          <input
            type="text"
            placeholder="Enter Customer Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <label>Address</label>
          <input
            type="text"
            placeholder="Enter Address"
            value={formData.Address}
            onChange={(e) =>
              setFormData({
                ...formData,
                Address: e.target.value,
              })
            }
          />

          <label>Contact Number</label>
          <input
            type="number"
            placeholder="Enter Contact Number"
            value={formData.ContactNumber}
            onChange={(e) =>
              setFormData({
                ...formData,
                ContactNumber: e.target.value,
              })
            }
          />

          <button
            type="submit"
            className="submit-btn"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
}