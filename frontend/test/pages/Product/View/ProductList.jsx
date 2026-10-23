import  { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css";
import { logFrontendError } from "../../../utils/errorLogger";
//get product service to be built so that it can be used at multiple places
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getProducts();
  });

  const getProducts = async () => {
    try {
      const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
      const token = localStorage.getItem("token");
      console.log("Reached here")
      const res = await axios.get(`${VITE_BASE_URL}/products/view/a`,
        {
          params:{
            page,
            limit
          },
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
              // console.log("Reached here also")

      setProducts(res.data.products);
      // console.log(res);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      logFrontendError(err, { component: "ProductList", method: "fetchProducts" });
    }
  };

  return (
    <div className="product-container">

      <div className="product-card">

        <h1>📦 Products Available in the Database</h1>

        <p className="count">
          Total Products : <span>{products.count}</span>
        </p>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.count === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No Products Available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>₹ {product.price}</td>
                  <td>{product.quantityInStock}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
        <button disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>Previous</button>
        <button disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)} > Next </button>
      </div>
      

    </div>
  );
};

export default ProductList;