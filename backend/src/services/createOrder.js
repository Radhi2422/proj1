const orderinfo =require("../models/orderSchema.js");

const createOrder = async (req, res) => {
  try {
    // These should have been created by
    // previous validation middleware.

    const cart = req.validatedCart;
    const products = req.validatedProducts;
    const address = req.deliveryAddress;

    const { paymentMethod } = req.body;

    // --------------------------------
    // 1. Validate payment method
    // --------------------------------

    const allowedPaymentMethods = [
      "COD",
      "CARD",
      "UPI",
      "NET_BANKING"
    ];

    if (!allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method"
      });
    }

    // --------------------------------
    // 2. Create product lookup map
    // --------------------------------

    const productMap = new Map(
      products.map((product) => [
        product._id.toString(),
        product
      ])
    );

    // --------------------------------
    // 3. Build order products
    // --------------------------------

    const orderProducts = cart.items.map((item) => {
      const product = productMap.get(
        item.productId.toString()
      );

      const quantity = item.quantity;

      // IMPORTANT:
      // Get price from DB, NOT frontend.

      const price = product.price;

      const subtotal = price * quantity;

      return {
        productId: product._id,
        productName: product.productName,
        quantity,
        price,
        subtotal
      };
    });

    // --------------------------------
    // 4. Calculate total
    // --------------------------------

    const totalAmount = orderProducts.reduce(
      (total, item) => {
        return total + item.subtotal;
      },
      0
    );

    // --------------------------------
    // 5. Create order
    // --------------------------------

    const order = await orderinfo.create({
      customerId: req.user.id,

      products: orderProducts,

      address: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country
      },

      paymentMethod,

      totalAmount,

      orderStatus: "Pending",

      orderDate: new Date()
    });

    // --------------------------------
    // 6. Return response
    // --------------------------------

    return res.status(201).json({
      success: true,
      message: "Order created successfully",

      order: {
        orderId: order._id,
        customerId: order.customerId,
        products: order.products,
        address: order.address,
        paymentMethod: order.paymentMethod,
        totalAmount: order.totalAmount,
        orderStatus: order.orderStatus,
        orderDate: order.orderDate
      }
    });

  } catch (error) {

    console.error("Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order"
    });
  }
};

module.exports = {
  createOrder
};