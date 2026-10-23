// import { useNavigate } from "react-router-dom"



export const handleLogout = () => {
// const navigate=useNavigate();
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log("Yes");
    // Redirect to login
    // navigate("/login", { replace: true });
  };