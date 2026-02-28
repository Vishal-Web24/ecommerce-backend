// controllers/cartController.js
const Cart = require("../models/Cart");
const logger = require("../config/logger");

// @desc    Get all cart items
// @route   GET /cart
const getCart = async (req, res) => {
  try {
    logger.info("Fetching all cart items...");
    const cartItems = await Cart.find().populate("productId");
    logger.info(`Successfully fetched ${cartItems.length} cart items`);
    res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems,
    });
  } catch (error) {
    logger.error(`Error fetching cart items: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Add product to cart
// @route   POST /api/cart
const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, category, quantity } = req.body;

    if (!productId || !name || !price) {
      logger.warn("Add to cart failed: Missing required fields");
      return res.status(400).json({ success: false, message: "productId, name, and price are required" });
    }

    // Check if already in cart
    const existingItem = await Cart.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      logger.info(`Updated quantity for product: ${name} in cart`);
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingItem,
      });
    }

    const cartItem = await Cart.create({ productId, name, price, image, category, quantity: quantity || 1 });
    logger.info(`Product added to cart: ${name} (ID: ${productId})`);
    res.status(201).json({
      success: true,
      message: "Product added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    logger.error(`Error adding product to cart: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Remove product from cart
// @route   DELETE /api/cart/:id
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Cart.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }
    logger.info(`Product removed from cart: ID ${id}`);
    res.status(200).json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    logger.error(`Error removing from cart: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getCart, addToCart, removeFromCart };