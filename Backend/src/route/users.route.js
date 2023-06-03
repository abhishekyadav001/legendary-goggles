const express = require("express");
const router = express.Router();
const { userLoginController, userLogoutController } = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");
const userModel = require("../model/users.model");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let data = await userLoginController(email, password);
  res.send(data.payload);
});

router.post("/logout", (req, res) => {
  const { token } = req.headers;
  let data = userLogoutController(token);
  res.status(data.status).send(data.payload);
});

module.exports = { router };
