const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce Backend API",
      version: "1.0.0",
      description: "API documentation for the Ecommerce Backend project",
    },
    servers: [
      {
        url: "https://ecommerce-backend-4raa.onrender.com",
        description: "Production Server",
      },
      {
        url: "http://localhost:3000",
        description: "Development Server",
      },
    ],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;