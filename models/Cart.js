// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Cart || mongoose.model("Cart", cartSchema);