import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import {logFrontendError} from "../../utils/errorLogger";
import { Navigate } from "react-router-dom";

export function Dashboard1() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>
   <h1>Dashboard</h1>;
  
  </>
}


export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    customers: 0,
    orders: 0,
    lowStock: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
      console.log("VITE_BASE_URL:", VITE_BASE_URL);
      const token = localStorage.getItem("token");
      
      const products = await axios.get(`${VITE_BASE_URL}/products/view`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
      const customers = await axios.get(`${VITE_BASE_URL}/customers/view`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    
      const orders = await axios.get(`${VITE_BASE_URL}/orders/view`,{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

      setStats({
        products: products.data.count,
        customers: customers.data.count,
        orders: orders.data.count,
        lowStock:5
        // lowStock: products.data.filter(
        //   p => p.quantity < 5
        // ).length
      });
    } catch (error) {
     logFrontendError(error, {
        component: "ProductList",
        method: "fetchProducts"
    });
    }
  };

  return (
    <div className="dashboard">

      <div className="hero-banner">
        <h1>Inventory Management Dashboard</h1>
        <p>Manage Products, Customers and Orders</p>
      </div>

      <div className="card-container">

        <div className="dashboard-card">
          <h2>{stats.products}</h2>
          <p>Total Products</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats.customers}</h2>
          <p>Total Customers</p>
        </div>

        <div className="dashboard-card">
          <h2>{stats.orders}</h2>
          <p>Total Orders</p>
        </div>

        <div className="dashboard-card low-stock">
          <h2>{stats.lowStock}</h2>
          <p>Low Stock Products</p>
        </div>

      </div>

      <div className="sections">

        <div className="section-box"
        onClick={() => navigate("/products")}
      style={{ cursor: "pointer" }}
        >
          <h3>Products</h3>
          <p>Manage inventory and stock.</p>
        </div>

        <div className="section-box"
        onClick={() => navigate("/customers")}
      style={{ cursor: "pointer" }}>
          <h3>Customers</h3>
          <p>Manage customer information.</p>
        </div>

        <div className="section-box"
        onClick={() => navigate("/orders/view")}
      style={{ cursor: "pointer" }}>
          <h3>Orders</h3>
          <p>Track and manage orders.</p>
        </div>

      </div>

    </div>
  );
}