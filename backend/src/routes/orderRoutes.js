const express = require("express");
const authMiddleware=require("../middleware/authMiddleware.js");
const permissionMiddleware=require("../middleware/permissionMiddleware.js");

const router = express.Router();

const {
    getOrders,
    getOrderQuote,
    checkOutOrder
} = require("../controllers/orderController.js");

/**
 * @swagger
 * /orders/get:
 *   get:
 *     summary: Get all orders
 *     description: Returns a list of all orders from the database.
 *     tags:
 *       - Orders
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
router.get("/view", authMiddleware,permissionMiddleware("VIEW_ORDER"),getOrders);
router.post("/quote",getOrderQuote);
router.post("/placeorder",checkOutOrder);



module.exports = router;
