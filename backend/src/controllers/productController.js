const allProducts = require("../models/AllProducts");
const cartData =require("../models/Cart.js");
const logger=require("../logs/logger.js") ;

exports.createProduct =async(req,res)=>{
    const productData = {
          ...req.body
    };
    const product = await allProducts.create(productData);
    res.status(201).json(product);
};

exports.getProduct = async (req, res,next) => {
  try {
    const { page, limit } = req.query;
    const products = await allProducts.find({});
    if (page && limit) {
      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      const skip = (pageNumber - 1) * limitNumber;

     const totalProducts = allProducts.skip(skip).limit(limitNumber);
      logger.info("Products fetched successfully", {
      count: products.length,
    });
      return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
    }
     // If page and limit are NOT provided, return all products
     
     logger.info("Products fetched successfully", {
      count: products.length,
    });
    const totalProducts = allProducts.length;
    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      products,
    });
    
  } catch (error) {
    next(error);
  }
};
exports.searchProducts = async (req, res,next) => {
    try {
        const { name } = req.query;
        const products = await allProducts.find({
            name: { $regex: name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
       next(error);
    }
};

exports.updateProduct = async (req, res,next) => {
  try {
    const updatedProduct =
        await allProducts.find({
           name: req.query.name
});

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    next(error);
  }
};

exports.getProductById =async (req, res,next) => {
 try {
        const { name } = req.query;
        const products = await allProducts.find({
            name: { $regex: name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
       next(error);
    }
};

exports.deleteProduct =async(req,res)=>{

    await allProducts.findByIdAndDelete(
        req.params.id
    );

    res.json({
        message:"Product deleted"
    });
};
