// Import Packages
require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const secrets = require("./secrets");

// Import Routers

// Import Middleware

// Use Middleware
const server = express();
server.use(helmet(), cors(), express.json());

// Use Routers

// Sanity Check Route
server.get("/", (req, res, next) => {
  res.json({ message: "I work" });
});

// Wrong Route Handler
server.use((req, res) => {
  res.status(401).json({ error: "Route does not exist" });
});

// Global Error Handler
server.use((err, req, res, next) => {
  console.log("Global Error: ", err);
  res.status(err.status || 500).json(err);
});

const PORT = secrets.port || 5000;

server.listen(PORT, () => {
  console.log(`\n *** Server Running on http://localhost:${PORT} ***\n`);
});
