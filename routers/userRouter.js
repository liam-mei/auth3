const express = require("express");
const userModel = require("../database/userModel");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await userModel.findAll());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
