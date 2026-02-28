// controllers/favoritesController.js
const Favorites = require("../models/Favorites");
const logger = require("../config/logger");

// @desc    Get all favorites
// @route   GET /favorites
const getFavorites = async (req, res) => {
  try {
    logger.info("Fetching all favorite items...");
    const favorites = await Favorites.find().populate("productId");
    logger.info(`Successfully fetched ${favorites.length} favorite items`);
    res.status(200).json({
      success: true,
      count: favorites.length,
      data: favorites,
    });
  } catch (error) {
    logger.error(`Error fetching favorites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Add product to favorites
// @route   POST /api/favorites
const addToFavorites = async (req, res) => {
  try {
    const { productId, name, price, image, category } = req.body;

    if (!productId || !name || !price) {
      logger.warn("Add to favorites failed: Missing required fields");
      return res.status(400).json({ success: false, message: "productId, name, and price are required" });
    }

    // Check if already in favorites
    const existingItem = await Favorites.findOne({ productId });
    if (existingItem) {
      logger.warn(`Product already in favorites: ${name}`);
      return res.status(409).json({ success: false, message: "Product already in favorites" });
    }

    const favoriteItem = await Favorites.create({ productId, name, price, image, category });
    logger.info(`Product added to favorites: ${name} (ID: ${productId})`);
    res.status(201).json({
      success: true,
      message: "Product added to favorites successfully",
      data: favoriteItem,
    });
  } catch (error) {
    logger.error(`Error adding product to favorites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Remove product from favorites
// @route   DELETE /api/favorites/:id
const removeFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Favorites.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Favorite item not found" });
    }
    logger.info(`Product removed from favorites: ID ${id}`);
    res.status(200).json({ success: true, message: "Product removed from favorites" });
  } catch (error) {
    logger.error(`Error removing from favorites: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { getFavorites, addToFavorites, removeFromFavorites };