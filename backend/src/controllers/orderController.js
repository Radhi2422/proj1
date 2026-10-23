const orderinfo =require("../models/orderSchema.js");
const Product=require("../models/AllProducts.js")
const mongoose = require("mongoose");

exports.getOrders =async(req,res,next)=>{

    try{
        const orderData=await orderinfo.find({});
                
                return res.status(200).json({
                    success:true,
                    count:orderData.length,
                    orderData,
                })
            }
            catch(error){
                next(error);
            }
};


exports.checkOutOrder = async (req, res, next) => {
    try {
        const {userid}=req.headers;
        console.log("Checkout started",userid);
        const {
            items,
            address,
            paymentMethod
        } = req.body;

        // 1. Basic validation
        if (!userid) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }
        console.log("Basic validation completed");

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Order must contain at least one item"
            });
        }
        console.log("Order has items",address);

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Shipping address is required"
            });
        }
        console.log("Got shipping address");

        // 2. Calculate total
        const totalAmount = items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        console.log("Calculated total");

        // 3. Create order
        const order = await orderinfo.create({
            userId: new mongoose.Types.ObjectId(userid),
            items,
            address,
            paymentMethod,
            totalAmount,
            status: "Pending"
        });

        console.log("Order created:", order._id);

        // 4. Return created order
        res.status(201).json({
            success: true,
            message: "Order created successfully",
            orderId: order._id,
            order
        });

    } catch (err) {
        next(err);
    }
};



// exports.checkOutOrder=async(req,res,next)=>{
//     try {
//         console.log("hii");

//         // const { orderId } = req.body.orderDetails;

//         // const client = await getTemporalClient();

//         // const workflowId = `order-${orderId}`;
//         // // console.log("Reached here 2",workflowId);

//         // const handle = await client.workflow.start(
//         //     "orderWorkflow",
//         //     {
//         //         args: [orderId],
//         //         taskQueue: "order-processing",
//         //         workflowId
//         //     }
//         // );

//         res.status(202).json({
//             success: true,
//             message: "Order processing started",
//             workflowId: 123,
//         });

//     }catch(err){
//         next(err);
//     }
// }


// const Order = require("../models/Order");


exports.getOrderQuote = async (req, res) => {
    try {
        const { items, address } = req.body;
        console.log("Validating items");

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart items are required"
            });
        }
        console.log("Validating address")
        // Validate address
        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required"
            });
        }

        let subtotal = 0;
        const quoteItems = [];
        console.log("Validating quoteItems")

        for (const item of items) {
            const { productId, quantity } = item;

            if (!productId || !quantity || quantity < 1) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid product or quantity"
                });
            }
        console.log("Get latest product from DB")

            // Get latest product from DB
            const product = await Product.findById(productId);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: `Product ${productId} not found`
                });
            }

        console.log("Check stock")
            // Check stock
            if (product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} has only ${product.stock} items available`
                });
            }

            const itemTotal = product.price * quantity;

            subtotal += itemTotal;
        console.log("Check stock",subtotal)

            quoteItems.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity,
                total: itemTotal
            });
        }

        // Example pricing rules
        const discount = subtotal >= 5000 ? subtotal * 0.10 : 0;

        const taxableAmount = subtotal - discount;

        const tax = taxableAmount * 0.18;

        const shipping = taxableAmount >= 1000 ? 0 : 100;

        const total = taxableAmount + tax + shipping;

        console.log("Check stock",items)
        return res.status(200).json({
            success: true,

            items: quoteItems,

            pricing: {
                subtotal: Number(subtotal.toFixed(2)),
                discount: Number(discount.toFixed(2)),
                tax: Number(tax.toFixed(2)),
                shipping: Number(shipping.toFixed(2)),
                total: Number(total.toFixed(2))
            },

            address
        });

    } catch (error) {
        console.error("Order quote error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to calculate order quote"
        });
    }
};


