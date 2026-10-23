const mongoose = require("mongoose");

const Cart = require("../models/Cart");
const Product = require("../models/AllProducts");

const validateCart = async (req, res, next) => {
  try {
    // --------------------------------
    // 1. Get logged-in user
    // --------------------------------
    const user_Id = req.body.user_Id;
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required"
      });
    }

    // --------------------------------
    // 2. Find user's cart
    // --------------------------------
    const cart = await Cart.find({
      user_Id: user_Id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // --------------------------------
    // 3. Check if cart is empty
    // --------------------------------

    if (!cart || cart.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty"
      });
    }

    // --------------------------------
    // 4. Get product IDs
    // --------------------------------

    const productIds = cart.map(
      (item) => item.item_id
    );

    // --------------------------------
    // 5. Validate ObjectIds
    // --------------------------------

    for (const productId of productIds) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product in cart"
        });
      }
    }

    // --------------------------------
    // 6. Fetch current products
    // --------------------------------
    // console.log("Fetch current products")

    // const products = await Product.find({
    //   _id: {
    //     $in: productIds
    //   }
    // });

    // // Convert products into Map
    // // for faster lookup

    // const productMap = new Map(
    //   products.map((product) => [
    //     product._id.toString(),
    //     product
    //   ])
    // );

    // // --------------------------------
    // // 7. Validate every cart item
    // // --------------------------------

    // for (const item of cart.items) {

    //   const productId = item.productId.toString();

    //   const product = productMap.get(productId);

    //   // Product doesn't exist
    //   if (!product) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `Product ${productId} no longer exists`
    //     });
    //   }

    //   // --------------------------------
    //   // 8. Check product is active
    //   // --------------------------------

    //   if (!product.isActive) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `${product.productName} is no longer available`
    //     });
    //   }

    //   // --------------------------------
    //   // 9. Validate quantity
    //   // --------------------------------

    //   if (
    //     !Number.isInteger(item.quantity) ||
    //     item.quantity <= 0
    //   ) {
    //     return res.status(400).json({
    //       success: false,
    //       message: `Invalid quantity for ${product.productName}`
    //     });
    //   }

    //   // --------------------------------
    //   // 10. Check stock
    //   // --------------------------------

    //   if (product.stock < item.quantity) {
    //     return res.status(400).json({
    //       success: false,
    //       message:
    //         `${product.productName} has insufficient stock. ` +
    //         `Available: ${product.stock}, ` +
    //         `Requested: ${item.quantity}`
    //     });
    //   }
    // }

    // // --------------------------------
    // // 11. Attach validated data
    // // --------------------------------

    // req.validatedCart = cart;
    // req.validatedProducts = products;

    next();
    console.log("Hii");

  } catch (error) {

    console.error("Cart validation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to validate cart"
    });
  }
};

module.exports = validateCart;