const express = require("express");
const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const cartMiddleware=require("../middleware/validateCartMiddleware.js");
const addressMiddleware=require("../middleware/validateAddressMiddleware.js");


const router = express.Router();
const upload=require("../middleware/upload");
const {
    createProduct,
    getProduct,
    // getProductById,
    updateProduct,
    deleteProduct,
    // searchProducts,
}= require("../controllers/productController.js");

const {    
    addProductToCart,
    getCartFromDB,
}= require("../controllers/cartController.js");

const {    
    checkOutCart
}= require("../controllers/checkoutController.js");

// router.get("/view",getProduct);//working 
router.get("/view",getProduct);//to be tested
// // router.get("/:name", getProductById);
//done on 17.08.2026
// router.get("/:name",authMiddleware,permissionMiddleware("VIEW_PRODUCT_BYID"), getProductById);//to be tested
// router.post("/add-product",upload.fields([
//         { name: "mainImage", maxCount: 1 },
//         { name: "galleryImages", maxCount: 10 }
//     ]),createProduct);//working fine

// router.post("/add-product",authMiddleware,permissionMiddleware("ADD_PRODUCT"),createProduct);//working fine
router.put("/update/:name",updateProduct);
router.put("/update/:name",authMiddleware,permissionMiddleware("UPDATE_PRODUCT"),updateProduct);
router.delete("/delete-product/:id",authMiddleware,permissionMiddleware("DELETE_PRODUCT"),deleteProduct);

router.post("/add-to-cart",addProductToCart);
router.get("/cart",getCartFromDB);
// router.post("/checkout",authMiddleware,cartMiddleware,addressMiddleware,checkOutCart);
router.post("/checkout",cartMiddleware,checkOutCart);
module.exports = router;