const express = require("express");
const {
  updateUser,
  getUser,
  getUsers,
} = require("../controller/User.js");
const {
  verifyAdmin,
  verifyToken,
  verifyUser,
} = require("../utils/VerifyToken.js");

const userRoute = express.Router();

userRoute.put("/:id", verifyToken, verifyUser, updateUser);

userRoute.get("/:id", verifyToken, verifyUser, getUser);

userRoute.get("/", verifyToken, verifyAdmin, getUsers);

module.exports = userRoute;
