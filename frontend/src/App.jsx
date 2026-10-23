import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import ProtectedRoute from "./ProtectedRoute";

// Not lazy imports
import Login from "./pages/Login/Login";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Dashboard from "./pages/Dashboard/Dashboard";
// Lazy imports
// const ProductPage=lazy(()=>import("./pages/Product/View/UserProductList"));
const CustomerMainPage = lazy(() => import("./pages/Customer/Admin Page/Customer"));
const CustomerList = lazy(() => import("./pages/Customer/View/CustomerPage"));
const EditCustomer = lazy(() => import("./pages/Customer/Edit/EditCustomer"));
const AddCustomer = lazy(() => import("./pages/Customer/Add/AddCustomer"));
const ProductMainPage = lazy(() => import('./pages/Product/AdminPage/Products'))
const AddProduct = lazy(() => import("./pages/Product/Add2/AddProduct"));
const EditProduct = lazy(() => import("./pages/Product/Edit/EditProduct"));
const ProductList = lazy(() => import("./pages/Product/View/ProductList"));
const OrderList= lazy(()=>import("./pages/Orders/Admin Page/OrderDetails"));
// const CodeEditor = lazy(() => import("./pages/Code Editor/CodeEditor"));
const Cart=lazy(()=>import("../src/pages/Cart/Cart"));
const Checkout=lazy(()=>import("../src/pages/Checkout/Checkout"));
const Profile=lazy(()=>import("../src/pages/Profile/Profile"));

// const CodeDashboard=lazy(()=>import("../src/pages/Dashboard/CodeDashboard"));



function App() {

  return (
    <>
    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Not lazy */}
        <Route path="/" element={<Login/>}/>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        {/* <Route path="/products/category" element={<ProductPage/>}/>     */}
        
        {/* Lazy */}
        {/* Products */}
        <Route path="/products" element={<ProductMainPage />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/products/update/:name" element={<EditProduct />} />
         <Route path="/products/view" element={<ProductList />}/>
         {/* customers */}
        <Route path="/customers" element={<CustomerMainPage />} />
        <Route path="/customers/add-customer" element={<AddCustomer />} />
        <Route path="/customers/view-customers" element={<CustomerList />} />
        <Route path="/customers/edit-customer/:id" element={<EditCustomer />} />        
        {/* Orders */}
        <Route path="/orders/view" element={<OrderList />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/profile" element={<Profile/>}/>
        {/* </Route> */}
        {/* Coding platform addition to be tested */}
        {/* <Route path="/codedashboard" element={<CodeDashboard/>}/>
        <Route path="/problems" element={<ProblemPage />} /> */}
        {/* To be checked */}
        {/* <Route path="/" element={<AddCustomer />} /> 
        <Route path="/code-editor" element={<CodeEditor />} />*/}
        {/* <Route
            path="/dashboard"
            element={
                <Suspense fallback={<div>Loading...</div>}>
                    <Dashboard />
                </Suspense>
            }
        /> */}
      </Routes>
    </Suspense>
    </BrowserRouter>
    </>
  )
}

export default App
