// models/Favorites.js
const mongoose = require("mongoose");

const favoritesSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Favorites || mongoose.model("Favorites", favoritesSchema);