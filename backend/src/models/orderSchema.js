const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    productName: {
      type: String,
      required: true
    },

    quantity: {
      type: Number,
      required: true,
      min: 1
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    // Customer ID
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // Products
    products: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one product"
      }
    },

    // Delivery address snapshot
    address: {
      name: {
        type: String,
        required: true
      },

      phone: {
        type: String,
        required: true
      },

      addressLine: {
        type: String,
        required: true
      },

      city: {
        type: String,
        required: true
      },

      state: {
        type: String,
        required: true
      },

      pincode: {
        type: String,
        required: true
      },

      country: {
        type: String,
        required: true
      }
    },

    // Payment method
    paymentMethod: {
      type: String,
      enum: [
        "COD",
        "CARD",
        "UPI",
        "NET_BANKING"
      ],
      required: true
    },

    // Total amount
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    },

    // Order status
    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
      ],
      default: "Pending",
      index: true
    },

    // Order date
    orderDate: {
      type: Date,
      default: Date.now
    }
  },

  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);