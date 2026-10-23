const cartData =require("../models/Cart.js");
const logger=require("../logs/logger.js") ;
const userData = require("../models/User");
const orderInfo = require("../models/orderSchema");



const { createOrder } = require("../controllers/orderController.js");
const { reserveInventory } = require("../services/afterCheckoutReduceService");


exports.checkOutCart = async (req, res, next) => {
  try {
    console.log("Reached checkout controller");
    const user_Id = req.body.user_Id;

    // 1. Get the user's cart
    const cart = await cartData.find({ user_Id: user_Id })

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    console.log(" Got the user's cart");
    // 2. Check whether cart is empty
    if (!cart || cart.length === 0) {
    console.log("Empty cart");
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // 3. Get customer information
    console.log("Getting customer information");
    const customer = await userData.findById(user_Id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }
    console.log("Validating products and calculate total",cart);

    // 4. Validate products and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart) {
      const product = item.item_id;
      console.log(product)
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "One of the products in your cart no longer exists",
        });
      }

    console.log("Checking stock");
      // Check stock
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.productName} does not have enough stock`,
        });
      }

      const itemTotal = product.pricing * item.quantity;

      totalAmount += itemTotal;

      orderItems.push({
        productReference: product._id,
        productName: product.productName,
        quantity: item.quantity,
        price: product.pricing,
        total: itemTotal,
      });
    }

    // 5. Create order
    const order = await orderInfo.create({
      customerReference: customer._id,
      items: orderItems,
      totalAmount: totalAmount,
      status: "Pending",
      orderDate: new Date(),
    });

    // 6. Reduce product stock
    for (const item of cart.items) {
      await cartData.findByIdAndUpdate(
        item.productReference._id,
        {
          $inc: {
            stock: -item.quantity,
          },
        }
      );
    }

    // 7. Clear cart
    cart.items = [];
    await cart.save();

    // 8. Send response
    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: {
        orderId: order._id,
        totalAmount: order.totalAmount,
        status: order.status,
        orderDate: order.orderDate,
      },
    });

  } catch (err) {
    next(err);
  }
};


// *********************************************************************



// Calculate Final Price

// Get current product prices from the database.
// Calculate subtotal.
// Apply discounts.
// Calculate tax.
// Calculate shipping.
// Calculate final payable amount.

exports.cartFinalPrice=async(req,res,next)=>{
  try{
    console.log("Hii")
    // const arr=req.body.orderIds;
    // for(int a: arr){
      //get the price for each item_id with quantity from db 
      // calculate sum 
    // }
    //put tax and discount on each product
    //store final amount

  }catch(err){
    next(err);
  }
}
// *********************************************************************

// Create Order
// Create an order containing:
// Order ID
// Customer ID
// Products
// Quantities
// Prices
// Address
// Payment method
// Total amount
// Order status
// Order date









// *********************************************************************
//after about

// Reserve/Reduce Inventory
// Reduce stock after successful order creation/payment according to your business rules.
// Prevent stock from becoming negative.


// --service created



const reduceInventory = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // 1. Reserve inventory
    const product = await reserveInventory(
      productId,
      quantity
    );

    // 2. Create order
    //call create order service and create an order
    // send necessary data
    //or use following
    const order = await orderInfo.create({
      productReference: product._id,
      quantity: quantity,
      totalAmount: product.price * quantity,
      status: "Pending",
      orderDate: new Date()
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// *********************************************************************



// Payment Processing
// Create/confirm payment when online payment is selected.
// Handle payment success.
// Handle payment failure.
// Handle cancelled payments.



// paymentService created


// *********************************************************************
// Clear Cart
// Clear the user's cart only after the order has been successfully created.
// For online payments, don't clear it prematurely if payment hasn't succeeded.

// *********************************************************************

// Send Confirmation
// Send order confirmation to the customer.
// Optionally notify the admin/seller.

// const Order = require("../models/Order");
// const { sendOrderConfirmation } = require("../services/emailService");

// const placeOrder = async (req, res) => {
//   try {
//     const {
//       customerName,
//       customerEmail,
//       items,
//       totalAmount,
//     } = req.body;

//     // 1. Create order
//     const order = await Order.create({
//       customerName,
//       customerEmail,
//       items,
//       totalAmount,
//       status: "Pending",
//       orderDate: new Date(),
//     });

//     // 2. Send confirmation email
//     await sendOrderConfirmation({
//       customerName,
//       customerEmail,
//       items,
//       totalAmount,
//       orderNumber: order._id,
//       orderDate: order.orderDate,
//     });

//     // 3. Return response
//     return res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       order,
//     });

//   } catch (error) {
//     console.error("Place order error:", error);

//     return res.status(500).json({
//       success: false,
//       message: "Failed to place order",
//     });
//   }
// };

// module.exports = {
//   placeOrder,
// };


// *********************************************************************
// Return Response
// Return order ID.
// Return order status.
// Return order summary.
// Return payment status where applicable.





// *********************************************************************










// Prevent Duplicate Orders
// Protect against the user clicking Place Order multiple times.
// Use an idempotency mechanism/order request identifier where appropriate.

// Check whether this request already created an order
    // const existingOrder = await Order.findOne({
    //   userId,
    //   idempotencyKey,
    // });

    // if (existingOrder) {
    //   return res.status(200).json({
    //     success: true,
    //     message: "Order already created",
    //     order: existingOrder,
    //   });
    // }
// *********************************************************************














// Transaction Management
// Order creation, inventory update, and related database changes should be handled consistently.
// If a critical database operation fails, avoid leaving the system in a partially completed state.
