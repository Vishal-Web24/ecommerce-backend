const express = require("express");
const router = express.Router();
const { getFavorites, addToFavorites, removeFromFavorites } = require("../controllers/favoritesController");

/**
 * @swagger
 * /favorites:
 *   get:
 *     summary: Get all favorites
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: List of favorites
 */
router.get("/", getFavorites);

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add product to favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to favorites
 *       409:
 *         description: Already in favorites
 */
router.post("/", addToFavorites);

/**
 * @swagger
 * /api/favorites/{id}:
 *   delete:
 *     summary: Remove item from favorites
 *     tags: [Favorites]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item removed
 */
router.delete("/:id", removeFromFavorites);

module.exports = router;