const express = require("express");
const { login, register } = require("../controller/Auth.js");

const authRoute = express.Router();

authRoute.post("/register", register)
authRoute.post("/login", login)

module.exports =  authRoute 