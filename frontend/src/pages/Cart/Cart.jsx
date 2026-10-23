import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./Cart.css";
import {logFrontendError} from "../../utils/errorLogger";
import {getCartItemsFromDb} from "../../utils/common";
const initialCart = []

function Cart() {
  const [cart, setCart] = useState(initialCart);
  const [finalAmount,setFinalAmount]=useState(0);
  const navigate=useNavigate();


  const [stats, setStats] = useState({
    productTotal:0,
    discountPercent:0, 
    discountAmount:0, 
    itemFinalTotal:0,
    shippingCharges:0
  });
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const data = await getCartItemsFromDb();

      console.log("Cart data:", data);

      setCart(data.data.CartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  fetchCart();
}, []);
  useEffect(()=>{
    getRightData();
  },[cart])
  
  


  /************************************************************** */
// Update Quantity
//backend call needs to be made
  const increaseQty = (id) => {
    setCart((prevItems)=>
       prevItems.map((item) => {

      if (item.id !== id) {
        return item;
      }

      // Don't allow quantity above available stock
      if (item.qty >= item.availableStock) {
        return item;
      }

      return {
        ...item,
        qty: item.qty + 1
      };
    })
    );
  };
  const decreaseQty = (id) => {
  setCart((prevItems) =>
    prevItems.map((item) => {

      if (item.id !== id) {
        return item;
      }

      // Don't allow quantity below 1
      if (item.qty <= 1) {
        return item;
      }

      return {
        ...item,
        qty: item.qty - 1
      };
    })
  );
};

  /************************************************************** */
// Remove Product
//backend call needs to be made
const removeItem = (id) => {

  const confirmed = window.confirm(
    "Are you sure you want to remove this product from your cart?"
  );

  if (!confirmed) {
    return;
  }

  setCart((prevCart) =>
    prevCart.filter((item) => item.id !== id)
  );
};

  const getRightData=()=>{
    let productTotal=0,discountPercent=0, discountAmount=0, itemFinalTotal=0;
    console.log("Cart:",cart);
    cart.map((item)=>{
        productTotal += item.price * item.qty;
    // Example: discount percentage
    discountPercent += item.discount || 0;
    discountAmount +=(productTotal * discountPercent) / 100;
    itemFinalTotal = productTotal - discountAmount;
    })   
    setStats({
    productTotal:productTotal,
    discountPercent:discountPercent, 
    discountAmount:discountAmount, 
    itemFinalTotal:itemFinalTotal,
    shippingCharges:0
  }) 
  setFinalAmount(stats.productTotal)
  }
  
/************************************************************** */

// Empty Cart
// Display an appropriate message when the cart has no products.
// Provide a button to continue shopping.
// Continue Shopping
// Allow the user to return to the product listing.


/************************************************************** */

//   Proceed to Checkout
// Allow checkout only when the cart contains valid products.
// Redirect the user to the checkout page.
  //to be done correctly
  //automation to be added
  const handleCheckout = async() => {
    try{
      navigate("/checkout")
    //   const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

    //   const token = localStorage.getItem("token");
    //   const userId= localStorage.getItem("userId");
    //   const user_Id= localStorage.getItem("userObjectId");
    //   const response = await axios.post(`${VITE_BASE_URL}/products/checkout`, {
    //     cart,
    //     userId,
    //     user_Id
    // }, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   console.log(response);
    //   if(response==true){
    //     alert("Product added to cart successfully");
    //     }
    
    }catch(err){
        console.log(err)
    logFrontendError(err, { component: "ProductList", method: "handleCheckout" });
    }
  }


/************************************************************** */
//   Error/Loading States
// Show loading indicators while cart operations are running.
// Display meaningful errors when adding, updating, or removing products fails.
if (!cart || cart.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-icon">🛒</div>

        <h2>Your Cart is Empty</h2>

        <p>
          You don&apos;t have any products in your cart yet.
        </p>

        {/* Continue Shopping */}
        <button
          className="continue-shopping-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>
    );}
  return (
    <div className="cart-page">

      <div className="cart-left">
      {/************************************************************** 
        Cart Summary // Display: // Product total // Quantity // Discount, if applicable // Shipping charges // Tax // Final payable amount*/}
        <h2>Shopping Cart</h2>

        <div className="cart-items">

          {cart.map((item) => {           

            return (
              <div className="cart-item" key={item.id}>

                {/* Product Image */}
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.title}
                  />
                </div>

                {/* Product Details */}
                <div className="item-details">

                  <h3>{item.name}</h3>

                  {/* Unit Price
                  <p className="unit-price">
                    Price: ₹{item.price.toLocaleString()}
                  </p> */}

                  {/* Quantity */}
                  <div className="qty-section">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      disabled={item.qty <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>

                    <span>{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      disabled={item.qty >= item.availableStock}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>

                  </div>

                  {/* Remove */}
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>

                </div>

                {/* Item Price Breakdown */}
                {/* <div className="item-price-breakdown">

                  <div>
                    <span>Product Total</span>
                    <strong>
                      ₹{stats.productTotal}
                    </strong>
                  </div>

                  {stats.discountAmount > 0 && (
                    <div className="discount">
                      <span>Discount ({stats.discountPercent}%)</span>
                      <strong>
                        -₹{stats.discountAmount}
                      </strong>
                    </div>
                  )}

                  <div className="item-final">
                    <span>Item Total</span>
                    <strong>
                      ₹{stats.itemFinalTotal}
                    </strong>
                  </div>

                </div> */}

              </div>
            );
          })}

        </div>
      </div>

      <div className="cart-right">
        <div className="cart-summary">

          <h2>Cart Summary</h2>

          {/* Product Total */}
          <div className="summary-row">
            <span>Product Total</span>
            <span>
              ₹{stats.productTotal}
            </span>
          </div>

          {/* Quantity 
          <div className="summary-row">
            <span>Total Quantity</span>
            <span>{stats.totalQuantity}</span>
          </div>*/}

          {/* Discount*/}
          {stats.discountPercent > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>
                -₹{stats.discountPercent}
              </span>
            </div>
          )}

          {/* Shipping*/}
          <div className="summary-row">
            <span>Shipping Charges</span>
            <span>
              {stats.shippingCharges === 0
                ? "FREE"
                : `₹${stats.shippingCharges}`}
            </span>
          </div>

          {/* Tax 
          <div className="summary-row">
            <span>Tax</span>
            <span>
              ₹{stats.tax}
            </span>
          </div>
          */}
          <hr />

          {/* Final Amount */}
          <div className="summary-row final-total">
            <span>Final Payable Amount</span>
            <strong>
              ₹{finalAmount}
            </strong>
          </div>

          {/* Checkout */}
          <button className="checkout-btn" onClick={()=>handleCheckout()}>
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;