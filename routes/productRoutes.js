const express = require("express");
const router = express.Router();
const { getAllProducts, getProductsByCategory } = require("../controllers/productController");

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 */
router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         example: electronics
 *     responses:
 *       200:
 *         description: Products in category
 *       404:
 *         description: No products found
 */
router.get("/:category", getProductsByCategory);

module.exports = router;