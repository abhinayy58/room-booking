const express = require("express");
const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRooms,
  getRoomBookings,
  getRoom,
} = require("../controller/Room.js");
const { verifyToken, verifyAdmin } = require("../utils/VerifyToken.js");
const roomRoute = express.Router();

roomRoute.post("/", verifyToken, verifyAdmin, createRoom);

roomRoute.put("/:id", verifyToken, verifyAdmin, updateRoom);

roomRoute.delete("/:id", verifyToken, verifyAdmin, deleteRoom);

roomRoute.get("/find/:id", getRoom);
roomRoute.get("/", getRooms);
roomRoute.get("/room/:id", getRoomBookings);

module.exports = roomRoute;
