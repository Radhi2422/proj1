import { useState } from "react";
import "./UserProductList.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 3,
    name: "Running Shoes",
    category: "Fashion",
    price: 2999,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Accessories",
    price: 1899,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
  },
  {
    id: 5,
    name: "Premium Sunglasses",
    category: "Accessories",
    price: 1499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
  },
  {
    id: 6,
    name: "Cotton Hoodie",
    category: "Fashion",
    price: 1799,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
  },
  {
    id: 7,
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 3299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
  },
  {
    id: 8,
    name: "Minimal Desk Lamp",
    category: "Home",
    price: 1299,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  },
];

function ProductPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Accessories", "Home"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Shop<span>Hub</span>
        </div>

        <div className="nav-links">
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-actions">
          <button className="cart-btn">
            🛒 Cart
          </button>

          <button className="profile-btn">
            👤
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div>
          <p className="hero-tag">NEW COLLECTION</p>

          <h1>
            Discover Products
            <br />
            You&apos;ll Love.
          </h1>

          <p className="hero-text">
            Explore our collection of premium products designed
            for your everyday lifestyle.
          </p>

          <button
            className="shop-btn"
            onClick={() =>
              document
                .getElementById("products")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Products →
          </button>
        </div>

        <div className="hero-decoration">
          <div className="circle"></div>
          <span>✦</span>
        </div>
      </section>

      {/* Products */}
      <main className="products-section" id="products">

        <div className="section-header">
          <div>
            <p className="section-label">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>

          <p className="product-count">
            {filteredProducts.length} Products
          </p>
        </div>

        {/* Search + Categories */}
        <div className="filters">

          <div className="search-box">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="categories" id="categories">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="product-grid">

          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div className="product-image">
                <img
                  src={`${product.image}?auto=format&fit=crop&w=600&q=80`}
                  alt={product.name}
                />

                <button className="wishlist">
                  ♡
                </button>
              </div>

              <div className="product-info">

                <p className="product-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="rating">
                  <span>★</span>
                  {product.rating}
                </div>

                <div className="product-bottom">

                  <div className="price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>

                  <button className="add-btn">
                    +
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <div>🔍</div>
            <h3>No products found</h3>
            <p>Try searching for something else.</p>
          </div>
        )}

      </main>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div>
          <p className="section-label">SHOP WITH CONFIDENCE</p>

          <h2>
            Quality products.
            <br />
            Simple shopping.
          </h2>

          <p>
            Carefully selected products delivered straight to your door.
          </p>
        </div>

        <button className="shop-btn light">
          Start Shopping →
        </button>
      </section>

      {/* Footer */}
      <footer id="contact">

        <div className="footer-main">

          <div className="footer-brand">
            <div className="logo">
              Shop<span>Hub</span>
            </div>

            <p>
              Your destination for quality products,
              modern design and simple shopping.
            </p>
          </div>

          <div>
            <h4>Shop</h4>
            <a href="#products">All Products</a>
            <a href="#categories">Categories</a>
            <a href="#products">New Arrivals</a>
            <a href="#products">Best Sellers</a>
          </div>

          <div id="about">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Support</a>
            <a href="#contact">Privacy</a>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="socials">
              <span>Instagram</span>
              <span>Twitter</span>
              <span>LinkedIn</span>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 ShopHub. All rights reserved.</span>
          <span>Made with ♥</span>
        </div>

      </footer>

    </div>
  );
}

export default ProductPage;
