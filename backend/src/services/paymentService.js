const Razorpay = require("razorpay");
const Payment = require("../models/Payment");
const orderInfo = require("../models/orderSchema");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Get your order from DB
    const order = await orderInfo.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.paymentStatus === "PAID") {
      return res.status(400).json({
        message: "Order already paid",
      });
    }

    // Amount should come from server-side calculation
    const amount = order.totalAmount;

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // INR → paise
      currency: "INR",
      receipt: order._id.toString(),
    });

    await Payment.create({
      orderId: order._id,
      provider: "razorpay",
      providerOrderId: razorpayOrder.id,
      amount,
      currency: "INR",
      status: "CREATED",
    });

    return res.status(201).json({
      key: process.env.RAZORPAY_KEY_ID,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Unable to create payment",
    });
  }
};

module.exports = {
  createPayment,
};