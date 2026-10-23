import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { registerUser } from "../../services/authService";
// import useLogger from "../../hooks/useLogger";
// import useErrorHandler from "../../hooks/useErrorHandler";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    password: "",
    confirmPassword: "",
  });

  // const { logInfo, logError } = useLogger();
  // const { handleError } = useErrorHandler();

  // const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    // setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      // const errorMessage = handleError(err);
// 
      // logError("Failed to fetch customers", err);

      // alert(errorMessage);
      logInfo("Passwords do not match.");
      // setError("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        userId: formData.userId,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess("Registration successful. Please login.");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      // setError(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2>Create Account</h2>

        <p className="subtitle">
          Register to start shopping
        </p>

        <form onSubmit={register}>

          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="User ID"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* {error && <p className="error">{error}</p>}*/}
          {success && <p className="success">{success}</p>} 

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="divider">
          <span>Already have an account?</span>
        </div>

        <Link to="/" className="login-btn">
          Login
        </Link>

      </div>
    </div>
  );
};

export default Register;