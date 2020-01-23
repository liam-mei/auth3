const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// Import Routers
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");

// Import Middleware
const { restricted } = require("../middleware/middleware");

// Use Middleware
const server = express();
server.use(helmet(), cors(), express.json());

// Use Routers
server.use("/auth", authRouter);
// server.use("/users", restricted, userRouter);

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
  res.status(err.status || 500).json({ message: err.message, err });
});

module.exports = server;
