import  { useEffect, useState } from "react";
import axios from "axios";
// import useLogger from "../../../hooks/useLogger"
// import useErrorHandler from "../../../hooks/useErrorHandler";
// import "./CustomerPage.css";
// import { logFrontendError } from "../../controllers/logFrontendErrorController";
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  // const {  logError } = useLogger();
  // const { handleError } = useErrorHandler();

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {

      const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${VITE_BASE_URL}/customers/view`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCustomers(res.data.customerData);

      // logInfo("Customer list fetched successfully", res.data.customerData);
    } catch (err) {
      console.log(err);
    //   logFrontendError(err, {
    //     component: "ProductList",
    //     method: "fetchProducts"
    // });
    }
  };

  return (
    <div className="product-container">
      <div className="product-card">
        <h1>📦 Customers Available in the Database</h1>

        <p className="count">
          Total Customers : <span>{customers.length}</span>
        </p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Contact No.</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No Customers Available
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.Address}</td>
                  <td>{customer.ContactNumber}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;