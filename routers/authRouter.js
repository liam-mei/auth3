const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../database/userModel");
const secrets = require("../secrets");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    next({ status: 400, message: "please fill out both username and password" });
  try {
    const user = await userModel.findOneBy({ username });
    const passwordValid = await bcrypt.compare(password, user.password);
    if (user && passwordValid) {
      const token = jwt.sign(user, secrets.secret, { expiresIn: "7d" });
      res.json({ message: `Welcome ${user.username}`, token });
    } else {
      next({ status: 401, message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    next({ status: 400, message: "please fill out both username and password" });
  const usernameExists = await userModel.findOneBy({ username });
  if (usernameExists) next({ status: 400, message: `username: ${username} is already taken` });

  try {
    const newUser = await userModel.add({ username, password });
    const token = await jwt.sign(newUser, secrets.secret, { expiresIn: "7d" });
    // token is optional here.
    // Depends if you want to require a user to login after registration to get a token
    res.json({ message: `Welcome to the family, ${username}`, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
