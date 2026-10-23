import  { useEffect, useState } from "react";

import axios from "axios";

import { logFrontendError } from "../../utils/errorLogger";
import AddressStep from "./AddressStep";
import ReviewStep from "./ReviewStep";
import PaymentStep from "./PaymentStep";
import ConfirmationStep from "./ConfirmationStep";

import "./Checkout.css";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

const Checkout = () => {

  const [step, setStep] = useState(1);

  const [cart, setCart] = useState([]);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: ""
  });

  const [quote, setQuote] = useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("COD");

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ------------------------------------------
  // Load Cart
  // ------------------------------------------

  useEffect(() => {
    getCartItemsFromDb();

  }, []);
  
 const getCartItemsFromDb =async()=>{
    try{
    const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
    const user_Id=localStorage.getItem("userObjectId");
      const token = localStorage.getItem("token");
      const carts = await axios.get(`${VITE_BASE_URL}/products/cart`,
        {
          headers: {
              Authorization: `Bearer ${token}`,
              user_Id:user_Id
          }
        }
      );
      console.log("carts",carts);
      //cart to be added to redux store
      
      setCart(carts.data.CartData);
    }catch(err){
      logFrontendError(err, { component: "Cart", method: "getCartItemsFromDb" });
  }
}

  // ------------------------------------------
  // Address Change
  // ------------------------------------------

  const handleAddressChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setAddress((previous) => ({
      ...previous,
      [name]: value,
    }));

  };

  // ------------------------------------------
  // Validate Address
  // ------------------------------------------

  const validateAddress = () => {

    if (!address.name.trim()) {
      setError("Please enter your name");
      return false;
    }

    if (!address.phone.trim()) {
      setError("Please enter your phone number");
      return false;
    }

    if (!address.addressLine.trim()) {
      setError("Please enter your address");
      return false;
    }

    if (!address.city.trim()) {
      setError("Please enter your city");
      return false;
    }

    if (!address.state.trim()) {
      setError("Please enter your state");
      return false;
    }

    if (!address.pincode.trim()) {
      setError("Please enter your pincode");
      return false;
    }
    if (!address.country.trim()) {
      setError("Please enter your pincode");
      return false;
    }

    setError("");

    return true;
  };

  // ------------------------------------------
  // Create Quote
  // ------------------------------------------

  const createQuote = async () => {

    try {

      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");
        console.log(cart);

      const response = await fetch(
        `${VITE_BASE_URL}/orders/quote`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            items: cart.map((item) => ({
              productId: item.item_id,
              quantity: item.qty,
            })),

            address,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to create quote"
        );
      }

      setQuote(data);

      setStep(2);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  // ------------------------------------------
  // Address Continue
  // ------------------------------------------

  const handleAddressContinue = async () => {

    if (!validateAddress()) {
      return;
    }

    await createQuote();
  };

  // ------------------------------------------
  // Place Order
  // ------------------------------------------

  const placeOrder = async () => {

    try {

      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(quote);

      const response = await fetch(
        `${VITE_BASE_URL}/orders/placeorder`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
              
            userId:userId,
          },

          body: JSON.stringify({
            quoteId: quote.quoteId,
            address,
            userId,
            paymentMethod,
            items:quote.items
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
          "Unable to place order"
        );
      }

      setOrder(data);

      setStep(4);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  // ------------------------------------------
  // Empty Cart
  // ------------------------------------------

  if (
    !loading &&
    cart.length === 0 &&
    !order
  ) {

    return (
      <div className="checkout">

        <h2>
          Your cart is empty
        </h2>

      </div>
    );
  }

  // ------------------------------------------
  // UI
  // ------------------------------------------

  return (

    <div className="checkout">

      {/* Progress */}

      <div className="checkout-steps">

        <span
          className={
            step >= 1 ? "active" : ""
          }
        >
          1. Address
        </span>

        <span
          className={
            step >= 2 ? "active" : ""
          }
        >
          2. Review
        </span>

        <span
          className={
            step >= 3 ? "active" : ""
          }
        >
          3. Payment
        </span>

        <span
          className={
            step >= 4 ? "active" : ""
          }
        >
          4. Confirmation
        </span>

      </div>

      {/* Global Error */}

      {error && step !== 1 && (
        <div className="checkout-error">
          {error}
        </div>
      )}

      {/* -------------------------------- */}
      {/* Step 1 */}
      {/* -------------------------------- */}

      {step === 1 && (

        <AddressStep
          address={address}
          onAddressChange={
            handleAddressChange
          }
          onContinue={
            handleAddressContinue
          }
          loading={loading}
          error={error}
        />

      )}

      {/* -------------------------------- */}
      {/* Step 2 */}
      {/* -------------------------------- */}

      {step === 2 && quote && (

        <ReviewStep
          address={address}
          quote={quote}
          onBack={() => {
            setError("");
            setStep(1);
          }}
          onContinue={() => {
            setError("");
            setStep(3);
          }}
        />

      )}

      {/* -------------------------------- */}
      {/* Step 3 */}
      {/* -------------------------------- */}

      {step === 3 && quote && (

        <PaymentStep
          paymentMethod={paymentMethod}
          onPaymentMethodChange={(event) =>
            setPaymentMethod(
              event.target.value
            )
          }
          quote={quote}
          onBack={() => {
            setError("");
            setStep(2);
          }}
          onPlaceOrder={placeOrder}
          loading={loading}
        />

      )}

      {/* -------------------------------- */}
      {/* Step 4 */}
      {/* -------------------------------- */}

      {step === 4 && order && (

        <ConfirmationStep
          order={order}
          onViewOrder={() => {
            window.location.href =
              "/orders";
          }}
          onContinueShopping={() => {
            window.location.href =
              "/products";
          }}
        />

      )}

    </div>

  );
};

export default Checkout;