import { useNavigate } from "react-router-dom";
import "./Customer.css";

export default function CustomerMainPage() {
  const navigate = useNavigate();

  return (
    <div className="customer-dashboard">

      <div className="dashboard-card">

        <h1>Customer Management</h1>

        <p>
          Welcome to the Customer Management Portal.
          Manage customer information efficiently by adding
          new customers or viewing existing customer records.
        </p>

        <div className="button-container">

          <button
            className="dashboard-btn add-btn"
            onClick={() => navigate("/customers/add-customer")}
          >
            ➕ Add Customer
          </button>

          <button
            className="dashboard-btn view-btn"
            onClick={() => navigate("/customers/view-customers")}
          >
            👀 View Customers
          </button>

        </div>

      </div>

    </div>
  );
}