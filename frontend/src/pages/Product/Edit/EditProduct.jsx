import  { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditProduct.css";
import { logFrontendError } from "../../../utils/errorLogger";

const EditProduct = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
  });

  useEffect(() => {
    fetchProduct();
  });

  const fetchProduct = async () => {
    try {
      const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
      
      const res = await axios.get(
        `${VITE_BASE_URL}/api/products/update/${name}`
      );

      setProduct(res.data);
    } catch (err) {
      logFrontendError(err, { component: "ProductList", method: "fetchProducts" });
    }
  };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const REACT_APP_BASE_URL=import.meta.env.REACT_APP_BASE_URL
      
      await axios.put(
        `${REACT_APP_BASE_URL}/api/products/update/${name}`,
        product
      );

      alert("Product Updated Successfully!");

      navigate("/products");
    } catch (err) {
      logFrontendError(err, { component: "ProductList", method: "fetchProducts" });
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-card">

        <h1>Edit Product</h1>
        <p>Modify product information below.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Description</label>
            <textarea
              rows="4"
              name="description"
              value={product.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit">
            Update Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditProduct;