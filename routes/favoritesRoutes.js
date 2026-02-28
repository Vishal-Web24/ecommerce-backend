// routes/favoritesRoutes.js
const express = require("express");
const router = express.Router();
const { getFavorites, addToFavorites, removeFromFavorites } = require("../controllers/favoritesController");

router.get("/", getFavorites);
router.post("/", addToFavorites);
router.delete("/:id", removeFromFavorites);

module.exports = router;