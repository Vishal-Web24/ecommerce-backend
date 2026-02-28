
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const logger = require("./config/logger");

const PORT = process.env.PORT || 3000;


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
      logger.info(` Swagger API Docs available at http://localhost:${PORT}/api-docs`);
      logger.info(` Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();