const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authcontroller");
const authmiddlewares = require("../middlewares/authmiddlewares");

const router = express.Router();

//  routes

router.post("/register", registerController);

//  login || Post

router.post("/login", loginController);

module.exports = router;
