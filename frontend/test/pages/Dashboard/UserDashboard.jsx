import { FiShoppingCart, FiUser, FiLogOut, FiPackage } from "react-icons/fi";
import SearchProducts from "../../components/Search";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {handleLogout} from "../../utils/common"
import ProductCard from "../../components/Card";

import "./UserDashboard.css";
import  {logFrontendError} from "../../utils/errorLogger";

const UserDashboard = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);
    const getProducts= async()=>{
        try {
            const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
            console.log("VITE_BASE_URL:", VITE_BASE_URL);
            const token = localStorage.getItem("token");
      
            const products = await axios.get(`${VITE_BASE_URL}/products/view`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Reached",products);

            setProduct(products.data.products);
        } catch (error) {
        logFrontendError(error, {
            component: "User Dashboard fetching",
            method: "getProducts"
        });
    }
    }
    return (
    <div className="dashboard">

      {/* ================= NAVBAR ================= */}

      <nav className="navbar">

            <div className="logo">
                <span className="logo-icon">🛍️</span>
                <span className="logo-text">ShopEase</span>
            </div>

            <div className="nav-right">

                <button className="cart-btn" onClick={() => navigate("/cart")}>
                <FiShoppingCart />
                <span >Cart</span>
                <span className="cart-count">2</span>
                </button>

                <button className="order-btn" onClick={() => navigate("/orders")} >
                <FiPackage />
                <span>Orders</span>
                </button>

                <button className="profile-btn" onClick={() => navigate("/profile")}>
                <FiUser />
                <span>Profile</span>
                </button>

                <button className="logout-btn" onClick={() => {handleLogout();navigate("/")}}>
                <FiLogOut />
                <span >Logout</span>
                </button>

            </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero">

        <div className="hero-left">

          <h1>
            Discover Amazing Products
          </h1>

          <p>
            Shop thousands of products with the best quality and
            unbeatable prices.
          </p>

          <button className="shop-btn">
            Shop Now
          </button>

        </div>

        <div className="hero-right">
          📦
        </div>

      </section>

      {/* ================= SEARCH ================= */}

      <SearchProducts />
{/* console. */}
        <div>
            {/* cards */}
             <div className="product-container">
                {product.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
            ))}
    </div>
        </div>

    </div>
  );
}
export default UserDashboard;