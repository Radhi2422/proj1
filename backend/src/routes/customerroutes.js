const express = require("express");
const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const router = express.Router();

const {
    createCustomer,
    getCustomer,
    getCustomerById,
    deleteCustomer
}= require("../controllers/customerController.js")

router.get("/view",authMiddleware,permissionMiddleware("VIEW_CUSTOMER"),getCustomer);//to be tested
router.get("/:name",authMiddleware,permissionMiddleware("VIEW_CUSTOMER_BYID"), getCustomerById);//to be tested
// router.post("/add-customer",authMiddleware,permissionMiddleware("ADD_CUSTOMER"),createCustomer);//working fine
router.post("/add-customer",createCustomer);//working fine
// router.put("/update/:name",authMiddleware,permissionMiddleware("UPDATE_CUSTOMER"),updateProduct);
router.delete("/:id", deleteCustomer);
router.delete("/delete-customer/:id",authMiddleware,permissionMiddleware("DELETE_CUSTOMER"),deleteCustomer);
module.exports = router;