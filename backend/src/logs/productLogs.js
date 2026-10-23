
// const logger = require("../logs/logger.js");

// const getProduct = async (req, res) => {
//   try {
//     logger.info("Fetching all products");

//     const products = await Product.find();

//     logger.info(`Found ${products.length} products`);

//     res.json(products);
//   } catch (error) {
//     logger.error(`Error fetching products: ${error.message}`);
//     res.status(500).json({ message: error.message });
//   }
// };