const Product = require("../models/AllProducts");

const reserveInventory = async (productId, quantity) => {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Invalid quantity");
  }

  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      stock: { $gte: quantity }
    },
    {
      $inc: {
        stock: -quantity
      }
    },
    {
      new: true
    }
  );

  if (!product) {
    throw new Error("Insufficient stock");
  }

  return product;
};

module.exports = {
  reserveInventory
};


// const mongoose = require("mongoose");
// const Product = require("../models/Product");
// const Order = require("../models/Order");

// const createOrder = async (req, res) => {
//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();

//     const { productId, quantity } = req.body;

//     if (!Number.isInteger(quantity) || quantity <= 0) {
//       throw new Error("Invalid quantity");
//     }

//     // Reduce stock only if enough inventory exists
//     const product = await Product.findOneAndUpdate(
//       {
//         _id: productId,
//         stock: { $gte: quantity }
//       },
//       {
//         $inc: {
//           stock: -quantity
//         }
//       },
//       {
//         new: true,
//         session
//       }
//     );

//     if (!product) {
//       throw new Error("Insufficient stock");
//     }

//     // Create order
//     const order = await Order.create(
//       [
//         {
//           productReference: product._id,
//           quantity,
//           totalAmount: product.price * quantity,
//           status: "Pending",
//           orderDate: new Date()
//         }
//       ],
//       { session }
//     );

//     await session.commitTransaction();

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: order[0]
//     });

//   } catch (error) {

//     await session.abortTransaction();

//     res.status(400).json({
//       success: false,
//       message: error.message
//     });

//   } finally {
//     await session.endSession();
//   }
// };