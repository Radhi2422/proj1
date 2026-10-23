import "./Card.css";
import useAdd from "../hooks/useAdd";
import { logFrontendError } from "../utils/errorLogger"


const ProductCard = ({ product }) => {
    const user_Id=localStorage.getItem("userObjectId");
      const { add } = useAdd();
     const handleAddToCart =async (product) => {
        try{            
      const res=await add({
        endpoint: "/products/add-to-cart",
        data: {product:product,user_Id:user_Id,item_id:product._id},
        successMessage: "Added to cart!",
        errorMessage: "Failed to add to cart",
      });
      if(res==true){
        alert("Product added to cart successfully");
        }
    }catch(err){
        console.log(err)
        logFrontendError(err, { component: "ProductList", method: "fetchProducts" });
     }
    }
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-content">
        <h3 className="product-name">{product.price}</h3>

        <p className="product-description">
          {product.category}
        </p>

        <div className="product-actions">
          <button className="add-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>

          <button className="view-btn">
            View
          </button>
        </div>
      </div>
    </div>
  )
}
export default ProductCard;