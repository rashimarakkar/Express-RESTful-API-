const express = require("express");
const app = express();
const products_routes = require("./routes/products");
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");

// Middleware
app.use(express.json()); //  it will convert JSON string into a JavaScript object and attach it to req.body, allowing you to easily work with the data.
app.use(helmet()); // Add security headers to avoid various threats
app.use(cors()); // Enable CORS for cross-origin requests

// Routes
app.use("/api/products", products_routes);

// Start the server only if DB connection is successful
const startServer = async () => {
  try {
    // Database connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

startServer();
