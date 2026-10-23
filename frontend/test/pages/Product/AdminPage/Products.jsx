import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function ProductMainPage() {
  const navigate = useNavigate();

  return (
    <div className="product-page">
      <div className="overlay"></div>

      <div className="product-card">
        <div className="icon">🛍️</div>

        <h1>Product Management</h1>

        <p>
          Manage your inventory effortlessly. Add new products, view existing
          records, edit product details, or remove products whenever required.
        </p>

        <div className="button-grid">
          <button
            className="action-btn add"
            onClick={() => navigate("/products/add-product")}
          >
            ➕ Add Product
          </button>

          <button
            className="action-btn view"
            onClick={() => navigate("/products/view")}
          >
            👀 View Products
          </button>

          {/* <button
            className="action-btn edit"
            onClick={() => navigate("/products/edit")}
          >
            ✏️ Edit Product
          </button>

          <button
            className="action-btn delete"
            onClick={() => navigate("/products/delete")}
          >
            🗑 Delete Product
          </button> */}
        </div>
      </div>
    </div>
  );
}