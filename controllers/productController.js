// controllers/productController.js
const Product = require("../models/Product");
const logger = require("../config/logger");

// @desc    Get all products
// @route   GET /products
const getAllProducts = async (req, res) => {
  try {
    logger.info("Fetching all products from database...");
    const products = await Product.find();
    logger.info(`Successfully fetched ${products.length} products`);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    logger.error(`Error fetching all products: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get products by category
// @route   GET /products/:category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    logger.info(`Fetching products for category: ${category}`);
    const products = await Product.find({ category: category.toLowerCase() });
    if (products.length === 0) {
      logger.warn(`No products found for category: ${category}`);
      return res.status(404).json({ success: false, message: `No products found in category: ${category}` });
    }
    logger.info(`Successfully fetched ${products.length} products for category: ${category}`);
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    logger.error(`Error fetching products by category: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getAllProducts, getProductsByCategory };