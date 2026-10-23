import { useState } from "react";
import api from "../services/api";

const SearchProducts = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        `/products/search?name=${search}`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Search response:", response.data);
      setProducts(response.data.data);
    } catch (error) {
      alert("Search failed. Please try again.");
      console.error("Search failed:", error);
    }
  };

  return (
    <>
      <section className="search-section">
        <h2>Search Products</h2>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>

      <section className="products">
        {products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </section>
    </>
  );
};

export default SearchProducts;
