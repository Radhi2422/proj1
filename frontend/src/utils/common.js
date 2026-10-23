
import axios from "axios"
import {logFrontendError} from "./errorLogger";

export const handleLogout = () => {
// const navigate=useNavigate();
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Yes");
    // Redirect to login
    // navigate("/login", { replace: true });
  };

 
 export const getCartItemsFromDb =async()=>{
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
      return carts;
      //cart to be added to redux store
      
      // setCart(carts.data.CartData);
    }catch(err){
      logFrontendError(err, { component: "Cart", method: "getCartItemsFromDb" });
  }
}