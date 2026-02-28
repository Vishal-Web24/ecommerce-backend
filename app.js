// app.js - Only handles middleware, routes, and request/response
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const logger = require("./config/logger");

// Route imports
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const favoritesRoutes = require("./routes/favoritesRoutes");

// Middleware imports
const { errorHandler, notFound } = require("./middleware/errorHandler");

const app = express();

// ─── Core Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan HTTP request logger
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

// ─── Swagger API Docs ─────────────────────────────────────────────
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Routes ───────────────────────────────────────────────────────
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/favorites", favoritesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/favorites", favoritesRoutes);

// ─── Health Check ─────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: " Ecommerce Backend API is running!",
    docs: "/api-docs",
  });
});

// ─── Error Handling ───────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;