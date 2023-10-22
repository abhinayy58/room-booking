const express = require("express");
const {
  createBooking,
  updateBooking,
  getBooking,
  getBookings,
} = require("../controller/Booking.js");
const {
  verifyToken,
  verifyAdmin,
  verifyUser,
} = require("../utils/VerifyToken.js");

const BooingRoute = express.Router();

BooingRoute.post("/:roomid", verifyToken, createBooking);
BooingRoute.put("/:id", verifyToken, verifyAdmin, updateBooking);
BooingRoute.get("/:id", verifyToken, verifyUser, getBooking);
BooingRoute.get("/", verifyToken, verifyAdmin, getBookings);

module.exports = BooingRoute;
