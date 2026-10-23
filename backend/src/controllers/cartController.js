const cartData =require("../models/Cart.js");
const logger=require("../logs/logger.js") ;
const allProducts=require("../models/AllProducts.js")

// Create a cart for a user when required.


// Retrieve the authenticated user's existing cart.
exports.getCartFromDB=async(req,res,next)=>{
  try{
    const user_Id=req.headers.user_id;
    const CartData = await cartData.find({ user_Id });
    return res.status(200).json({
      success: true,
      CartData,
    });
  }catch(err){
    next(err);
  }
}

// Add Item
exports.addProductToCart = async (req, res,next) => {
    try {
          //get the data for item using id from the req
          const _id=req.body.item_id;
          const user_Id=req.body.user_Id;
          // const productDetails=await allProducts.findOne({_id});
          // const data={
          //   user_Id: user_Id,
          //   item_id: _id,
          //   name: productDetails.name,
          //   price: productDetails.price,
          //   qty: 1,
          // }
          // console.log("Cart Data:",data);
          // //create the cart 
          // //the cart will contain only major things like price, id, name and other things
          // // Create cart item with only required product details
          // const newCartItem = await cartData.create({
          //   data
          // });
          console.log(_id);
          allProducts.findById(_id).then((productDetails) => {

            // 1. Product not found
            if (!productDetails) {
              throw new Error("Product not found");
            }

            // 2. Check whether this product is already in user's cart
            return cartData.findOne({
              user_Id: user_Id,
              item_id: productDetails._id
            })
            .then((existingCartItem) => {

              // 3. Product already exists → update quantity
              if (existingCartItem) {

                existingCartItem.qty += 1;

                return existingCartItem.save();
              }

              // 4. Product doesn't exist → create new cart item
              const data = {
                user_Id: user_Id,
                item_id: productDetails._id,
                name: productDetails.name,
                price: productDetails.price,
                qty: 1
              };

              return cartData.create(data);
            });
          })
          .then((cartItem) => {

            console.log("Cart updated:", cartItem);

            res.status(200).json({
              message: "Cart updated successfully",
              cartItem
            });

          })
  } catch (error) {
    next(error);
  }
};

// Accept product/variant ID and quantity.


/************************************************************** */
// Create/Get User Cart
// Create a cart for a user when required.
// Retrieve the authenticated user's existing cart.
/************************************************************** */

// Add Item
// Accept product/variant ID and quantity.
// Verify that the product exists.
// Verify that the product is active.
// Verify stock availability.
// Add the product to the cart.
// If the product already exists, update its quantity rather than creating an unnecessary duplicate line.


/************************************************************** */
// Get Cart
// Return the authenticated user's cart.
// Return product details required by the frontend.
// Return quantities and calculated prices.

/************************************************************** */
// Update Cart Item
// Change the quantity of an existing item.
// Validate the requested quantity.
// Check current inventory.

// Ans
// update item from db
/************************************************************** */

// Remove Cart Item
// Remove a specific product from the user's cart.

// Ans
// Delete item from db


/************************************************************** */


// Clear Cart
// Remove all items from the cart after a successful order.
// Ans:
// 2. Call it from your checkout/order controller
 // 5. Clear cart automatically
        // await clearCart(userId);
  
//   const Cart = require("../models/Cart");

// const clearCart = async (userId) => {
//     await Cart.findOneAndUpdate(
//         { userId },
//         { $set: { items: [] } }
//     );

//     return true;
// };

// module.exports = clearCart;

/************************************************************** */
// Calculate Cart Total
// Calculate subtotal.
// Apply discounts.
// Calculate tax.
// Calculate shipping.
// Calculate final amount.






/************************************************************** */
// Validate Cart
// Re-check product availability.
// Re-check current prices.
// Re-check stock before checkout.

// Option 2 — Kafka

// Kafka becomes useful when your application starts producing many events.

// For example:

// Product price changed
//         ↓
// Kafka
//         ↓
// ProductPriceChanged event
//         ↓
// Cart Validation Service
//         ↓
// Find affected carts
//         ↓
// Revalidate carts

// Similarly:

// Inventory changed
//       ↓
// Kafka
//       ↓
// InventoryUpdated
//       ↓
// Cart Validation Service
//       ↓
// Validate affected carts

// You could have events such as:

// {
//     eventType: "PRODUCT_PRICE_CHANGED",
//     productId: "123",
//     oldPrice: 1000,
//     newPrice: 1200
// }

// and:

// {
//     eventType: "INVENTORY_CHANGED",
//     productId: "123",
//     oldStock: 5,
//     newStock: 2
// }

// The validation service consumes these events.









/************************************************************** */
// Security
// Users can access only their own cart.
// Never trust user-provided prices or totals.
// Product prices should come from the database.


//Needs to be implemented during get cart









/************************************************************** */
// Concurrency
// Handle situations where two users try to purchase the last available product.
// Inventory should be validated again during order creation.

//Solution: Re-check and reserve/decrement inventory atomically during order creation.

// This i will do afterwards






















